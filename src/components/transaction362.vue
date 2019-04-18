<template>
  <div>
    <h1>My Order</h1>
    <table style="width:100%">
        <tr>
          <th>OrderNumber</th>
          <th>ItemId</th>
          <th>Seller</th>
          <th>Buyer</th>
          <th>Time</th>
          <th>Cancel</th>
        </tr>
        <tr v-for="(order) in orders">
          <td>{{order.id}}</td>
          <td>{{order.item.id}}</td>
          <td>{{order.seller.id}}</td>
          <td>{{order.buyer.id}}</td>
          <td>{{order.dateTime}}</td>
          <td><button @click="returnorder(order.id)">return order</button></td>
        </tr>
</table>
  </div>
</template>

<script>
    import axios from 'axios';
    export default {
     
      data () {
        return {
          baseurl:"http://localhost:8181/",
          orders:null,
          userid:null
        
        }
      },

      methods:{
          returnorder(id){
            console.log(id);
            axios({
                  method:'GET',
                  url: this.baseurl+"transaction/return?buyerId="+this.userid+"&transId="+id,
            }).then(function(response){
                console.log(response);
                alert(response.data.message);
                location.reload();
            }).catch(function(error){
                console.log(error);
            });
          }
      },
      mounted(){  
            var that = this;
            this.userid= localStorage.getItem("userid");
            axios({
                  method:'GET',
                  url: this.baseurl+"transaction/getorder?buyerId="+this.userid,
            }).then(function(response){
                console.log(response);
                if(response.data.code==0){
                  alert(response.data.message);
                }
                else{
                  that.orders=response.data
                }

            }).catch(function(error){
                console.log(error);
            });
      }, 
    }
</script>


<style scoped>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
th, td {
  padding: 5px;
  text-align: left;    
}
</style>
