
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/home' },
      { path: '/home', component: () => import('pages/HomePage.vue') },
      { path: '/cvs', component: () => import('pages/CVsPage.vue') },
      { path: '/profile', component: () => import('pages/ProfilePage.vue') },
      { path: '/skills', component: () => import('pages/SkillsPage.vue') },
      { path: '/xp', component: () => import('pages/XPPage.vue') },
      { path: '/degree', component: () => import('pages/DegreePage.vue') },
      { path: '/extrainfo', component: () => import('pages/ExtraInfoPage.vue') },
      { path: '/letters', component: () => import('pages/LettersPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
