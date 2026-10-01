import { projectService } from "../../projects/index.js";

class ProjectService {
	listProjects(options) {
		return projectService.listProjects({
			...options,
			includeUnpublished: true,
		});
	}

	getProjectStats() {
		return projectService.getProjectStats({
			includeUnpublished: true,
		});
	}

	getProjectById(projectId) {
		return projectService.getProjectById(projectId, {
			includeUnpublished: true,
		});
	}

	createProject(data) {
		return projectService.createProject(data);
	}

	updateProject(projectId, updates) {
		return projectService.updateProject(projectId, updates);
	}

	reorderProjects(orderedProjectIds) {
		return projectService.reorderProjects(orderedProjectIds);
	}

	deleteProject(projectId) {
		return projectService.deleteProject(projectId);
	}
}

export default new ProjectService();
