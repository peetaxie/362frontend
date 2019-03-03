<style scoped>
    .layout{
        height: 100%;
        width: 100%;
    }
    .collapseside{
        max-height: 300px; 
        border: 0px solid red; 
        position: fixed; 
        z-index: 999; 
        margin-top: 65px
    }
    #grid{
        list-style-type: none;
    }
    #grid li{
        display: inline-block;    
    }
    #allitems{
        width: 1000px;
        height: auto;
        position: relative;
        margin:0 auto;
        text-align: left;
        overflow: hidden;
        zoom:1; 
        display: block;
        padding: 10px;
        border: 0px solid red;
    }


</style>

<template>

    <div class="layout">
        <Layout :style="{minHeight: '120vh'}">
     
            <ComponentHeader ref="header"></ComponentHeader>     

            <Layout style="border: 0px solid black; padding-top: 0px; padding-bottom: 15px; background-color: #dddee1 ">
            <Sider class="collapseside"  ref="side1" hide-trigger collapsible :collapsed-width="90" v-model="isCollapsed" @mouseenter.native='mouseenter' @mouseleave.native='mouseleave' >

                    <ComponentSider :class="menuitemClasses"></ComponentSider>

            </Sider>
            <Content :style="{padding: '0 16px 16px'}" style="text-align: center;">
                <Breadcrumb  style="width: 1000px; text-align: left; margin:0 auto;margin-top: 15px;">
                            <BreadcrumbItem to="/">
                                <Icon type="ios-home-outline"></Icon> Home
                            </BreadcrumbItem>
                            <BreadcrumbItem to="/components/breadcrumb">
                                <Icon type="social-buffer-outline"></Icon> Components
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Icon type="pound"></Icon> Breadcrumb
                            </BreadcrumbItem>
                </Breadcrumb>
                <div id="allitems">
                    <ul id="grid">
                        <li  v-for="(item,index) in pageData">
                            <ComponentA 
                                :C_itemtitle=item.title 
                                :C_itemsrc=item.moreinfo.itemimagesrc 
                                :C_price=item.price 
                               
                            >         
                            </ComponentA>
                        </li>
                    </ul>  
                </div>
                <div style=" text-align: center; height: auto; overflow: hidden; border: 0px solid black; padding-top: 20px;">
                    <Page :total="totalitems" :page-size="pageSize" size="small" @on-change="change"></Page>
                </div>
            </Content>

            </Layout>
                <Footer style="text-align: center; background-color: white; box-shadow: 0 -1px 8px 1px rgba(0,0,0,.1);">2018-2018 © noName</Footer>
        </Layout>

        <BackTop ref="gotop" :height=200 :bottom=80 :right=20 :duration=500>
            <Icon  type="android-arrow-dropup-circle" size=40 color="#80848f"></Icon>
        </BackTop>
    </div>
</template>

