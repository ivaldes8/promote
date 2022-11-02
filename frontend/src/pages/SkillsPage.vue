<template>
  <q-page>
    <DataTableVue
      title="skills"
      :rows="skills.skill"
      :columns="skillColumns"
      @add="modalVisible = !modalVisible"
      @update="onAddSkill"
      @del="handleDeleteSkill"
      grid
      addable
      deleteable
      coolEdit
    />

    <ModalVue
      form
      v-show="modalVisible"
      :showDialog="modalVisible"
      title="addSkill"
      @close="modalVisible = false"
      @submit="onAddSkill"
    >
      <template v-slot:content>
        <q-input
          filled
          v-model="form.name"
          :label="$t('skill')"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || $t('required')]"
        />
      </template>
    </ModalVue>

    <DeleteModal
      v-show="alertVisible"
      @close="alertVisible = false"
      :showDialog="alertVisible"
      title="deleteSkill"
      @submit="submitDelSkill"
    />
  </q-page>
</template>

<script>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useSkillStore } from "../stores/skill-store";
import DataTableVue from "src/components/DataTable.vue";
import ModalVue from "src/components/Modal.vue";
import DeleteModal from "src/components/DeleteModal.vue";

export default {
  name: "SkillsPage",
  components: { DataTableVue, ModalVue, DeleteModal },
  setup() {
    const skillStore = useSkillStore();
    const { fetchSkills, createSkill, editSkill, deleteSkill } = skillStore;
    const { skills } = storeToRefs(skillStore);
    const form = ref({});
    const modalVisible = ref(false);
    const alertVisible = ref(false);
    const toDelete = ref(null);
    const skillColumns = [
      {
        name: "name",
        label: "skill",
        field: "skill",
        type: "text",
        required: true,
        badged: true,
        badgeColor: "green",
        sortable: true,
        updateText: "updateSkill",
      },
      {
        name: "value",
        label: "proficence",
        field: "value",
        type: "text",
        rating: true,
        sortable: false,
        updateText: "updateProficence",
      },
      {
        name: "actions",
        label: "actions",
        align: "center",
      },
    ];

    const load = async () => {
      await fetchSkills();
    };

    onMounted(async () => {
      await load();
    });

    const onAddSkill = async (data) => {
      if (data) {
        await editSkill(data._id, data.row);
      } else {
        const toSend = {
          name: form.value.name,
          value: form.value.value,
        };
        await createSkill(toSend);
      }
      await load();
      modalVisible.value = false;
    };

    const handleDeleteSkill = (val) => {
      toDelete.value = val;
      alertVisible.value = true;
    };

    const submitDelSkill = async () => {
      await deleteSkill(toDelete.value);
      toDelete.value = null;
      await load();
      alertVisible.value = false;
    };

    return {
      skills,
      skillColumns,
      onAddSkill,
      handleDeleteSkill,
      submitDelSkill,
      alertVisible,
      modalVisible,
      form,
    };
  },
};
</script>
