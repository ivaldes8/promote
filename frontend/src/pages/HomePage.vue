<template>
  <q-page class="">
    <h1>Home</h1>
    <h3>{{name}}/{{count}}/{{doubleCount}}</h3>
    <button @click="increment">Increment</button>
    <img alt="Quasar logo" src="~assets/quasar-logo-vertical.svg" style="width: 200px; height: 200px">
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCounterStore } from 'src/stores/example-store'

export default {
  name: 'HomePage',
  setup() {
    const store = useCounterStore()
    // `name` and `doubleCount` are reactive refs
    // This will also create refs for properties added by plugins
    // but skip any action or non reactive (non ref/reactive) property
    const { name, count, doubleCount } = storeToRefs(store)
    // the increment action can be just extracted
    const { increment } = store

    return {
      name,
      count,
      doubleCount,
      increment,
    }
  },
}
</script>
