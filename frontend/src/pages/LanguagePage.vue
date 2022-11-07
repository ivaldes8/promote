<template>
  <q-page>
    <DataTableVue
      title="languages"
      :rows="langs.language"
      :columns="langColumns"
      @add="modalVisible = !modalVisible"
      @update="onAddLang"
      @del="handleDeleteLang"
      grid
      addable
      deleteable
      coolEdit
    />

    <ModalVue
      form
      v-show="modalVisible"
      :showDialog="modalVisible"
      title="addLang"
      @close="modalVisible = false"
      @submit="onAddLang"
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
      title="deleteLang"
      @submit="submitDelLang"
    />
  </q-page>
</template>

<script>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useLangStore } from "../stores/language-store";
import DataTableVue from "src/components/DataTable.vue";
import ModalVue from "src/components/Modal.vue";
import DeleteModal from "src/components/DeleteModal.vue";

export default {
  name: "LanguagesPage",
  components: { DataTableVue, ModalVue, DeleteModal },
  setup() {
    const langStore = useLangStore();
    const { fetchLangs, createLang, editLang, deleteLang } =
      langStore;
    const { langs } = storeToRefs(langStore);
    const form = ref({});
    const modalVisible = ref(false);
    const alertVisible = ref(false);
    const toDelete = ref(null);
    const langColumns = [
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
      await fetchLangs();
    };

    onMounted(async () => {
      await load();
    });

    const onAddLang = async (data) => {
      if (data) {
        await editLang(data._id, data.row);
      } else {
        const toSend = {
          name: form.value.name,
          desc: form.value.desc,
        };
        await createLang(toSend);
      }
      await load();
      modalVisible.value = false;
    };

    const handleDeleteLang = (val) => {
      toDelete.value = val;
      alertVisible.value = true;
    };

    const submitDelLang = async () => {
      await deleteLang(toDelete.value);
      toDelete.value = null;
      await load();
      alertVisible.value = false;
    };

    return {
      langs,
      langColumns,
      onAddLang,
      handleDeleteLang,
      submitDelLang,
      alertVisible,
      modalVisible,
      form,
    };
  },
};
</script>
