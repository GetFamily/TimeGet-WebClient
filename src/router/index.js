import { createRouter, createWebHistory } from "vue-router";
import Occations from "../views/Occations.vue";

const routes = [
  {
    path: "/",
    redirect: "/occations"
  },
  {
    path: "/occations",
    name: "Occations",
    component: Occations
  },
  {
    path: "/religious-moments",
    name: "ReligiousMoments",
    // route level code-splitting
    // this generates a separate chunk (religious_moments.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "religious_moments" */ "../views/ReligiousMoments.vue")
  },
  {
    path: "/hadithes",
    name: "Hadithes",
    component: () =>
      import(/* webpackChunkName: "hadithes" */ "../views/Hadithes.vue")
  },
  {
    path: "/articles",
    name: "Articles",
    component: () =>
      import(/* webpackChunkName: "articles" */ "../views/Articles.vue")
  },
  {
    path: "/resource-introduction",
    name: "ResourceIntroduction",
    component: () =>
      import(/* webpackChunkName: "resource-introduction" */ "../views/ResourceIntroduction.vue")
  },
  {
    path: "/ladies",
    name: "Ladies",
    component: () =>
      import(/* webpackChunkName: "ladies" */ "../views/Ladies.vue")
  },
  {
    path: "/pregnancy",
    name: "Pregnancy",
    component: () =>
      import(/* webpackChunkName: "pregnancy" */ "../views/Pregnancy.vue")
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
