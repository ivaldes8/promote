<template>
  <q-page backtop="24mm" backbottom="20mm">
    <div ref="document">
      <div class="row">
        <div
          class="col-12 header"
          :style="{
            backgroundColor: `${
              data && data.headerColor ? data.headerColor : ''
            }`,
          }"
        >
          <div class="row">
            <h3
              class="headerText ml-5"
              v-if="data && data.profileInfo && data.profileInfo.name"
            >
              {{ data.profileInfo.name }}
            </h3>
            <h3
              class="headerText"
              v-if="data && data.profileInfo && data.profileInfo.lastName"
            >
              {{ data.profileInfo.lastName }}
            </h3>
          </div>
          <div
            class="row"
            v-if="data && data.profileInfo && data.profileInfo.phone"
          >
            <p class="ml-8 contentText">{{ $t("phoneNumber") }}:</p>
            <p class="contentTextSecundary">{{ data.profileInfo.phone }}</p>
          </div>
          <div
            class="row"
            v-if="data && data.profileInfo && data.profileInfo.email"
          >
            <p class="ml-8 contentText">{{ $t("email") }}:</p>
            <p class="contentTextSecundary">{{ data.profileInfo.email }}</p>
          </div>
          <div
            class="row"
            v-if="data && data.profileInfo && data.profileInfo.address"
          >
            <p class="ml-8 contentText">{{ $t("address") }}:</p>
            <p class="contentTextSecundary">
              {{ data.profileInfo.address }}
            </p>
          </div>
          <br />
          <img
            v-if="data && data.profile"
            class="image"
            :style="{
              color: `${
                data && data.primaryColor ? data.primaryColor : 'black'
              }`,
            }"
            :src="data.profile"
          />
        </div>

        <div class="col-6">
          <h6
            class="contentPrimary ml-2"
            :style="{
              backgroundColor: `${
                data && data.primaryColor ? data.primaryColor : ''
              }`,
            }"
          >
            <span
              :style="{
                borderTop:
                  '10px solid' +
                  `${data && data.primaryColor ? data.primaryColor : ''}`,
              }"
            ></span>
            <q-icon name="person" size="sm" />
            {{ $t("aboutMe") }}:
          </h6>
          <p class="ml-2" v-if="data && data.about">
            {{ data.about }}
          </p>
        </div>
        <div class="col-6" v-if="data && data.skills && data.skills.length > 0">
          <h6
            class="contentPrimary ml-2"
            :style="{
              backgroundColor: `${
                data && data.secundaryColor ? data.secundaryColor : ''
              }`,
            }"
          >
            <span
              :style="{
                borderTop:
                  '10px solid' +
                  `${data && data.secundaryColor ? data.secundaryColor : ''}`,
              }"
            ></span>
            <q-icon name="history_edu" size="sm" />
            {{ $t("skills") }}:
          </h6>
          <div class="row">
            <div v-for="skill in data.skills" :key="skill.name">
              <div class="col-6 ml-2">
                <div class="row">
                  <p class="contentText">{{ skill.name }}:</p>
                  <p class="contentTextSecundary stars">
                    <q-rating
                      v-model="skill.value"
                      max="5"
                      size="1.5em"
                      :style="{
                        color:
                          data && data.primaryColor ? data.primaryColor : '',
                      }"
                      icon="star_border"
                      icon-selected="star"
                      no-dimming
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-6">
          <div v-if="data && data.experience && data.experience.length > 0">
            <h6
              class="contentPrimary ml-2 mt-1"
              :style="{
                backgroundColor: `${
                  data && data.primaryColor ? data.primaryColor : ''
                }`,
              }"
            >
              <span
                :style="{
                  borderTop:
                    '10px solid' +
                    `${data && data.primaryColor ? data.primaryColor : ''}`,
                }"
              ></span>
              <q-icon name="work" size="sm" />
              {{ $t("experience") }}:
            </h6>

            <div v-for="xp in data.experience" :key="xp.name">
              <div class="row ml-2 mb-05">
                <p class="contentText">-{{ xp.name }}</p>
                <p class="contentTextSecundary" v-if="xp.desc">
                  :{{ xp.desc }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div v-if="data && data.project && data.project.length > 0">
            <h6
              class="contentPrimary ml-2 mt-1"
              :style="{
                backgroundColor: `${
                  data && data.primaryColor ? data.primaryColor : ''
                }`,
              }"
            >
              <span
                :style="{
                  borderTop:
                    '10px solid' +
                    `${data && data.primaryColor ? data.primaryColor : ''}`,
                }"
              ></span>
              <q-icon name="rocket" size="sm" />
              {{ $t("projects") }}:
            </h6>
            <div v-for="project in data.project" :key="project.name">
              <div class="row ml-2 mb-05">
                <p class="contentText">-{{ project.name }}</p>
                <p class="contentTextSecundary" v-if="project.desc">
                  :{{ project.desc }}
                </p>
              </div>
            </div>
          </div>

          <div v-if="data && data.degree && data.degree.length > 0">
            <h6
              class="contentPrimary ml-2 mt-1"
              :style="{
                backgroundColor: `${
                  data && data.secundaryColor ? data.secundaryColor : ''
                }`,
              }"
            >
              <span
                :style="{
                  borderTop:
                    '10px solid' +
                    `${data && data.secundaryColor ? data.secundaryColor : ''}`,
                }"
              ></span>
              <q-icon name="school" size="sm" />
              {{ $t("education") }}:
            </h6>

            <div v-for="d in data.degree" :key="d.name">
              <div class="row ml-2 mb-05">
                <p class="contentText">-{{ d.name }}</p>
                <p class="contentTextSecundary" v-if="d.desc">:{{ d.desc }}</p>
              </div>
            </div>
          </div>
          <div v-if="data && data.language && data.language.length > 0">
            <h6
              class="contentPrimary ml-2 mt-1"
              :style="{
                backgroundColor: `${
                  data && data.secundaryColor ? data.secundaryColor : ''
                }`,
              }"
            >
              <span
                :style="{
                  borderTop:
                    '10px solid' +
                    `${data && data.secundaryColor ? data.secundaryColor : ''}`,
                }"
              ></span>
              <q-icon name="language" size="sm" />
              {{ $t("language") }}:
            </h6>

            <div v-for="lang in data.language" :key="lang.name">
              <div class="row ml-2 mb-05">
                <p class="contentText">-{{ lang.name }}</p>
                <p class="contentTextSecundary" v-if="lang.desc">
                  :{{ lang.desc }}
                </p>
              </div>
            </div>
          </div>

          <div v-if="data && data.info && data.info.length > 0">
            <h6
              class="contentPrimary ml-2 mt-1"
              :style="{
                backgroundColor: `${
                  data && data.secundaryColor ? data.secundaryColor : ''
                }`,
              }"
            >
              <span
                :style="{
                  borderTop:
                    '10px solid' +
                    `${data && data.secundaryColor ? data.secundaryColor : ''}`,
                }"
              ></span>
              <q-icon name="info" size="sm" />
              {{ $t("extraInfo") }}:
            </h6>

            <div v-for="i in data.info" :key="i.name">
              <div class="row ml-2 mb-05">
                <p class="contentText">-{{ i.name }}</p>
                <p class="contentTextSecundary" v-if="i.desc">:{{ i.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div v-if="data && data.letter && data.letter.length > 0">
            <div class="html2pdf__page-break"></div>

            <div
              class="col-12 header"
              :style="{
                backgroundColor: `${
                  data && data.headerColor ? data.headerColor : ''
                }`,
              }"
            >
              <div class="row">
                <h3
                  class="headerText ml-5"
                  v-if="data && data.profileInfo && data.profileInfo.name"
                >
                  {{ data.profileInfo.name }}
                </h3>
                <h3
                  class="headerText"
                  v-if="data && data.profileInfo && data.profileInfo.lastName"
                >
                  {{ data.profileInfo.lastName }}
                </h3>
              </div>
              <div
                class="row"
                v-if="data && data.profileInfo && data.profileInfo.phone"
              >
                <p class="ml-8 contentText">{{ $t("phoneNumber") }}:</p>
                <p class="contentTextSecundary">{{ data.profileInfo.phone }}</p>
              </div>
              <div
                class="row"
                v-if="data && data.profileInfo && data.profileInfo.email"
              >
                <p class="ml-8 contentText">{{ $t("email") }}:</p>
                <p class="contentTextSecundary">{{ data.profileInfo.email }}</p>
              </div>
              <div
                class="row"
                v-if="data && data.profileInfo && data.profileInfo.address"
              >
                <p class="ml-8 contentText">{{ $t("address") }}:</p>
                <p class="contentTextSecundary">
                  {{ data.profileInfo.address }}
                </p>
              </div>
              <br />
            </div>

            <div v-for="l in data.letter" :key="l.name">
              <div class="ml-1 mb-05">
                <h6
                  class="contentPrimary ml-2 mt-1 mr-2"
                  :style="{
                    backgroundColor: `${
                      data && data.primaryColor ? data.primaryColor : ''
                    }`,
                  }"
                >
                  <span
                    v-if="l.desc"
                    :style="{
                      borderTop:
                        '10px solid' +
                        `${data && data.primaryColor ? data.primaryColor : ''}`,
                    }"
                  ></span>
                  <q-icon name="mark_as_unread" size="sm" />
                  {{ l.name }}
                </h6>
                <p class="ml-2 mr-2" style="font-size: 100%" v-if="l.desc">
                  {{ l.desc }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import html2pdf from "html2pdf.js";
import { Loading } from "quasar";

export default {
  name: "TemplateOne",
  props: ["cvData"],
  components: {},
  data() {
    return {
      data: null,
    };
  },

  watch: {
    async cvData() {
      this.data = this.cvData;
      if (this.data && this.data.template && this.data.template === "01") {
        Loading.show();
        await html2pdf(this.$refs.document, {
          margin: 0,
          filename: "CV.pdf",
          image: { type: "jpeg", quality: 1 },
          jsPDF: { unit: "in", orientation: "portrait" },
        });
        Loading.hide();
      }
    },
  },
};
</script>
<style scoped>
h6,
h3 {
  font-family: "Courier New", Courier, monospace;
}
.header {
  border-radius: 10px;
  color: black;
}
.headerText {
  font-size: 250%;
  margin-top: 20px;
  margin-bottom: 15px;
  margin-left: 10px;
  font-weight: 500;
  color: black;
}

.contentText {
  margin-top: 0px;
  margin-bottom: 0px;
  font-weight: 500;
  color: black;
}

.contentTextSecundary {
  margin-bottom: 0px;
  margin-left: 5px;
  color: black;
}

.contentPrimary {
  margin: 5px;
  border: 0px solid;
  border-radius: 10px;
  color: white;
  padding-left: 5px;
  position: relative;
}
.image {
  position: absolute;
  border: 3px solid;
  top: 10px;
  right: 15px;
  width: 145px;
  height: 145px;
  border-radius: 50%;
}

.star {
  margin-top: -8px;
}

.ml-5 {
  margin-left: 50px;
}
.ml-2 {
  margin-left: 20px;
}

.mr-2 {
  margin-right: 20px;
}
.ml-8 {
  margin-left: 80px;
}

.mt-3 {
  margin-top: 30px;
}

.mt-1 {
  margin-top: 10px;
}

.mb-05 {
  margin-bottom: 5px;
}

.stars {
  margin-top: -5px;
}

span {
  color: transparent;
  border-top: 10px solid transparent;
  border-right: 10px solid transparent;
  border-left: 10px solid transparent;
  position: absolute;
  bottom: -8px;
  left: 20px;
}

p {
  font-size: 90%;
  color: black;
}
</style>
