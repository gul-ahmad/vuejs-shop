<template>
  <div class="products" id="products">
    <div class="container">
      <h1 class="text-center p-5">Our Products</h1>
      <div class="row">
        <div class="col-md-4" v-for="product in products" :key="product.id">
          <div class="card product-item">

            <carousel :per-page="1">
   
                <slide v-for="(image,index) in product.images" :key="index.id">
                <img :src="image" class="card-img-top"  alt="..."  width="250px" />
                </slide>
            </carousel>   
            <div class="card-body">
              <div class="d-flex justify-content-between">
                        <h6 class="card-title">{{product.title}}</h6>
                        <h4 class="card-price">{{product.price | currency}}</h4>
              </div>

                <add-to-cart 
             :image="getImage(product.images)"
             :product-id="product.id"
             :price="product.price"
             :title="product.title">
             </add-to-cart>
            
            
            </div>
          </div>
        </div>

     

     
      </div>
    </div>
  </div>
</template>

<script>
import {db} from '@/firebase';
//import AddToCart from '../AddToCart.vue';
export default {
  name: "Products-list",
  
   // AddToCartprops: {
   // msg: String
 // },
data(){
    return {
        products: [],
     
    }
  },
  methods:{
    
    getImage(images){
   
     // console.log(images[0]);
      return (images[0]);
   
    }
  },
  firestore(){
      return {
        products: db.collection('products'),
      }
  },
};
</script>

