<template>
    <div class="add-to-cart">
          <button class="btn btn-primary">{{productName}}</button>

    </div>
</template>

<script>

export default {
  name: "add-to-cart",
  props: {
    title: String,
    price: String,
    productId: String,
    image:String
  },
  data(){

     return {
          productName:this.title,
          productEmail:this.price,
          product_id:this.id

     }
  },
  methods: {
    


     },
       
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