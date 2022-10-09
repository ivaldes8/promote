import { defineStore, storeToRefs } from "pinia";
import { useMessageStore } from "./message-store";
import { useAuthStore } from "./auth-store";
import profileService from "src/services/profileService";
import { Loading } from "quasar";

export const useProfileStore = defineStore("profile", {
  state: () => ({ profile: null, images: [] }),
  actions: {
    async fetchImages() {
      const messageStore = useMessageStore();
      Loading.show();
      try {
        const authStore = useAuthStore();
        let response = await profileService.getImages(
          authStore.getCurrentUser?.token
        );
        this.images = response.data;
      } catch (err) {
        if (err.response) {
          messageStore.showMessage(err);
        }
      }
      Loading.hide();
    },

    async createImage(data) {
      const messageStore = useMessageStore();
      Loading.show();
      try {
        const authStore = useAuthStore();
        let response = await profileService.postImage(
          authStore.getCurrentUser?.token,
          data
        );
        messageStore.showMessage({
          custom: true,
          statusText: response.statusText,
          status: response.status,
          message: "Profile image created succefully",
          type: "positive",
        });
      } catch (err) {
        if (err.response) {
          messageStore.showMessage(err);
        }
      }
      Loading.hide();
    },

    async editImage(id, data) {
      const messageStore = useMessageStore();
      Loading.show();
      try {
        const authStore = useAuthStore();
        let response = await profileService.updateImage(
          authStore.getCurrentUser?.token,
          id,
          data
        );
        messageStore.showMessage({
          custom: true,
          statusText: response.statusText,
          status: response.status,
          message: "Profile image updated succefully",
          type: "positive",
        });
      } catch (err) {
        if (err.response) {
          messageStore.showMessage(err);
        }
      }
      Loading.hide();
    },

    async deleteImage(id) {
      const messageStore = useMessageStore();
      Loading.show();
      try {
        const authStore = useAuthStore();
        let response = await profileService.delImage(
          authStore.getCurrentUser?.token,
          id
        );
        messageStore.showMessage({
          custom: true,
          statusText: response.statusText,
          status: response.status,
          message: "Profile image deleted succefully",
          type: "positive",
        });
      } catch (err) {
        if (err.response) {
          messageStore.showMessage(err);
        }
      }
      Loading.hide();
    },

    async fetchProfile() {
      const messageStore = useMessageStore();
      Loading.show();
      try {
        const authStore = useAuthStore();
        let response = await profileService.getProfile(
          authStore.getCurrentUser?.token
        );
        this.profile = response.data;
      } catch (err) {
        if (err.response) {
          messageStore.showMessage(err);
        }
      }
      Loading.hide();
    },

    async updateProfile(data) {
      const messageStore = useMessageStore();
      Loading.show();
      try {
        const authStore = useAuthStore();
        let response = await profileService.updateProfile(
          authStore.getCurrentUser?.token,
          data
        );

        this.profile = response.data;
        messageStore.showMessage({
          custom: true,
          statusText: response.statusText,
          status: response.status,
          message: "Profile updated succefully",
          type: "positive",
        });
      } catch (err) {
        if (err.response) {
          messageStore.showMessage(err);
        }
      }
      Loading.hide();
    },

    clearProfile() {
      this.profile = null;
      this.images = [];
    },
  },
});
