<template>
  <q-page>
    <div class="q-pa-md q-gutter-sm">
      <q-dialog v-model="show" transition-show="rotate" @hide="$emit('close')">
        <q-card :style="size === 'md' ? 'width: 600px' : 'width: 300px'">
          <q-card-section class="row items-center">
            <div class="text-h6">{{ $t(title) }}</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-separator />
          <q-form @submit="$emit('submit')" class="q-gutter-md" v-if="form">
            <q-card-section style="max-height: 50vh" class="scroll">
              <slot name="content"></slot>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
              <q-btn
                flat
                :label="$t(declineText)"
                :color="declineColor"
                v-close-popup
              />
              <q-btn
                :label="$t(submitText)"
                type="submit"
                :color="submitColor"
              />
            </q-card-actions>
          </q-form>

          <q-card-section style="max-height: 50vh" class="scroll" v-if="!form">
            <slot name="content"></slot>
          </q-card-section>

          <q-separator v-if="!form" />

          <q-card-actions align="right" v-if="!form">
            <q-btn
              flat
              :label="$t(declineText)"
              :color="declineColor"
              v-close-popup
            />
            <q-btn
              :label="$t(submitText)"
              :color="submitColor"
              @click="$emit('submit')"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "ModalVue",
  props: {
    showDialog: Boolean,
    title: String,
    form: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "md",
    },
    declineText: {
      type: String,
      default: "cancel",
    },
    declineColor: {
      type: String,
      default: "primary",
    },
    submitText: {
      type: String,
      default: "save",
    },
    submitColor: {
      type: String,
      default: "primary",
    },
  },
  setup(props) {
    const show = ref(false);

    watch(props, () => {
      show.value = props.showDialog;
    });

    return { show };
  },
};
</script>
