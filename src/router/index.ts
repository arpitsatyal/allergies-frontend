import { createRouter, createWebHistory } from "vue-router";

import Login from "../pages/Login.vue";
import Users from "../pages/Users.vue";
import Signup from "../pages/Signup.vue";
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

  const isAdmin = isUserTheAdmin();
  
  const requiresAuth = to.matched.some(({ meta }) => meta?.requiresAuth);
  const isNotFound = to.matched.some(({ meta }) => meta.notFound);
  const isAdminRoute = to.matched.some(({ meta }) => meta.isAdminRoute);

  if (!requiresAuth && !isNotFound && canUserAccess()) {
    // redirect if user is logged in
    next("/dashboard");
  } else if (requiresAuth && !canUserAccess()) {
    // Check for protected route
    next("/");
  } else if (isAdminRoute && !isAdmin.value) {
    // protect admin routes
    next("/not-found");
  } else {
    next();
  }
});

export default router;
