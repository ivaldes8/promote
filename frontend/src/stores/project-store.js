import { defineStore } from "pinia";
import { useMessageStore } from "./message-store";
import { useAuthStore } from "./auth-store";
import projectService from "../services/projectService";
import { Loading } from "quasar";

export const useProjectStore = defineStore("project", {
  state: () => ({ projects: [] }),
  actions: {
    async fetchProjects() {
      const messageStore = useMessageStore();
      Loading.show();
      try {
        const authStore = useAuthStore();
        let response = await projectService.getProjects(
          authStore.getCurrentUser?.token
        );
        this.projects = response.data;
      } catch (err) {
        if (err.response) {
          messageStore.showMessage(err);
        }
      }
      Loading.hide();
    },

    async createProject(data) {
      const messageStore = useMessageStore();
      Loading.show();
      try {
        const authStore = useAuthStore();
        let response = await projectService.postProject(
          authStore.getCurrentUser?.token,
          data
        );
        messageStore.showMessage({
          custom: true,
          statusText: response.statusText,
          status: response.status,
          message: "Project created succefully",
          type: "positive",
        });
      } catch (err) {
        if (err.response) {
          messageStore.showMessage(err);
        }
      }
      Loading.hide();
    },

    async editProject(id, data) {
      const messageStore = useMessageStore();
      Loading.show();
      try {
        const authStore = useAuthStore();
        let response = await projectService.updateProject(
          authStore.getCurrentUser?.token,
          id,
          data
        );
        messageStore.showMessage({
          custom: true,
          statusText: response.statusText,
          status: response.status,
          message: "Project updated succefully",
          type: "positive",
        });
      } catch (err) {
        if (err.response) {
          messageStore.showMessage(err);
        }
      }
      Loading.hide();
    },

    async deleteProject(id) {
      const messageStore = useMessageStore();
      Loading.show();
      try {
        const authStore = useAuthStore();
        let response = await projectService.delProject(
          authStore.getCurrentUser?.token,
          id
        );
        messageStore.showMessage({
          custom: true,
          statusText: response.statusText,
          status: response.status,
          message: "Project deleted succefully",
          type: "positive",
        });
      } catch (err) {
        if (err.response) {
          messageStore.showMessage(err);
        }
      }
      Loading.hide();
    },

    clearProjects() {
      this.projects = [];
    },
  },
});
