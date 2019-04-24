<template>
  <div>
    <p>Admin Chat</p>
    <input type="number" name="" v-model="roomnum" placeholder="create room" >
    <Button type="primary" @click="getchat">Chat</Button>
    <Modal
        v-model="modal1"
        title="Chat"
        footer-hide> 
        <div>
           RoomNumber:<span style="color: lightblue;font-weight: bold;">{{roomnum}}</span>
          <div class="chatbox" id="boxchat">
              <div  v-for="(mess,index) in contents">
                      <div v-if="mess.sender=='root'" class="chatborder"><div class="speech-bubble-right">{{mess.sender}}:<p class="innertext">{{mess.content}}</p></div></div>
                      <div v-else ><div class="speech-bubble-left">{{mess.sender}}:<p class="innertext">{{mess.content}}</p></div></div>
                   
                </div>
              
        </div>
        <div style="display: flex;" >
            <Input v-model="message"  placeholder="Enter something..." />
            <Button style="margin-left: 5px;" type="primary" @click="sendmess">Send</Button>
        </div>
        </div>    
    </Modal>
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
          modal1:false,
          stompClient:'',
          roomnum:null,
          username:"root",
          message: null,
          contents:[
          {
            sender:'root',
            content:'hi',
          },
          {
            sender:'peter',
            content:"what's up!",
          }
          ],

        }
      },

      methods:{
        sendmess(){
          var that = this;
          console.log(this.message);
          if(this.message != null){
            // var obj = {
            //   sender: "root",
            //   content: this.message,
            // }
            // this.contents.push(obj);
            this.send();     
            this.message=null;    
            setTimeout(function() {
              that.jumpbottom();
            }, 10);
         

          }
        },
        jumpbottom(){
            var div = document.getElementById('boxchat');
            div.scrollTop = div.scrollHeight;
        },
        getchat(){
          this.modal1=true;
          console.log(this.roomnum);
          this.initWebSocket(this.roomnum);
        },
        initWebSocket(num) {
            this.connection(num);
        },  
        connection(num) {
            let that= this;
            var index=num;
           var socket = new SockJS('http://localhost:8181/ws');
            this.stompClient = Stomp.over(socket);
            this.stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
              that.stompClient.subscribe('/topic/'+parseInt(index),(msg)=>{
              console.log("receive success",JSON.parse(msg.body));
              var mes = JSON.parse(msg.body);
                 var obj={
                    sender:mes.sender,
                    content:mes.message,
                   };
                 that.contents.push(obj);
                 console.log(that.contents);

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
            this.stompClient.send("/app/chat", {}, 
              JSON.stringify({
                senderId:0,
                receiverId:parseInt(this.roomnum),
                message:this.message
              }));
        }




      },

      mounted(){  
        // this.initWebSocket();
      }, 
      beforeDestroy: function () {
        // 页面离开时断开连接,清除定时器
        // this.disconnect();
      }
    }
</script>


<style scoped>
.selectfriend{
   background-color: #c5c8ce;
}
.firendlist{
  width: 20%;
  height: 220px;
  float: left;
  overflow-y: scroll;
  overflow-x: hidden;
}
.friend{
  height: 30px;
  border: 1px solid #515a6e;
}
.friend:hover{
  background-color: #c5c8ce;
}
.chatborder{
  width: 100%;
  height: auto;
  text-align: right;
}
.innertext{
  margin-left: 4px;
  color: white;
  font-size: 20px;
}
.speech-bubble-left{
  margin: 5px;
  position: relative;
  background: #00aabb;
  border-radius: .4em;
  width: auto;
  display: inline-block !important;
  display:inline;
}
.speech-bubble-left:after {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 0;
  height: 0;
  border: 0.313em solid transparent;
  border-right-color: #00aabb;
  border-left: 0;
  margin-top: -0.312em;
  margin-left: -0.312em;
}
.speech-bubble-right{
  margin: 5px;
  position: relative;
  background: yellowgreen;
  border-radius: .4em;
  text-align: right;
  padding-right: 5px;
  width: auto;
  display: inline-block !important;
  display: flex;
  right: 0;

}
.speech-bubble-right:after {
  text-align: right;
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  width: 0;
  height: 0;
  border: 0.313em solid transparent;
  border-left-color: yellowgreen;
  border-right: 0;
  margin-top: -0.312em;
  margin-right: -0.312em;

}


.chatbox{
  border-radius: 10px;
  border: 1px solid #5cadff;
  width: 80%;
  height:220px;
  margin-bottom: 10px;
  overflow: scroll;
  overflow-x:hidden;
  overflow-y:visible;

}
</style>
