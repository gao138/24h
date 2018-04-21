<template>
  <div class="minebankcard" style="height: 100%;background: #fff;overflow: auto;">
  		 <div class="bankcardInf" v-for="item in minebankcard">
          <div class="bankcardInf-mation" >
              <div><span>{{item.bankname | getBank}}</span><span>储蓄卡</span></div>
              <div><span class="bankCard">卡号</span><span class="bankNum">**** **** **** {{item.bankamount | getBankNum}}</span></div>
          </div>
       </div>
       <div class="addbank">
       		<router-link :to="{path:'addbank',query:{}}">
             <div style="background: #E4E4E4;"><div class="addbank">添加银行卡</div></div>	
          </router-link>
       </div>
  </div>
</template>

<script>
import $ from 'jquery'
import apiUrls from '../apiUrls'
export default {
  name: 'minebankcard',
  data () {
    return {
      minebankcard:"",
      openid:""
    }
  },
  created:function(){
  	var strsessUserinfo = sessionStorage.getItem("sessfirstTime");
    this.openid = JSON.parse(strsessUserinfo).openid;
  	console.log(this.openid);
    this.minebankcardAjax(this.openid);
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
            data:{"openid":openid},  
            type:"post",   //请求方式
            success:function(req){     
            	console.log(req);
            	if(req.length <=0){
            		alert("你还没添加银行卡");
            		_this.$router.push({path:"/addbank",query:{}});
            		return;
            	}
            	
            	_this.minebankcard = req;
            	console.log(_this.minebankcard);
           },	
       });
    }
    
  },
  destroyed: function () {
      
  },
  watch:{
   
  },
  filters: {
       getBank: function (value) {
       	 var end = value.indexOf("行");
         return value.slice(end-3,end+1);
       },
       getBankNum:function(value){
       	 return value.slice(-4);
       }
     }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- scoped说明样式只能在当前组件用 -->
<style scoped>
	.bankcardInf{
	width: 96.5%;
	background: #BC5555;;
  height: 2.3466667rem;
  overflow: hidden;
  margin: 0.1608rem auto;
  border-radius: 0.2666667rem;
}
.bankcardInf-mation{
  height: 1.1rem;
  margin: 0.49rem 0;
}
.bankcardInf-mation>div{
  line-height: 0.65rem;
  overflow: hidden;
}
.bankcardInf-mation>div>span{
  display: inline-block;
  font-family: PingFangSC-Regular;
  font-size: 0.32rem;
  color: #333333;
}
.bankcardInf-mation>div>span:nth-child(1){
  width: 15%;
  text-align: left;
  font-family: PingFangSC-Medium;
	font-size: 0.32rem;
	color: #FCFCFC;
}
.bankcardInf-mation .bankCard{
	font-size: 0.34666667rem !important;
	color: #FFC0C0 !important;
}
.bankcardInf-mation .bankNum{
	font-family: PingFangSC-Medium !important;
	font-size: 0.4rem !important;
	color: #FFFFFF !important;
}
.bankcardInf-mation>div>span:nth-child(2){
  width: 78%;
  text-align: left;
  font-family: PingFangSC-Medium;
	font-size: 0.266667rem;
	color: #FFC0C0;
	vertical-align: middle;
}
.addbank{
	line-height: 1.213333rem;
	text-align: left;
	text-indent: 1rem;
	background: url(../../static/img/addbank.png) no-repeat 5% center,
	url(../../static/img/next.png) no-repeat 95% center;
	background-size: 3%;
}
</style>
