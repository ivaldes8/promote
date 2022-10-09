const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", redirect: "/home" },
      {
        path: "/login",
        name: "Login",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "/home",
        name: "Home",
        component: () => import("pages/HomePage.vue"),
      },
      {
        path: "/cvs",
        name: "CV",
        component: () => import("pages/CVsPage.vue"),
      },
      {
        path: "/profile",
        name: "Profile",
        component: () => import("pages/ProfilePage.vue"),
      },
      {
        path: "/skills",
        name: "Skill",
        component: () => import("pages/SkillsPage.vue"),
      },
      { path: "/xp", name: "XP", component: () => import("pages/XPPage.vue") },
      {
        path: "/degree",
        name: "Degree",
        component: () => import("pages/DegreePage.vue"),
      },
      {
        path: "/extrainfo",
        name: "Info",
        component: () => import("pages/ExtraInfoPage.vue"),
      },
      {
        path: "/letters",
        name: "Letter",
        component: () => import("pages/LettersPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
