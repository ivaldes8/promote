import { defineStore } from "pinia";
import { useMessageStore } from "./message-store";
import { useProfileStore } from "./profile-store";
import authService from "../services/authService";

import { Loading } from "quasar";

export const useAuthStore = defineStore("auth", {
  state: () => ({ user: null }),
  getters: {
    getCurrentUser: (state) => state.user,
  },
  actions: {
    async Login(data) {
      const messageStore = useMessageStore();

      Loading.show();
      try {
        let response = await authService.login(data);
        this.user = response.data;
        localStorage.setItem("promote",  JSON.stringify(this.user));
        this.router.push({ name: "Home" });
      } catch (err) {
        console.log(err, "Error");
        messageStore.showMessage(err);
      }
      Loading.hide();
    },

    async Register(data) {
      const messageStore = useMessageStore();

      Loading.show();
      try {
        let response = await authService.register(data);
        this.user = response.data;
        this.router.push({ name: "Home" });
      } catch (err) {
        messageStore.showMessage(err);
      }
      Loading.hide();
    },

    Logout() {
      const profileStore = useProfileStore();
      this.user = null;
      profileStore.clearProfile()
      this.router.push({ name: "Home" });
    },
  },
  persist: true,
});
