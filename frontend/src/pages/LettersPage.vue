<template>
  <q-page>
    <div class="q-pa-md q-gutter-sm">
      <q-btn label="Fixed size" color="primary" @click="fixed = !fixed" />

      <q-btn
        label="FAlert"
        color="primary"
        @click="alertVisible = !alertVisible"
      />

      <ModalVue v-show="fixed"
        :showDialog="fixed"
        title="skills"
        @close="handleClose"
        @submit="submit"
      >
        <template v-slot:content>
          <p v-for="n in 15" :key="n">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
            perferendis totam, ea at omnis vel numquam exercitationem aut, natus
            minima, porro labore.
          </p>
        </template>
      </ModalVue>

      <DeleteModal v-show="alertVisible"
        @close="handleCloseDel"
        :showDialog="alertVisible"
        title="deleteSkill"
        element="PHP"
        @submit="submitDel"
      />
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import ModalVue from "src/components/Modal.vue";
import DeleteModal from "src/components/DeleteModal.vue";

export default {
  name: "LettersPage",
  components: { ModalVue, DeleteModal },
  setup() {
    const fixed = ref(false);
    const alertVisible = ref(false);

    const handleClose = () => {
      fixed.value = false;
    };

    const submit = () => {
      console.log("Submit");
      fixed.value = false;
    };

    const handleCloseDel = () => {
      alertVisible.value = false;
    };

    const submitDel = () => {
      console.log("SubmitDel");
      alertVisible.value = false;
    };

    return {
      fixed,
      alertVisible,
      submit,
      handleClose,
      handleCloseDel,
      submitDel,
    };
  },
};
</script>
