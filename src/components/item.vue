<template>
    <div id="item">
        <Card style="width: 230px; height: 350px" :bordered="false" >
      
            <div class="title" slot="title">                
                        <tooltip :content=itemtitle placement="bottom-start">
                           <a><p id="itemtitle"> {{itemtitle}} </p></a>
                        </tooltip>
            </div>

            <div slot="extra"> 
                <h2 style="font-family: Helvetica; color: #19be6b">${{price}}</h2>
            </div>
               
            <a>
             <div class="itemview" @click="add" >
                <img :src=itemsrc>
            </div>
            </a>

             <div class="bottom">
                
                <div id="icon">
                <a>
                <Avatar v-if="iconsrc==''"  style="background-color: #87d068; " icon="person" />
                <Avatar v-else style="background-color: #87d068; " :src=iconsrc  />
                <span class="username" style="color:#495060; ">{{name}}</span>
                </a>
                </div>
                
                <div id="info" ref="itemlike">
                    <p>{{numofwatch}} <Icon type="eye"></Icon></p>
                    <p>{{numoflike}} <Icon  type="ios-heart" :color=heartcolor  @click.native="like"></Icon></p>
                </div>
             </div>
        </Card>
    </div>
</template>
<script>
    export default {
        props: {
            C_itemtitle:{
                default:"For Sale!!!"
            },
            C_iconsrc:{
                default:""
            },
            C_itemsrc:{
                default:"/static/img/2.jpg"
            },
            C_price:{
                default: 0
            },
            C_name:{
                default:"noname"
            },
            C_numofwatch:{
                type: Number,
                default:0
            },
            C_numoflike:{
                type: Number,
                default:0
            },
        },    
        data () {
            return {
                itemtitle: this._props.C_itemtitle,
                iconsrc: this._props.C_iconsrc,
                price:this._props.C_price,
                itemsrc:this._props.C_itemsrc,
                name: this._props.C_name,
                numofwatch:this._props.C_numofwatch,
                numoflike:this._props.C_numoflike,
                heartcolor:"",
                 
            }
        },

        //记得监听子组件的props（当数据发送改变）
        watch: {  
                C_itemtitle(val){  
                    this.itemtitle = val;  
                },
                C_iconsrc(val){  
                    this.iconsrc = val;  
                },
                C_itemsrc(val){  
                    this.itemsrc = val;  
                },
                C_price(val){  
                    this.price = val;  
                },
                C_name(val){  
                    this.name = val;  
                },
                C_numofwatch(val){  
                    this.numofwatch = val;  
                },
                C_numoflike(val){  
                    this.numoflike = val;  
                },
        }, 
        methods: {

            add(){
                alert(this.price);
            },

            like(){
                //liked a item
                if(this.heartcolor!="red"){
                    this.heartcolor="red";
                    this.numoflike+=1;
                    this.$Message.success("You have add to Wish List");

                }
                //disliked a item
                else{
                    this.heartcolor="";
                    this.numoflike-=1;
                    this.$Message.info("You have remove from Wish List");
                }
            }
        }
    }
</script>

<style>

#item{
    width: 230px;
    height: 350px;
    display: inline-table;
    border: 0px solid red;
    padding: 6px;
}
.ivu-card:hover{
    box-shadow: 2px -2px 4px 3px rgba(0,0,0,.1);
}
.title{
    width: 220px;
    height: 25px;
    max-width: 220px;
    display: table-cell;
    vertical-align: middle;
    text-align:left;
    border: 0px solid red;
    overflow: hidden;
    white-space: nowrap; 
}

#itemtitle{
    font-family:Helvetica Neue;
    color:#495060; 
    font-size:12px;
    max-width: 150px;
    overflow: hidden; 
    text-overflow: ellipsis; 
    white-space: nowrap; 
    border: 0px solid black;
}
.itemview{
    background:#e9eaec;
    width:200px; 
    height:230px;
    line-height: 220px;
    vertical-align: middle;
    text-align: center;
    border: 0px solid black;
    overflow: hidden;
}


.itemview img{
    vertical-align: middle;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    border: 0px solid red;
}

.bottom{
    display: table;
    width:100%; 
    height:50px;
    overflow: hidden;
    border: 0px solid red;
    float: left;
}

#icon{
    height: 40px;
    width: 50%;
    display: table-cell;
    vertical-align: middle;
    text-align: left;
    border: 0px solid blue;

}
#info{
    padding-right: 3px;
    height: 40px;
    width: 50%;
    display: table-cell;
    vertical-align: middle;
    text-align: right;
    border: 0px solid red;

}
.username:hover{
     text-decoration:underline;
}
</style>