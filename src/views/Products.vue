<template>
  <div class="products">
  

   <div class="container h-100">
       <div class="intro h-100 mt-10">
          <div class="row justify-content-center align-items-center">
           <div class="col-md-6">
             <h2>Products Page</h2>
             <p>Let's Overview Our products page ,Here is a little overview</p>
           </div>
           <div class="col-md-6">
            <img src="/img/svg/products.svg" alt="" class="img-fluid">
           </div>
          </div>


       </div>
      
     <hr>

     <div class="product-test">
       <h3 class="d-inline">Product Listing</h3>
       <button class="btn btn-primary float-right" @click="addNew">Add Product</button>
      <div class="table-responsive">
        <table class="table">
            <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tr v-for="product in products" :key="product.id">
              <td>{{product.title}}</td> 
               <td>{{product.price}}</td> 
            
              <td>
                <button class="btn btn-primary" @click="editProduct(product)">Modify</button>
                <button class="btn btn-danger" @click="deleteProduct(product)">Delete</button>
              </td> 
                </tr>

        </table>
      </div>
  </div>


     <!-- Modal -->
<div class="modal fade" id="addProduct" tabindex="-1" role="dialog" aria-labelledby="addProductlLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Product</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       <div class="row">
        <div class="col-md-8">
    
           <div class="form-group">
              <label for="title" class="float-left font-weight-bold">Title</label>
              <input type="title" v-model="product.title" name="product.title" id="title" class="form-control" />
          </div>
           <div class="form-group">
              <label for="description" class="float-left font-weight-bold">Description</label>
              <vue-editor id="editor1" v-model="product.description"></vue-editor>
             <!--  <textarea type="description" cols="6" rows="4" v-model="product.description" name="description" id="description" class="form-control"></textarea> -->
          </div>

        </div>
        <div class="col-md-4">
           <div class="form-group">
              <label for="price" class="float-left font-weight-bold">Product Price</label>
              <input type="price" v-model="product.price" name="price" id="price" class="form-control" />
          </div>
           <div class="form-group" >
             <span v-for="tag in product.tags" :key="tag.index" class="badge badge-primary text-wrap p-2 m-2 ">
                {{ tag }}
            </span>
              <label for="tags" class="float-left font-weight-bold">Product tags</label>
              <input type="text" @keyup.188="addTags()" v-model="tag" name="tags" id="tags" class="form-control" />
          </div>

          <div class="form-group">
              <label for="image" class="float-left font-weight-bold">Product Images</label>
              <input type="file" @change="uploadImage"  name="product.image" id="image" class="form-control" />
          </div>
          <div class="form-group d-flex">
                  <div class="p-1" v-for="(image,index) in product.images">
                        <img :src="image"  width="80px">
                        <span class="delete-img" @click="deleteImage(image,index)">X</span>
 
                  </div>
    


          </div>
        </div>

       </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" @click="addProduct" class="btn btn-primary" v-if="modal=='new'">Save changes</button>
         <button type="button" @click="updateProduct()" class="btn btn-primary" v-if="modal=='edit'">Update changes</button>
        
      </div>
    </div>
  </div>
</div>











  </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { fb,db } from '../firebase';
import Swal from 'sweetalert2';
window.Swal = Swal;
import { VueEditor } from "vue2-editor";
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name:"Products",
   props: {
  //  msg: String
  },
  components: {
    VueEditor
  },
      data() {

       return {
            products:[],
            product:{
                 title:null,
                 description:null,
                 price:null,
                 tags:[],
                 images:[]

            },
            activeItem:null,
            modal :null,
            tag :null

       }
      },
      firestore () {
    return {
        // Collection
        products: db.collection('products'),
        
    }
  },
      methods:{
        deleteImage(img,index){

            let image = fb.storage().refFromURL(img);
              this.product.images.splice(index,1);
              image.delete().then(function() {
                console.log('image deleted');
              }).catch(function(error) {
                // Uh-oh, an error occurred!
                console.log('an error occurred');
              });


        },
        uploadImage(e){
   //we are passing/using this if conidtion to avoid the error
   //if the user do not select image and cancel it,
   //if not used this if condition it will throw error
          if(e.target.files[0]){
           let file = e.target.files[0];
         // console.log(e.target.files[0]);
         var storageRef = fb.storage().ref('products/'+ file.name);
             let uploadTask = storageRef.put(file);

           uploadTask.on('state_changed', 
            (snapshot) => {

            }, 
            (error) => {
              // Handle unsuccessful uploads
            }, 
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                this.product.images.push(downloadURL);
                console.log('File available at', downloadURL);
              });
            }
          );




          }

        },
        addTags(){
           this.product.tags.push(this.tag);
           this.tag ='';



        },
        updateProduct(){
            this.$firestore.products.doc(this.product.id).update(this.product)
            Toast.fire({
            icon: 'success',
            title: 'Updated successfully'
          });
                 $('#addProduct').modal('hide');
        },

        editProduct(product){
         this.modal ='edit';
       //  this.activeItem =product.activeItem['.key'];
          this.product =product;
            $('#addProduct').modal('show');
          
        },


   //this is not working there is some issue in it

        deleteProduct(doc){
             Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                     console.log(doc['.key']);
                    // this.$firestore.persons.doc(person['.key']).delete()
                     this.$firestore.products.doc(doc.id).delete()
                      Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      ) 
                    }
                  });


        },
        reset(){
           this.product = {
                 title:null,
                 description:null,
                 price:null,
                 tags:[],
                 images:[]

           }
        },
        addNew(){
            this.modal = 'new';
            this.reset();
           $('#addProduct').modal('show');

        },
        addProduct(){
         //  this.modal = 'new';
        this.$firestore.products.add(this.product);
          $('#addProduct').modal('hide');

        }


      }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.img-wrapp{
  position: relative;
}
.img-wrapp span.delete-img{
    position: absolute;
    top: -14px;
    left: -2px;
}
.img-wrapp span.delete-img:hover{
  cursor: pointer;
}
</style>