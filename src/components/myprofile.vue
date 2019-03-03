<style scoped>
.layout{
    height: 100%;
    width: 100%;

}


</style>

<template>
     <div class="layout">
        <Layout :style="{minHeight: '120vh'}">
            <ComponentHeader></ComponentHeader>   
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                Item 1
                            </template>
                            <MenuItem name="1-1">Option 1</MenuItem>
                            <MenuItem name="1-2">Option 2</MenuItem>
                            <MenuItem name="1-3">Option 3</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                Item 2
                            </template>
                            <MenuItem name="2-1">Option 1</MenuItem>
                            <MenuItem name="2-2">Option 2</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                Item 3
                            </template>
                            <MenuItem name="3-1">Option 1</MenuItem>
                            <MenuItem name="3-2">Option 2</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '15px 15px'}">

                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        Content
                    </Content>
                </Layout>
            </Layout>
                    <Footer style="text-align: center; background-color: white; box-shadow: 0 -1px 8px 1px rgba(0,0,0,.1); z-index: 998">Footer</Footer>
        </Layout>
            <BackTop ref="gotop" :height=200 :bottom=80 :right=20 :duration=700>
            <Icon  type="android-arrow-dropup-circle" size=40 color="#80848f"></Icon>
            </BackTop>
    </div>

</template>

<script>
    import ComponentA from '@/components/item'
    import ComponentHeader from '@/components/home-header'
    export default {


        data () {
            return {


            };
        },
        components: {
            ComponentA,
            ComponentHeader,
        },
        computed: {


        },
        methods: {
           
        },

        mounted: function(){


        },

    }


</script>
