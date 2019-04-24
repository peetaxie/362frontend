<template>
  <div>
    <h1>personal profile</h1>
      <span>email:</span><input type="text" v-model="user.email"><br>
      <span>name:</span><input type="text" v-model="user.name"><br>
      <span>age:</span><input  v-model="user.age"><br>
      <span>phone:</span><input v-model="user.phone"><br>
       <span>wallet($):</span><input v-model="user.wallet" disabled><br>
        <span>rank:</span><input v-model="user.ranking" disabled><br>
        <button @click="updateprofile">update</button>
<br><br>

    <p>My Card</p>
    <div v-if="card_id == null">
      <span>Card Id:</span><input type="number" v-model="card_id" ><br>
      <span>Card Pass:</span><input type="number" v-model="card_pass" ><br>
      <button @click="addcard">add card</button>
    </div>
    <div v-else>
      <span>Card Id:</span><input type="number" v-model="card_id" disabled><br>
      <span>Card Balance:</span><input type="number" v-model="card_balance" disabled><br>
    </div>
    <br>


      <p>Privacy controls</p>
         <input type="radio" value=1 v-model="visable">Public<br>
        <input type="radio"  value=0 v-model="visable"> Private<br>
          <button @click="updateprivacy">update</button>
          <br><br>
        <p>Reset Password</p>
        <span>Old password:</span><input type="text" v-model="oldpass"><br>
        <span>New passoword:</span><input type="text" v-model="newpass"><br>
         <button @click="updatepass">update</button>
    <br><br>
      <h1>Search friends:</h1><input type="text" v-model="emailkey">
         <button @click="searchfriend">search</button> 
         <p v-if="searchuser!=null">{{searchuser}}<button @click="addfriend">add friend</button></p>

  </div>
</template>

<script>
    import axios from 'axios';
    export default {
     
      data () {
        return {
          baseurl:"http://localhost:8181/",
          useremail:null,
          user:null,
          userid:null,
          visable:0,
          oldpass:null,
          newpass:null,
          emailkey:null,
          searchuser:null,
          card_id:null,
          card_pass:null,
          card_balance:null,
        }
      },

      methods:{
        addfriend(){
          //add friend
            if(this.searchuser.email!= this.email){
              axios({
                    method:'GET',
                    url: this.baseurl+"friend/addfriendReuqest?email1="+this.useremail+"&email2="+this.searchuser.email,
              }).then(function(response){
                  console.log(response);
                  console.log("friend",response);
                  if(response.data.code==1){
                    alert("success");
                  }
                  else{
                    alert("error");
                  }

              }).catch(function(error){
                  console.log(error);
              });
            }
            else{
              alert("cannot add yourself");
            }
        },
        searchfriend(){
          var that = this;
          if(this.emailkey!== null){
             axios({
                  method:'GET',
                  url: this.baseurl+"user/getuser?email="+this.emailkey,
            }).then(function(response){
                console.log(response);
                if(response.data.code!=0){
                  if(response.data.name==null){
                    that.searchuser="this is private account!"
                  }
                  else{
                    that.searchuser=response.data;
                  }
                }
                else{
                  alert(response.data.message);
                }

            }).catch(function(error){
                console.log(error);
            });
          }
        },
        updatepass(){
          var that =this;
          if(this.oldpass!=null && this.newpass!=null){
            console.log("old",this.oldpass,"new",this.newpass);
              axios({
                  method:'GET',
                  url: this.baseurl+"user/resetpass?email="+this.user.email+"&oldpass="+this.oldpass+
                  "&newpass="+this.newpass,
                }).then(function(response){
                console.log(response);
                if(response.data.code!=0){
                  alert(response.data.message);
                }
                else{
                  alert(response. data.message);
                }
            }).catch(function(error){
                console.log(error);
            });
          }
        },
        updateprivacy(){
          var that=this;
          axios({
                  method:'GET',
                  url: this.baseurl+"user/setprivacycontrol?id="+this.user.id+"&visible="+this.visable,
                }).then(function(response){
                console.log(response);
                if(response.data.code!=0){
                  alert(response.data.message);
                }
                else{
                  alert(response.data.message);
                }
            }).catch(function(error){
                console.log(error);
            });
        },
          updateprofile(){
            var that=this;
            if(this.user!=null){   
                axios({
                      method:'GET',
                      url: this.baseurl+"user/setprofile?id="+this.user.id+"&name="+this.user.name+
                      "&phone="+this.user.phone+"&age="+this.user.age,
                }).then(function(response){
                    console.log(response);
                    if(response.data.code!=0){
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
          addcard(){
            var that = this;
             axios({
                  method:'GET',
                  url: this.baseurl+"card/addcard?id="+this.card_id+"&userid="+this.userid+"&password="+this.card_pass,
            }).then(function(response){
                console.log(response);
                if(response.data.code!=0){
                  alert(response.data.message);
                }
                else{
                  that.card=response.data;
                }
            }).catch(function(error){
                console.log(error);
            });
          },
          // getcard(){
          //   var that = this;
          //       this.card=[];
          //        axios({
          //             method:'GET',
          //             url: this.baseurl+"card/getcard?id="+this.user.id+"&name="+this.user.name+
          //             "&phone="+this.user.phone+"&age="+this.user.age,
          //       }).then(function(response){
          //           console.log(response);
          //           if(response.data.code!=0){
          //             alert(response.data.message);
          //           }
          //           else{
          //             that.card=response.data;
          //           }
          //       }).catch(function(error){
          //           console.log(error);
          //       });
          // }
      },
      mounted(){  
            var that = this;
            this.useremail=localStorage.getItem("useremail");
            console.log("useremail",this.useremail);
            var id = localStorage.getItem("userid");
            this.userid=id;
            axios({
                  method:'GET',
                  url: this.baseurl+"user/user?id="+id,
            }).then(function(response){
                console.log(response);
                that.user=response.data;
                console.log("user",that.user);
                that.visable=response.data.visible;
                if(that.user.card!=null){
                  that.card_id=that.user.card.id;
                  that.card_pass=that.user.card.password;
                  that.card_balance=that.user.card.balance;
                }

            }).catch(function(error){
                console.log(error);
            });
      }, 
    }
</script>


<style scoped>

</style>
