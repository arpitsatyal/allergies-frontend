import { createRouter, createWebHistory } from "vue-router";

import Login from "../pages/Login.vue";
import Users from "../pages/Users.vue";
import Signup from "../pages/Signup.vue";
import FAQ from '../pages/FAQ.vue';
import NotFound from "../pages/NotFound.vue";
import Dashboard from "../pages/Dashboard.vue";
import CreateAllergy from "../pages/CreateAllergy.vue";
import UpdateAllergy from "../pages/UpdateAllergy.vue";
import AllergyProfile from "../pages/AllergyProfile.vue";

import { isUserTheAdmin } from "@/composables/isAdmin";
import { canUserAccess } from "@/composables/isAuthorized";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Sign Up",
    component: Signup,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/faq",
    name: "FAQ",
    component: FAQ,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/add-allergy",
    name: "CreateAllergy",
    component: CreateAllergy,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/edit-allergy/:id",
    name: "UpdateAllergy",
    component: UpdateAllergy,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile/:id",
    name: "AllergyProfile",
    component: AllergyProfile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: {
      requiresAuth: true,
      isAdminRoute: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: { notFound: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {

  const isNotFound = to.matched.some(({ meta }) => meta.notFound);
  const isAdminRoute = to.matched.some(({ meta }) => meta.isAdminRoute);
  const requiresAuth = to.matched.some(({ meta }) => meta?.requiresAuth);

  if (!requiresAuth && !isNotFound && canUserAccess()) {
    next("/dashboard");
  } else if (requiresAuth && !canUserAccess()) {
    next("/");
  } else if (isAdminRoute && !isUserTheAdmin()) {
    next("/not-found");
  } else {
    next();
  }
});

export default router;
