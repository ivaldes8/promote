<template>
  <q-page class="main">
    <div class="row">
      <div class="col-12">
        <q-img src="wave1.svg" class="img">
          <div class="absolute-center text-h2 text-center title">Promote</div>
        </q-img>
      </div>
      <div class="col-12">
        <q-img src="wave2.svg" class="img">
          <div class="absolute-center text-h5 text-center title">{{$t('aboutApp')}}</div>
        </q-img>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <q-img src="wave4.svg" class="img">
          <div class="absolute-center text-h6 text-center title">{{$t('aboutApp2')}}</div>
        </q-img>
      </div>
      <div class="col-12">
        <q-img src="wave3.svg" class="img">
          <div class="absolute-center text-h6 text-center title">{{$t('findMe')}}kaosolution8@gmail.com</div>
        </q-img>
      </div>
    </div>

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
<style scoped>
.img {
  height: 300px;
  border: none;
  margin-bottom: -1px;
  margin-top: -0.4px;

}
.title {
  border-radius: 10px;
  background-color: rgba(51, 153, 255, 0.5);
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}

.main {
  overflow: hidden;
}
</style>
