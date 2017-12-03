package service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.rdf.model.ResIterator;
import org.apache.jena.rdf.model.StmtIterator;

import entity.ProcessModel;
import entity.ProcessModelSimilarity;
import properties.Properties;
import repository.IDatabaseRepository;
import repository.ISemanticRepository;
import repository.MySQLRepository;
import repository.TDBRepository;

public abstract class SimilarityService {
	private static final double Q_COEFF = 1.5;

	private IDatabaseRepository databaseRepository = new MySQLRepository();
	private ISemanticRepository semanticRepository = new TDBRepository();

	public List<ProcessModel> getSimilarProcessModelsList(String modelId) {
		return databaseRepository.getSimilarProcessModels(modelId);
	}

	public abstract double similarity(Set<RDFNode> a, Set<RDFNode> b);

	public void defineSimilarModels(String modelId) {
		List<ProcessModel> processModelFiles = databaseRepository.getProcessModelFiles();
		semanticRepository.open();

		for (ProcessModel processModel : processModelFiles) {
			Model model = ModelFactory.createDefaultModel();

			if (Properties.NATIVE_MODELS) {
				model.read(Properties.MODELS_PATH + "\\" + processModel.getModelFile(), "N-TRIPLES");
			} else {
				model.read(Properties.MODELS_PATH + "\\" + processModel.getModelFile().replace("xpdl", "nt"),
						"N-TRIPLES");
			}
			semanticRepository.store(processModel.getModelId(), model);
		}

		List<ProcessModelSimilarity> similarModels = new ArrayList<ProcessModelSimilarity>();
		Model model = semanticRepository.get(modelId);

		for (ProcessModel processModel : processModelFiles) {
			if (!processModel.getModelId().equals(modelId)) {
				double similarity = calculateSimilarity(model, semanticRepository.get(processModel.getModelId()));
				ProcessModelSimilarity bean = new ProcessModelSimilarity(modelId, processModel.getModelId(),
						similarity);
				similarModels.add(bean);
			}
		}

		classifyModels(similarModels);
		scaleModels(similarModels);
		databaseRepository.saveSimilarProcessModels(similarModels);
		semanticRepository.close();
	}

	private void classifyModels(List<ProcessModelSimilarity> similarModels) {
		double[] membership = new double[similarModels.size()];
		double membershipSum = 0;

		for (int i = 0; i < similarModels.size(); i++) {
			double distance = 1.0 - similarModels.get(i).getProcessModelSimilarityValue();

			if (distance < 10E-3) {
				distance = 10E-3;
			}

			membership[i] = 1.0 / Math.pow(distance, 1.0 / (Q_COEFF - 1.0));
			membershipSum += membership[i];
		}

		for (int i = 0; i < similarModels.size(); i++) {
			similarModels.get(i).setProcessModelSimilarityValue(membership[i] / membershipSum);
		}
	}

	private void scaleModels(List<ProcessModelSimilarity> similarModels) {
		double min = 0;
		double max = 0;

		for (int i = 0; i < similarModels.size(); i++) {
			min += similarModels.get(i).getProcessModelSimilarityValue();
		}

		min /= similarModels.size();

		for (int i = 0; i < similarModels.size(); i++) {
			max += Math.pow(similarModels.get(i).getProcessModelSimilarityValue() - min, 2);
		}

		max /= similarModels.size() - 1;
		max = min + Math.sqrt(max);

		for (int i = 0; i < similarModels.size(); i++) {
			similarModels.get(i).setProcessModelSimilarityValue(
					Math.exp(-Math.exp(-(similarModels.get(i).getProcessModelSimilarityValue() - min) / (max - min))));
		}
	}

	private double calculateSimilarity(Model first, Model second) {
		Set<RDFNode> firstSubjects = new HashSet<RDFNode>();
		Set<RDFNode> secondSubjects = new HashSet<RDFNode>();

		for (ResIterator i = first.listSubjects(); i.hasNext();) {
			firstSubjects.add(i.nextResource());
		}

		for (ResIterator i = second.listSubjects(); i.hasNext();) {
			secondSubjects.add(i.nextResource());
		}

		Set<RDFNode> intersection = new HashSet<RDFNode>(firstSubjects);
		intersection.retainAll(secondSubjects);

		double result = 0;

		for (RDFNode subject : intersection) {
			Set<RDFNode> firstProperties = new HashSet<RDFNode>();
			Set<RDFNode> secondProperties = new HashSet<RDFNode>();

			for (StmtIterator i = first.listStatements(subject.asResource(), null, (RDFNode) null); i.hasNext();) {
				firstProperties.add(i.nextStatement().getPredicate());
			}

			for (StmtIterator i = second.listStatements(subject.asResource(), null, (RDFNode) null); i.hasNext();) {
				secondProperties.add(i.nextStatement().getPredicate());
			}

			Set<RDFNode> firstObjects = new HashSet<RDFNode>();
			Set<RDFNode> secondObjects = new HashSet<RDFNode>();

			for (StmtIterator i = first.listStatements(subject.asResource(), null, (RDFNode) null); i.hasNext();) {
				firstObjects.add(i.nextStatement().getObject());
			}

			for (StmtIterator i = second.listStatements(subject.asResource(), null, (RDFNode) null); i.hasNext();) {
				secondObjects.add(i.nextStatement().getObject());
			}

			result += (similarity(firstProperties, secondProperties) + similarity(firstObjects, secondObjects));
		}

		return result == 0 ? 0 : result / (2 * intersection.size());
	}
}
