<template>
  <div>
    <div>My Cart</div>
       <table style="width:100%">
        <tr>
          <th>Id</th>
          <th>ItemId</th>
          <th>ItemName</th>
          <th>Price</th>
          <th>Other</th>
        </tr>
        <tr v-if="cart.length>0" v-for="(item,index) in cart">
          <td>{{item.id}}</td>
          <td>{{item.itemid}}</td>
          <td>{{item.item.title}}</td>
          <td>{{item.item.price}}</td>
          <td><button @click="remove(item.id)">remove item</button></td>
          </tr>
      </table>
      <br>
      <div v-if="cart.length">
    <button @click="payall">Pay</button>
    <span> or </span>
    <button @click="paybycard">Pay By Card</button>
    </div>
    <br>

    <div v-if="cart.length">
    <div>My Coupons</div>
    <div v-if="coupons.length==0">you don't have any coupon</div>
    <div v-else>
      <div class="coupon" v-for="(c,index) in coupons">
        <span >{{c.discount}}%</span>
          <button @click="paywithcoupon(c.id,c.userid)">Pay with Coupon</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
    import axios from 'axios';
    export default {
     
      data () {
        return {
          baseurl:"http://localhost:8181/",
          items:null,
          userid:null,
          username:null,
          useremail:null,
          cart:[],
          coupons:[],

        }
      },

      methods:{
          getcart(){
            var that = this;
            this.cart=[];
            axios({
                  method:'GET',
                  url: this.baseurl+"cart/getcartitems?userid="+this.userid,
            }).then(function(response){
                console.log("cart",response);
                if(response.data.code==0){
                  alert(response.data.message);
                }
                else{
                  that.cart=response.data;
                }
            }).catch(function(error){
                console.log(error);
            });
          },
          remove(id){
            var that = this;
            console.log(id);
            axios({
                  method:'GET',
                  url: this.baseurl+"cart/removeitemfromcart?cardid="+id,
            }).then(function(response){
                console.log("cart",response);
                if(response.data.code==0){
                  alert(response.data.message);
                }
                else{
                  that.cart=response.data;
                }
            }).catch(function(error){
                console.log(error);
            });
            that.getcart();
          },
          payall(){
            var that = this;
             axios({
                  method:'GET',
                  url: this.baseurl+"cart/paybycart?buyerId="+this.userid,
            }).then(function(response){
                console.log("cart",response);
                if(response.data.code==0){
                  alert(response.data.message);
                }
                else{
                  that.cart=response.data;
                }
            }).catch(function(error){
                console.log(error);
            });
             that.getcart();
          },
          paybycard(){
            var that = this;
            axios({
                  method:'GET',
                  url: this.baseurl+"card/paybycard?buyerId="+this.userid,
            }).then(function(response){
                console.log("cart",response);
                if(response.data.code==0){
                  alert(response.data.message);
                }
                else{
                  alert(response.data.message);
                  that.getcart();
                }
            }).catch(function(error){
                console.log(error);
            });
         
          },
          getcoupon(){
            var that = this;
            axios({
                  method:'GET',
                  url: this.baseurl+"coupon/getallcoupons?userid="+this.userid,
            }).then(function(response){
                console.log("coupon",response);
                if(response.data.code==0){
                  alert(response.data.message);
                }
                else{
                  that.coupons=response.data;
                }
            }).catch(function(error){
                console.log(error);
            });
          }
      },
      mounted(){  
            var that = this;
            this.useremail=localStorage.getItem("useremail");
            var userid = localStorage.getItem("userid");
            this.userid=userid;
            this.username = localStorage.getItem("username");
            console.log("useremail",this.useremail,this.username,this.userid);
            console.log("username",this.username);
            this.getcart();
            this.getcoupon();

      }, 
    }
</script>


<style scoped>
.coupon{
  display: inline-block;
  width: 100px;
  height: 50px;
  font-size: 35px;
  text-align: center;
  font-weight: bold;
  color: red;
  border: 1px solid green;
}
.coupon button{
  font-size: 12px;
}
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
th, td {
  padding: 5px;
  text-align: left;    
}
</style>
