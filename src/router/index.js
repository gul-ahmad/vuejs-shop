import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import Overview from "../views/Overview.vue";
import Products from "../views/Products.vue";
import Profile from "../views/Profile.vue";

import {fb} from '../firebase';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    //Below line is for authentication
    meta: { requiresAuth: true },
    children :[
      {
        path: "overview",
        name: "Overview",
        component: Overview
      },
      {
        path: "products",
        name: "Products",
        component: Products
      },
      {
        path: "profile",
        name: "profile",
        component: Profile
      },
    ]
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

//Doing authentication below
//for vue routers

router.beforeEach((to, from, next) => {
  const requiresAuth =to.matched.some(x=>x.meta.requiresAuth)
  const currentUser = fb.auth().currentUser
 // if (to.matched.some(record => record.meta.requiresAuth)) {
  
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (requiresAuth && !currentUser) {
      next('/')
    } else if(requiresAuth && currentUser) {
      next()
    }
    else {
      next() // make sure to always call next()!
     }
});

export default router;
