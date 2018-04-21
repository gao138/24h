<template>
  <div class="withdrawals" style="height: 100%;">
     <div class="withdrawals-box">
     			<router-link :to="{path:'withdrawalsBank',query:{balance:balance}}">
             <div class="bankcardInf">
			          <div class="bankcardInf-mation">
			              <div><span>银行卡</span><span>{{bankname}}</span></div>
			              <div><span>卡&nbsp&nbsp&nbsp&nbsp号</span><span>{{bankamount}}</span></div>
			          </div>
			       </div>
         </router-link>
      <div class="tx-btn-box">
      	<div class="withdrawals-money">提现金额</div>
     		<div class="money">
     			<span>￥</span><span><input type="number" v-model="ipmoney" /></span>
     		</div>
     		<div class="tishi" v-if="parseInt(ipmoney)>parseInt(balance)">输入金额超过提现余额</div>
     		<div class="tishi" v-else="">提现余额{{balance}}</div>
     		
      </div>   
     	<div class="tx-btn">
     		<button :disabled="parseInt(ipmoney)>parseInt(balance) || !ipmoney || !bankname || !bankamount || parseInt(ipmoney)===0" :class="{active:ipmoney && parseInt(ipmoney)<=parseInt(balance) && parseInt(ipmoney)!==0 && bankname && bankamount}" @click="txBtn()">提现</button>
     	</div>
     			
     		</div>
     </div>
  </div>
</template>

<script>
import $ from 'jquery'
import apiUrls from '../apiUrls'
export default {
  name: 'withdrawals',
  data () {
    return {
      openid:"",
      bankname:"",
      bankamount:"",
      minebankcard:"",
      balance:"",//余额
      ipmoney:""//输入金额
    }
  },
  created:function(){
  	var strsessUserinfo = sessionStorage.getItem("sessfirstTime");
    this.openid = JSON.parse(strsessUserinfo).openid;
  	this.balance = this.$route.query.allshouyi;
  	this.minebankcardAjax(this.openid);
  	this.bankname = this.$route.query.bankname;
  	this.bankamount = this.$route.query.bankamount;


  },
  mounted:function(){  
   

  },
  methods:{
    minebankcardAjax(openid){
    	console.log(openid+"------》 param");
    	var _this = this;  
    	$.ajax({
            url:apiUrls['minebankcard'],    //请求的url地址
            dataType:"json",   //返回格式为json
            async:false,//请求是否异步，默认为异步，这也是ajax重要特性 
//          data:{openid:"oYYPb0gIcCPq0IDh_fedDoJRavJU"},  
            data:{'openid':openid},  
            type:"post",   //请求方式
            success:function(req){     
            	console.log(req);    
            	if(req.length == 0){
            		alert("添加银行卡");
            		_this.$router.push({path:"/addbank",query:{}});
            	}
            	_this.minebankcard = req;
           },	
       });
    },
    txBtn(){
    	var _this = this;
    	var data = {
    		openid:this.openid,
    		bankname:this.bankname,
    		card:this.bankamount,
    		money:this.ipmoney
    	}
    	$.ajax({
            url:apiUrls['withdrawals'],    //请求的url地址
            dataType:"json",   //返回格式为json
            async:false,//请求是否异步，默认为异步，这也是ajax重要特性 
//          data:{openid:"oYYPb0gIcCPq0IDh_fedDoJRavJU"},  
            data:data,  
            type:"post",   //请求方式
            success:function(req){ 
            	console.log("提现成功");
            	console.log(req);
            	if (req.result !== "") {
            		_this.$router.push({path:"/txsuccess",query:{}});
            	}
           },	
       });
    },
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

	.bankcardInf{
  height: 1.88rem;
  background: #fff;
  overflow: hidden;
  margin-bottom: 0.2688rem;
}
.bankcardInf-mation{
  height: 1.1rem;
  margin: 0.39rem 0;
  background-image: url(../../static/img/next.png);
  background-repeat: no-repeat;
  background-position: 95% center;
  
}
.bankcardInf-mation>div{
  line-height: 0.55rem;
}
.bankcardInf-mation>div>span{
  display: inline-block;
  font-family: PingFangSC-Regular;
  font-size: 0.32rem;
  color: #333333;
}
.bankcardInf-mation>div>span:nth-child(1){
  width: 10%;
  text-align: right;
}
.bankcardInf-mation>div>span:nth-child(2){
  width: 83%;
  text-align: left;
  text-indent: 0.1rem;
}
.withdrawals-money,.tishi{
	font-family: PingFangSC-Regular;
  font-size: 0.32rem;
  color: #333333;
  text-align: left;
  text-indent: 0.4rem;
}
.tx-btn-box{
	background: #fff;
}
.money span{
	display: inline-block;
	line-height: 1.1rem;
	text-align: left;
}
.money span:nth-child(1){
	width: 10%;
	text-indent: 0.35rem;
}
.money span:nth-child(2){
	width: 90%;
	
}
.money span:nth-child(2) input{
	border: none;
}
.tx-btn button{
	width: 80%;
	background: #CDCDCD;
	line-height: 1.2rem;
	margin:20px auto 0;
	border: none;
}
 .active{
    background: #EFDCBB !important;
  }
</style>
