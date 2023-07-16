import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import("@/login/Login.vue"),
    },
    {
      path: '/example',
      name: 'example',
      component: () => import("@/example/exampleList.vue"),
    },
    {
      path: "/example/register",
      name: "register",
      component: () => import("@/example/exampleForm.vue"),
    },
    {
      path: "/example/:exampleId",
      name: "exampleReading",
      component: () => import("@/example/exampleForm.vue"),
    },
    {
      path: "/example/:exampleId/change-account",
      name: "changeAccount",
      component: () => import("@/example/ChangeAccountForm.vue"),
    },
    {
      path: "/example/:exampleId/edit",
      name: "exampleEdit",
      component: () => import("@/example/exampleChangePlanForm.vue"),
    },
    {
      path: "/:catchAll(.*)",
      redirect: { name: "login", },
    },
  ]
})

export default router
