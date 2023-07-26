const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/CatalogoProduto.vue") },
    ],
  },
  {
    path: "/admin",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/PagAdminHome.vue"),
      },
    ],
  },
  {
    path: "/admin/CadastroProduto",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/PagAdminCadastroProduto.vue"),
        name: "adminCadastroProduto",
      },
    ],
  },
  {
    path: "/admin/EditProduto/:id",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/PagAdminEditProduto.vue"),
      },
    ],
  },
  {
    path: "/admin/CadastroUser",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/PagAdminCadastroAdmin.vue"),
      },
    ],
  },
  {
    path: "/admin/EditUser/:id",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/PagAdminEditAdmin.vue"),
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
