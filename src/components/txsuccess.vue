<template>
  <div class="txsuccess" style="height: 100%;">
  	<div class="success-cont">
  		提现成功，1-3工作日到账
  	</div>
		<div class="tx-success-btn">
	 		<button  @click="txSuccessBtn()">成功</button>
	 	</div>
 
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'txsuccess',
  data () {
    return {
     
    }
  },
  methods:{
   txSuccessBtn(){
   	this.$router.push({path:"/mywallet",query:{}});
   }
  },
  created:function(){
    
  },
  mounted:function(){
   
  },
  destroyed: function () {
      
  },
  watch:{
   
  },
  // filters: {
  //   setNum: function (value) {
  //     if (!value) return ''
  //     return value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- scoped说明样式只能在当前组件用 -->
<style scoped>
.success-cont{
	margin-top: 5rem;
}
.tx-success-btn button{
	width: 30%;
	background: #EFDCBB;
	line-height: 1.2rem;
	margin:20px auto 0;
	border: none;
	
}
</style>
