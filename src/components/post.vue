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
        border: 0px solid red;
        overflow: hidden;
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
                <ComponentHeader ref="header"></ComponentHeader>   

                <Layout :style="{padding: '10px 15px'}">
                    <Content :style="{padding: '15px', minHeight: '280px',}" >
 
                     <div class="postiteminfo">   
                        <Card style="width: auto; height: auto;" shadow >     


                    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" >  
                     
                        <FormItem  prop="title"> 
                            <div class="iteminfo">
                                <span style="float: left;">Item Title*:</span>
                                <Input v-model="formCustom.title"  icon="ios-clock-outline" size="large" placeholder="Enter Title..." ></Input>
                            </div>
                        </FormItem>

                       
                            <div>
                            <FormItem  prop="category" style=" width: 445px; float: left;">
                                <span style="float: left;">Item Category*:</span>
                                <br>
                                <Select v-model="formCustom.category"  size="large"  @on-change="select" >
                                    <Option v-for="item in categorylist" :value="item.value" :key="item.value" style="text-align: left; padding-left: 175px;">
                                        <icon :type="item.iconurl"></icon>
                                        <span>{{ item.label }}</span>                              
                                    </Option>
                                </Select>  
                            </FormItem>
                            <FormItem  prop="subcategory" style=" width: 445px; float: right;">
                                <span style="float: left;">Subcategory:</span>
                                <Select  v-model="formCustom.subcategory" :disabled='disable' size="large"  @on-change="subselect">
                                    <Option v-for="subitem in subcategorylist" :value="subitem.value" :key="subitem.value">{{ subitem.label }}</Option>
                                </Select>  
                            </FormItem>
                            <div style="clear: both;"></div>
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

                        <FormItem  prop="description">
                            <div class="iteminfo">
                                <span style="float: left;">Item Description:</span>
                                <Input v-model="formCustom.description" type="textarea" :rows=3 size="large" placeholder="Enter something..." ></Input>
                           </div>
                        </FormItem>
                        

                        

                         <FormItem  prop="school" style=" width: 445px;float: left;"> 
                                <span style="float: left;">School*:</span>
                                <Componentselect ref="schoollist"  v-model="formCustom.school"></Componentselect> 
                         </FormItem>
                        <FormItem  prop="price" style=" width: 445px;float: right;"> 

                                <span style="float: left;">Price*:</span> 
                             
                                <div style="clear: both;">
                                    <icon color="#bbbec4" type="social-usd" size=20 style="position: absolute; padding: 9px; z-index: 1;"></icon>
                                    <input-number v-model="formCustom.price" :max="100000000" :min="0"  :precision=2  size="large" placeholder="USD"  style="padding-left: 17px; width: 445px;"></input-number>
                                </div>
                        </FormItem>
                        

                            <div style="margin: 8px; line-height: 40px; vertical-align: middle;">
                                <a><span style="font-size: 15px;">Cancel</span></a>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <Button type="primary" icon="flag" size="large" @click="handleSubmit('formCustom')" shape="circle">Post</Button>
                            </div>

                    </Form>
                        </Card>
                     </div>
               
                    </Content>
                </Layout>

                    <Footer style="text-align: center; background-color: white; box-shadow: 0 -1px 8px 1px rgba(0,0,0,.1); ">Footer</Footer>
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
    import Componentselect from '@/components/schoolselect'
    Vue.use(iView, { locale });
    export default {


        data () {
            return {
                imgName: '',
                visible: false,
                uploadList: [],
                imagelists:{ 
                     imagesrc1:null,
                     imagesrc2:null,
                     imagesrc3:null,
                     imagesrc4:null,
                     imagesrc5:null,
                     imagesrc6:null,
                     numofimages:0
                         },
                itemobj:{
                    title:'',
                    categoryid:'',
                    description:'',
                    schoolid:'',
                    price:'',
                    publisherid:''
                },
                numoflist: 0,
                categorylist: [],
                subcategorylist: [],
                disable:true,
                formCustom: {
                    title: '',
                    category: '',
                    subcategory:'',
                    description:'',
                    school: '',
                    price:0,

                },
                ruleCustom: {
                    title: [
                        { required: true, message: 'The title cannot be empty', trigger: 'blur' }
                    ],
                    category: [
                        {type:'number', required: true, message: 'Please select category', trigger: 'change' }
                    ],
                    school: [
                        {type:'number', required: true, message: 'Please select school', trigger: 'blur' }
                    ],
                    price: [
                        {type:'number', required: true, message: 'The price cannot be empty', trigger: 'blur' },
                    ],
                },

            };
        },
        components: {
            ComponentA,
            ComponentHeader,
            Componentitemimg,
            Componentselect,
        },
        computed: {

        },
        created(){  
            this.$root.$on('itemphoto',(data)=>this.handleRemove(data));   
            this.$root.$on('schoolId',(data)=>this.schoolchange(data));  
        },  
        methods: {
            //  handleView (name) {
            //     console.log(name);
            //     this.imgName = name;
            //     this.visible = true;
            // },
            schoolchange(value){
                    this.formCustom.school=value;
                
            }, 

            handleSubmit (name) {
               if(this.numoflist<1){
                 this.$Notice.warning({
                    title: 'Notification title',
                    desc: false ? '' : 'Please up at least 1 photo'
                });              
               }
               else{      
                    for(var i=1;i<=this.numoflist;i++){     
                        this.imagelists["imagesrc"+i]=this.uploadList[i-1].name;
                    }
                    this.imagelists.numofimages=this.numoflist;
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            console.log("pass validate");
                            var that = this;
                            this.itemobj.title=this.formCustom.title;
                            if(this.formCustom.subcategory!='')
                                this.itemobj.categoryid=this.formCustom.subcategory;
                            else
                                this.itemobj.categoryid=this.formCustom.category;
                            this.itemobj.description=this.formCustom.description;
                            this.itemobj.schoolid=this.formCustom.school;
                            this.itemobj.price=this.formCustom.price;
                            this.itemobj.publisherid=this.$refs.header.userid;
                            var json_data={
                                    imagelists:this.imagelists,
                                    item:this.itemobj
                            };
                            axios({
                                  method:'post',
                                  url:'http://localhost:8000/item/uploaditem',
                                  headers: {'Content-Type': 'application/json;charset=UTF-8'},
                                  data: JSON.stringify(json_data),
                            })
                            .then(function(response) {
                                    console.log(response);
                                    if(response.data.code==1){
                                       that.$Message.success('Post Successful!');
                                       that.$router.push('/home')
                                    }
                                    else{
                                       that.$Message.error('Post Fail!');
                                    }
                                })
                            .catch(function(error) {
                                    that.$Message.error('Fail!');
                                    console.log(error);
                                });       
                            
                        } 
                        else {
                            this.$Message.error('Fail!');
                        }
                    })
                } 
            },


            handleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                var index = fileList.findIndex(  
                    function(value, index, arr){
                        return value.name == file.imgName;}  
                );  
                this.$refs.upload.fileList.splice(index, 1);
                this.numoflist=this.uploadList.length;
            },
            handleSuccess (res, file) {
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
                this.formCustom.subcategory='';
                for(var i=0; i<this.categorylist.length;i++){
                    if(this.categorylist[i].value==value){
                        this.subcategorylist=this.categorylist[i].subcategory;
                    }
                }
                if(this.subcategorylist.length!=0){
                    this.disable=false;
                }
                else{
                     this.disable=true;
                }
            },
            subselect(value){

            },
           
        },

        mounted: function(){
            this.uploadList = this.$refs.upload.fileList;

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
                        that.categorylist.push({value: response.data.objectData[i].id, 
                                                label: response.data.objectData[i].name,
                            iconurl: response.data.objectData[i].iconurl, subcategory:[]});
                    }

                }
                //set the sub-category
                for(var i=0; i<response.data.objectData.length;i++){
                    var pid=response.data.objectData[i].parentid;
                    if(pid!=0){
                     that.categorylist[pid-1].subcategory.push({value: response.data.objectData[i].id,
                                                                label: response.data.objectData[i].name});
                    }
                }
                
            })
            .catch(function(error) {
                that.$Message.error('Fail!');
                console.log(error);
            }); 
        },

    }


</script>
