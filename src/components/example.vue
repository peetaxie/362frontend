<style scoped>
    .layout{
        height: 100%;
        width: 100%;
    }
    .postiteminfo{
        width: 930px;
        border:0px solid red;
        margin:auto;
        text-align: center;
    }
    .ivu-card:hover{
        box-shadow: 2px -2px 4px 3px rgba(0,0,0,.1);
    }  
    .iteminfo{
        margin:10px;
        border: 0px solid red;
        overflow:hidden;
        zoom:1;
        
    }
    .upload-button{
        position: relative;
        float: left;
        width: 200px; 
        height:220px;     
    }
    .uploadlist{
        position: relative;
        float: right;
        width: 335px;
        height: 220px;
        border: 1px solid lightblue;
        border-radius:10px;
    }
    .demo-upload-list{
        display: inline-block;
        float: left;
        width: 100px;
        height: 100px;
        border: 1px solid transparent;
        border-radius: 5px;
        background: #fff;
        overflow: hidden;
        position: relative;
        margin: 5px;
        box-shadow:0px 1px 1px 0px rgba(0,0,0,.2);
    }


</style>

<template>
     <div class="layout">
        <Layout :style="{minHeight: '120vh'}">
                <ComponentHeader></ComponentHeader>   

                <Layout :style="{padding: '10px 15px'}">
                    <Content :style="{padding: '15px', minHeight: '280px',}" >
 
                     <div class="postiteminfo">   
                        <Card style="width: auto; height: auto;" shadow >          
                        <div class="iteminfo">
                            <span style="float: left;">Item Title:</span>
                            <Input icon="ios-clock-outline" size="large" placeholder="Enter Title..." ></Input>
                        </div>
                        <div class="iteminfo">
                            <span style="float: left;">Item Category:</span>
                            <br>
                            <Select size="large" style="width: 437px; float: left; " @on-change="select" >
                                <Option v-for="item in categorylist" :value="item.value" :key="item.value" style="text-align: left; padding-left: 175px;">
                                    <icon :type="item.iconurl"></icon>
                                    <span>{{ item.label }}</span>                              
                                </Option>
                            </Select>  
                            <Select  :disabled='disable' size="large" style="width: 437px; float: right;"  @on-change="subselect">
                                <Option v-for="subitem in subcategorylist" :value="subitem.value" :key="subitem.value">{{ subitem.label }}</Option>
                            </Select>  
                            
                        </div>
                        <div style="width: 560px; height:235px; margin:auto;padding:5px; ">
                            <div class="upload-button">
                                <Upload
                                    ref="upload" name="image"
                                    :show-upload-list="false"
                                    :on-success="handleSuccess"
                                    :format="['jpg','jpeg','png']"
                                    :max-size="4096"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    :before-upload="handleBeforeUpload"
                                    multiple
                                    type="select"
                                    action="http://localhost:8000/upload/itemimages" 
                                    >
                                    <Button shape="circle" type="ghost" style="width: 200px; border-color: lightblue">
                                        <div style="height:205px; padding-top:20px;" >
                                            <Icon type="camera" size="100" ></Icon>    
                                            <br> 
                                            <p>add photo</p>
                                            <Icon type="plus-round" size="30"></Icon>
                                            <br>
                                            <p>{{numoflist}} of 6</p>

                                        </div>
                                    </Button>
                                </Upload>
                            </div>

                            <div class="uploadlist">
                                <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="item.name">
                                    <template v-if="item.status == 'finished'">
                                        <Componentitemimg :C_imageurl=item.url :C_imagename=item.name  :C_imageindex=index></Componentitemimg>     
                                    </template>
                                    <template v-else>
                                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                    </template>
                                </div>
                            </div>
                        </div>

                        <div class="iteminfo">
                            <span style="float: left;">Item Description:</span>
                            <Input type="textarea" :rows=3 size="large" placeholder="Enter something..." ></Input>
                        </div>

                     
                        <div class="iteminfo">

                            <div style="width: 437px; float: left;">
                                <span style="float: left;">School:</span>
                                <Select 
                                    @on-change="schoolchange"
                                    @on-query-change="getquery"
                                    placeholder="Enter your school"
                                    size="large"
                                    clearable
                                    filterable
                                    :loading="loading">
                                    <Option v-for="(school, index) in schoollist" :value="school.id" :label="school.name" :key="index"
                                    style="border-bottom: 1px solid #dddee1;padding-left: 5px; text-align: left;">
                                            <span>{{school.name}}</span>
                                            <br>
                                            <span style="color:#ccc; font-size: 10px;"><icon type="location" color="red"></icon> {{school.city}},{{school.state}}</span>
                                    </Option>
                                </Select>
                            </div> 

                            <div style="width: 437px; float: right;">
                                <span style="float: left;">Price(USD):</span> 
                             
                                <div style="clear: both;">
                                    <icon color="#bbbec4" type="social-usd" size=20 style="position: absolute; padding: 9px; z-index: 999;"></icon>
                                    <input-number :max="100000000" :min="0"  precision=2  size="large" v-model="price"  style="padding-left: 17px; width: 435px;"></input-number>
                                </div>
                            </div>
                        </div>

                        <div style="margin: 8px; line-height: 40px; vertical-align: middle;">
                            <a><span style="font-size: 15px;">Cancel</span></a>
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <Button type="primary" icon="flag" size="large" shape="circle">Post</Button>
                        </div>
                        </Card>
                     </div>
               
                    </Content>
                </Layout>

                    <Footer style="text-align: center; background-color: white; box-shadow: 0 -1px 8px 1px rgba(0,0,0,.1); z-index: 998">Footer</Footer>
        </Layout>
            <BackTop ref="gotop" :height=200 :bottom=80 :right=20 :duration=700>
            <Icon  type="android-arrow-dropup-circle" size=40 color="#80848f"></Icon>
            </BackTop>
    </div>

