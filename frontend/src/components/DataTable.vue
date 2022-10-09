<template>
  <div class="q-pa-md">
    <q-table
      :dense="$q.screen.lt.md"
      :title="title ? $t(title) : ''"
      :rows="rows"
      :columns="columns"
      :filter="filter"
      :no-data-label="$t('noData')"
      :no-results-label="$t('noDataFilter')"
      row-key="name"
    >
      <template v-slot:top-left>
        <div>
          <div class="text-h5 text-italic q-mt-sm q-mb-xs">{{ $t(title) }}</div>
          <div class="text-caption text-grey" v-if="coolEdit">
            <q-icon name="info" color="blue" size="xs" />{{ $t("tabToEdit") }}
          </div>
        </div>
      </template>

      <template v-slot:top-right>
        <q-input
          v-if="searchable"
          filled
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          v-if="addable"
          class="q-ml-sm"
          rounded
          color="primary"
          icon-right="add"
          no-caps
          dense
          @click="$emit('add')"
        />
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ $t(col.label) }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td :props="props" :key="c.name" v-for="c in columns">
            {{ c.badged || c.image || c.switch ? "" : props.row[c.name] }}

            <q-badge
              :color="c.badgeColor ? c.badgeColor : 'green'"
              v-if="c.name !== 'actions' && c.badged"
            >
              {{ props.row[c.name] }}
            </q-badge>

            <q-avatar
              v-if="c.image"
              color="light-blue-1"
              :size="!$q.screen.gt.xs ? '60px' : 'xl'"
            >
              <img
                v-if="props.row[c.name]"
                :src="props.row[c.name]"
                :alt="c.name"
              />
            </q-avatar>

            <q-btn
              v-if="c.switch"
              flat
              round
              color="primary"
              :icon="props.row[c.name] ? 'check' : 'clear'"
            />

            <q-popup-edit
              v-if="c.name !== 'actions' && coolEdit"
              v-model="props.row[c.name]"
              :title="$t(c.updateText)"
              buttons
              v-slot="scope"
              :validate="
                (value) => {
                  return isValid(c, value);
                }
              "
              @hide="hide"
              @save="
                (value, initialValue) => {
                  save(c.name, value, props.row);
                }
              "
            >
              <q-input
                v-if="!c.image && !c.select && !c.switch"
                :type="c.type"
                v-model="scope.value"
                :error="error"
                :error-message="$t(errorMessage)"
                persistent
                filled
                dense
                autofocus
              />

              <q-toggle
                v-if="c.switch"
                :error="error"
                :error-message="$t(errorMessage)"
                v-model="scope.value"
                checked-icon="check"
                color="green"
                unchecked-icon="clear"
              />

              <q-select
                v-if="c.select"
                filled
                clearable
                v-model="scope.value"
                :options="options"
                option-value="id"
                option-label="desc"
                emit-value
                map-options
                style="min-width: 250px; max-width: 300px"
                :error="error"
                :error-message="$t(errorMessage)"
              />

              <q-file
                v-if="c.image"
                clearable
                bottom-slots
                :label="$t('selectImage')"
                v-model="scope.value"
                counter
                accept=".jpg, image/*"
                :error="error"
                :error-message="$t(errorMessage)"
              >
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
            </q-popup-edit>

            <q-btn
              v-if="c.name === 'actions' && deleteable"
              rounded
              color="negative"
              icon-right="delete"
              no-caps
              dense
              @click="$emit('del', props.row._id)"
            />

            <q-btn
              v-if="c.name === 'actions' && editable"
              class="q-ml-sm"
              rounded
              color="warning"
              icon-right="edit"
              no-caps
              dense
              @click="editval(props.row)"
            />
          </q-td>
        </q-tr>
      </template>
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-grey q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span> {{ message }} </span>
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "DataTable",
  emits: ["update"],
  props: {
    addable: {
      type: Boolean,
      default: false,
    },
    deleteable: {
      type: Boolean,
      default: false,
    },
    editable: {
      type: Boolean,
      default: false,
    },
    coolEdit: {
      type: Boolean,
      default: false,
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    rows: Array,
    columns: Array,
  },
  setup(props, { emit }) {
    const file = ref(null);
    const error = ref(false);
    const errorMessage = ref("");

    const save = async (key, val, row) => {
      let toSend = {};
      if (typeof val === "object") {
        await getBase64(val).then((data) => {
          file.value = data;
        });
        toSend = {
          img: file.value,
        };
      } else {
        file.value = null;
        toSend = {
          [key]: val,
        };
      }

      emit("update", { _id: row._id, row: toSend });
    };

    const getBase64 = async (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    const hide = () => {
      error.value = false;
      errorMessage.value = "";
    };

    const isValid = (col, val) => {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;

      if (col.required && (val === null || val === "")) {
        error.value = true;
        errorMessage.value = "required";
        return false;
      } else if (col.validateEmail && !emailPattern.test(val)) {
        error.value = true;
        errorMessage.value = "invalidEmail";
        return false;
      }
      error.value = false;
      errorMessage.value = "";
      file.value = null;
      return true;
    };

    const required = (val) => {
      if (val === null || val === "") {
        error.value = true;
        errorMessage.value = "required";
        return false;
      }
      error.value = false;
      errorMessage.value = "";
      file.value = null;
      return true;
    };

    const isValidEmail = (val) => {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      if (!emailPattern.test(val)) {
        error.value = true;
        errorMessage.value = "invalidEmail";
        return false;
      } else {
        error.value = false;
        errorMessage.value = "";
        file.value = null;
        return true;
      }
    };

    return {
      deleteval(del) {
        console.log(del, "DEL");
      },
      editteval(edit) {
        console.log(edit, "Edit");
      },
      filter: ref(""),
      error,
      file,
      errorMessage,
      required,
      isValid,
      isValidEmail,
      save,
      hide,
      options: [
        {
          id: "goog",
          desc: "Google",
        },
        {
          id: "fb",
          desc: "Facebook",
        },
        {
          id: "twt",
          desc: "Twitter",
        },
        {
          id: "app",
          desc: "Apple",
        },
        {
          id: "ora",
          desc: "Oracle",
        },
      ],
    };
  },
};
</script>
