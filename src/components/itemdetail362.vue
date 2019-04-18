<template>
  <div>
    <h1>Item Detial</h1>
      <p>Title:</p>
      <span class="itemtext">{{item.title}}</span>
      <p>description:</p>
       <span class="itemtext">{{item.description}}</span>
      <p>price:</p>
      <span class="itemtext" style="color: red">${{item.price}}</span>
      <p>category:</p>
      <span class="itemtext" style="color: blue">{{item.category.name}}</span>
      <p>Seller:</p>
      <span class="itemtext" style="color: green">{{seller.email}}</span>
      <p>Seller rank:</p>
      <span class="itemtext" style="color: green">{{seller.ranking}}</span>
      <br>
      <button @click="buyitem" style="font-size: 20px;">Buy!</button>
      <br>
      <h2>Add comments</h2>
      <textarea placeholder="type your comments here" v-model="comment"></textarea>
      <br>
        <span>bad</span>
        <input type="radio" value=1 v-model="rank">
        <input type="radio"  value=2 v-model="rank">
        <input type="radio"  value=3 v-model="rank">
        <input type="radio"  value=4 v-model="rank">
        <input type="radio"  value=5 v-model="rank">
        <span>good</span>
        <br>
      <button @click="addcomment">submit</button>
      <br>
      <h2>Item comments</h2>
      <div  v-for="(dt,index) in detail">
        <p>[{{index+1}}]</p>
        <p>{{dt.user.email}}:</p>
        <p>rank:{{dt.ranking}}</p>
        <p>comments:{{dt.comment}}</p>
        <p>------------------------------------------------------------------</p>
      </div>
  </div>
</template>

<script>
    import axios from 'axios';
    export default {
     
      data () {
        return {
          baseurl:"http://localhost:8181/",
          itemid:null,
          item:null,
          seller:null,
          userid:null,
          category:1,
          comment:null,
          rank:3,
          detail:null
        }
      },

      methods:{
        buyitem(){
              axios({
                  method:'GET',
                  url: this.baseurl+"transaction/pay?buyerId="+this.userid+"&ItemId="+this.itemid,
              }).then(function(response){
                  console.log(response);
                  alert(response.data.message);
              }).catch(function(error){
                  console.log(error);
              });
        },
        addcomment(){
            var that = this;
            console.log(this.rank,this.comment);
            if(this.comment!=null){
               axios({
                    method:'GET',
                    url: this.baseurl+"item/itemcomment?itemId="+this.itemid+"&userId="+this.userid+
                    "&rank="+this.rank+"&comment="+this.comment,
              }).then(function(response){
                  console.log(response);
                  if(response.data.code==1){
                    alert(response.data.message);
                  }
                  else{
                      alert(response.data.message);
                  }
                  that.seller = response.data;
              }).catch(function(error){
                  console.log(error);
              });
            }
        },
        getuser(id){
           var that = this;
             axios({
                  method:'GET',
                  url: this.baseurl+"user/user?id="+id,
            }).then(function(response){
                console.log(response);
                that.seller = response.data;
            }).catch(function(error){
                console.log(error);
            });
          }
      },
      mounted(){  
          this.itemid=this.$route.query.id,
          console.log(this.itemid);
          this.userid= localStorage.getItem("userid");
          var that = this;
          axios({
                method:'GET',
                url: this.baseurl+"item/getitem?id="+this.itemid,
          }).then(function(response){
              console.log(response);
              if(response.data.message){
                alert(response.data.message);
              }
              else{
                that.item=response.data;
                that.detail=that.item.detaillist;
                that.getuser(response.data.userid);
                console.log(that.item);
              }
          }).catch(function(error){
              console.log(error);
          });
      }, 
    }
</script>


<style scoped>
.itemtext{
  font-size: 16px;
  font-weight: bold;
}
</style>
