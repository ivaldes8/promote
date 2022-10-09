import { defineStore } from "pinia";
import { useMessageStore } from "./message-store";
import homeService from "../services/homeService";
import { Loading } from "quasar";

export const useHomeStore = defineStore("home", {
  state: () => ({ home: [] }),
  actions: {
    async fetchHome() {
      const messageStore = useMessageStore();
      Loading.show();
      try {
        let response = await homeService.getHome();
        if (!response.ok) {
          this.home = response.data.home[0];
          messageStore.showMessage({
            custom: true,
            statusText: response.statusText,
            status: response.status,
            message: "Home fetched succefully",
            type: "positive",
          });
        }
      } catch (err) {
        messageStore.showMessage(err);
      }
      Loading.hide();
    }
  },
});
