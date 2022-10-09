<template>
  <q-page>
    <div class="q-pa-md q-gutter-sm">
      <!-- <q-btn label="Fixed size" color="primary" @click="fixed = !fixed" /> -->
      <ModalVue
        :showDialog="visible"
        :title="title"
        @close="$emit('close')"
        @submit="$emit('submit')"
        submitText="delete"
        submitColor="red"
      >
        <template v-slot:content>
          <q-card bordered class="text-white bg-red-4">
            <q-card-section>
              <div style="font-size: 130%;">
                <q-icon color="white" size="1.5em" name="report" />
                {{ $t("areYouSure") }}
                <div class="text-h6 text-center" v-if="element">
                  <q-chip
                    color="red"
                    text-color="white"
                    icon="warning"
                    :label="element"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </template>
      </ModalVue>
    </div>
  </q-page>
</template>

<script>
import { ref, watch } from "vue";
import ModalVue from "./Modal.vue";

export default {
  name: "DeleteModal",
  components: { ModalVue },
  props: {
    title: {
      type: String,
      default: "deleteItem",
    },
    element: {
      type: String,
      default: null,
    },
    showDialog: Boolean,
  },
  setup(props) {
    const visible = ref(false);

    const handleClose = () => {
      fixed.value = false;
    };

    const submit = () => {
      console.log("Submit");
      fixed.value = false;
    };

    watch(props, () => {
      visible.value = props.showDialog;
    });

    return {
      visible,
      submit,
      handleClose,
    };
  },
};
</script>
