<template>
  <div>
    <p>chat</p>
  </div>
</template>
<script>
    import axios from 'axios';
    import VueSocketio from 'vue-socket.io';
    // Vue.use(VueSocketio,'http://localhost:8181/gs-guide-websocket');
    export default {
     
      data () {
        return {
          baseurl:"http://localhost:8181/",
          id:666

        }
      },

      methods:{
        
      },

      mounted(){  

      }, 
      sockets:{
        // connect:function(){
        //   this.id=this.$sockets.id;
        //   console.log("connect",this.id);
        // },
        // new_msg: function(msg){           
        //     console.log(msg);
        // }
      }
    }
</script>


<style scoped>

</style>
