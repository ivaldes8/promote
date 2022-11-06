<template>
  <q-page backtop="24mm" backbottom="20mm">
    <div ref="document">
      <div class="row">
        <div class="col-12 header" :style="{backgroundColor: `${data && data.headerColor ? data.headerColor : ''}`}">
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
            <p class="ml-8 subHeaderText">{{ $t("phoneNumber") }}:</p>
            <p class="subHeaderSecundary">{{ data.profileInfo.phone }}</p>
          </div>
          <div
            class="row"
            v-if="data && data.profileInfo && data.profileInfo.email"
          >
            <p class="ml-8 subHeaderText">{{ $t("email") }}:</p>
            <p class="subHeaderSecundary">{{ data.profileInfo.email }}</p>
          </div>
          <div
            class="row"
            v-if="data && data.profileInfo && data.profileInfo.address"
          >
            <p class="ml-8 subHeaderText">{{ $t("address") }}:</p>
            <p class="subHeaderSecundary">
              {{ data.profileInfo.address }}
            </p>
          </div>

          <img v-if="data && data.profile" class="image" :src="data.profile" />
        </div>

        <div class="col-7">
          <h6 class="contentHeaderPrimary ml-2" :style="{backgroundColor: `${data && data.primaryColor ? data.primaryColor : ''}`}">
            <span :style="{borderTop: '10px solid' + `${data && data.primaryColor ? data.primaryColor : ''}`}"></span>
            <q-icon name="person" size="sm" />
            {{ $t("aboutMe") }}:
          </h6>
          <p class="ml-2" v-if="data && data.about">
          {{data.about}}
          </p>
        </div>
        <div class="col-5" v-if="data && data.skills && data.skills.length > 0">
          <h6 class="contentHeaderSecundary ml-2" :style="{backgroundColor: `${data && data.secundaryColor ? data.secundaryColor : ''}`}">
            <span :style="{borderTop: '10px solid' + `${data && data.secundaryColor ? data.secundaryColor : ''}`}"></span>
            <q-icon name="history_edu" size="sm" />
            {{ $t("skills") }}:
          </h6>
          <div v-for="skill in data.skills" :key="skill.name">
            <div class="row ml-2 mb-05">
              <p class="subHeaderText">{{ skill.name }}:</p>
              <p class="subHeaderSecundary stars">
                <q-rating
                  v-model="skill.value"
                  max="5"
                  size="2.0em"
                  :style="{color: data && data.primaryColor ? data.primaryColor : ''}"
                  icon="star_border"
                  icon-selected="star"
                  no-dimming
                />
              </p>
            </div>
          </div>
        </div>

        <div class="col-7">
          <h6 class="contentHeaderPrimary ml-2" :style="{backgroundColor: `${data && data.primaryColor ? data.primaryColor : ''}`}">
            <span :style="{borderTop: '10px solid' + `${data && data.primaryColor ? data.primaryColor : ''}`}"></span>
            <q-icon name="work" size="sm" />
            {{ $t("experience") }}:
          </h6>
          <div class="row ml-2">
            <p class="subHeaderText">-Project:</p>
            <p class="subHeaderSecundary">
              Lorem ipsum es el texto que se usa habitualmente en diseño gráfico
              en demostraciones de tipografías o de borradores de diseño para
              probar el diseño visual antes de insertar el texto final
            </p>
          </div>
          <div class="row ml-2">
            <p class="subHeaderText">-Project:</p>
            <p class="subHeaderSecundary">
              Lorem ipsum es el texto que se usa habitualmente en diseño gráfico
              en demostraciones de tipografías o de borradores de diseño para
              probar el diseño visual antes de insertar el texto final
            </p>
          </div>
          <div class="row ml-2">
            <p class="subHeaderText">-Project:</p>
            <p class="subHeaderSecundary">
              Lorem ipsum es el texto que se usa habitualmente en diseño gráfico
              en demostraciones de tipografías o de borradores de diseño para
              probar el diseño visual antes de insertar el texto final
            </p>
          </div>
          <div class="row ml-2">
            <p class="subHeaderText">-Project:</p>
            <p class="subHeaderSecundary">
              Lorem ipsum es el texto que se usa habitualmente en diseño gráfico
              en demostraciones de tipografías o de borradores de diseño para
              probar el diseño visual antes de insertar el texto final
            </p>
          </div>
          <div class="row ml-2">
            <p class="subHeaderText">-Project:</p>
            <p class="subHeaderSecundary">
              Lorem ipsum es el texto que se usa habitualmente en diseño gráfico
              en demostraciones de tipografías o de borradores de diseño para
              probar el diseño visual antes de insertar el texto final
            </p>
          </div>
          <div class="row ml-2">
            <p class="subHeaderText">-Project:</p>
            <p class="subHeaderSecundary">
              Lorem ipsum es el texto que se usa habitualmente en diseño gráfico
              en demostraciones de tipografías o de borradores de diseño para
              probar el diseño visual antes de insertar el texto final
            </p>
          </div>
          <div class="row ml-2">
            <p class="subHeaderText">-Project:</p>
            <p class="subHeaderSecundary">
              Lorem ipsum es el texto que se usa habitualmente en diseño gráfico
              en demostraciones de tipografías o de borradores de diseño para
              probar el diseño visual antes de insertar el texto final
            </p>
          </div>
          <div class="row ml-2">
            <p class="subHeaderText">-Project:</p>
            <p class="subHeaderSecundary">
              Lorem ipsum es el texto que se usa habitualmente en diseño gráfico
              en demostraciones de tipografías o de borradores de diseño para
              probar el diseño visual antes de insertar el texto final
            </p>
          </div>
        </div>
        <div class="col-5">
          <h6 class="contentHeaderSecundary ml-2" :style="{backgroundColor: `${data && data.secundaryColor ? data.secundaryColor : ''}`}">
            <span :style="{borderTop: '10px solid' + `${data && data.secundaryColor ? data.secundaryColor : ''}`}"></span>
            <q-icon name="school" size="sm" />
            {{ $t("education") }}:
          </h6>
          <div class="row ml-2">
            <p class="subHeaderText">-University:</p>
            <p class="subHeaderSecundary">
              Lorem ipsum es el texto que se usa habitualmente en diseño gráfico
            </p>
          </div>
          <div class="row ml-2">
            <p class="subHeaderText">-University:</p>
            <p class="subHeaderSecundary">
              Lorem ipsum es el texto que se usa habitualmente en diseño gráfico
            </p>
          </div>
          <div class="row ml-2">
            <p class="subHeaderText">-University:</p>
            <p class="subHeaderSecundary">
              Lorem ipsum es el texto que se usa habitualmente en diseño gráfico
            </p>
          </div>

          <h6 class="contentHeaderSecundary ml-2 mt-3" :style="{backgroundColor: `${data && data.secundaryColor ? data.secundaryColor : ''}`}">
            <span :style="{borderTop: '10px solid' + `${data && data.secundaryColor ? data.secundaryColor : ''}`}"></span>
            <q-icon name="language" size="sm" />
            {{ $t("language") }}:
          </h6>
          <div class="row ml-2">
            <p class="subHeaderText">-Spanish:</p>
            <p class="subHeaderSecundary">Native</p>
          </div>
          <div class="row ml-2">
            <p class="subHeaderText">-English:</p>
            <p class="subHeaderSecundary">B2</p>
          </div>
          <div class="row ml-2">
            <p class="subHeaderText">-German:</p>
            <p class="subHeaderSecundary">C1</p>
          </div>

          <h6 class="contentHeaderSecundary ml-2 mt-3" :style="{backgroundColor: `${data && data.secundaryColor ? data.secundaryColor : ''}`}">
            <span :style="{borderTop: '10px solid' + `${data && data.secundaryColor ? data.secundaryColor : ''}`}"></span>
            <q-icon name="info" size="sm" />
            {{ $t("extraInfo") }}:
          </h6>
          <div class="row ml-2">
            <p class="subHeaderText">-The best:</p>
            <p class="subHeaderSecundary">Pilot in the world</p>
          </div>
        </div>
      </div>

      <hr />
    </div>
    <button @click="exportToPDF">Export to PDF</button>
  </q-page>
