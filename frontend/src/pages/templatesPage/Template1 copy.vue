<template>
  <q-page backtop="24mm" backbottom="20mm">
    <div ref="document">
      <div class="row">
        <div
          class="col-3"
          style="
            background-color: blue;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          "
        >
          <img src="../../assets/logoOficial.png" />
          <h5 style="margin: 0">Profile:</h5>
          <h6 style="margin: 0">Profile</h6>
          <h6 style="margin: 0">Profile</h6>
          <h6 style="margin: 0">Profile</h6>
          <h6 style="margin: 0">Profile</h6>
        </div>

        <div class="col-9">
          <div class="row">
            <div class="col-7">
              <h6
                style="
                  margin: 5px;
                  border: 1px solid;
                  border-radius: 10px;
                  background-color: blue;
                  color: white;
                  padding-left: 5px;
                "
              >
                {{ $t("aboutMe") }}:
              </h6>
              <p style="margin: 0; margin-left: 15px">Profile</p>
              <p style="margin: 0; margin-left: 15px">Profile</p>
              <p style="margin: 0; margin-left: 15px">Profile</p>
              <p style="margin: 0; margin-left: 15px">Profile</p>
              <h1 style="color: red; font-style: normal"></h1>
            </div>
            <div class="col-5">
              <h6
                style="
                  margin: 5px;
                  padding-left: 5px;
                  border: 1px solid;
                  border-radius: 10px;
                  background-color: blue;
                  color: white;
                "
              >
                {{ $t("skills") }}:
              </h6>
              <p style="margin: 0; margin-left: 15px">Profile</p>
              <p style="margin: 0; margin-left: 15px">Profile</p>
              <p style="margin: 0; margin-left: 15px">Profile</p>
              <p style="margin: 0; margin-left: 15px">Profile</p>
              <h1 style="color: red; font-style: normal"></h1>
            </div>
            <div class="col-5">
              <h6
                style="
                  margin: 5px;
                  padding-left: 5px;
                  border: 1px solid;
                  border-radius: 10px;
                  background-color: blue;
                  color: white;
                "
              >
                {{ $t("education") }}:
              </h6>
              <p style="margin: 0; margin-left: 15px">Profile</p>
              <p style="margin: 0; margin-left: 15px">Profile</p>
              <p style="margin: 0; margin-left: 15px">Profile</p>
              <p style="margin: 0; margin-left: 15px">Profile</p>
              <h1 style="color: red; font-style: normal"></h1>
            </div>
            <div class="col-7">
              <h6
                style="
                  margin: 5px;
                  border: 1px solid;
                  border-radius: 10px;
                  background-color: blue;
                  color: white;
                  padding-left: 5px;
                "
              >
                {{ $t("experience") }}:
              </h6>
              <p style="margin: 0; margin-left: 15px">Profile</p>
              <p style="margin: 0; margin-left: 15px">Profile</p>
              <p style="margin: 0; margin-left: 15px">Profile</p>
              <p style="margin: 0; margin-left: 15px">Profile</p>
              <h1 style="color: red; font-style: normal"></h1>
            </div>
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
  name: "Template1R",
  components: {},
  methods: {
    exportToPDF() {
      html2pdf(this.$refs.document, {
        margin: 0,
        filename: "document.pdf",
        image: { type: "jpeg", quality: 1 },

        jsPDF: { unit: "in", orientation: "portrait" },
      });
    },
  },
  setup() {
    const store = useMessageStore();
    const { showMessage } = store;
    // `name` and `doubleCount` are reactive refs
    // This will also create refs for properties added by plugins
    // but skip any action or non reactive (non ref/reactive) property
    const { message, type, show } = storeToRefs(store);
    // the increment action can be just extracted

    const html2Pdf = ref(null);

    const generatePDF = () => {
      html2Pdf.value.generatePdf();
    };

    return {
      showMessage,
      html2Pdf,
    };
  },
};
</script>
<style scoped></style>
