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
import { useMessageStore } from "src/stores/message-store";

export default {
  name: "ProfilePage",
  setup() {
    const store = useMessageStore();
    const { showMessage } = store;
    console.log(process.env.API, "API");

    const load = async () => {
      try {
        let data = await api.get("home");
        if (!data.ok) {
          showMessage("success", "success");
        }
        console.log(data, "DATA");
      } catch (error) {
        console.log(error, "ERROR");
        showMessage("success", "alert");
      }
    };

    return { load };
  },
};
</script>
