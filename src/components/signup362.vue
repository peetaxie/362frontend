<template>
  <div>
    <input type="email" name="email" placeholder="email" v-model="email">
    <input type="text" name="name" placeholder="name" v-model="name">
    <input type="password" name="password" placeholder="password" v-model="password">
    <button  @click="signup">signup</button>
    
  </div>
</template>

<script>
    import axios from 'axios';
    export default {
     
      data () {
        return {
          baseurl:"http://localhost:8181/",
          items:null,
          email:null,
          name:null,
          password:null
        }
      },

      methods:{
          signup(){
            console.log(this.name,this.email,this.password);
            if(this.name!=null && this.email!=null && this.password!=null){
                axios({
                      method:'GET',
                      url: this.baseurl+"user/signup?name="+this.name+"&email="+this.email+"&password="+this.password,
                }).then(function(response){
                    console.log(response);
                    if(response.data.code==1){
                      window.location.href='#/login362';
                    }
                    else{
                      alert("singup fail");
                    }

                }).catch(function(error){
                    console.log(error);
                });
            }
            else{
              alert("name or email or password is null!");
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
