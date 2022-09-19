<template>
  <q-route-tab style="width:50%" :to="to" exact :name="$t(title)" :icon="icon" />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FooterLink',
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
  }
})
</script>
