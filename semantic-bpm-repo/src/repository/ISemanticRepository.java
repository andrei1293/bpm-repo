package repository;

import org.apache.jena.rdf.model.Model;

public interface ISemanticRepository {
	void open();

	void close();

	void store(String name, Model model);

	Model get(String name);
}
