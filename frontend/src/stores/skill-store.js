import { defineStore, storeToRefs } from "pinia";
import { useMessageStore } from "./message-store";
import { useAuthStore } from "./auth-store";
import skillService from "src/services/skillService";
import { Loading } from "quasar";

export const useSkillStore = defineStore("skill", {
  state: () => ({ skills: [] }),
  actions: {
    async fetchSkills() {
      const messageStore = useMessageStore();
      Loading.show();
      try {
        const authStore = useAuthStore();
        let response = await skillService.getSkills(
          authStore.getCurrentUser?.token
        );
        this.skills = response.data;
      } catch (err) {
        if (err.response) {
          messageStore.showMessage(err);
        }
      }
      Loading.hide();
    },

    async createSkill(data) {
      const messageStore = useMessageStore();
      Loading.show();
      try {
        const authStore = useAuthStore();
        let response = await skillService.postSkill(
          authStore.getCurrentUser?.token,
          data
        );
        messageStore.showMessage({
          custom: true,
          statusText: response.statusText,
          status: response.status,
          message: "Skill created succefully",
          type: "positive",
        });
      } catch (err) {
        if (err.response) {
          messageStore.showMessage(err);
        }
      }
      Loading.hide();
    },

    async editSkill(id, data) {
      const messageStore = useMessageStore();
      Loading.show();
      try {
        const authStore = useAuthStore();
        let response = await skillService.updateSkill(
          authStore.getCurrentUser?.token,
          id,
          data
        );
        messageStore.showMessage({
          custom: true,
          statusText: response.statusText,
          status: response.status,
          message: "Skill updated succefully",
          type: "positive",
        });
      } catch (err) {
        if (err.response) {
          messageStore.showMessage(err);
        }
      }
      Loading.hide();
    },

    async deleteSkill(id) {
      const messageStore = useMessageStore();
      Loading.show();
      try {
        const authStore = useAuthStore();
        let response = await skillService.delSkill(
          authStore.getCurrentUser?.token,
          id
        );
        messageStore.showMessage({
          custom: true,
          statusText: response.statusText,
          status: response.status,
          message: "Skill deleted succefully",
          type: "positive",
        });
      } catch (err) {
        if (err.response) {
          messageStore.showMessage(err);
        }
      }
      Loading.hide();
    },

    clearSkill() {
      this.skills = [];
    },
  },
});
