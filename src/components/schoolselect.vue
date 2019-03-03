<style >

</style>

<template>
    <div style="overflow: hidden; clear: both;">
    	<Select @on-change="schoolchange"
    			@on-query-change="getquery"
    			placeholder="Enter your school"
    			size="large"
    			clearable
    		    filterable
    		    :loading="loading">
    		    <Option v-for="(school, index) in schoollist" :value="school.id" :label="school.name" :key="index"
    		    style="border-bottom: 1px solid #dddee1;padding-left: 5px; text-align: left; z-index: 9999">
    		    		<span>{{school.name}}</span>
    		    		<br>
    		    		<span style="color:#ccc; font-size: 10px;"><icon type="location" color="red"></icon> {{school.city}},{{school.state}}</span>
    			</Option>
    	</Select>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        props: {
           
        },    
        data () {
            return {
            	loading: false,
            	schoollist:[],
                schoolid:'0',      
            }
        },
        methods: {
        	schoolchange(value){
        		//console.log(value);
                this.schoolid=value;
                this.$root.$emit('schoolId',value);
        	},
        	getquery(query){
        			console.log(query);
        		  if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        var that = this;
                        let param = new URLSearchParams();
                        param.append("name",query);
                        //search school list
				        axios({
				              method:'post',
				              url:'http://localhost:8000/school/getschools',
				              data: param,
				            })
				        .then(function(response) {
				                console.log(response);
				                that.schoollist=response.data.objectData;
				                console.log(that.schoollist);
 								that.loading = false;
				            })
				        .catch(function(error) {
				                that.$Message.error('Fail!');
				                console.log(error);
				            }); 

                    }, 200);
                } 
                else {
                    this.schoollist = [];
                }
        	},      	
        mounted: function(){

        },

    }
}
</script>