<template>
  <q-page backtop="24mm" backbottom="20mm">
    <div ref="document">
      <div class="row">
        <div
          class="col-4 header"
          :style="{
            background: `linear-gradient(180deg,${
              data && data.primaryColor ? data.primaryColor : ''
            } 0%, ${data && data.headerColor ? data.headerColor : ''} 35%)`,
          }"
        >
          <div class="row sidebarContainer">
            <img
              v-if="data && data.profile"
              :style="{
                color: `${
                  data && data.primaryColor ? data.primaryColor : 'black'
                }`,
              }"
              class="sidebarImage"
              :src="data.profile"
            />
            <h4
              class="headerText"
              v-if="data && data.profileInfo && data.profileInfo.name"
            >
              {{ data.profileInfo.name }}
            </h4>
            <h6
              class="headerText"
              v-if="data && data.profileInfo && data.profileInfo.lastName"
            >
              {{ data.profileInfo.lastName }}
            </h6>

            <div v-if="data && data.skills && data.skills.length > 0">
              <h6
                class="sidebarHeader"
                :style="{
                  backgroundColor: `${
                    data && data.primaryColor ? data.primaryColor : ''
                  }`,
                }"
              >
                <q-icon name="history_edu" size="sm" />
                {{ $t("skills") }}:
              </h6>
              <div class="row">
                <div v-for="skill in data.skills" :key="skill.name">
                  <div class="col-12 ml-2">
                    <div class="row">
                      <p class="sidebarHeaderText">{{ skill.name }}:</p>
                      <p class="sidebarHeaderTextSecundary stars">
                        <q-rating
                          v-model="skill.value"
                          max="5"
                          size="1.8em"
                          :style="{
                            color:
                              data && data.primaryColor
                                ? data.primaryColor
                                : '',
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

            <div v-if="data && data.language && data.language.length > 0">
              <h6
                class="sidebarHeader"
                :style="{
                  backgroundColor: `${
                    data && data.primaryColor ? data.primaryColor : ''
                  }`,
                }"
              >
                <q-icon name="language" size="sm" />
                {{ $t("language") }}:
              </h6>
              <div v-for="lang in data.language" :key="lang.name">
                <div class="row ml-2 mb-05">
                  <p class="sidebarHeaderText">{{ lang.name }}</p>
                  <p class="sidebarHeaderTextSecundary" v-if="lang.desc">
                    :{{ lang.desc }}
                  </p>
                </div>
              </div>
            </div>

            <div v-if="data" class="mb-2">
              <h6
                class="sidebarHeader"
                :style="{
                  backgroundColor: `${
                    data && data.primaryColor ? data.primaryColor : ''
                  }`,
                }"
              >
                <q-icon name="contact_mail" size="sm" />
                {{ $t("contacts") }}:
              </h6>
              <div
                class="row ml-2"
                v-if="data && data.profileInfo && data.profileInfo.phone"
              >
                <p class="sidebarHeaderText">{{ $t("phoneNumber") }}:</p>
                <p class="sidebarHeaderTextSecundary">
                  {{ data.profileInfo.phone }}
                </p>
              </div>
              <div
                class="row ml-2"
                v-if="data && data.profileInfo && data.profileInfo.email"
              >
                <p class="sidebarHeaderText">{{ $t("email") }}:</p>
                <p class="sidebarHeaderTextSecundary">
                  {{ data.profileInfo.email }}
                </p>
              </div>
              <div
                class="row ml-2"
                v-if="data && data.profileInfo && data.profileInfo.address"
              >
                <p class="sidebarHeaderText">{{ $t("address") }}:</p>
                <p class="sidebarHeaderTextSecundary">
                  {{ data.profileInfo.address }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-8">
          <div class="row">
            <div class="col-12">
              <h6
                class="contentHeader ml-2"
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
          </div>

          <div class="row">
            <div
              class="col-12"
              v-if="data && data.experience && data.experience.length > 0"
            >
              <h6
                class="contentHeader ml-2 mt-1"
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

          <div class="row">
            <div
              class="col-12"
              v-if="data && data.project && data.project.length > 0"
            >
              <h6
                class="contentHeaderSecundary ml-2 mt-1"
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
          </div>

          <div class="row">
            <div
              class="col-12"
              v-if="data && data.degree && data.degree.length > 0"
            >
              <h6
                class="contentHeaderSecundary ml-2 mt-1"
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
                      `${
                        data && data.secundaryColor ? data.secundaryColor : ''
                      }`,
                  }"
                ></span>
                <q-icon name="school" size="sm" />
                {{ $t("education") }}:
              </h6>

              <div v-for="d in data.degree" :key="d.name">
                <div class="row ml-2 mb-05">
                  <p class="contentText">-{{ d.name }}</p>
                  <p class="contentTextSecundary" v-if="d.desc">
                    :{{ d.desc }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div
              class="col-12"
              v-if="data && data.info && data.info.length > 0"
            >
              <h6
                class="contentHeaderSecundary ml-2 mt-1"
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
                      `${
                        data && data.secundaryColor ? data.secundaryColor : ''
                      }`,
                  }"
                ></span>
                <q-icon name="info" size="sm" />
                {{ $t("extraInfo") }}:
              </h6>

              <div v-for="i in data.info" :key="i.name">
                <div class="row ml-2 mb-05">
                  <p class="contentText">-{{ i.name }}</p>
                  <p class="contentTextSecundary" v-if="i.desc">
                    :{{ i.desc }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="html2pdf__page-break"
        v-if="data && data.letter && data.letter.length > 0"
      ></div>
      <div class="row" v-if="data && data.letter && data.letter.length > 0">
        <div
          class="col-4 header"
          :style="{
            background: `linear-gradient(180deg,${
              data && data.primaryColor ? data.primaryColor : ''
            } 0%, ${data && data.headerColor ? data.headerColor : ''} 35%)`,
          }"
        >
          <div class="row sidebarContainer">
            <img
              v-if="data && data.profile"
              :style="{
                color: `${
                  data && data.primaryColor ? data.primaryColor : 'black'
                }`,
              }"
              class="sidebarImage"
              :src="data.profile"
            />
            <h4
              class="headerText"
              v-if="data && data.profileInfo && data.profileInfo.name"
            >
              {{ data.profileInfo.name }}
            </h4>
            <h6
              class="headerText"
              v-if="data && data.profileInfo && data.profileInfo.lastName"
            >
              {{ data.profileInfo.lastName }}
            </h6>

            <div v-if="data && data.skills && data.skills.length > 0">
              <h6
                class="sidebarHeader"
                :style="{
                  backgroundColor: `${
                    data && data.primaryColor ? data.primaryColor : ''
                  }`,
                }"
              >
                <q-icon name="history_edu" size="sm" />
                {{ $t("skills") }}:
              </h6>
              <div class="row">
                <div v-for="skill in data.skills" :key="skill.name">
                  <div class="col-12 ml-2">
                    <div class="row">
                      <p class="sidebarHeaderText">{{ skill.name }}:</p>
                      <p class="sidebarHeaderTextSecundary stars">
                        <q-rating
                          v-model="skill.value"
                          max="5"
                          size="1.8em"
                          :style="{
                            color:
                              data && data.primaryColor
                                ? data.primaryColor
                                : '',
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

            <div v-if="data && data.language && data.language.length > 0">
              <h6
                class="sidebarHeader"
                :style="{
                  backgroundColor: `${
                    data && data.primaryColor ? data.primaryColor : ''
                  }`,
                }"
              >
                <q-icon name="language" size="sm" />
                {{ $t("language") }}:
              </h6>
              <div v-for="lang in data.language" :key="lang.name">
                <div class="row ml-2 mb-05">
                  <p class="sidebarHeaderText">{{ lang.name }}</p>
                  <p class="sidebarHeaderTextSecundary" v-if="lang.desc">
                    :{{ lang.desc }}
                  </p>
                </div>
              </div>
            </div>

            <div v-if="data" class="mb-2">
              <h6
                class="sidebarHeader"
                :style="{
                  backgroundColor: `${
                    data && data.primaryColor ? data.primaryColor : ''
                  }`,
                }"
              >
                <q-icon name="contact_mail" size="sm" />
                {{ $t("contacts") }}:
              </h6>
              <div
                class="row ml-2"
                v-if="data && data.profileInfo && data.profileInfo.phone"
              >
                <p class="sidebarHeaderText">{{ $t("phoneNumber") }}:</p>
                <p class="sidebarHeaderTextSecundary">
                  {{ data.profileInfo.phone }}
                </p>
              </div>
              <div
                class="row ml-2"
                v-if="data && data.profileInfo && data.profileInfo.email"
              >
                <p class="sidebarHeaderText">{{ $t("email") }}:</p>
                <p class="sidebarHeaderTextSecundary">
                  {{ data.profileInfo.email }}
                </p>
              </div>
              <div
                class="row ml-2"
                v-if="data && data.profileInfo && data.profileInfo.address"
              >
                <p class="sidebarHeaderText">{{ $t("address") }}:</p>
                <p class="sidebarHeaderTextSecundary">
                  {{ data.profileInfo.address }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-8">
          <div class="row">
            <div class="col-12" v-for="l in data.letter" :key="l.name">
              <div class="ml-1 mb-05">
                <h6
                  class="contentHeaderSecundary ml-2 mt-1 mr-2"
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
  name: "TemplateTwo",
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
      if (this.data && this.data.template && this.data.template === "02") {
        Loading.show();
        await html2pdf(this.$refs.document, {
          margin: 0,
          filename: "CV.pdf",
          html2canvas: {
            dpi: 192,
            scale: 4,
            letterRendering: true,
            useCORS: true,
          },
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

.sidebarContainer {
  display: flex;
  flex-wrap: wrap;
  height: 1120px;
  flex-direction: column;
  align-content: stretch;
}

.sidebarHeader {
  color: rgb(255, 255, 255);
  text-align: center;
  margin-bottom: 15px;
  margin-top: 15px;
}

.sidebarImage {
  border: 3px solid;
  margin-top: 50px;
  margin-bottom: 20px;
  width: 145px;
  height: 145px;
  border-radius: 50%;
  align-self: center;
}

.star {
  margin-top: -8px;
}

.header {
  border-radius: 10px;
  color: black;
}
.headerText {
  font-weight: 500;
  color: black;
  text-align: center;
  margin-top: 0px;
  margin-bottom: 0px;
}

.sidebarHeaderText {
  margin-top: 0px;
  margin-bottom: 0px;
  font-weight: 500;
  color: black;
  font-size: 100%;
}

.sidebarHeaderTextSecundary {
  margin-top: 0px;
  margin-bottom: 0px;
  color: black;
  font-size: 100%;
  margin-right: 5px;
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

.contentHeader {
  margin: 5px;
  border: 0px solid;
  border-radius: 10px;
  color: white;
  padding-left: 5px;
  position: relative;
}

.contentHeaderSecundary {
  margin: 5px;
  border: 0px solid;
  border-radius: 10px;
  color: white;
  padding-left: 5px;
  position: relative;
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

.mb-2 {
  margin-bottom: 20px;
}

.stars {
  margin-top: -4px;
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
