<template>
  <div>
    <h1>Post New Item</h1>
      <p>Title:</p>
          <input type="text" v-model="title">
        <p>description:</p>
         <input type="text" v-model="desc">
        <p>price:</p>
         <input type="text" v-model="price">
         <br>
    <label>Category:</label><br>
    <select v-model="category">
      <option value=1 >Books</option>
      <option value=2>Car</option>
      <option value=3>Electronics</option>
      <option value=4>Furniture</option>
      <option value=5>Others</option>
    </select>
    <br>
    <button @click="post">POST</button>
  </div>
</template>

<script>
    import axios from 'axios';
    export default {
     
      data () {
        return {
          baseurl:"http://localhost:8181/",
          userid:null,
          title:null,
          desc:null,
          price:null,
          category:1,
        }
      },

      methods:{
          post(){
            console.log(this.category);
            axios({
                  method:'GET',
                  url: this.baseurl+"item/post?id="+this.userid+"&categoryId="+this.category+"&title="+this.title+
                  "&desc="+this.desc+"&price="+this.price,
            }).then(function(response){
                console.log(response);
                if(response.data.code==1){
                  alert(response.data.message);
                }
                else{
                  alert(response.data.message);
                }
            }).catch(function(error){
                console.log(error);
            });
          }
      },
      mounted(){  
            var that = this;
            this.userid = localStorage.getItem("userid");
            console.log(this.userid);
           
      }, 
    }
</script>


<style scoped>

</style>
