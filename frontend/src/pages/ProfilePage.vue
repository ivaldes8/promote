<template>
  <q-page>
    <DataTableVue
      title="profileImages"
      :rows="images.profile"
      :columns="profileColumns"
      @add="modalVisible = !modalVisible"
      @update="onAddImage"
      @del="handleDeleteImage"
      grid
      addable
      deleteable
      coolEdit
    />

    <div class="col-12 q-pa-md">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-italic float-left">
            {{ $t("profileInfo") }}
          </div>
          <q-btn
            class="float-right"
            :label="$t('save')"
            type="submit"
            color="primary"
            :loading="$q.loading.isActive"
            icon-right="save"
            @click="onSubmit"
          />
        </q-card-section>
        <br />
        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              filled
              v-model="form.name"
              :label="$t('name')"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || $t('required')]"
            />

            <q-input filled v-model="form.lastName" :label="$t('lastName')" />

            <q-input
              filled
              type="number"
              v-model="form.phone"
              :label="$t('phoneNumber')"
            />

            <q-input filled v-model="form.address" :label="$t('address')" />

            <q-input
              filled
              v-model="form.email"
              :label="$t('email')"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || $t('required'),
                isValidEmail,
              ]"
            />

            <q-input filled disable v-model="form.role" :label="$t('role')" />
          </q-form>
        </q-card-section>
      </q-card>
    </div>

    <ModalVue
      v-show="modalVisible"
      :showDialog="modalVisible"
      title="addImage"
      @close="modalVisible = false"
      @submit="onAddImage"
    >
      <template v-slot:content>
        <q-form @submit="onAddImage" class="q-gutter-md">
          <q-file
            clearable
            filled
            bottom-slots
            :label="$t('selectImage')"
            v-model="formImage.image"
            counter
            accept=".jpg, image/*"
            lazy-rules
            :rules="[(val) => val || $t('required')]"
          />

          <q-toggle
            v-model="formImage.active"
            checked-icon="check"
            color="green"
            unchecked-icon="clear"
          />
        </q-form>
      </template>
    </ModalVue>

    <DeleteModal
      v-show="alertVisible"
      @close="alertVisible = false"
      :showDialog="alertVisible"
      title="deleteImage"
      @submit="submitDelImage"
    />
  </q-page>
</template>

<script>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "src/stores/profile-store";
import DataTableVue from "src/components/DataTable.vue";
import ModalVue from "src/components/Modal.vue";
import DeleteModal from "src/components/DeleteModal.vue";

export default {
  name: "ProfilePage",
  components: { DataTableVue, ModalVue, DeleteModal },
  setup() {
    const profileStore = useProfileStore();
    const {
      fetchImages,
      createImage,
      editImage,
      deleteImage,
      fetchProfile,
      updateProfile
    } = profileStore;
    const { images, profile } = storeToRefs(profileStore);
    const form = ref({});
    const formImage = ref({ active: false });
    const modalVisible = ref(false);
    const alertVisible = ref(false);
    const toDelete = ref(null);
    const profileColumns = [
      {
        name: "img",
        label: "image",
        field: "image",
        image: true,
        required: true,
        updateText: "updateImage",
      },
      {
        name: "active",
        label: "active",
        field: "active",
        switch: true,
        updateText: "updateActiveProfileImage",
      },

      {
        name: "actions",
        label: "actions",
        align: "center",
      },
    ];

    const getBase64 = async (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    const load = async () => {
      await fetchProfile();
      await fetchImages();
    };

    onMounted(async () => {
      await load();
      form.value = profile.value;
    });

    const onSubmit = async () => {
      const toSend = {
        name: form.value.name,
        lastName: form.value.lastName,
        email: form.value.email,
        phone: form.value.phone,
        address: form.value.address,
      };

      await updateProfile(toSend);
    };

    const onAddImage = async (data) => {

      if (data) {
        await editImage(data._id, data.row)
      } else {
        let image = "";
        await getBase64(formImage.value.image).then((data) => {
          image = data;
        });
        const toSend = {
          img: image,
          active: formImage.value.active,
        };
        await createImage(toSend);
      }

      await load();
      modalVisible.value = false;
    };

    const handleDeleteImage = (val) => {
      toDelete.value = val;
      alertVisible.value = true;
    };

    const submitDelImage = async () => {
      await deleteImage(toDelete.value);
      toDelete.value = null;
      await load();
      alertVisible.value = false;
    };

    return {
      modalVisible,
      alertVisible,
      images,
      form,
      formImage,
      profileColumns,
      load,
      onAddImage,
      handleDeleteImage,
      submitDelImage,
      onSubmit,
      isValidEmail(val) {
        const emailPattern =
          /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || t("invalidEmail");
      },
    };
  },
};
</script>
