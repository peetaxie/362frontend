<template>
  <div>
    <div class="header">
      <a style="font-size: 20px;font-weight: bold;" href="#/profile362">{{useremail}}</a>
      <input type="text" v-model="searchkey" placeholder="search items"><button @click="searchitem" style="margin-right: 100px;">search</button>
        <a style="margin-right: 20px;" href="#/postitem362">Post Item</a>
      <a  href="#/transaction362">My Order</a>
      <button style="float: right;" @click="logout">logout</button>
    </div>
    <div class="items">
      <div class="item" v-for="(item,index) in items">
        <p>title:</p>
        <p class="item_text">{{item.title}}</p>
        <p>description:</p>
         <p class="item_text">{{item.description}}</p>
        <p>price:</p>
         <p class="item_text" style="color: red">${{item.price}}</p>
        <p>category:</p>
         <p class="item_text" style="color: blue">{{item.category.name}}</p> 
         <button @click="jump(item.id)">More Detail</button>
      </div>
    </div>
    <br>
      <h2 style="color: red">Suggest items</h2>
    <div class="items" v-if="suggestitem">
      <div  class="item" v-for="(item,index) in suggestitem">
        <p>title:</p>
        <p class="item_text">{{item.title}}</p>
        <p>description:</p>
         <p class="item_text">{{item.description}}</p>
        <p>price:</p>
         <p class="item_text" style="color: red">${{item.price}}</p>
        <p>category:</p>
         <p class="item_text" style="color: blue">{{item.category.name}}</p> 
         <button @click="jump(item.id)">More Detail</button>
      </div>
    </div>
        <p v-else>Not any items suggest</p>
  </div>
</template>

<script>
    import axios from 'axios';
    export default {
     
      data () {
        return {
          baseurl:"http://localhost:8181/",
          useremail:null,
          items:null,
          suggestitem:null,
          searchkey:null,
        }
      },

      methods:{
        jump(itemid){
          console.log(itemid);
          this.$router.push({path:'/itemdetail362',query: {id:itemid}});
        },
        searchitem(){
          var that = this;
          if(this.searchkey!=null){
            axios({
                  method:'GET',
                  url: this.baseurl+"item/search?key="+this.searchkey,
            }).then(function(response){
                console.log(response);
                if(response.data.message){
                    alert(response.data.message);
                }
                else{
                  that.items=response.data;
                }

            }).catch(function(error){
                console.log(error);
            });
          }
        },
        logout(){
          localStorage.removeItem("useremail");
          localStorage.removeItem("userid");
          window.location.href='#/login362';
        }
      },
      mounted(){  
            var that = this;
            this.useremail=localStorage.getItem("useremail");
            var userid = localStorage.getItem("userid");
            console.log("useremail",this.useremail);
            axios({
                  method:'GET',
                  url: this.baseurl+"item/getallitems",
            }).then(function(response){
                console.log(response);
                that.items=response.data;

            }).catch(function(error){
                console.log(error);
            });
            axios({
                  method:'GET',
                  url: this.baseurl+"item/suggest?userid="+userid,
            }).then(function(response){
                console.log(response);
                if(response.data.message){
                }
                else{
                  that.suggestitem=response.data;
                }

            }).catch(function(error){
                console.log(error);
            });

      }, 
    }
</script>


<style scoped>
.header{
  height: 50px;
}
.item{
  display: table-cell;
  width: 200px;
  height: auto;
  border: 1px solid red;
}
.items{
    display: table;
    border: 1px solid black;
}
.item_text{
  font-size: 16px;
  font-weight: bold;
}
</style>
