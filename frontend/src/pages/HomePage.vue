<template>
  <q-page class="main">
    <div class="circle xxlargeTop shade1" />
    <div class="circle xlargeTop shade2" />
    <div class="circle largeTop shade3" />
    <div class="circle smallTop shade5" />

    <div class="circle xxlargeBottom shade1" />
    <div class="circle xlargeBottom shade2" />
    <div class="circle largeBottom shade3" />
    <div class="circle smallBottom shade5" />

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

.circle {
  position: absolute;
  border-radius: 100%;
  background: rgba(0, 119, 255, 0.884);
  animation: ripple 15s infinite;
  box-shadow: 0px 0px 1px 0px #508fb9;
}

.smallTop {
  width: 10vw;
  height: 10vw;
  left: -5%;
  top: 20vw;
}

.largeTop {
  width: 20vw;
  height: 20vw;
  left: -10%;
  top: 14vw;
}

.xlargeTop {
  width: 40vw;
  height: 40vw;
  left: -20%;
  top: 2vw;
}

.xxlargeTop {
  width: 80vw;
  height: 80vw;
  left: -30%;
  top: -20vw;
}

.smallBottom {
  width: 10vw;
  height: 10vw;
  right: -5%;
  bottom: 20vw;
}

.largeBottom {
  width: 20vw;
  height: 20vw;
  right: -10%;
  bottom: 14vw;
}

.xlargeBottom {
  width: 40vw;
  height: 40vw;
  right: -20%;
  bottom: 2vw;
}

.xxlargeBottom {
  width: 80vw;
  height: 80vw;
  right: -30%;
  bottom: -20vw;
}

.shade1 {
  opacity: 0.2;
}
.shade2 {
  opacity: 0.5;
}

.shade3 {
  opacity: 0.7;
}

.shade4 {
  opacity: 0.8;
}

.shade5 {
  opacity: 0.9;
}

@keyframes ripple {
  0% {
    transform: scale(0.8);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(0.8);
  }
}
</style>
