package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import entity.ProcessModel;
import service.JaccardSimilarityService;
import service.SimilarityService;

@WebServlet("/api/similarity")
public class SimilarityServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private SimilarityService similarityService = new JaccardSimilarityService();

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String modelId = request.getParameter("modelId");
		similarityService.defineSimilarModels(modelId);
		List<ProcessModel> similarModels = similarityService.getSimilarProcessModelsList(modelId);
		response.setContentType("application/json");
		PrintWriter writer = response.getWriter();
		writer.print("[");
		int counter = 0;

		for (ProcessModel model : similarModels) {
			writer.printf(
					"{\"processId\" : \"%s\",\"processName\" : \"%s\",\"modelType\" : \"%s\","
							+ "\"modelFile\" : \"%s\",\"modelId\" : \"%s\"}",
					model.getProcessId(), model.getProcessName(), model.getModelType(), model.getModelFile(),
					model.getModelId());

			if (counter < similarModels.size() - 1) {
				writer.print(",");
			}

			counter++;
		}

		writer.print("]");
		writer.close();
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}
}
