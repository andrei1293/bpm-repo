package repository;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import entity.ProcessModelSimilarity;

public class MySQLRepositoryTest {
	private IDatabaseRepository repository = null;

	@Test
	public void testGetProcessModelFile() {
		repository = new MySQLRepository();
		final String modelId = "1511875627911";
		final String actual = repository.getProcessModelFile(modelId);
		final String expected = "ErrorModel01.xpdl";
		assertTrue("Should return model file name by ID", actual.equals(expected));
	}

	@Test
	public void testSaveSimilarProcessModels() {
		repository = new MySQLRepository();
		List<ProcessModelSimilarity> similarModels = new ArrayList<ProcessModelSimilarity>();
		similarModels.add(new ProcessModelSimilarity("1511875627911", "1511875751342", 1));
		similarModels.add(new ProcessModelSimilarity("1511875627911", "1511884169069", 2));
		similarModels.add(new ProcessModelSimilarity("1511875627911", "1511887234652", 3));
		int[] actuals = repository.saveSimilarProcessModels(similarModels);
		int[] expecteds = { 1, 1, 1 };
		assertArrayEquals(expecteds, actuals);
	}

	@Test
	public void testGetSimilarProcessModels() {
		repository = new MySQLRepository();
		final String modelId = "1511875627911";
		final int actual = repository.getSimilarProcessModels(modelId).size();
		final int expected = 3;
		assertEquals("Should returl list of 3 similar models to model set by ID", expected, actual);
	}

	@Test
	public void testGetProcessModelFiles() {
		repository = new MySQLRepository();
		final int actual = repository.getProcessModelFiles().size();
		final int expected = 6;
		assertEquals("Should returl list of 6 model files", expected, actual);
	}
}
