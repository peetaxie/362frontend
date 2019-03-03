<template>
    <Menu theme="light" active-name="1-1"  width="auto" >
        <div v-for="(item,index) in menu">
            <MenuItem :name="item.name"   >
                    <Dropdown v-if="item.subcategory!=''" class="sider-dropdown"  placement="right"  @on-click="subselect"> 
                        <div @click="select(item.id)"> 
                            <Icon :type="item.iconurl"></Icon>
                            <span >{{item.name}}</span>          
                            <Icon class="arrowicon" type="ios-arrow-right" style="display:inline;"></Icon>   
                        </div>  
                        <DropdownMenu  slot="list" >
                            <div v-for="(subitem,subindex) in item.subcategory">
                                <DropdownItem v-if="subindex == 0" :name="subitem.id">{{subitem.name}}</DropdownItem>
                                <DropdownItem v-else divided :name="subitem.id" >{{subitem.name}}</DropdownItem>           
                            </div>
                        </DropdownMenu>
                    </Dropdown>
                    <div v-else  class="sider-dropdown" @click="select(item.id)" >
                        <Icon :type="item.iconurl"></Icon>
                         <span>{{item.name}}</span>  
                    </div>
            </MenuItem>
        </div>
    </Menu>




</template>

<script>
import axios from 'axios'
export default {
    props: {
       
    },    
    data () {
        return {
             menu:[],
             categoryid:'',
        }
    },
    methods: {
        select(id){
            this.categoryid=id;
            console.log(this.categoryid);
            this.$root.$emit('categoryId',id);
        },
        subselect(id){
            this.categoryid=id;
            console.log(this.categoryid);
            this.$root.$emit('categoryId',id);
        },
    },
    mounted: function(){
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
                        that.menu.push({id: response.data.objectData[i].id, name: response.data.objectData[i].name, 
                            iconurl: response.data.objectData[i].iconurl, subcategory:[]});
                    }

                }
                //set the sub-category
                for(var i=0; i<response.data.objectData.length;i++){
                    var pid=response.data.objectData[i].parentid;
                    if(pid!=0){
                     that.menu[pid-1].subcategory.push({name: response.data.objectData[i].name,
                                                        id: response.data.objectData[i].id});
                    }
                }
                console.log(that.menu);
                
            })
        .catch(function(error) {
                that.$Message.error('Fail!');
                console.log(error);
            }); 
    },
}
</script>

<style>
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 70px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .ivu-menu-vertical .ivu-menu-item {
        padding: 2px 25px;
    }
    .sider-dropdown{
        width: 178px;
        height: 45px;
        line-height: 45px;
        vertical-align: middle;

    }
    .sider-dropdown .ivu-select-dropdown{
        width: 120px;
        text-align: center;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 25px;
    }
    .collapsed-menu .arrowicon{
        transform: translateX(5px);
        transition: font-size .1s ease .1s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 0;
    }
    .collapsed-menu .sider-dropdown{
        width: auto;
    }

</style>
