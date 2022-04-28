import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("./views/Home.vue"),
  },
  {
    path: "/selector",
    name: "Selector",
    component: () => import("./views/Selector.vue"),
  },
  {
    path: "/songs",
    name: "Songs",
    component: () => import("./views/Songs.vue"),
  },
  {
    path: "/songs/:id",
    name: "SongDetail",
    component: () => import("./views/SongDetail.vue"),
  },
  {
    path: "/patterns/:id",
    name: "PatternDetail",
    component: () => import("./views/PatternDetail.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("./views/Profile.vue"),
  },
  {
    path: "/profile/preference",
    name: "ProfilePreference",
    component: () => import("./views/ProfilePreference.vue"),
  },
  {
    path: "/users/:id",
    name: "UserDetail",
    component: () => import("./views/UserDetail.vue"),
  },
  {
    path: "/tables",
    name: "Tables",
    component: () => import("./views/Tables.vue"),
  },
  {
    path: "/tables/:id",
    name: "TableDetail",
    component: () => import("./views/TableDetail.vue"),
  },
  {
    path: "/developer",
    name: "Developer",
    component: () => import("./views/Developer.vue"),
  },
  {
    path: "/developer/docs",
    name: "DeveloperDocumentation",
    component: () => import("./views/DeveloperDocumentation.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("./views/Login.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("./views/About.vue"),
  },

  
  {
    path: "/steam-signin",
    name: "Steam Singin Process",
    component: () => import("./views/SteamSignin.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;