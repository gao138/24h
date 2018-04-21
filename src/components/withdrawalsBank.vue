<template>
  <div class="withdrawalsBank" style="height: 100%;">
              <div class="bankcardInf" v-for="item in minebankcard" @click="seleWithdrawalsBank(item)">
			          <div class="bankcardInf-mation" >
			              <div><span>银行卡</span><span>{{item.bankname}}</span></div>
			              <div><span>卡&nbsp&nbsp&nbsp&nbsp号</span><span>{{item.bankamount}}</span></div>
			          </div>
			       </div>
  </div>
</template>

<script>
import $ from 'jquery'
import apiUrls from '../apiUrls'
export default {
  name: 'withdrawalsBank',
  data () {
    return {
      balance:"",//余额
    }
  },
  created:function(){
    var strsessUserinfo = sessionStorage.getItem("sessfirstTime");
    this.openid = JSON.parse(strsessUserinfo).openid;
    this.balance = this.$route.query.balance;//余额
  	console.log(this.openid);
    this.minebankcardAjax(this.openid);
  },
  mounted:function(){  
   

  },
  methods:{
      minebankcardAjax(openid){
    	var _this = this;
    	$.ajax({
            url:apiUrls['minebankcard'],    //请求的url地址
            dataType:"json",   //返回格式为json
            async:false,//请求是否异步，默认为异步，这也是ajax重要特性 
//          data:{openID:"oYYPb0gIcCPq0IDh_fedDoJRavJU"},  
            data:{'openid':openid},  
            type:"post",   //请求方式
            success:function(req){     
            	console.log(req);
            	_this.minebankcard = req;
           },	
       });
    },
    seleWithdrawalsBank(item){
    	this.$router.push({path:"/withdrawals",query:{"bankname":item.bankname,"bankamount":item.bankamount,"allshouyi":this.balance}});
    }
    
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
</style>
