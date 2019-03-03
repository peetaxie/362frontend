<template>
    <div class="demo-upload">
        <img :src="itemPhoto.imgUrl">
        <div class="demo-upload-text">
            <span class="demo-upload-text-span">{{itemPhoto.imgIndex}}</span>
            <span class="demo-upload-text-span">{{itemPhoto.imgName}}</span>
            
        </div>
        <div class="demo-upload-list-cover">
            <Icon type="ios-eye-outline" @click.native="handleView(itemPhoto)"></Icon>
            <Icon type="ios-trash-outline" @click.native="handleRemove(itemPhoto)"></Icon>
        </div>
        
        <Modal title="View Image" v-model="visible">
            <img :src="imageurl" v-if="visible" style="width: 100%;">
        </Modal>
    </div>
    
</template>

<script>
    export default{
        props:{
            C_imageurl:{
                default:""
            },
            C_imagename:{
                default:""
            },
            C_imageindex:{
                default:0
            },
        },
        data(){
            return{
                itemPhoto:{
                    imgUrl: this._props.C_imageurl,
                    imgName: this._props.C_imagename,
                    imgIndex: this._props.C_imageindex,
                },
                imageurl: '',
                imagename: '',
                imageindex: '',
                visible: false
            }
        },
        methods:{
            handleView (ph) {
                console.log("当前操作是：显示大图 " + ph.imgName);
                this.imageurl = ph.imgUrl;
                this.imagename = ph.imgName;
                this.visible = true;
            },
            handleRemove (ph) {
                console.log("当前动作是删除文件操作：" + ph.imgName);
                this.$root.$emit('itemphoto',ph);
            }
        },
        watch: {  
            C_imageurl(val){  
                this.itemPhoto.imgUrl = val;  
            },
            C_imagename(val){  
                this.itemPhoto.imgName = val;  
            },
            C_imageindex(val){  
                this.itemPhoto.imgIndex = val;  
            },
        }, 
        mounted(){
            
        }
    }
</script>

<style>
    .demo-upload{
        width: 100px;
        height: 100px;
        display: inline-block;
        text-align: center;
        line-height: 100px;
        vertical-align: middle;
        position: relative;
        border-radius: 5px;
    }
    .demo-upload img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-text{
        display: none;
        bottom: 20px;
        line-height: 10px;
        border: 1px solid red;
    }
    .demo-upload-text-span{
        font-size: 10px;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,0.4);
        line-height: 100px;
        vertical-align: middle;
    }
    /* 鼠标移上去，Icon变为展示 */
    .demo-upload:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0px 6px;
    }
</style>