import Vue from "vue";
import VueRouter from "vue-router";
import AuthRequired from "../utils/AuthRequired";

Vue.use(VueRouter);

export const routes = [
    {
        path:'/',
        component: () => import(/* webpackChunkName: "pages" */ "../pages"),
        redirect: "/home",
        beforeEnter: AuthRequired,
        children: [
            {
                path: "home",
                component: () =>
                    import(/* webpackChunkName: "dashboards" */ "../pages/Home")
            },
        ]
    },
    {
        path: "/user",
        component: () => import(/* webpackChunkName: "user" */ "../user"),
        redirect: "/user/login",
        children: [
          {
            path: "login",
            component: () =>
              import(/* webpackChunkName: "user" */ "../user/Login")
          },
          {
            path: "register",
            component: () =>
              import(/* webpackChunkName: "user" */ "../user/Register")
          }
        ]
      },
];
