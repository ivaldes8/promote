<template>
  <q-page class="">
    <h1>Home</h1>
    <h3>{{ name }}/{{ count }}/{{ doubleCount }}</h3>
    <button @click="increment">Increment</button>
    <button @click="load">Load data</button>
    {{ home }}
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    />
  </q-page>
</template>

<script>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useCounterStore } from "src/stores/example-store";
import { useHomeStore } from "src/stores/home-store";
import { useAuthStore } from "src/stores/auth-store";

export default {
  name: "HomePage",
  setup() {
    const store = useCounterStore();
    // `name` and `doubleCount` are reactive refs
    // This will also create refs for properties added by plugins
    // but skip any action or non reactive (non ref/reactive) property
    const { name, count, doubleCount } = storeToRefs(store);
    // the increment action can be just extracted
    const { increment } = store;

    const homeStore = useHomeStore();
    const { fetchHome } = homeStore;
    const { home } = storeToRefs(homeStore);

    const authStore = useAuthStore();
    const { user } = authStore;

    const load = async () => {
      await fetchHome();
    };

    onMounted(async () => {
      await load();
    });

    return {
      name,
      count,
      doubleCount,
      increment,
      home,
      user,
      load,
    };
  },
};
</script>
