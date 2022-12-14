<template>
  <q-page>
    <DataTableVue
      title="infos"
      :rows="infos.info"
      :columns="infoColumns"
      @add="modalVisible = !modalVisible"
      @update="onAddInfo"
      @del="handleDeleteInfo"
      grid
      addable
      deleteable
      coolEdit
    />

    <ModalVue
      form
      v-show="modalVisible"
      :showDialog="modalVisible"
      title="addInfo"
      @close="modalVisible = false"
      @submit="onAddInfo"
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
      title="deleteInfo"
      @submit="submitDelInfo"
    />
  </q-page>
</template>

<script>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useInfoStore } from "../stores/info-store";
import DataTableVue from "src/components/DataTable.vue";
import ModalVue from "src/components/Modal.vue";
import DeleteModal from "src/components/DeleteModal.vue";

export default {
  name: "InfosPage",
  components: { DataTableVue, ModalVue, DeleteModal },
  setup() {
    const infoStore = useInfoStore();
    const { fetchInfos, createInfo, editInfo, deleteInfo } =
      infoStore;
    const { infos } = storeToRefs(infoStore);
    const form = ref({});
    const modalVisible = ref(false);
    const alertVisible = ref(false);
    const toDelete = ref(null);
    const infoColumns = [
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
      await fetchInfos();
    };

    onMounted(async () => {
      await load();
    });

    const onAddInfo = async (data) => {
      if (data) {
        await editInfo(data._id, data.row);
      } else {
        const toSend = {
          name: form.value.name,
          desc: form.value.desc,
        };
        await createInfo(toSend);
      }
      await load();
      modalVisible.value = false;
    };

    const handleDeleteInfo = (val) => {
      toDelete.value = val;
      alertVisible.value = true;
    };

    const submitDelInfo = async () => {
      await deleteInfo(toDelete.value);
      toDelete.value = null;
      await load();
      alertVisible.value = false;
    };

    return {
      infos,
      infoColumns,
      onAddInfo,
      handleDeleteInfo,
      submitDelInfo,
      alertVisible,
      modalVisible,
      form,
    };
  },
};
</script>
