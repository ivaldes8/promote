import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useMessageStore = defineStore("message", () => {
  const message = ref("");
  const caption = ref("");
  const status = ref("");
  const type = ref("positive");
  const show = ref(false);


  function showMessage(err) {
    show.value = true;
    if (err.response) {
      message.value = err.response.statusText ? err.response.statusText : "";
      status.value = err.response.status ? err.response.status : "";
      caption.value =
        err.response.data && err.response.data.message
          ? err.response.data.message
          : "";
      type.value = "negative";
    } else if (err.custom) {
      message.value = err.statusText ? err.statusText : "";
      status.value = err.status ? err.status : "";
      caption.value = err.message ? err.message : "";
      type.value = err.type;
    } else {
      message.value = "Internal server error";
      status.value = 500;
      caption.value = "Opps there was an error";
      type.value = "negative";
    }
  }

  function hideMessage() {
    show.value = false;
    message.value = "";
    caption.value = "";
    status.value = "";
    type.value = "positive";
  }

  return { show, type, message, status, caption, showMessage, hideMessage };
});
