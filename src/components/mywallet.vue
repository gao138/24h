<template>
  <div class="mywallet" style="height: 100%;">
      <div class="page">
          <div class="header">
          </div>
          <div class="content">
              <div class="wallet-head">
                  <div class="wallet-img"><img src="../../static/img/money.png" alt=""></div>
                  <div class="wallet-p">总收益￥{{allshouyi}}</div>
               </div>
               <div v-for="item in myCoffeemachine">
                 <div class="order">  
                   <span style="white-space:pre;"></span><span class="line" style="vertical-align: 6%;margin-right: 3%"></span>  
                   <span style="white-space:pre;"></span><span class="txt">{{item.area}}</span>  
                   <span style="white-space:pre;"></span><span class="line" style="vertical-align: 6%;margin-left: 3%"></span>  
                 </div> 
                  <div class="specifications" v-for="itemI in item.data">
                    <div class="specifications-cont">
                      <div><span>{{itemI.unit}}咖啡机</span><span>{{itemI.money}}元/{{itemI.num}}份</span></div>
                      <div><span></span><span>暂无收益</span></div>
                      <!-- <div><span></span><span>4月份收益100元</span></div> -->
                      <!-- <div><span></span><span>4月份收益100元</span></div> -->
                      <!-- <div><span></span><span>4月份收益100元</span></div> -->
                      <!-- <div><span>2018年3月8日收益</span><span>已收益</span></div> -->
                    </div>
                 </div>
                </div>
          </div>
          <div class="footer">
            <div class="footer-btn">
                <span>总收益￥{{allshouyi}}</span><span @click="withdrawals()">提现</span>
            </div>
          </div>
        </div>
  


   
  </div>
</template>

<script>
import $ from 'jquery'
import apiUrls from "../apiUrls"
export default {
  name: 'mywallet',
  data () {
    return {
      myWalletOpenid:"",
      myCoffeemachine:"",
      shouyiTime:"",
      allnum:0,
      allshouyi:0,
      ye:""
    }
  },
  methods:{
     mywalletAjax(openid){
        var _this = this;
        $.ajax({
            url:apiUrls['mywalletPage'],    //请求的url地址
            dataType:"json",   //返回格式为json
            async:false,//请求是否异步，默认为异步，这也是ajax重要特性 
            data:{openID:openid},  
            type:"post",   //请求方式
            success:function(req){     
              console.log("mywalletAjax是下面"); 
              console.log(req);
              _this.myCoffeemachine = req;
              
           },
        });
    },
		money(openid){
				console.log(openid);
			 $.ajax({
            url:apiUrls['money'],    //请求的url地址
            dataType:"json",   //返回格式为json
            async:false,//请求是否异步，默认为异步，这也是ajax重要特性 
            data:{'openid':openid},
            type:"post",   //请求方式
            success:function(req){     
              console.log(req);
           },
        });
		},
		yue(openid){
			var _this = this;
			 $.ajax({
            url:apiUrls['yue'],    //请求的url地址
            dataType:"json",   //返回格式为json
            async:false,//请求是否异步，默认为异步，这也是ajax重要特性 
            data:{'openid':openid},  
            type:"post",   //请求方式
            success:function(req){ 
            	_this.ye = req.result;
            	_this.allshouyi = req.result;
              console.log(_this.ye);
           },
        });
		},
    datedifference(sDate1, sDate2){    //sDate1和sDate2是2006-12-18格式  
        var dateSpan,
            tempDate,
            iDays;
        sDate1 = Date.parse(sDate1);
        sDate2 = Date.parse(sDate2);
        dateSpan = sDate2 - sDate1;
        dateSpan = Math.abs(dateSpan);
        iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
        return iDays
    },
    getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate         
        return currentdate;
    },
    withdrawals(){
    	if(this.allshouyi <= 0){
    		return;
    	}
    	this.$router.push({path:"/withdrawals",query:{allshouyi:this.allshouyi}});
    }

     

  },
  created:function(){
  	var strsessUserinfo = sessionStorage.getItem("sessfirstTime");
    this.myWalletOpenid = JSON.parse(strsessUserinfo).openid;
    this.mywalletAjax(this.myWalletOpenid);  
    this.yue(this.myWalletOpenid);

  },
  mounted:function(){
    
  },
 destroyed: function () {
    
 }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- scoped说明样式只能在当前组件用 -->
<style scoped>
    /*flex最外框*/
    .page {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      height: 100%;
    }

    .content::-webkit-scrollbar {display:none}

    /*flex内容区*/
    .page .content {
      position: relative;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      background-color: #fff;
    }
    /*flex底部，按钮平均分布*/
    .footer {
      overflow: hidden;
      background: #fff;
    }

 .order {  
     height: 1.2533335rem;  
     line-height: 1.2533335rem;  
     text-align: center;  
     background: #F4F4F4;
  }  
   .order .line {  
     display: inline-block;  
     width: 14.7%;  
     border-top: 1px solid #7B7D5C; ;  
  }  
  .order .txt {  
     vertical-align: middle;  
     font-size: 0.4rem;
     font-family: PingFangSC-Medium;
    color: #7B7D5C;
  }
.wallet-head{
  height: 2.906667rem;
  background: #EFDCBB;
  overflow: hidden;
}
.wallet-img{
    margin-top: 0.5rem;
}
.wallet-img img{
  width: 11%;
}
.wallet-p{
  font-family: PingFangSC-Regular;
  font-size: 0.4rem;
  color: #B09971;
  line-height: 0.9rem;
}
 .specifications{
    background: #fff;
    overflow: hidden;
  }
    .specifications-cont{
    width: 93%;
    margin: 0.2668rem auto;
    background: #fff;
  }  
  .specifications-cont>div>span{
    display: inline-block;
    font-family: PingFangSC-Regular;
  }
   .specifications-cont>div:nth-child(1)>span{
     line-height: 0.9rem;
     color: #613F05;
     font-size: 0.3733333rem;  
  }
  .specifications-cont>div{
     line-height: 0.5rem;
     color: #2E2E2E;
     font-size: 0.32rem;  
  }
  .specifications-cont>div>span:nth-child(1){
    width: 60%;
    text-align: left;
  }
  .specifications-cont>div>span:nth-child(2){
    width: 33%;
    text-align: right;
  }
  .footer-btn>span{
    display: inline-block;
    line-height: 1.3066667rem;
    font-family: PingFangSC-Regular;
    font-size: 0.4rem;
    color: #FFFFFF;
  }
  .footer-btn>span:nth-child(1){
    width: 60%;
    background: #2C2C2C;
    text-indent: 25%;
  }
  .footer-btn>span:nth-child(2){
    background: #EFDCBB;
    width: 40%;
    text-align: center;
  }
</style>
