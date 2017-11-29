package service;

import java.util.List;

import entity.ProcessModel;
import repository.IRepository;
import repository.MySQLRepository;

public abstract class SimilarityService {
	private IRepository repository = new MySQLRepository();

	public List<ProcessModel> getSimilarProcessModelsList(String modelId) {
		return repository.getSimilarProcessModels(modelId);
	}
}
