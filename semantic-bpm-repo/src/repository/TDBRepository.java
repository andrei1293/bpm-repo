package repository;

import org.apache.jena.query.Dataset;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.tdb.TDBFactory;

public class TDBRepository implements ISemanticRepository {
	private Dataset dataset;

	@Override
	public void open() {
		dataset = TDBFactory.createDataset();
	}

	@Override
	public void close() {
		dataset.close();
	}

	@Override
	public void store(String name, Model model) {
		dataset.addNamedModel(name, model);
	}

	@Override
	public Model get(String name) {
		return dataset.getNamedModel(name);
	}
}
