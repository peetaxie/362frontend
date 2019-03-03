<template>
	<div class="header">
		<div class="header-mark">
			<a href="#/home">
			<img style="width: 50px; height: 50px;" src="../assets/logo.png">
			</a>
		</div>

		<div class="header-search">
			<div class="input-part">	   	      	
		        <Input  clearable size="large" placeholder="Search what you want" style="width:450px; z-index:1;">
					<div slot="prepend" style="width: 175px;">
						<icon type="university" color="#536F92" size=25 style="position:absolute; left: 4px;"></icon>
	       				<Componentselect class="school-select" ref="C_school"></Componentselect>		
			    	</div>
		        </Input>
	    	</div>
	        	<Button shape="circle" type="info" size="large" icon="ios-search"></Button>
	    </div>

    	<div class="header-post">
			<Button @click="postitem" shape="circle" type="dashed" icon="alert">Post</Button>
		</div>

		<div v-if="islogin=='no'" class="header-user">
			    <a href="#/signup">Sign up</a>
			    <span>|</span>
			    <a href="#/login">
			    <Button type="ghost" icon="log-in" size="small" shape="circle">Login</Button>
				</a>
		</div>

		<div v-else-if="islogin=='yes'" class="header-user">
			<Dropdown @on-click="handleUser">
	        	<a>
		            <span class="username" style="color:#80848f; font-size:15px; padding-right:5px;">{{username}}</span>
					 <Avatar shape="square" style="background-color: #87d068; " icon="person" />
		        </a>
		        <DropdownMenu slot="list">
		            <DropdownItem name="profile"><Icon type="person" style="float: left;"></Icon>My profile</DropdownItem>
		            <DropdownItem divided name="logout"><Icon type="log-out" style="float: left;"></Icon>Sign out</DropdownItem>
		      	</DropdownMenu>
		    </Dropdown>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import Componentselect from '@/components/schoolselect'
    export default {
        props: {
           
        },    
        data () {
            return {
            	useremail:'',
            	username:'',
            	userid:'',
            	islogin: 'no',
            	loading: false,
            	schoollist:[],              
            }
        },
        components: {
            Componentselect,
        },

        methods: {  	
        	postitem(){
        		if(this.islogin=="no"){
        			window.location.href='#/login';
        		}
        		else if(this.islogin=="yes"){
        			window.location.href='#/post';
        		}
        	},
        	handleUser(name){
        		console.log(name);
        		if(name=="logout"){
	                localStorage.setItem('username','');
                    localStorage.setItem('useremail','');
                    localStorage.setItem('userid','');
                    localStorage.setItem('islogin',"no");
                    this.useremail="";
                    this.username="";
                    this.islogin="no";
                    this.$Message.info("You have been logout");
        		}
        		else if(name="profile"){
        			 window.location.href='#/myprofile';
        		}
        	},
        },

        mounted: function(){
        	console.log(this.schoolid);
        	this.username =localStorage.getItem('username');
        	this.useremail =localStorage.getItem('useremail');
        	this.userid = localStorage.getItem('userid');
        	this.islogin =localStorage.getItem('islogin');
        	console.log("islogin: "+this.islogin);
        },
    }
</script>

<style>
	
.header{
	display: table;
	background-color: #f8f8f9;
	width: 100%;	
	height: 55px;
	padding: 1px 5px;
	white-space: nowrap;
	border: 0px solid black;
	box-shadow: 0 2px 10px 1px rgba(0,0,0,.1);
	z-index: 999;
}

.header-mark{
	display: table-cell;
	width: 20%;
	border: 0px solid red;
	white-space: nowrap;	
	text-align: left;
	vertical-align: middle;

}
.header-search{
	display: table-cell;
	width: 60%;
	text-align: center;
	vertical-align: middle;
	white-space: nowrap;
	border: 0px solid red; 
}
.input-part{
	display: inline-block;
	vertical-align: middle;
	border: 0px solid red;
}
.header-search Input{
	border: 0px solid red;
	box-shadow: 0 1px 20px 3px rgba(0,0,0,.1)
}
.header-search Button{
	border: 0px solid red;
	margin-left: 5px;
}
.header-search p{
	display: inline-block;
	border: 0px solid red;
}

.header-post{
	width: 5%;
	display: table-cell;
	vertical-align: middle;
}
.header-user{
	width: 15%;
	display: table-cell;
	border: 0px solid red;
	padding-left: 100px;	
	vertical-align: middle;

}
.ivu-input-group-prepend{
	background-color: white;
	border:0px solid red;
	box-shadow: 0 1px 20px 3px rgba(0,0,0,.1)
}
.school-select input{
    padding-left: 20px;
}
</style>
