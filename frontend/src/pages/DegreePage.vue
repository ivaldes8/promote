<template>
  <q-page>
    <DataTableVue
      title="degrees"
      :rows="degrees.degree"
      :columns="degreeColumns"
      @add="modalVisible = !modalVisible"
      @update="onAddDegree"
      @del="handleDeleteDegree"
      grid
      addable
      deleteable
      coolEdit
    />

    <ModalVue
      form
      v-show="modalVisible"
      :showDialog="modalVisible"
      title="addDegree"
      @close="modalVisible = false"
      @submit="onAddDegree"
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
      title="deleteDegree"
      @submit="submitDelDegree"
    />
  </q-page>
</template>

<script>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useDegreeStore } from "../stores/degree-store";
import DataTableVue from "src/components/DataTable.vue";
import ModalVue from "src/components/Modal.vue";
import DeleteModal from "src/components/DeleteModal.vue";

export default {
  name: "DegreesPage",
  components: { DataTableVue, ModalVue, DeleteModal },
  setup() {
    const degreeStore = useDegreeStore();
    const { fetchDegrees, createDegree, editDegree, deleteDegree } =
      degreeStore;
    const { degrees } = storeToRefs(degreeStore);
    const form = ref({});
    const modalVisible = ref(false);
    const alertVisible = ref(false);
    const toDelete = ref(null);
    const degreeColumns = [
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
      await fetchDegrees();
    };

    onMounted(async () => {
      await load();
    });

    const onAddDegree = async (data) => {
      if (data) {
        await editDegree(data._id, data.row);
      } else {
        const toSend = {
          name: form.value.name,
          desc: form.value.desc,
        };
        await createDegree(toSend);
      }
      await load();
      modalVisible.value = false;
    };

    const handleDeleteDegree = (val) => {
      toDelete.value = val;
      alertVisible.value = true;
    };

    const submitDelDegree = async () => {
      await deleteDegree(toDelete.value);
      toDelete.value = null;
      await load();
      alertVisible.value = false;
    };

    return {
      degrees,
      degreeColumns,
      onAddDegree,
      handleDeleteDegree,
      submitDelDegree,
      alertVisible,
      modalVisible,
      form,
    };
  },
};
</script>
