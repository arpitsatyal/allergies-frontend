import { createRouter, createWebHistory } from "vue-router";

import Login from "../pages/Login.vue";
import Signup from "../pages/Signup.vue";
import Dashboard from "../pages/Dashboard.vue";
import { canUserAccess } from "@/utils/isAuthorized";
import CreateAllergy from "../pages/CreateAllergy.vue";
import UpdateAllergy from "../pages/UpdateAllergy.vue";
import AllergyProfile from "../pages/AllergyProfile.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/signup",
    name: "Sign Up",
    component: Signup,
    meta: {
      requiresAuth: false,
    },
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (!requiresAuth && canUserAccess()) {
    // redirect if user is logged in
    next("/dashboard");
  } else if (requiresAuth && !canUserAccess()) {
    // Check for protected route
    next("");
  } else {
    next();
  }
});

export default router;
