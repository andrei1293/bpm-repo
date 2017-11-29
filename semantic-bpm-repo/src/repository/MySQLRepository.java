package repository;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import entity.ProcessModel;
import entity.ProcessModelSimilarity;
import properties.Properties;

public class MySQLRepository implements IDatabaseRepository {
	private static final String HOST = "jdbc:mysql://localhost:3306/bpm-repo";
	private static final String USER = "root";
	private static final String PASSWORD = "root";

	@Override
	public String getProcessModelFile(String modelId) {
		Connection connection = getConnection();
		String processModelFile = null;
		String query = "SELECT Process_Model_File_URL FROM process_model WHERE Process_Model_ID = ?";

		try {
			PreparedStatement statement = connection.prepareStatement(query);
			statement.setString(1, modelId);
			ResultSet resultSet = statement.executeQuery();
			resultSet.next();
			processModelFile = resultSet.getString(1);
			resultSet.close();
			statement.close();
			connection.close();
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}

		return processModelFile;
	}

	@Override
	public List<ProcessModel> getProcessModelFiles() {
		Connection connection = getConnection();
		List<ProcessModel> processModelFiles = new ArrayList<ProcessModel>();
		String query = "SELECT Process_Model_File_URL, Process_Model_ID FROM process_model";

		try {
			Statement statement = connection.createStatement();
			ResultSet resultSet = statement.executeQuery(query);

			while (resultSet.next()) {
				processModelFiles.add(new ProcessModel(resultSet.getString(1), resultSet.getString(2)));
			}

			resultSet.close();
			statement.close();
			connection.close();
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}

		return processModelFiles;
	}

	@Override
	public int[] saveSimilarProcessModels(List<ProcessModelSimilarity> similarModels) {
		Connection connection = getConnection();
		String query = "INSERT INTO process_model_similarity (Subject_Process_Model_ID, "
				+ "Object_Process_Model_ID, Process_Model_Similarity_Value) VALUES (?, ?, ?) "
				+ "ON DUPLICATE KEY UPDATE Process_Model_Similarity_Value = ?";
		int[] batchResults = null;

		try {
			connection.setAutoCommit(false);
			PreparedStatement statement = connection.prepareStatement(query);

			for (ProcessModelSimilarity row : similarModels) {
				if (row.getProcessModelSimilarityValue() >= Properties.MIN_SIMILARITY) {
					statement.setString(1, row.getSubjectProcessModelId());
					statement.setString(2, row.getObjectProcessModelId());
					statement.setDouble(3, row.getProcessModelSimilarityValue());
					statement.setDouble(4, row.getProcessModelSimilarityValue());
					statement.addBatch();
				}
			}

			batchResults = statement.executeBatch();
			connection.commit();
			statement.close();
			connection.close();
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}

		return batchResults;
	}

	@Override
	public List<ProcessModel> getSimilarProcessModels(String modelId) {
		Connection connection = getConnection();
		List<ProcessModel> similarModels = new ArrayList<ProcessModel>();
		String query = "SELECT process_model.Process_ID, Process_Name, Model_Type_Name, "
				+ "Process_Model_File_URL, Object_Process_Model_ID "
				+ "FROM process_model_similarity, process_model, process, model_type "
				+ "WHERE process_model_similarity.Object_Process_Model_ID = process_model.Process_Model_ID AND "
				+ "process_model.Process_ID = process.Process_ID AND "
				+ "process_model.Model_Type_ID = model_type.Model_Type_ID AND Subject_Process_Model_ID = ?";

		try {
			PreparedStatement statement = connection.prepareStatement(query);
			statement.setString(1, modelId);
			ResultSet resultSet = statement.executeQuery();

			while (resultSet.next()) {
				similarModels.add(new ProcessModel(resultSet.getString(1), resultSet.getString(2),
						resultSet.getString(3), resultSet.getString(4), resultSet.getString(5)));
			}

			resultSet.close();
			statement.close();
			connection.close();
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}

		return similarModels;
	}

	private Connection getConnection() {
		Connection connection = null;

		try {
			Class.forName("com.mysql.jdbc.Driver");
			connection = DriverManager.getConnection(HOST, USER, PASSWORD);
		} catch (ClassNotFoundException e) {
			throw new RuntimeException(e);
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}

		return connection;
	}
}
