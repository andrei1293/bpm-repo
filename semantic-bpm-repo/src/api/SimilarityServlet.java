package api;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/api/similarity")
public class SimilarityServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("application/json");
		PrintWriter writer = response.getWriter();
		
		writer.print("[" + "{" + "\"processId\" : \"1\"," + "\"processName\" : \"Supply\","
				+ "\"modelType\" : \"BPMN\"," + "\"modelFile\" : \"supply.bpmn\"," + "\"modelId\" : \"1\"" + "}" + "]");
		writer.close();
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}
}
