import { defineStore } from "pinia";
import { useMessageStore } from "./message-store";
import { useAuthStore } from "./auth-store";
import xpService from "../services/xpService";
import { Loading } from "quasar";

export const useXpStore = defineStore("xp", {
  state: () => ({ xps: [] }),
  actions: {
    async fetchXps() {
      const messageStore = useMessageStore();
      Loading.show();
      try {
        const authStore = useAuthStore();
        let response = await xpService.getXps(
          authStore.getCurrentUser?.token
        );
        this.xps = response.data;
      } catch (err) {
        if (err.response) {
          messageStore.showMessage(err);
        }
      }
      Loading.hide();
    },

    async createXp(data) {
      const messageStore = useMessageStore();
      Loading.show();
      try {
        const authStore = useAuthStore();
        let response = await xpService.postXp(
          authStore.getCurrentUser?.token,
          data
        );
        messageStore.showMessage({
          custom: true,
          statusText: response.statusText,
          status: response.status,
          message: "Xp created succefully",
          type: "positive",
        });
      } catch (err) {
        if (err.response) {
          messageStore.showMessage(err);
        }
      }
      Loading.hide();
    },

    async editXp(id, data) {
      const messageStore = useMessageStore();
      Loading.show();
      try {
        const authStore = useAuthStore();
        let response = await xpService.updateXp(
          authStore.getCurrentUser?.token,
          id,
          data
        );
        messageStore.showMessage({
          custom: true,
          statusText: response.statusText,
          status: response.status,
          message: "Xp updated succefully",
          type: "positive",
        });
      } catch (err) {
        if (err.response) {
          messageStore.showMessage(err);
        }
      }
      Loading.hide();
    },

    async deleteXp(id) {
      const messageStore = useMessageStore();
      Loading.show();
      try {
        const authStore = useAuthStore();
        let response = await xpService.delXp(
          authStore.getCurrentUser?.token,
          id
        );
        messageStore.showMessage({
          custom: true,
          statusText: response.statusText,
          status: response.status,
          message: "Xp deleted succefully",
          type: "positive",
        });
      } catch (err) {
        if (err.response) {
          messageStore.showMessage(err);
        }
      }
      Loading.hide();
    },

    clearXps() {
      this.xps = [];
    },
  },
});
