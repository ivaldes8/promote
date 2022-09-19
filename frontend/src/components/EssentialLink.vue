<template>
  <q-item :to="to" exact :active-class="!dark ? 'bg-indigo-2' : 'bg-blue-grey-10'">

    <q-item-section avatar>
      <q-avatar color="light-blue" :icon="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ $t(title) }}</q-item-label>
      <q-item-label caption>{{ $t(caption) }}</q-item-label>
    </q-item-section>

  </q-item>
  <q-separator v-if="separator" />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    to: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },

    dark: {
      type: Boolean,
      default: false
    },

    separator: {
      type: Boolean,
      default: false
    }
  }
})
</script>
