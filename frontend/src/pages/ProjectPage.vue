<template>
  <q-page>
    <DataTableVue
      title="projects"
      :rows="projects.project"
      :columns="projectColumns"
      @add="modalVisible = !modalVisible"
      @update="onAddProject"
      @del="handleDeleteProject"
      grid
      addable
      deleteable
      coolEdit
    />

    <ModalVue
      form
      v-show="modalVisible"
      :showDialog="modalVisible"
      title="addProject"
      @close="modalVisible = false"
      @submit="onAddProject"
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
      title="deleteProject"
      @submit="submitDelProject"
    />
  </q-page>
</template>

<script>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useProjectStore } from "../stores/project-store";
import DataTableVue from "src/components/DataTable.vue";
import ModalVue from "src/components/Modal.vue";
import DeleteModal from "src/components/DeleteModal.vue";

export default {
  name: "ProjectsPage",
  components: { DataTableVue, ModalVue, DeleteModal },
  setup() {
    const projectStore = useProjectStore();
    const { fetchProjects, createProject, editProject, deleteProject } =
      projectStore;
    const { projects } = storeToRefs(projectStore);
    const form = ref({});
    const modalVisible = ref(false);
    const alertVisible = ref(false);
    const toDelete = ref(null);
    const projectColumns = [
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
      await fetchProjects();
    };

    onMounted(async () => {
      await load();
    });

    const onAddProject = async (data) => {
      if (data) {
        await editProject(data._id, data.row);
      } else {
        const toSend = {
          name: form.value.name,
          desc: form.value.desc,
        };
        await createProject(toSend);
      }
      await load();
      modalVisible.value = false;
    };

    const handleDeleteProject = (val) => {
      toDelete.value = val;
      alertVisible.value = true;
    };

    const submitDelProject = async () => {
      await deleteProject(toDelete.value);
      toDelete.value = null;
      await load();
      alertVisible.value = false;
    };

    return {
      projects,
      projectColumns,
      onAddProject,
      handleDeleteProject,
      submitDelProject,
      alertVisible,
      modalVisible,
      form,
    };
  },
};
</script>
