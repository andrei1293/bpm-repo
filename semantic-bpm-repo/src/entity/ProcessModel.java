package entity;

public class ProcessModel {
	private String processId;
	private String processName;
	private String modelType;
	private String modelFile;
	private String modelId;

	public ProcessModel(String processId, String processName, String modelType, String modelFile, String modelId) {
		super();
		this.processId = processId;
		this.processName = processName;
		this.modelType = modelType;
		this.modelFile = modelFile;
		this.modelId = modelId;
	}

	public String getProcessId() {
		return processId;
	}

	public void setProcessId(String processId) {
		this.processId = processId;
	}

	public String getProcessName() {
		return processName;
	}

	public void setProcessName(String processName) {
		this.processName = processName;
	}

	public String getModelType() {
		return modelType;
	}

	public void setModelType(String modelType) {
		this.modelType = modelType;
	}

	public String getModelFile() {
		return modelFile;
	}

	public void setModelFile(String modelFile) {
		this.modelFile = modelFile;
	}

	public String getModelId() {
		return modelId;
	}

	public void setModelId(String modelId) {
		this.modelId = modelId;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((modelFile == null) ? 0 : modelFile.hashCode());
		result = prime * result + ((modelId == null) ? 0 : modelId.hashCode());
		result = prime * result + ((modelType == null) ? 0 : modelType.hashCode());
		result = prime * result + ((processId == null) ? 0 : processId.hashCode());
		result = prime * result + ((processName == null) ? 0 : processName.hashCode());
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
		ProcessModel other = (ProcessModel) obj;
		if (modelFile == null) {
			if (other.modelFile != null)
				return false;
		} else if (!modelFile.equals(other.modelFile))
			return false;
		if (modelId == null) {
			if (other.modelId != null)
				return false;
		} else if (!modelId.equals(other.modelId))
			return false;
		if (modelType == null) {
			if (other.modelType != null)
				return false;
		} else if (!modelType.equals(other.modelType))
			return false;
		if (processId == null) {
			if (other.processId != null)
				return false;
		} else if (!processId.equals(other.processId))
			return false;
		if (processName == null) {
			if (other.processName != null)
				return false;
		} else if (!processName.equals(other.processName))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "ProcessModel [processId=" + processId + ", processName=" + processName + ", modelType=" + modelType
				+ ", modelFile=" + modelFile + ", modelId=" + modelId + "]";
	}
}
