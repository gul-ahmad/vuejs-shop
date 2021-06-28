/* eslint-disable vue/no-unused-components */


import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import 'bootstrap';
import './assets/app.scss';

import jQuery from 'jquery';
window.$ =window.jQuery =jQuery;
import $ from 'jquery';
import 'popper.js';
require('firebase/firestore')


//this line for the id of products using vuefirestore
Vue.use(VueFirestore, {
  key: 'id',         // the name of the property. Default is '.key'.
  enumerable: true  //  whether it is enumerable or not. Default is true.
})



import {fb} from './firebase';
import VueFirestore from 'vue-firestore';
Vue.use(VueFirestore);









Vue.component('Navbar',require('./components/Navbar.vue').default);
Vue.component('Hero',require('./components/Hero.vue').default);
Vue.component('add-to-cart',require('./components/AddToCart.vue').default);
Vue.component('Products',require('./components/sections/Products.vue').default);
Vue.component('productsList',require('./components/sections/ProductsList.vue').default);

import VueCarousel from 'vue-carousel'; 
Vue.use(VueCarousel);

import Swal from 'sweetalert2';
window.Swal = Swal;

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});
window.Toast =Toast;
//Vue.use(Swal);


//for currency filters and other things
import Vue2Filters from 'vue2-filters';
Vue.use(Vue2Filters);

Vue.config.productionTip = false;

let app ='';

fb.auth().onAuthStateChanged((user) => {
  if (!app) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    new Vue({
      router,
      render: (h) => h(App),
    }).$mount("#app");
    var uid = user.uid;
    // ...
  } 
});


