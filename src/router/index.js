import Vue from "vue";
import Router from "vue-router";
import Home from "views/home";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const config = {
  routes,
  scrollBehavior: () => 0,
};

const router = new Router(config);

router.beforeEach((to, from, next) => {
  next();
});

router.afterEach((to, from) => {});

export default router;
