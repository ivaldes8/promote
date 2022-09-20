<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar class="glossy" style="height: 60px;">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="col text-center text-weight-bold">
          CurriCaminos
        </q-toolbar-title>

        <q-avatar color="light-blue-3" :size="!$q.screen.gt.xs ? '60px' : 'xl'"
          :style="!$q.screen.gt.xs ? 'position: absolute; z-index:10; left: 50%;margin-left: -30px;margin-top: 80px;' : ''">
          <img src="https://cdn.quasar.dev/img/avatar.png" alt="Ivan">
        </q-avatar>

        <q-toggle v-if="$q.screen.gt.xs" v-model="darkMode" @click="toggleDarkMode" icon="dark_mode" color="dark" />

        <q-select v-if="$q.screen.gt.xs" v-model="language" stack-label :options="localeOptions">
          <template v-slot:selected>
            <q-chip v-if="language" dense color="white" text-color="primary" class="q-my-none q-ml-xs q-mr-none">
              <q-avatar color="secundary" icon="language" />
              {{ language.label }}
            </q-chip>
            <q-badge v-else>*none*</q-badge>
          </template>
        </q-select>

        <q-btn round color="primary" icon="logout" />

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <EssentialLink v-for="link in essentialLinks" :dark="darkMode" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-footer v-if="!$q.screen.gt.xs" bordered class=" text-primary">
      <q-tabs :class="!darkMode ? 'bg-indigo-2' : 'bg-blue-grey-10'" dense align="justify">
        <FooterLink v-for="link in footerLinks" :dark="darkMode" :key="link.title" v-bind="link" />

        <q-toggle v-model="darkMode" @click="toggleDarkMode" icon="dark_mode" color="dark" />

        <q-select v-model="language" stack-label :options="localeOptions" style="width: 90%;">
          <template v-slot:selected>
            <q-chip v-if="language" dense color="white" text-color="primary" class="q-my-none  q-mr-none">
              <q-avatar color="secundary" icon="language" />
              {{ language.label }}
            </q-chip>
            <q-badge v-else>*none*</q-badge>
          </template>
        </q-select>
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn round icon="add" color="primary" class="glossy" />
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useQuasar } from 'quasar'

import { storeToRefs } from 'pinia'
import { useMessageStore } from 'src/stores/message-store';

import EssentialLink from 'components/EssentialLink.vue'
import FooterLink from 'src/components/FooterLink.vue'


const linksList = [
  {
    title: 'home',
    caption: 'homeCaption',
    icon: 'home',
    to: '/home'
  },
  {
    title: 'curricolums',
    caption: 'cvCaption',
    icon: 'auto_awesome_motion',
    to: '/cvs'
  },
  {
    title: 'profile',
    caption: 'profileCaption',
    icon: 'manage_accounts',
    separator: true,
    to: '/profile'
  },
  {
    title: 'skills',
    caption: 'skillsCaption',
    icon: 'scatter_plot',
    to: '/skills'
  },
  {
    title: 'experience',
    caption: 'xpCaption',
    icon: 'engineering',
    to: '/xp'
  },
  {
    title: 'degree',
    caption: 'degreeCaption',
    icon: 'school',
    to: '/degree'
  },
  {
    title: 'extraInfo',
    caption: 'extraInfoCaption',
    icon: 'info',
    to: '/extrainfo'
  },
  {
    title: 'letters',
    caption: 'lettersCaption',
    icon: 'mark_as_unread',
    to: '/letters'
  },
]

const footerLinks = [
  {
    title: 'home',
    icon: 'home',
    to: '/home'
  },
  {
    title: 'curricolums',
    icon: 'auto_awesome_motion',
    to: '/cvs'
  },
  {
    title: 'profile',
    icon: 'manage_accounts',
    to: '/profile'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    FooterLink
  },
  setup() {
    const $q = useQuasar()
    const leftDrawerOpen = ref(false)
    const darkMode = ref(false)

    const { t, locale } = useI18n({ useScope: 'global' })
    const language = ref(locale === 'es' ? { value: 'es', label: 'ES' } : { value: 'en-US', label: 'EN' })
    const localeOptions = [
      { value: 'en-US', label: 'EN' },
      { value: 'es', label: 'ES' }
    ]

    const store = useMessageStore()
    const { message, caption, status, type, show } = storeToRefs(store)
    const { hideMessage } = store

    watch(show, () => {
      if (show.value == true) {
        $q.notify({
          message: status.value + ' ' + t(message.value),
          caption: t(caption.value),
          type: type.value,
          position: 'top-right',
          progress: true,
          timeout: 1000,
          actions: [
            { icon: 'close', color: 'white', round: true }
          ]
        })
        hideMessage()
      }
    })

    watch(language, (lang) => {
      locale.value = lang.value
      import(`quasar/lang/${lang.value}`).then(language => {
        $q.lang.set(language.default)
      })
    })

    return {
      language,
      localeOptions,
      essentialLinks: linksList,
      footerLinks: footerLinks,
      darkMode,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      toggleDarkMode() {
        $q.dark.toggle()
      }
    }
  },
})
</script>
