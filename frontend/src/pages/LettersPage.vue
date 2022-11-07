<template>
  <q-page>
    <DataTableVue
      title="letters"
      :rows="letters.letter"
      :columns="letterColumns"
      @add="modalVisible = !modalVisible"
      @update="onAddLetter"
      @del="handleDeleteLetter"
      grid
      addable
      deleteable
      coolEdit
    />

    <ModalVue
      form
      v-show="modalVisible"
      :showDialog="modalVisible"
      title="addLetter"
      @close="modalVisible = false"
      @submit="onAddLetter"
    >
      <template v-slot:content>
        <q-input
          filled
          v-model="form.name"
          :label="$t('name')"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || $t('required')]"
        />

        <q-input
          filled
          v-model="form.desc"
          :label="$t('desc')"
          type="textarea"
        />
      </template>
    </ModalVue>

    <DeleteModal
      v-show="alertVisible"
      @close="alertVisible = false"
      :showDialog="alertVisible"
      title="deleteLetter"
      @submit="submitDelLetter"
    />
  </q-page>
</template>

<script>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useLetterStore } from "../stores/letter-store";
import DataTableVue from "src/components/DataTable.vue";
import ModalVue from "src/components/Modal.vue";
import DeleteModal from "src/components/DeleteModal.vue";

export default {
  name: "LettersPage",
  components: { DataTableVue, ModalVue, DeleteModal },
  setup() {
    const letterStore = useLetterStore();
    const { fetchLetters, createLetter, editLetter, deleteLetter } =
      letterStore;
    const { letters } = storeToRefs(letterStore);
    const form = ref({});
    const modalVisible = ref(false);
    const alertVisible = ref(false);
    const toDelete = ref(null);
    const letterColumns = [
      {
        name: "name",
        label: "name",
        field: "name",
        type: "text",
        required: true,
        sortable: true,
        updateText: "updateName",
        align: "left",
      },
      {
        name: "desc",
        label: "desc",
        field: "desc",
        type: "textarea",
        long: true,
        sortable: true,
        updateText: "updateDesc",
        align: "left",
      },
      {
        name: "actions",
        label: "actions",
        align: "center",
      },
    ];

    const load = async () => {
      await fetchLetters();
    };

    onMounted(async () => {
      await load();
    });

    const onAddLetter = async (data) => {
      if (data) {
        await editLetter(data._id, data.row);
      } else {
        const toSend = {
          name: form.value.name,
          desc: form.value.desc,
        };
        await createLetter(toSend);
      }
      await load();
      modalVisible.value = false;
    };

    const handleDeleteLetter = (val) => {
      toDelete.value = val;
      alertVisible.value = true;
    };

    const submitDelLetter = async () => {
      await deleteLetter(toDelete.value);
      toDelete.value = null;
      await load();
      alertVisible.value = false;
    };

    return {
      letters,
      letterColumns,
      onAddLetter,
      handleDeleteLetter,
      submitDelLetter,
      alertVisible,
      modalVisible,
      form,
    };
  },
};
</script>
