import { defineStore } from 'pinia';
import { ref, computed } from 'vue'

export const useMessageStore = defineStore('message', () => {

  const message = ref('')
  const caption = ref('')
  const status = ref('')
  const type = ref('success')
  const show = ref(false)


  function showMessage(msg, sts, cap, t) {
    show.value = true
    message.value = msg
    caption.value = cap,
    status.value = sts
    type.value = t === 'alert' ? 'negative' : t === 'success' ? 'positive' : 'warning'
  }

  function hideMessage() {
    show.value = false
    message.value = ''
    caption.value = ''
    status.value = ''
    type.value = 'success'
  }

  return { show, type, message, status, caption, showMessage, hideMessage }
})