</template>

<script>
    import Vue from 'vue';
    import iView from 'iview';
    import axios from 'axios';
    import locale from 'iview/dist/locale/en-US';
    import ComponentA from '@/components/item'
    import ComponentHeader from '@/components/home-header'
    import Componentitemimg from '@/components/itemimage'
    Vue.use(iView, { locale });
    export default {


        data () {
            return {
                //   defaultList: [
                //     {
                //         'name': 'a42bdcc1178e62b4694c830f028db5c0',
                //         'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                //     },
                //     {
                //         'name': 'bc7521e033abdd1e92222d733590f104',
                //         'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                //     }
                // ],
                imgName: '',
                visible: false,
                uploadList: [],
                numoflist: 0,
                categorylist: [],
                subcategorylist: [],
                disable:true,
                price:null,

            };
        },
        components: {
            ComponentA,
            ComponentHeader,
            Componentitemimg,
        },
        computed: {

        },
        created(){  
            this.$root.$on('itemphoto',(data)=>this.handleRemove(data));  
        },  
        methods: {
            //  handleView (name) {
            //     console.log(name);
            //     this.imgName = name;
            //     this.visible = true;
            // },
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                var index = fileList.findIndex(  
                    function(value, index, arr){
                        //console.log(value);
                        return value.name == file.imgName;}  
                );  
                console.log("delete index :" + index);
                this.$refs.upload.fileList.splice(index, 1);
            },
            handleSuccess (res, file) {
                console.log(res);
                console.log(file);
                file.url = res.objectData.imageurl;
                file.name = res.objectData.imagename+res.objectData.suffixName;
                this.numoflist=this.uploadList.length;
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < 6;
                if (!check) {
                    this.$Notice.warning({
                        title: 'Up to six pictures can be uploaded.'
                    });
                }
                return check;
            },
            select(value){
                for(var i=0; i<this.categorylist.length;i++){
                    if(this.categorylist[i].value==value){
                        this.subcategorylist=this.categorylist[i].subcategory;
                    }
                }
                console.log(this.subcategorylist);
                if(this.subcategorylist.length!=0){
                    this.disable=false;
                }
            },
            subselect(value){

            },
           
        },

        mounted: function(){
            this.uploadList = this.$refs.upload.fileList;
            console.log(this.uploadList);

            var that = this;
            axios({
              method:'get',
              url:'http://localhost:8000/category/getallcategory',
            })
            .then(function(response) {
                console.log(response);
                //set the parent category
                for(var i=0; i<response.data.objectData.length;i++){
                    if(response.data.objectData[i].parentid==0){
                        that.categorylist.push({value: response.data.objectData[i].name, 
                                                label: response.data.objectData[i].name,
                            iconurl: response.data.objectData[i].iconurl, subcategory:[]});
                    }

                }
                //set the sub-category
                for(var i=0; i<response.data.objectData.length;i++){
                    var pid=response.data.objectData[i].parentid;
                    if(pid!=0){
                     that.categorylist[pid-1].subcategory.push({value: response.data.objectData[i].name,
                                                                label: response.data.objectData[i].name});
                    }
                }
                console.log(that.categorylist);
                
            })
            .catch(function(error) {
                that.$Message.error('Fail!');
                console.log(error);
            }); 
        },

    }


</script>