<script>
    import axios from 'axios';
    import ComponentA from '@/components/item'
    import ComponentHeader from '@/components/home-header'
    import ComponentSider from '@/components/menu-side'
    export default {


        data () {
            return {
                isCollapsed: true,
                totalitems: 0,
                pageSize: 12,
                pageData:[],
                items:[],
                schoolid:0,
                categoryid:0,
            };
        },
        components: {
            ComponentA,
            ComponentHeader,
            ComponentSider,
        },
        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : '',
                ]
            },


        },

        methods: {
            change(page){
                var _start = ( page - 1 ) * this.pageSize;
                var _end = page * this.pageSize;
                // console.log('page:'+page+" start:"+_start+" end:"+_end);
                // this.pageData.splice(0,this.pageSize);
                // var x=0;
                // for(var i=_start; i<_end; i++){
                //    if(i<this.items.length)
                //     //this.pageData.push(this.items[i]);
                //    this.$set(this.pageData,x,this.items[i]);
                //     x++;
                // }
               this.pageData=this.items.slice(_start,_end);
               //window.scrollTo(0,0);
               this.$refs.gotop.back();
            },
            mouseenter(){
                this.isCollapsed=false;
                this.$refs.side1.toggleCollapse();
                
            },
            mouseleave(){ 
                this.isCollapsed=true;     
                this.$refs.side1.toggleCollapse(); 
            },
            schoolchange(value){
                this.schoolid=value;
                console.log("home-schoolselect:"+this.schoolid);
                
            },  
            categorychange(value){
                this.categoryid=value;
                console.log("home-category:"+this.categoryid);
            } 
        },
        created(){  
            this.$root.$on('schoolId',(data)=>this.schoolchange(data));  
            this.$root.$on('categoryId',(data)=>this.categorychange(data));  
        }, 

        mounted: function(){
            var that = this;
            let param = new URLSearchParams();
            param.append("schoolid",this.schoolid);
            axios({
                  method:'post',
                  url:'http://localhost:8000/item/getitems',
                  data: param,
            }).then(function(response){
                console.log(response);
                that.items=response.data.objectData;
                console.log(that.items);
                that.totalitems=that.items.length;
                console.log(that.pageSize);
                console.log(that.items.length);
                if(that.items.length < that.pageSize){
                        that.pageData = that.items;
                    }
                else{
                    for(var i=0; i<that.pageSize; i++){
                        that.$set(that.pageData,i,that.items[i]);
                         // this.pageData.push(this.items[i]);
                    }
                   // this.pageData = this.items.slice(0,this.pageSize);
                }
            console.log("page"+that.pageData);
            }).catch(function(error){
                console.log(error);
            });


            // this.items=[
            //     {title:"1", itemsrc: "/static/img/1.jpg", price: 55, icon:"https://i.loli.net/2017/08/21/599a521472424.jpg"},
            //     {title:"2", itemsrc: "/static/img/2.jpg", price: 12, icon:"https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png" },
            //     {title:"3", itemsrc: "/static/img/3.jpg", price: 22,icon:"https://developer.android.com/guide/practices/ui_guidelines/images/NB_Icon_Mask_Shapes_Ext_02.gif"},
            //     {title:"4", itemsrc: "/static/img/4.jpg", price: 4, icon:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUSkVLozDtGXiDyxOlsz-EoSJxpmjomRzT8Sr31j9l95UAiXLZ"},
            //     {title:"5", itemsrc: "/static/img/5.jpg", price: 20,icon:"http://dx54ed3r88ipb.cloudfront.net/upload/cartoon-icon-final.jpg"},
            //     {title:"6", itemsrc: "/static/img/5.jpg", price: 20,icon:"http://dx54ed3r88ipb.cloudfront.net/upload/cartoon-icon-final.jpg"},
            //     {title:"7", itemsrc: "https://i.loli.net/2017/08/21/599a521472424.jpg", price: 20,icon:"http://dx54ed3r88ipb.cloudfront.net/upload/cartoon-icon-final.jpg"},
            //     {title:"8", itemsrc: "/static/img/5.jpg", price: 20,icon:"http://dx54ed3r88ipb.cloudfront.net/upload/cartoon-icon-final.jpg"},
            //     {title:"9", itemsrc: "/static/img/5.jpg", price: 20,icon:"http://dx54ed3r88ipb.cloudfront.net/upload/cartoon-icon-final.jpg"},
            //     {title:"10", itemsrc: "https://i.loli.net/2017/08/21/599a521472424.jpg", price: 20,icon:"http://dx54ed3r88ipb.cloudfront.net/upload/cartoon-icon-final.jpg"},
            //     {title:"11", itemsrc: "/static/img/5.jpg", price: 20,icon:"http://dx54ed3r88ipb.cloudfront.net/upload/cartoon-icon-final.jpg"},
            //     {title:"12", itemsrc: "/static/img/5.jpg", price: 20,icon:"http://dx54ed3r88ipb.cloudfront.net/upload/cartoon-icon-final.jpg"},
            //     {title:"13", itemsrc: "https://i.loli.net/2017/08/21/599a521472424.jpg", price: 20,icon:"http://dx54ed3r88ipb.cloudfront.net/upload/cartoon-icon-final.jpg"},
            //     {title:"14", itemsrc: "https://i.loli.net/2017/08/21/599a521472424.jpg", price: 20,icon:"http://dx54ed3r88ipb.cloudfront.net/upload/cartoon-icon-final.jpg"},
            //     {title:"15", itemsrc: "/static/img/5.jpg", price: 20,icon:"http://dx54ed3r88ipb.cloudfront.net/upload/cartoon-icon-final.jpg"},
            //     {title:"16", itemsrc: "/static/img/5.jpg", price: 20,icon:"http://dx54ed3r88ipb.cloudfront.net/upload/cartoon-icon-final.jpg"},
            //     {title:"17", itemsrc: "https://i.loli.net/2017/08/21/599a521472424.jpg", price: 20,icon:"http://dx54ed3r88ipb.cloudfront.net/upload/cartoon-icon-final.jpg"},
            //     {title:"18", itemsrc: "https://i.loli.net/2017/08/21/599a521472424.jpg", price: 20,icon:"http://dx54ed3r88ipb.cloudfront.net/upload/cartoon-icon-final.jpg"},

            //     ];


        },
        // watch: {
        //     pageData: function(){
        //         console.log("watch: "+this);

        //     }
        // }
      
    }
</script>
