import { defineStore, storeToRefs } from "pinia";
import { useMessageStore } from "./message-store";
import { useAuthStore } from "./auth-store";
import aboutService from "src/services/aboutService";
import { Loading } from "quasar";

export const useAboutStore = defineStore("about", {
  state: () => ({ abouts: [] }),
  actions: {
    async fetchAbouts() {
      const messageStore = useMessageStore();
      Loading.show();
      try {
        const authStore = useAuthStore();
        let response = await aboutService.getAbouts(
          authStore.getCurrentUser?.token
        );
        this.abouts = response.data;
      } catch (err) {
        if (err.response) {
          messageStore.showMessage(err);
        }
      }
      Loading.hide();
    },

    async createAbout(data) {
      const messageStore = useMessageStore();
      Loading.show();
      try {
        const authStore = useAuthStore();
        let response = await aboutService.postAbout(
          authStore.getCurrentUser?.token,
          data
        );
        messageStore.showMessage({
          custom: true,
          statusText: response.statusText,
          status: response.status,
          message: "About created succefully",
          type: "positive",
        });
      } catch (err) {
        if (err.response) {
          messageStore.showMessage(err);
        }
      }
      Loading.hide();
    },

    async editAbout(id, data) {
      const messageStore = useMessageStore();
      Loading.show();
      try {
        const authStore = useAuthStore();
        let response = await aboutService.updateAbout(
          authStore.getCurrentUser?.token,
          id,
          data
        );
        messageStore.showMessage({
          custom: true,
          statusText: response.statusText,
          status: response.status,
          message: "About updated succefully",
          type: "positive",
        });
      } catch (err) {
        if (err.response) {
          messageStore.showMessage(err);
        }
      }
      Loading.hide();
    },

    async deleteAbout(id) {
      const messageStore = useMessageStore();
      Loading.show();
      try {
        const authStore = useAuthStore();
        let response = await aboutService.delAbout(
          authStore.getCurrentUser?.token,
          id
        );
        messageStore.showMessage({
          custom: true,
          statusText: response.statusText,
          status: response.status,
          message: "About deleted succefully",
          type: "positive",
        });
      } catch (err) {
        if (err.response) {
          messageStore.showMessage(err);
        }
      }
      Loading.hide();
    },

    clearAbout() {
      this.abouts = [];
    },
  },
});
