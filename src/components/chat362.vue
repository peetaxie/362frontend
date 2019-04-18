<template>
  <div>
    <p>chat</p>
    <button @click="send">send</button>
  </div>
</template>
<script>
    import axios from 'axios';
    import SockJS from  'sockjs-client';
    import  Stomp from 'stompjs';
    export default {
     
      data () {
        return {
          baseurl:"http://localhost:8181/",
          websock: null,
          stompClient:'',

        }
      },

      methods:{
        initWebSocket() {
            this.connection();
          
        },  
        connection() {
            let that= this;
           var socket = new SockJS('http://localhost:8181/ws');
            this.stompClient = Stomp.over(socket);
            this.stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
              that.stompClient.subscribe('/topic/hello',(msg)=>{
              console.log("hello success",msg);
            })
          });
        },   
       disconnect() {
            if (this.stompClient !== null) {
                this.stompClient.disconnect();
            }
            console.log("Disconnected");
        },



       send() {
        console.log("send message");
            this.stompClient.send("/app/hello", {}, "hi this is web");
        }




      },

      mounted(){  
        this.initWebSocket();
      }, 
      beforeDestroy: function () {
        // 页面离开时断开连接,清除定时器
        // this.disconnect();
      }
    }
</script>


<style scoped>

</style>
