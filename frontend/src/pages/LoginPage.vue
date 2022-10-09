<template>
  <q-page class="q-mt-md">
    <div class="q-pa-md">
      <div class="row justify-center">
        <div class="col-12 col-md-6 col-sm-6">
          <q-card>
            <q-card-section>
              <div class="text-h6 text-italic">
                {{ registerActive ? $t("signup") : $t("signin") }}
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-form @submit="onSubmit" class="q-gutter-md">
                <q-input
                  v-if="registerActive"
                  filled
                  v-model="form.name"
                  :label="$t('name')"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || $t('required')]"
                />

                <q-input
                  v-if="registerActive"
                  filled
                  v-model="form.lastName"
                  :label="$t('lastName')"
                />

                <q-input
                  v-if="registerActive"
                  filled
                  type="number"
                  v-model="form.phone"
                  :label="$t('phoneNumber')"
                />

                <q-input
                  v-if="registerActive"
                  filled
                  v-model="form.address"
                  :label="$t('address')"
                />

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

                <q-input
                  v-model="form.password"
                  filled
                  :type="isPwd ? 'password' : 'text'"
                  :label="$t('password')"
                  lazy-rules
                  :rules="[
                    (val) => (val !== null && val !== '') || $t('required'),
                    (val) => val.length >= 6 || $t('weakPassword'),
                  ]"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>

                <div class="row forms-button-container">
                  <q-btn
                    class="form-button-left"
                    outline
                    :label="
                      registerActive ? $t('backToLogin') : $t('dontHaveAccount')
                    "
                    @click="registerActive = !registerActive"
                    size="sm"
                    color="primary"
                  />

                  <q-btn
                    class="form-button-right"
                    :label="registerActive ? $t('register') : $t('login')"
                    type="submit"
                    color="primary"
                    :loading="$q.loading.isActive"
                    :icon-right="registerActive ? 'person_add' : 'login'"
                  />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useAuthStore } from "src/stores/auth-store";

export default {
  name: "LoginPage",
  setup() {
    const $q = useQuasar();
    const { t } = useI18n();
    const form = ref({});
    const registerActive = ref(false);
    const router = useRouter();

    const { Login, Register } = useAuthStore();

    const onSubmit = async () => {
      if (registerActive.value) {
        const data = {
          name: form.value.name,
          lastName: form.value.lastName,
          email: form.value.email,
          phone: form.value.phone,
          address: form.value.address,
          password: form.value.password,
          role: "User",
        };
        await Register(data);
      } else {
        const data = {
          email: form.value.email,
          password: form.value.password,
        };
        await Login(data);
      }
    };

    return {
      form,
      registerActive,
      isPwd: ref(true),
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

<style scoped>
.forms-button-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.form-button-left {
  justify-content: flex-start;
}

.form-button-right {
  justify-content: flex-end;
}
</style>
