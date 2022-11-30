<template>
  <q-page>
    <DataTableVue
      title="curricolums"
      :rows="cvs.cv"
      :columns="cvColumns"
      hasSkills
      @add="modalVisible = !modalVisible"
      @update="onAddCv"
      @del="handleDeleteCv"
      @download="handleDownload"
      grid
      addable
      deleteable
      downloadble
      coolEdit
    />

    <ModalVue
      form
      v-show="modalVisible"
      :showDialog="modalVisible"
      title="addCv"
      @close="modalVisible = false"
      @submit="onAddCv"
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
          v-model="form.headerColor"
          :label="$t('headerColor')"
          class="mb-1"
        >
          <template v-slot:append>
            <q-icon name="colorize" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-color v-model="form.headerColor" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <div class="row">
          <div class="col">
            <q-input
              filled
              v-model="form.primaryColor"
              :label="$t('primaryColor')"
              :hint="$t('primaryColor')"
              class="mb-1 pr-1"
            >
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-color v-model="form.primaryColor" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col">
            <q-input
              filled
              v-model="form.secundaryColor"
              :label="$t('secundaryColor')"
              :hint="$t('secundaryColor')"
              class="mb-1 pl-1"
            >
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-color v-model="form.secundaryColor" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <q-select
              class="pr-1"
              filled
              option-value="code"
              emit-value
              option-label="name"
              map-options
              v-model="form.template"
              clearable
              :options="templates.template"
              :label="$t('template')"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || $t('required')]"
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <q-avatar>
                      <img
                        :src="scope.opt.img ? scope.opt.img : 'logoOficial.png'"
                      />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ scope.opt.code }}</q-item-label>
                    <q-item-label caption>{{ scope.opt.name }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col">
            <q-select
              class="pl-1"
              filled
              option-value="img"
              emit-value
              option-label="img"
              map-options
              v-model="form.profile"
              clearable
              :options="images.profile"
              :label="$t('image')"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || $t('required')]"
            >
              <template v-slot:selected-item="scope">
                <q-avatar size="80px" style="margin-left: 45%">
                  <img
                    :src="scope.opt.img ? scope.opt.img : 'logoOficial.png'"
                  />
                </q-avatar>
              </template>
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section>
                    <q-item-label caption>
                      <q-avatar style="margin-left: 40%">
                        <img
                          :src="
                            scope.opt.img ? scope.opt.img : 'logoOficial.png'
                          "
                        /> </q-avatar
                    ></q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>

        <q-select
          filled
          option-value="name"
          option-label="name"
          map-options
          v-model="form.skills"
          clearable
          multiple
          :options="skills.skill"
          :label="$t('skills')"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || $t('required')]"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label>{{ scope.opt.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          filled
          option-value="desc"
          emit-value
          option-label="desc"
          map-options
          v-model="form.about"
          clearable
          :options="abouts.about"
          :label="$t('about')"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || $t('required')]"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label>{{
                  $filters.max25(scope.opt.desc)
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          filled
          option-value="name"
          option-label="name"
          map-options
          v-model="form.experience"
          clearable
          multiple
          :options="xps.exp"
          :label="$t('experiences')"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || $t('required')]"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label>{{ scope.opt.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          class="mb-1"
          filled
          option-value="name"
          option-label="name"
          map-options
          v-model="form.project"
          clearable
          multiple
          :options="projects.project"
          :label="$t('projects')"
          lazy-rules
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label>{{ scope.opt.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          class="mb-1"
          filled
          option-value="name"
          option-label="name"
          map-options
          v-model="form.language"
          clearable
          multiple
          :options="langs.language"
          :label="$t('languages')"
          lazy-rules
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label>{{ scope.opt.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          class="mb-1"
          filled
          option-value="name"
          option-label="name"
          map-options
          v-model="form.degree"
          clearable
          multiple
          :options="degrees.degree"
          :label="$t('degrees')"
          lazy-rules
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label>{{ scope.opt.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          class="mb-1"
          filled
          option-value="name"
          option-label="name"
          map-options
          v-model="form.info"
          clearable
          multiple
          :options="infos.info"
          :label="$t('infos')"
          lazy-rules
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label>{{ scope.opt.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          class="mb-1"
          filled
          option-value="name"
          option-label="name"
          map-options
          v-model="form.letter"
          clearable
          multiple
          :options="letters.letter"
          :label="$t('letters')"
          lazy-rules
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label>{{ scope.opt.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </template>
    </ModalVue>

    <DeleteModal
      v-show="alertVisible"
      @close="alertVisible = false"
      :showDialog="alertVisible"
      title="deleteCv"
      @submit="submitDelCv"
    />

    <div class="templates">
      <Template1 :cvData="cvToDownload" />
      <Template2 :cvData="cvToDownload" />
    </div>
  </q-page>
</template>

<script>
import { onMounted, watch, ref } from "vue";
import { storeToRefs } from "pinia";
import { useCvStore } from "../stores/cv-store";
import { useTemplateStore } from "../stores/template-store";
import { useSkillStore } from "../stores/skill-store";
import { useProfileStore } from "src/stores/profile-store";
import { useAboutStore } from "src/stores/about-store";
import { useXpStore } from "src/stores/xp-store";
import { useProjectStore } from "src/stores/project-store";
import { useLangStore } from "src/stores/language-store";
import { useDegreeStore } from "src/stores/degree-store";
import { useInfoStore } from "src/stores/info-store";
import { useLetterStore } from "src/stores/letter-store";
import DataTableVue from "src/components/DataTable.vue";
import ModalVue from "src/components/Modal.vue";
import DeleteModal from "src/components/DeleteModal.vue";

import Template1 from "./templatesPage/Template1.vue";
import Template2 from "./templatesPage/Template2.vue";

export default {
  name: "CVS",
  components: { DataTableVue, ModalVue, DeleteModal, Template1, Template2 },

  setup() {
    const cvStore = useCvStore();
    const { fetchCvs, createCv, editCv, deleteCv } = cvStore;
    const { cvs } = storeToRefs(cvStore);

    const templateStore = useTemplateStore();
    const { fetchTemplates } = templateStore;
    const { templates } = storeToRefs(templateStore);

    const skillStore = useSkillStore();
    const { fetchSkills } = skillStore;
    const { skills } = storeToRefs(skillStore);

    const profileStore = useProfileStore();
    const { fetchImages } = profileStore;
    const { images, profile } = storeToRefs(profileStore);

    const aboutStore = useAboutStore();
    const { fetchAbouts } = aboutStore;
    const { abouts } = storeToRefs(aboutStore);

    const xpStore = useXpStore();
    const { fetchXps } = xpStore;
    const { xps } = storeToRefs(xpStore);

    const projectStore = useProjectStore();
    const { fetchProjects } = projectStore;
    const { projects } = storeToRefs(projectStore);

    const langStore = useLangStore();
    const { fetchLangs } = langStore;
    const { langs } = storeToRefs(langStore);

    const degreeStore = useDegreeStore();
    const { fetchDegrees } = degreeStore;
    const { degrees } = storeToRefs(degreeStore);

    const infoStore = useInfoStore();
    const { fetchInfos } = infoStore;
    const { infos } = storeToRefs(infoStore);

    const letterStore = useLetterStore();
    const { fetchLetters } = letterStore;
    const { letters } = storeToRefs(letterStore);

    const form = ref({});
    const modalVisible = ref(false);
    const alertVisible = ref(false);
    const toDelete = ref(null);
    const cvColumns = ref([]);

    const cvToDownload = ref(null);

    const load = async () => {
      await fetchTemplates();
      await fetchSkills();
      await fetchAbouts();
      await fetchImages();
      await fetchXps();
      await fetchProjects();
      await fetchLangs();
      await fetchDegrees();
      await fetchInfos();
      await fetchLetters();
      await fetchCvs();
    };

    onMounted(async () => {
      await load();
      cvColumns.value = [
        {
          name: "name",
          label: "name",
          field: "name",
          align: "left",
          type: "text",
          required: true,
          badged: true,
          badgeColor: "primary",
          sortable: true,
          updateText: "updateName",
        },
        {
          name: "template",
          label: "template",
          field: "template",
          align: "left",
          required: true,
          select: true,
          optionValue: "code",
          optionLabel: "name",
          options: templates.value.template,
          customOptions: true,
          optionImage: true,
          optionImageKey: "img",
          optionText: true,
          optionTextKey: "code",
          optionCaption: true,
          optionCaptionKey: "name",
          sortable: true,
          updateText: "updateTemplate",
        },
        {
          name: "profile",
          label: "image",
          field: "profile",
          align: "center",
          image: true,
          required: true,
          select: true,
          optionValue: "img",
          optionLabel: "img",
          options: images.value.profile,
          customOptions: true,
          optionImage: true,
          optionImageKey: "img",
          customSelected: true,
          customSelectedKey: "img",
          sortable: true,
          updateText: "updateImage",
        },
        {
          name: "skills",
          label: "skills",
          field: "skills",
          align: "left",
          multiple: true,
          multipleKey: "name",
          multipleKey2: "value",
          multipleStar: true,
          required: true,
          select: true,
          multipleSelect: true,
          emitValue: false,
          optionLabel: "name",
          options: skills.value.skill,
          customOptions: true,
          optionText: true,
          optionTextKey: "name",
          sortable: true,
          updateText: "updateSkills",
        },
        {
          name: "headerColor",
          label: "headerColor",
          field: "headerColor",
          align: "left",
          type: "text",
          colorPicker: true,
          required: true,
          updateText: "updateHeaderColor",
        },
        {
          name: "primaryColor",
          label: "primaryColor",
          field: "primaryColor",
          align: "left",
          type: "text",
          colorPicker: true,
          required: true,
          updateText: "updatePrimaryColor",
        },
        {
          name: "secundaryColor",
          label: "secundaryColor",
          field: "secundaryColor",
          align: "left",
          type: "text",
          colorPicker: true,
          required: true,
          updateText: "updateSecundaryColor",
        },
        {
          name: "about",
          label: "abouts",
          field: "about",
          align: "left",
          required: true,
          select: true,
          emitValue: true,
          optionValue: "desc",
          optionLabel: "desc",
          long: true,
          options: abouts.value.about,
          customOptions: true,
          optionText: true,
          optionTextKey: "desc",
          sortable: true,
          updateText: "updateAbout",
        },
        {
          name: "experience",
          label: "experiences",
          field: "experience",
          align: "left",
          multiple: true,
          multipleKey: "name",
          required: true,
          select: true,
          multipleSelect: true,
          emitValue: false,
          optionLabel: "name",
          options: xps.value.exp,
          customOptions: true,
          optionText: true,
          optionTextKey: "name",
          sortable: true,
          updateText: "updateXp",
        },
        {
          name: "project",
          label: "projects",
          field: "project",
          align: "left",
          multiple: true,
          multipleKey: "name",
          select: true,
          multipleSelect: true,
          emitValue: false,
          optionLabel: "name",
          options: projects.value.project,
          customOptions: true,
          optionText: true,
          optionTextKey: "name",
          sortable: true,
          updateText: "updateProjects",
        },
        {
          name: "language",
          label: "languages",
          field: "language",
          align: "left",
          multiple: true,
          multipleKey: "name",
          select: true,
          multipleSelect: true,
          emitValue: false,
          optionLabel: "name",
          options: langs.value.language,
          customOptions: true,
          optionText: true,
          optionTextKey: "name",
          sortable: true,
          updateText: "updateLanguages",
        },
        {
          name: "degree",
          label: "degrees",
          field: "degree",
          align: "left",
          multiple: true,
          multipleKey: "name",
          select: true,
          multipleSelect: true,
          emitValue: false,
          optionLabel: "name",
          options: degrees.value.degree,
          customOptions: true,
          optionText: true,
          optionTextKey: "name",
          sortable: true,
          updateText: "updateDegrees",
        },
        {
          name: "info",
          label: "infos",
          field: "info",
          align: "left",
          multiple: true,
          multipleKey: "name",
          select: true,
          multipleSelect: true,
          emitValue: false,
          optionLabel: "name",
          options: infos.value.info,
          customOptions: true,
          optionText: true,
          optionTextKey: "name",
          sortable: true,
          updateText: "updateInfos",
        },
        {
          name: "letter",
          label: "letters",
          field: "letter",
          align: "left",
          multiple: true,
          multipleKey: "name",
          select: true,
          multipleSelect: true,
          emitValue: false,
          optionLabel: "name",
          options: letters.value.letter,
          customOptions: true,
          optionText: true,
          optionTextKey: "name",
          sortable: true,
          updateText: "updateLetters",
        },
        {
          name: "actions",
          label: "actions",
          align: "center",
        },
      ];
    });

    const onAddCv = async (data) => {
      if (data) {
        await editCv(data._id, data.row);
      } else {
        const toSend = {
          name: form.value.name,
          profile: form.value.profile,
          template: form.value.template,
          skills: form.value.skills,
          about: form.value.about,
          headerColor: form.value.headerColor,
          primaryColor: form.value.primaryColor,
          secundaryColor: form.value.secundaryColor,
          experience: form.value.experience,
          project: form.value.project,
          language: form.value.language,
          degree: form.value.degree,
          info: form.value.info,
          letter: form.value.letter,
        };
        console.log(toSend, "ToSend");
        await createCv(toSend);
      }
      await load();
      modalVisible.value = false;
    };

    const handleDeleteCv = (val) => {
      toDelete.value = val;
      alertVisible.value = true;
    };

    const handleDownload = (row) => {
      const profileInfo = profile.value;

      cvToDownload.value = { ...row, profileInfo };
    };


    const submitDelCv = async () => {
      await deleteCv(toDelete.value);
      toDelete.value = null;
      await load();
      alertVisible.value = false;
    };

    return {
      cvs,
      cvColumns,
      onAddCv,
      handleDeleteCv,
      handleDownload,
      submitDelCv,
      alertVisible,
      modalVisible,
      form,
      templates,
      skills,
      images,
      abouts,
      xps,
      projects,
      langs,
      degrees,
      infos,
      letters,
      cvToDownload
    };
  },
};
</script>
<style scoped>
.templates {
  display: none;
}

.mb-1 {
  margin-bottom: 10px;
}

.pl-1 {
  padding-left: 10px;
}

.pr-1 {
  padding-right: 10px;
}
</style>
