<template>
    <div class="login">
      <!-- Modal -->
<div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Online Store</h5> 
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Create A New Account</a>
  </li>
  <li class="nav-item pull-right">
    <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Login</a>
  </li>
</ul>
<div class="tab-content" id="pills-tabContent">
  <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
     <h5 class="text-center">Create New Account</h5>
          <div class="form-group">
              <label for="name">Name</label>
              <input type="text" v-model="name" name="name" id="name" class="form-control" />
          </div>
           <div class="form-group">
              <label for="email">Email</label>
              <input type="email" v-model="email" name="email" id="email" class="form-control" />
          </div>
           <div class="form-group">
              <label for="password">Password</label>
              <input type="password" v-model="password" name="password" id="password" class="form-control" />
          </div>
     <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button  class="btn btn-primary" @click="register">Create Account</button>
      </div>
  </div>
  <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
      <h5 class="text-center">Login</h5>
           <div class="form-group">
              <label for="email">Email</label>
              <input type="email" v-model="email" name="email" id="email" class="form-control" />
          </div>
           <div class="form-group">
              <label for="password">Password</label>
              <input type="password" v-model="password" @keyup.enter="login" name="password" id="password" class="form-control" />
          </div>
     <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button  class="btn btn-primary" @click="login">Login</button>
      </div>
  </div> 
</div>
 </div>  
    </div>
  </div>
</div>
    </div>
</template>

<script>
//importing jquery to remove $ not found/undefined error
import $ from 'jquery';
//Importing firebase from firebase.js

import {fb,db} from '../firebase';
export default {
  name: "Login",
  props: {
    msg: String
  },
  data(){

     return {
          name:null,
          email:null,
          password:null

     }
  },
  methods: {
     login(){
    fb.auth().signInWithEmailAndPassword(this.email, this.password)
     .then((userCredential) => {
          // Signed in
          $('#login').modal('hide');
         
          this.$router.replace('admin');

          var user = userCredential.user;
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        });



     },
         register(){
           fb.auth().createUserWithEmailAndPassword(this.email,this.password)
              .then((user) => {
                // Signed in 
             //   $('#login').modal('hide');
                $('#login').modal('hide')
              //  var user = userCredential.user;
               // Add a new document in collection "profiles"
            //we are adding this code for addmng the username 
            //we are creating a collection against the currently logged in user
            //in profile as the user managment in auth in firebase doest not name field
            db.collection("profiles").doc(user.user.uid).set({
                name: this.name,
            })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });





                this.$router.replace('admin');
                // ...
              })
              .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // ..
              });

         }




  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .login{
    padding-top: 7rem;
    width: 100%;
    height: 500px;
    text-align: left;
  }
</style>