</template>

<script>
import { storeToRefs } from "pinia";
import { useMessageStore } from "src/stores/message-store";
import { ref, onMounted } from "vue";
import html2pdf from "html2pdf.js";

export default {
  name: "TemplateOne",
  props: ["cvData"],
  components: {},
  data() {
    return {
      data: null,
      colory:'#c536be'
    };
  },

  watch: {
    cvData() {
      this.data = this.cvData;
      console.log(this.data, 'DATA')
      if (this.data) {
        html2pdf(this.$refs.document, {
          margin: 0,
          filename: "document.pdf",
          image: { type: "jpeg", quality: 1 },
          jsPDF: { unit: "in", orientation: "portrait" },
        });
      }
    },

    // $props: {
    //   immediate: true,
    //   handleChange() {
    //     console.log(this.cvData, 'DATA')
    //   }
    // }
  },
  methods: {
    exportToPDF() {
      console.log(this.data, "CVDATA");
      // if (this.data) {
      //   html2pdf(this.$refs.document, {
      //     margin: 0,
      //     filename: "document.pdf",
      //     image: { type: "jpeg", quality: 1 },
      //     jsPDF: { unit: "in", orientation: "portrait" },
      //   });
      // }
    },
  },
};
</script>
<style scoped>
p {
  color: black;
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

.subHeaderText {
  margin-top: 0px;
  margin-bottom: 0px;
  font-weight: 500;
  color: black;
}

.subHeaderSecundary {
  margin-bottom: 0px;
  margin-left: 5px;
  color: black;
}

.contentHeaderPrimary {
  margin: 5px;
  border: 1px solid;
  border-radius: 10px;
  color: white;
  padding-left: 5px;
  position: relative;
}

.contentHeaderSecundary {
  margin: 5px;
  border: 1px solid;
  border-radius: 10px;
  color: white;
  padding-left: 5px;
  position: relative;
}

.image {
  position: absolute;
  top: 1px;
  right: 10px;
  width: 200px;
  height: 200px;
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
.ml-8 {
  margin-left: 80px;
}

.mt-3 {
  margin-top: 30px;
}

.mb-05 {
  margin-bottom: 5px;
}

.stars {
  margin-top: -5px;
}

span {
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
    position: absolute;
    bottom: -10px;
    left: 20px;
}
</style>
