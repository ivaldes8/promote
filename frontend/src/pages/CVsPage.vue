<template>
  <q-page class="flex flex-center">
    <h1>CVS</h1>
    <button @click="showMessage('success', 'warning')">Show Alert</button>
    <img alt="Quasar logo" src="~assets/quasar-logo-vertical.svg" style="width: 200px; height: 200px">
  </q-page>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useMessageStore } from 'src/stores/message-store';

export default {
  name: 'CVS',
  setup() {
    const store = useMessageStore()
    const { showMessage } = store
    // `name` and `doubleCount` are reactive refs
    // This will also create refs for properties added by plugins
    // but skip any action or non reactive (non ref/reactive) property
    const { message, type, show } = storeToRefs(store)
    // the increment action can be just extracted

    return {
      showMessage
    }
  }
}
</script>
