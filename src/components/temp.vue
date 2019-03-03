<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;

}

.layout-footer-center{
    text-align: center;
}
.input{
    autocomplete: off;
}
#grid li{
    float: left;
}
#allitems{
    width: 1330px;
    padding: 20px;
    display: inline-block;
    float: left;
    margin: 0 auto;
    border: 0px solid red;
}

</style>
<template>
    <div class="layout">

        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">

        <MenuItem name="1">
            <Icon type="ios-paper"></Icon>
            小熊之家
        </MenuItem>
        <MenuItem name="2">
            <Icon type="ios-people"></Icon>
            menu
        </MenuItem>
        <Submenu name="3">
            <template slot="title">
                <Icon type="stats-bars"></Icon>
               menu
            </template>
            <MenuGroup title="使用">
                <MenuItem name="3-1">新增和启动</MenuItem>
                <MenuItem name="3-2">活跃分析</MenuItem>
                <MenuItem name="3-3">时段分析</MenuItem>
            </MenuGroup>
            <MenuGroup title="留存">
                <MenuItem name="3-4">用户留存</MenuItem>
                <MenuItem name="3-5">流失用户</MenuItem>
            </MenuGroup>
        </Submenu>
        <MenuItem name="4">
            <Icon type="settings"></Icon>
            menu
        </MenuItem>

        <Button @click="modal1 = true">Login</Button>
        <Modal v-model="modal1"
                ok-text="Login"
                cancel-text="Cancel" >
<center>
        <font face="PingFang SC">Login</font>
        <Input v-model="value1" type="email" icon="email" placeholder="Enter your email" style="width: 300px">        
        <p slot="prepend"  style="width:50px">Email</p>
        </Input>
        <br>
        <Input v-model="value2" type="password" icon="locked" placeholder="Enter your password" style="width: 300px">
        <p slot="prepend" style="width:50px">Password</p>
        </Input>
</center>
        </Modal>


        <Button @click="modal2 = true">Sign up</Button>
        <Modal v-model="modal2"
                ok-text="Confirm"
                cancel-text="Cancel" >
<center>
        <Input v-model="value1" type="email" placeholder="Enter your email" style="width: 300px">        
        <Icon slot="prepend"  type="email" style="width:20px" />
        </Input>
        <br>
        <Input v-model="value2" type="password" placeholder="Enter your nickname" style="width: 300px">
        <Icon slot="prepend"  type="person" style="width:20px" />
        </Input>
        <br>
        <Input v-model="value3" type="password" placeholder="Enter your password" style="width: 300px">
        <Icon slot="prepend"  type="locked" style="width:20px"/>
        </Input>
        <br>
        <Input v-model="value3" type="password" placeholder="Confirm your password" style="width: 300px">
        <Icon slot="prepend"  type="locked" style="width:20px"/>
        </Input>
</center>
        </Modal>



         </Menu>
     
            </Header>
            <Content :style="{padding: '0 50px'}">
                <Breadcrumb :style="{margin: '10px 0'}">
                    <BreadcrumbItem>Home</BreadcrumbItem>

                </Breadcrumb>
                    <div style="min-height: 450px;">
                         <div id="allitems">

                            <ul id="grid">
                                <li v-for="item in items">
                                    <ComponentA :C_itemtitle=item.title :C_itemsrc=item.itemsrc :C_price=item.price :C_iconsrc=item.icon></ComponentA>
                                </li>
                            </ul>   
                        </div>                       

                    </div>
            </Content>
            <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
        </Layout>
    </div>
</template>


<script>
    import ComponentA from '@/components/item'
    export default {
        data () {
            return {
                modal1: false,
                modal2: false,
                items:[
                {title:"good stuff for sale! asd ads asd asd asd", itemsrc: "/static/img/1.jpg", price: 55, icon:"https://i.loli.net/2017/08/21/599a521472424.jpg"},
                {title:"家具！!", itemsrc: "/static/img/2.jpg", price: 12, icon:"https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png" },
                {title:"pineapple who want some??!", itemsrc: "/static/img/3.jpg", price: 22,icon:"https://developer.android.com/guide/practices/ui_guidelines/images/NB_Icon_Mask_Shapes_Ext_02.gif"},
                {title:"desk for sale!", itemsrc: "/static/img/4.jpg", price: 4, icon:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUSkVLozDtGXiDyxOlsz-EoSJxpmjomRzT8Sr31j9l95UAiXLZ"},
                {title:"Chair for sale!", itemsrc: "/static/img/5.jpg", price: 20,icon:"http://dx54ed3r88ipb.cloudfront.net/upload/cartoon-icon-final.jpg"},
                {title:"Chair for sale!", itemsrc: "/static/img/5.jpg", price: 20,icon:"http://dx54ed3r88ipb.cloudfront.net/upload/cartoon-icon-final.jpg"},
                {title:"Chair for sale!", itemsrc: "https://i.loli.net/2017/08/21/599a521472424.jpg", price: 20,icon:"http://dx54ed3r88ipb.cloudfront.net/upload/cartoon-icon-final.jpg"},
                {title:"Chair for sale!", itemsrc: "/static/img/5.jpg", price: 20,icon:"http://dx54ed3r88ipb.cloudfront.net/upload/cartoon-icon-final.jpg"},
                {title:"Chair for sale!", itemsrc: "/static/img/5.jpg", price: 20,icon:"http://dx54ed3r88ipb.cloudfront.net/upload/cartoon-icon-final.jpg"},
                {title:"Chair for sale!", itemsrc: "https://i.loli.net/2017/08/21/599a521472424.jpg", price: 20,icon:"http://dx54ed3r88ipb.cloudfront.net/upload/cartoon-icon-final.jpg"},

                ],


            }
        },
    components: {
            ComponentA
        },
        
    }


</script>
