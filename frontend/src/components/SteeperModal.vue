<template>
  <q-page>
    <div class="q-pa-md q-gutter-sm">
      <q-dialog
        full-width
        v-model="show"
        transition-show="rotate"
        @hide="$emit('close')"
      >
        <q-card style="width: 90%">
          <q-card-section class="row items-center">
            <div class="text-h6">{{ $t(title) }}</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-separator />

          <q-card-section style="max-height: 50vh" class="scroll">
            <q-stepper v-model="step" vertical color="primary" animated>
              <q-step
                :name="1"
                :title="$t('profile') + ' ' + $t('req')"
                :caption="$t('profileCaption')"
                icon="manage_accounts"
                :done="step > 1"
              >
                <q-btn
                  flat
                  color="primary"
                  :label="$t('open')"
                  icon="open_in_new"
                  class="q-ml-sm"
                  @click="$router.push('profile')"
                />

                <q-stepper-navigation>
                  <q-btn
                    @click="step = 2"
                    color="primary"
                    :label="$t('next')"
                  />
                </q-stepper-navigation>
              </q-step>

              <q-step
                :name="2"
                :title="$t('skills') + ' ' + $t('req')"
                :caption="$t('skillsCaption')"
                icon="scatter_plot"
                :done="step > 2"
              >
                <q-btn
                  flat
                  color="primary"
                  :label="$t('open')"
                  icon="open_in_new"
                  class="q-ml-sm"
                  @click="$router.push('skills')"
                />

                <q-stepper-navigation>
                  <q-btn
                    @click="step = 3"
                    color="primary"
                    :label="$t('next')"
                  />
                  <q-btn
                    flat
                    @click="step = 1"
                    color="primary"
                    :label="$t('back')"
                    class="q-ml-sm"
                  />
                </q-stepper-navigation>
              </q-step>

              <q-step
                :name="3"
                :title="$t('about') + ' ' + $t('req')"
                :caption="$t('aboutCaption')"
                icon="badge"
                :done="step > 3"
              >
                <q-btn
                  flat
                  color="primary"
                  :label="$t('open')"
                  icon="open_in_new"
                  class="q-ml-sm"
                  @click="$router.push('about')"
                />

                <q-stepper-navigation>
                  <q-btn
                    @click="step = 4"
                    color="primary"
                    :label="$t('next')"
                  />
                  <q-btn
                    flat
                    @click="step = 2"
                    color="primary"
                    :label="$t('back')"
                    class="q-ml-sm"
                  />
                </q-stepper-navigation>
              </q-step>

              <q-step
                :name="4"
                :title="$t('experience') + ' ' + $t('req')"
                :caption="$t('xpCaption')"
                icon="engineering"
                :done="step > 4"
              >
                <q-btn
                  flat
                  color="primary"
                  :label="$t('open')"
                  icon="open_in_new"
                  class="q-ml-sm"
                  @click="$router.push('xp')"
                />

                <q-stepper-navigation>
                  <q-btn
                    @click="step = 5"
                    color="primary"
                    :label="$t('next')"
                  />
                  <q-btn
                    flat
                    @click="step = 3"
                    color="primary"
                    :label="$t('back')"
                    class="q-ml-sm"
                  />
                </q-stepper-navigation>
              </q-step>

              <q-step
                :name="5"
                :title="$t('projects') + ' ' + $t('optional')"
                :caption="$t('projectCaption')"
                icon="engineering"
                :done="step > 5"
              >
                <q-btn
                  flat
                  color="primary"
                  :label="$t('open')"
                  icon="open_in_new"
                  class="q-ml-sm"
                  @click="$router.push('project')"
                />

                <q-stepper-navigation>
                  <q-btn
                    @click="step = 6"
                    color="primary"
                    :label="$t('next')"
                  />
                  <q-btn
                    flat
                    @click="step = 4"
                    color="primary"
                    :label="$t('back')"
                    class="q-ml-sm"
                  />
                </q-stepper-navigation>
              </q-step>

              <q-step
                :name="6"
                :title="$t('languages') + ' ' + $t('optional')"
                :caption="$t('languageCaption')"
                icon="translate"
                :done="step > 6"
              >
                <q-btn
                  flat
                  color="primary"
                  :label="$t('open')"
                  icon="open_in_new"
                  class="q-ml-sm"
                  @click="$router.push('lang')"
                />

                <q-stepper-navigation>
                  <q-btn
                    @click="step = 7"
                    color="primary"
                    :label="$t('next')"
                  />
                  <q-btn
                    flat
                    @click="step = 5"
                    color="primary"
                    :label="$t('back')"
                    class="q-ml-sm"
                  />
                </q-stepper-navigation>
              </q-step>

              <q-step
                :name="7"
                :title="$t('degree') + ' ' + $t('optional')"
                :caption="$t('degreeCaption')"
                icon="translate"
                :done="step > 7"
              >
                <q-btn
                  flat
                  color="primary"
                  :label="$t('open')"
                  icon="open_in_new"
                  class="q-ml-sm"
                  @click="$router.push('degree')"
                />

                <q-stepper-navigation>
                  <q-btn
                    @click="step = 8"
                    color="primary"
                    :label="$t('next')"
                  />
                  <q-btn
                    flat
                    @click="step = 5"
                    color="primary"
                    :label="$t('back')"
                    class="q-ml-sm"
                  />
                </q-stepper-navigation>
              </q-step>

              <q-step
                :name="8"
                :title="$t('extraInfo') + ' ' + $t('optional')"
                :caption="$t('extraInfoCaption')"
                icon="info"
                :done="step > 8"
              >
                <q-btn
                  flat
                  color="primary"
                  :label="$t('open')"
                  icon="open_in_new"
                  class="q-ml-sm"
                  @click="$router.push('extrainfo')"
                />

                <q-stepper-navigation>
                  <q-btn
                    @click="step = 9"
                    color="primary"
                    :label="$t('next')"
                  />
                  <q-btn
                    flat
                    @click="step = 7"
                    color="primary"
                    :label="$t('back')"
                    class="q-ml-sm"
                  />
                </q-stepper-navigation>
              </q-step>

              <q-step
                :name="9"
                :title="$t('letters') + ' ' + $t('optional')"
                :caption="$t('extraInfoCaption')"
                icon="mark_as_unread"
                :done="step > 9"
              >
                <q-btn
                  flat
                  color="primary"
                  :label="$t('open')"
                  icon="open_in_new"
                  class="q-ml-sm"
                  @click="$router.push('letters')"
                />

                <q-stepper-navigation>
                  <q-btn
                    @click="step = 10"
                    color="primary"
                    :label="$t('next')"
                  />
                  <q-btn
                    flat
                    @click="step = 8"
                    color="primary"
                    :label="$t('back')"
                    class="q-ml-sm"
                  />
                </q-stepper-navigation>
              </q-step>

              <q-step
                :name="10"
                :title="$t('curricolums') + ' ' + $t('req')"
                :caption="$t('cvCaption')"
                icon="auto_awesome_motion"
                :done="step > 10"
              >
                <q-btn
                  flat
                  color="primary"
                  :label="$t('open')"
                  icon="open_in_new"
                  class="q-ml-sm"
                  @click="$router.push('cvs')"
                />

                <q-stepper-navigation>
                  <q-btn
                    flat
                    @click="step = 9"
                    color="primary"
                    :label="$t('back')"
                    class="q-ml-sm"
                  />
                  <q-btn
                    @click="$emit('close')"
                    color="primary"
                    :label="$t('close')"
                    class="q-ml-sm"
                  />
                </q-stepper-navigation>
              </q-step>
            </q-stepper>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "ModalVue",
  props: {
    showDialog: Boolean,
    title: String,
  },
  setup(props) {
    const show = ref(false);

    watch(props, () => {
      show.value = props.showDialog;
    });

    return { show, step: ref(1) };
  },
};
</script>
