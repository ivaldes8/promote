<template>
  <q-page>
    <div class="col-12 q-pa-md">
      <q-card>
        <hr>
        <q-card-section>
          <div class="text-h6 text-italic float-left">
            {{ $t("templates") }}
          </div>
          <q-btn
            v-if="profile && profile.role === 'Admin'"
            class="float-right"
            color="primary"
            round
            icon="add"
            @click="handleAdd"
          />
        </q-card-section>
        <br />
        <q-card-section>
          <CardList
            v-if="templates && templates.template"
            :data="templates.template"
            image
            underImageTitle
            hasTitle
            :hasActions="profile && profile.role === 'Admin' ? true : false"
            titleKey="name"
            notFoundText="templateNotFound"
            @delete="handleDelete"
            @update="handleUpdate"
          />
        </q-card-section>
      </q-card>
    </div>
    <ModalVue
      form
      v-show="modalVisible"
      :showDialog="modalVisible"
      title="addImage"
      @close="modalVisible = false"
      @submit="onSubmitTemplate"
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
          v-model="form.code"
          :label="$t('code')"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || $t('required')]"
        />

        <q-file
          clearable
          filled
          bottom-slots
          :label="$t('selectImage')"
          v-model="form.img"
          counter
          accept=".jpg, image/*"
          lazy-rules
        >
          <template v-slot:before v-if="toEdit && toEdit.img">
            <q-avatar>
              <img :src="toEdit.img" />
            </q-avatar>
          </template>
        </q-file>
      </template>
    </ModalVue>

    <DeleteModal
      v-show="alertVisible"
      @close="alertVisible = false"
      :showDialog="alertVisible"
      title="deleteTemplate"
      @submit="submitDel"
    />
  </q-page>
</template>

<script>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useTemplateStore } from "../../stores/template-store";
import { useProfileStore } from "../../stores/profile-store";
import CardList from "src/components/CardList.vue";
import ModalVue from "src/components/Modal.vue";
import DeleteModal from "src/components/DeleteModal.vue";

export default {
  name: "TemplatesPage",
  components: { CardList, DeleteModal, ModalVue },
  setup() {
    const templateStore = useTemplateStore();
    const { fetchTemplates, createTemplate, editTemplate, deleteTemplate } =
      templateStore;
    const { templates } = storeToRefs(templateStore);

    const profileStore = useProfileStore();
    const { fetchProfile } = profileStore;
    const { profile } = storeToRefs(profileStore);

    const modalVisible = ref(false);
    const alertVisible = ref(false);

    const form = ref({});
    const toDelete = ref(null);
    const toEdit = ref(null);

    const getBase64 = async (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    const onSubmitTemplate = async () => {
      let image = null;

      if (form.value.img) {
        await getBase64(form.value.img).then((data) => {
          image = data;
        });
      }

      const toSend = {
        name: form.value.name,
        code: form.value.code,
      };

      if (toEdit.value) {
        await editTemplate(
          toEdit.value._id,
          image ? { ...toSend, img: image } : toSend
        );
      } else {
        await createTemplate(image ? { ...toSend, img: image } : toSend);
      }

      modalVisible.value = false;

      await load();
    };

    const submitDel = async () => {
      await deleteTemplate(toDelete.value._id);

      alertVisible.value = false;

      toDelete.value = null;

      await load();
    };

    const handleDelete = (data) => {
      toDelete.value = data;
      alertVisible.value = true;
    };

    const handleUpdate = (data) => {
      toEdit.value = data;
      modalVisible.value = true;
      form.value = {
        name: toEdit.value.name,
        code: toEdit.value.code,
      };
    };

    const handleAdd = () => {
      toEdit.value = null;
      form.value = {};
      modalVisible.value = true;
    };

    const load = async () => {
      await fetchTemplates();
    };

    onMounted(async () => {
      await fetchProfile();
      await load();
    });

    return {
      profile,
      templates,
      modalVisible,
      alertVisible,
      form,
      toEdit,
      onSubmitTemplate,
      submitDel,
      handleDelete,
      handleUpdate,
      handleAdd,
    };
  },
};
</script>
