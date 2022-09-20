import { defineStore } from 'pinia';
import { ref, computed } from 'vue'

export const useHomeStore = defineStore('home', () => {

  const home = ref([])

  function showMessage(msg, t) {
    show.value = true
    message.value = msg
    type.value = t === 'alert' ? 'negative' : t === 'success' ? 'positive' : 'warning'
  }

  function hideMessage() {
    show.value = false
    message.value = ''
    type.value = 'success'
  }

  return { show, type, message, showMessage, hideMessage }
})
