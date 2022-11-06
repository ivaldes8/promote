<template>
  <q-page>
    <DataTableVue
      title="abouts"
      :rows="abouts.about"
      :columns="aboutColumns"
      @add="modalVisible = !modalVisible"
      @update="onAddAbout"
      @del="handleDeleteAbout"
      grid
      addable
      deleteable
      coolEdit
    />



    <ModalVue
      form
      v-show="modalVisible"
      :showDialog="modalVisible"
      title="addAbout"
      @close="modalVisible = false"
      @submit="onAddAbout"
    >
      <template v-slot:content>
        <q-input
          filled
          v-model="form.desc"
          type="textarea"
          :label="$t('about')"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || $t('required')]"
        />
      </template>
    </ModalVue>

    <DeleteModal
      v-show="alertVisible"
      @close="alertVisible = false"
      :showDialog="alertVisible"
      title="deleteAbout"
      @submit="submitDelAbout"
    />
  </q-page>
</template>

<script>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useAboutStore } from "../stores/about-store";
import DataTableVue from "src/components/DataTable.vue";
import ModalVue from "src/components/Modal.vue";
import DeleteModal from "src/components/DeleteModal.vue";

export default {
  name: "AboutsPage",
  components: { DataTableVue, ModalVue, DeleteModal },
  setup() {
    const aboutStore = useAboutStore();
    const { fetchAbouts, createAbout, editAbout, deleteAbout } = aboutStore;
    const { abouts } = storeToRefs(aboutStore);
    const form = ref({});
    const modalVisible = ref(false);
    const alertVisible = ref(false);
    const toDelete = ref(null);
    const aboutColumns = [
      {
        name: "desc",
        label: "about",
        field: "desc",
        type: "textarea",
        long: true,
        required: true,
        sortable: true,
        updateText: "updateAbout",
        align: "left",
      },
      {
        name: "actions",
        label: "actions",
        align: "center",
      },
    ];

    const load = async () => {
      await fetchAbouts();
    };

    onMounted(async () => {
      await load();
    });

    const onAddAbout = async (data) => {
      if (data) {
        await editAbout(data._id, data.row);
      } else {
        const toSend = {
          desc: form.value.desc,
        };
        await createAbout(toSend);
      }
      await load();
      modalVisible.value = false;
    };

    const handleDeleteAbout = (val) => {
      toDelete.value = val;
      alertVisible.value = true;
    };

    const submitDelAbout = async () => {
      await deleteAbout(toDelete.value);
      toDelete.value = null;
      await load();
      alertVisible.value = false;
    };

    return {
      abouts,
      aboutColumns,
      onAddAbout,
      handleDeleteAbout,
      submitDelAbout,
      alertVisible,
      modalVisible,
      form,
      text: 'asdasdas'
    };
  },
};
</script>
