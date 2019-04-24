<template>
  <div>
    <input type="email" name="email" placeholder="email" v-model="email">
    <input type="password" name="password" placeholder="password"  v-model="password">
    <button @click="login">login</button>
  </div>
</template>

<script>
    import axios from 'axios';
    export default {
     
      data () {
        return {
          baseurl:"http://localhost:8181/",
          email:null,
          password:null
        }
      },

      methods:{
          login(){
            console.log(this.email,this.password);
            if(this.email!=null && this.password!=null){
                axios({
                      method:'GET',
                      url: this.baseurl+"user/login?email="+this.email+"&password="+this.password,
                }).then(function(response){
                    console.log(response);
                    if(response.data.code==1){
                      localStorage.setItem('useremail',response.data.user.email);
                      localStorage.setItem('userid',response.data.user.id);
                      localStorage.setItem('username',response.data.user.name);
                      window.location.href='#/home362';
                    }
                    else{
                      alert("login fail");
                    }

                }).catch(function(error){
                    console.log(error);
                });
            }
            else{
              alert("email or password is null!");
            }
          }
      },
      mounted(){  
            var that = this;
            // axios({
            //       method:'GET',
            //       url: this.baseurl+"item/getallitems",
            // }).then(function(response){
            //     console.log(response);
            //     that.items=response.data;

            // }).catch(function(error){
            //     console.log(error);
            // });
      }, 
    }
</script>


<style scoped>

</style>
