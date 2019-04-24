<template>
  <div>
    <div class="header">
      <a style="font-size: 20px;font-weight: bold;" href="#/profile362">{{useremail}}</a>
      <input type="text" v-model="searchkey" placeholder="search items"><button @click="searchitem" style="margin-right: 100px;">search</button>
        <a style="margin-right: 20px;" href="#/postitem362">Post Item</a>
      <a style="margin-right: 20px;" href="#/transaction362">My Order</a>
       <a style="margin-right: 20px;" href="#/cart362">My Cart</a>
      <button style="float: right;" @click="logout">logout</button>
    </div>
    <div class="items">
      <div class="item" v-for="(item,index) in items">
        <p>title:</p>
        <p class="item_text">{{item.title}}</p>
        <p>description:</p>
         <p class="item_text">{{item.description}}</p>
        <p>price:</p>
         <p class="item_text" style="color: red">${{item.price}}</p>
        <p>category:</p>
         <p class="item_text" style="color: blue">{{item.category.name}}</p> 
         <button @click="jump(item.id)">More Detail</button>
         <button @click="additem(item.id)">add to cart</button>
      </div>
    </div>
    <br>
      <h2 style="color: red">Suggest items</h2>
    <div class="items" v-if="suggestitem">
      <div  class="item" v-for="(item,index) in suggestitem">
        <p>title:</p>
        <p class="item_text">{{item.title}}</p>
        <p>description:</p>
         <p class="item_text">{{item.description}}</p>
        <p>price:</p>
         <p class="item_text" style="color: red">${{item.price}}</p>
        <p>category:</p>
         <p class="item_text" style="color: blue">{{item.category.name}}</p> 
         <button @click="jump(item.id)">More Detail</button>
      </div>
    </div>
        <p v-else>Not any items suggest</p>


    <Button type="primary" @click="getfriend">Friends</Button>


    <Modal
        v-model="modal1"
        title="Chat"
        footer-hide>
        <div class="firendlist">
              <div>Firends</div>
              <div v-for="(friend,index) in friends ">
                 <p class="friend selectfriend" v-if="friendselect.name==friend.user2.name"  @click="friendclick(friend)">{{friend.user2.name}}</p>
                <p class="friend"  v-else @click="friendclick(friend)">{{friend.user2.name}}</p>
              </div>
        </div>
        <p style="font-weight: bold;">Talk with: {{friendselect.name}}   
          <button v-if="friendselect.name" style="color:white;background-color: red;float: right;" @click="deletefriend(friendselect.id)">
          delete {{friendselect.name}}
        </button>
        </p>

        <div class="chatbox" id="boxchat">

          <div  v-for="(mess,index) in contents">
            <div v-if="mess.sender==username&&mess.receiver==friendselect.name" class="chatborder"><div class="speech-bubble-right">{{mess.sender}}:<p class="innertext">{{mess.content}}</p></div></div>
            <div v-else-if="mess.sender==friendselect.name"><div class="speech-bubble-left">{{mess.sender}}:<p class="innertext">{{mess.content}}</p></div></div>
         
          </div>
        </div>
        <div style="display: flex;" v-if="friendselect.name!=null">
            <Input v-model="message" placeholder="Enter something..." />
            <Button style="margin-left: 5px;" type="primary" @click="sendmess">Send</Button>
        </div>
    </Modal>

    <Button type="primary" @click="getRequest">Request</Button>
    <Modal
        v-model="modal2"
        title="Request"
        footer-hide>
        <div v-for="(req,index) in request">
            <p><span style="color: #2db7f5;font-weight: bold;">{{req.sender}}</span> want to add your as friend
              <button @click="rejectrequest(req.id)">No</button>
              <button @click="accecptrequest(req.id)">Yes</button>
            </p>
        </div>      
    </Modal>


    <input type="number" name="" v-model="roomnum" placeholder="create room" >
    <Button type="primary" @click="getchat">Connect</Button>

    <Modal
        v-model="modal3"
        title="Chat"
        footer-hide> 
        <div>
           RoomNumber:<span style="color: lightblue;font-weight: bold;">{{roomnum}}</span>
          <div class="chatbox" id="boxchat">
              <div  v-for="(mess,index) in contents2">
                      <div v-if="mess.sender=='root'" class="chatborder"><div class="speech-bubble-right">{{mess.sender}}:<p class="innertext">{{mess.content}}</p></div></div>
                      <div v-else ><div class="speech-bubble-left">{{mess.sender}}:<p class="innertext">{{mess.content}}</p></div></div>
                   
                </div>
              
        </div>
        <div style="display: flex;" >
            <Input v-model="message"  placeholder="Enter something..." />
            <Button style="margin-left: 5px;" type="primary" @click="sendmess2">Send</Button>
        </div>
        </div>    
    </Modal>
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
          userid:null,
          useremail:null,
          username:null,
          items:null,
          suggestitem:null,
          searchkey:null,
          modal1: false,
          modal2:false,
          message: null,
          friendselect:{name:null},
          friends: [],
          request:[],

          contents:[
          {
            sender:'peter',
            content:'hi',
            receiver:'tony'
          },
          {
            sender:'kirk',
            content:"what's up!",
            receiver:'tony'
          }
          ],
          contents2:[{
            sender:'root',
            content:'hi',
          },
          {
            sender:'peter',
            content:"what's up!",
          }
          ],
          roomnum:null,
          modal3:false,
          stompClient:null,
          stompClient2:null
        }
      },

      methods:{
        sendmess2(){
      var that = this;
          console.log(this.message);
          if(this.message != null){
            this.send2();     
            this.message=null;    
            setTimeout(function() {
              that.jumpbottom();
            }, 10);
        }
      },
        send2() {
        console.log("send message");
            this.stompClient.send("/app/chat", {}, 
              JSON.stringify({
                senderId:this.userid,
                receiverId:parseInt(this.roomnum),
                message:this.message
              }));
        },

        getchat(){
          this.modal3=true;
          console.log(this.roomnum);
          this.connection2(this.roomnum);
        },
        deletefriend(f_id){
          var that = this;
          console.log(f_id);
            axios({
                method:'GET',
                url: this.baseurl+"friend/deletefriend?id1="+this.userid+"&id2="+f_id,
            }).then(function(response){
                console.log(response);   
                that.getfriend();     
                that.friendselect={name:null};  
            }).catch(function(error){
                console.log(error);
            });

        },
        rejectrequest(id){
          console.log(id);
          this.handlereuqest(id,0);
        },
        accecptrequest(id){
          console.log(id);
          this.handlereuqest(id,1);
        },
        handlereuqest(id,index){
          var that = this;
            axios({
                method:'GET',
                url: this.baseurl+"friend/acceptReuqest?id="+id+"&accept="+index,
            }).then(function(response){
                console.log(response);   
                that.getRequest();
            }).catch(function(error){
                console.log(error);
            });

        },
        getRequest(){
          var that = this;
          console.log("get request");
          this.modal2=true;
          this.request=[];
            axios({
                method:'GET',
                url: this.baseurl+"friend/getfriendReuqest?email="+this.useremail,
            }).then(function(response){
                console.log(response);
                if(response.data.code!=0){
                  for(var i=0;i< response.data.length;i++){
                    console.log(i);

                    that.request.push(
                    {
                      "id":response.data[i].id,
                      "sender":response.data[i].user2.name
                    });
                  }
              
                     console.log("request",that.request);
                }
           
            }).catch(function(error){
                console.log(error);
            });

        },
        friendclick(friend){
          this.friendselect=friend.user2;
          console.log("friend click",this.friendselect);
        },
        initWebSocket(id) {
            this.connection(id);
          
        }, 
        connection2(num){
          let that= this;
          console.log("roomnum",num);
           var socket = new SockJS('http://localhost:8181/ws');
            this.stompClient2 = Stomp.over(socket);
            this.stompClient2.connect({}, function (frame) {
            console.log('Connected: ' + frame);
              that.stompClient2.subscribe('/topic/'+num,(msg)=>{
              console.log("receive success", msg);
              var mes = JSON.parse(msg.body);
                 var obj={
                    sender:mes.sender,
                    content:mes.message,
                   };
                 that.contents2.push(obj);
                 console.log(that.contents2);
            })
          });
        } ,
        connection(id) {
            let that= this;
            console.log("id",id);
           var socket = new SockJS('http://localhost:8181/ws');
            this.stompClient = Stomp.over(socket);
            this.stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
              that.stompClient.subscribe('/topic/'+id,(msg)=>{
              console.log("receive success", msg);
              that.receive(JSON.parse(msg.body));
            })
          });
        },   
       disconnect() {
            if (this.stompClient !== null) {
                this.stompClient.disconnect();
            }
            console.log("Disconnected");
        },

       receive(msg){
        var that = this;
         console.log("msg",msg);
         var obj={
          sender:msg.sender,
          content:msg.message,
          receiver:msg.receiver
         }
         this.contents.push(obj);
          setTimeout(function() {
            that.jumpbottom();
          }, 10);
       },

       send(receiverId,message) {
        console.log("send message");
            this.stompClient.send("/app/chat", {}, 
              JSON.stringify({
                senderId:this.userid,
                receiverId:receiverId,
                message:message
              }));
        },
        sendmess(){
          var that = this;
          console.log(this.message);
          if(this.message != null){
            var obj = {
              sender: this.username,
              content: this.message,
              receiver:this.friendselect.name
            }
            this.contents.push(obj);
            this.send(this.friendselect.id,this.message);
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
        jump(itemid){
          console.log(itemid);
          this.$router.push({path:'/itemdetail362',query: {id:itemid}});
        },
        searchitem(){
          var that = this;
          if(this.searchkey!=null){
            axios({
                  method:'GET',
                  url: this.baseurl+"item/search?key="+this.searchkey,
            }).then(function(response){
                console.log(response);
                if(response.data.message){
                    alert(response.data.message);
                }
                else{
                  that.items=response.data;
                }

            }).catch(function(error){
                console.log(error);
            });
          }
        },
        additem(id){
          console.log(id);
            axios({
                  method:'GET',
                  url: this.baseurl+"cart/additemtocart?userid="+this.userid+"&itemid="+id,
            }).then(function(response){
                console.log("add item",response);
                if(response.data.code==0){
                  alert(response.data.message);
                }
                if(response.data.code==1){
                  alert(response.data.message);
                }
            }).catch(function(error){
                console.log(error);
            });
        },
        logout(){
          localStorage.removeItem("useremail");
          localStorage.removeItem("userid");
          localStorage.removeItem("username");
          window.location.href='#/login362';
        },
        ok () {
          this.$Message.info('Clicked ok');
        },
        cancel () {
          this.$Message.info('Clicked cancel');
        },
        getfriend(){
            var that = this;
            this.modal1 = true
            this.friends=[];
            axios({
                  method:'GET',
                  url: this.baseurl+"friend/getfriends?email="+this.useremail,
            }).then(function(response){
                console.log("friendslist",response);
                if(response.data){
                  that.friends = response.data;
                }
                console.log("f",that.friends);

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

            this.initWebSocket(userid);

            axios({
                  method:'GET',
                  url: this.baseurl+"item/getallitems",
            }).then(function(response){
                console.log(response);
                that.items=response.data;

            }).catch(function(error){
                console.log(error);
            });
            axios({
                  method:'GET',
                  url: this.baseurl+"item/suggest?userid="+userid,
            }).then(function(response){
                console.log(response);
                if(response.data.message){
                }
                else{
                  that.suggestitem=response.data;
                }

            }).catch(function(error){
                console.log(error);
            }); 
            //get friends  
              axios({
                  method:'GET',
                  url: this.baseurl+"friend/getfriends?email="+this.useremail,
            }).then(function(response){
                console.log("friendslist",response);
                if(response.data){
                  that.friends = response.data;
                }
                console.log("f",that.friends);

            }).catch(function(error){
                console.log(error);
            });


      }, 
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
.header{
  height: 50px;
}
.item{
  display: table-cell;
  width: 200px;
  height: auto;
  border: 1px solid red;
}
.items{
    display: table;
    border: 1px solid black;
}
.item_text{
  font-size: 16px;
  font-weight: bold;
}
</style>
