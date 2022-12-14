<template>
  <q-page>
    <DataTableVue
      title="experiences"
      :rows="xps.exp"
      :columns="xpColumns"
      @add="modalVisible = !modalVisible"
      @update="onAddXp"
      @del="handleDeleteXp"
      grid
      addable
      deleteable
      coolEdit
    />

    <ModalVue
      form
      v-show="modalVisible"
      :showDialog="modalVisible"
      title="addXp"
      @close="modalVisible = false"
      @submit="onAddXp"
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
      title="deleteXp"
      @submit="submitDelXp"
    />
  </q-page>
</template>

<script>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useXpStore } from "../stores/xp-store";
import DataTableVue from "src/components/DataTable.vue";
import ModalVue from "src/components/Modal.vue";
import DeleteModal from "src/components/DeleteModal.vue";

export default {
  name: "XpsPage",
  components: { DataTableVue, ModalVue, DeleteModal },
  setup() {
    const xpStore = useXpStore();
    const { fetchXps, createXp, editXp, deleteXp } =
      xpStore;
    const { xps } = storeToRefs(xpStore);
    const form = ref({});
    const modalVisible = ref(false);
    const alertVisible = ref(false);
    const toDelete = ref(null);
    const xpColumns = [
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
      await fetchXps();
    };

    onMounted(async () => {
      await load();
    });

    const onAddXp = async (data) => {
      if (data) {
        await editXp(data._id, data.row);
      } else {
        const toSend = {
          name: form.value.name,
          desc: form.value.desc,
        };
        await createXp(toSend);
      }
      await load();
      modalVisible.value = false;
    };

    const handleDeleteXp = (val) => {
      toDelete.value = val;
      alertVisible.value = true;
    };

    const submitDelXp = async () => {
      await deleteXp(toDelete.value);
      toDelete.value = null;
      await load();
      alertVisible.value = false;
    };

    return {
      xps,
      xpColumns,
      onAddXp,
      handleDeleteXp,
      submitDelXp,
      alertVisible,
      modalVisible,
      form,
    };
  },
};
</script>
