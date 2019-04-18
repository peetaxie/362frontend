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
         <p>{{searchuser}}</p>
  </div>
</template>

<script>
    import axios from 'axios';
    export default {
     
      data () {
        return {
          baseurl:"http://localhost:8181/",
          user:null,
          visable:0,
          oldpass:null,
          newpass:null,
          emailkey:null,
          searchuser:null
        }
      },

      methods:{
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
          }
      },
      mounted(){  
            var that = this;
            var id = localStorage.getItem("userid");
            axios({
                  method:'GET',
                  url: this.baseurl+"user/user?id="+id,
            }).then(function(response){
                console.log(response);
                that.user=response.data;
                console.log("user",that.user);
                that.visable=response.data.visible;

            }).catch(function(error){
                console.log(error);
            });
      }, 
    }
</script>


<style scoped>

</style>
