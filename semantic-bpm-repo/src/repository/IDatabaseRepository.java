package repository;

import java.util.List;

import entity.ProcessModel;
import entity.ProcessModelSimilarity;

public interface IDatabaseRepository {
	String getProcessModelFile(String modelId);

	int[] saveSimilarProcessModels(List<ProcessModelSimilarity> similarModels);

	List<ProcessModel> getSimilarProcessModels(String modelId);
	
	List<ProcessModel> getProcessModelFiles();
}
