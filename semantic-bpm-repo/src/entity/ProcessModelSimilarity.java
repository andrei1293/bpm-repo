package entity;

public class ProcessModelSimilarity {
	private String subjectProcessModelId;
	private String objectProcessModelId;
	private double processModelSimilarityValue;

	public ProcessModelSimilarity(String subjectProcessModelId, String objectProcessModelId,
			double processModelSimilarityValue) {
		super();
		this.subjectProcessModelId = subjectProcessModelId;
		this.objectProcessModelId = objectProcessModelId;
		this.processModelSimilarityValue = processModelSimilarityValue;
	}

	public String getSubjectProcessModelId() {
		return subjectProcessModelId;
	}

	public void setSubjectProcessModelId(String subjectProcessModelId) {
		this.subjectProcessModelId = subjectProcessModelId;
	}

	public String getObjectProcessModelId() {
		return objectProcessModelId;
	}

	public void setObjectProcessModelId(String objectProcessModelId) {
		this.objectProcessModelId = objectProcessModelId;
	}

	public double getProcessModelSimilarityValue() {
		return processModelSimilarityValue;
	}

	public void setProcessModelSimilarityValue(double processModelSimilarityValue) {
		this.processModelSimilarityValue = processModelSimilarityValue;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((objectProcessModelId == null) ? 0 : objectProcessModelId.hashCode());
		long temp;
		temp = Double.doubleToLongBits(processModelSimilarityValue);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + ((subjectProcessModelId == null) ? 0 : subjectProcessModelId.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ProcessModelSimilarity other = (ProcessModelSimilarity) obj;
		if (objectProcessModelId == null) {
			if (other.objectProcessModelId != null)
				return false;
		} else if (!objectProcessModelId.equals(other.objectProcessModelId))
			return false;
		if (Double.doubleToLongBits(processModelSimilarityValue) != Double
				.doubleToLongBits(other.processModelSimilarityValue))
			return false;
		if (subjectProcessModelId == null) {
			if (other.subjectProcessModelId != null)
				return false;
		} else if (!subjectProcessModelId.equals(other.subjectProcessModelId))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "ProcessModelSimilarity [subjectProcessModelId=" + subjectProcessModelId + ", objectProcessModelId="
				+ objectProcessModelId + ", processModelSimilarityValue=" + processModelSimilarityValue + "]";
	}
}
