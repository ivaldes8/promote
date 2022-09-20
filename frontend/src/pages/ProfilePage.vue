<template>
  <q-page class="flex flex-center">
    <h1>Profile</h1>
    <button @click="load">Load data</button>
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    />
  </q-page>
</template>

<script>
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";
import { useMessageStore } from "src/stores/message-store";

export default {
  name: "ProfilePage",
  setup() {
    const $q = useQuasar();
    const store = useMessageStore();
    const { showMessage } = store;
    console.log(process.env.API, "API");

    const load = async () => {
      $q.loading.show();
      try {
        let data = await api.get("profile");
        if (!data.ok) {
          showMessage("success", "success");
        }
      } catch (err) {
        showMessage(
          err.response.statusText ? err.response.statusText : "",
          err.response.status ? err.response.status : "",
          err.response.data && err.response.data.message
            ? err.response.data.message
            : "",
          "alert"
        );
      }
      $q.loading.hide();
    };

    return { load };
  },
};
</script>
