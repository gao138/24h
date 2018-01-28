<template>
  <div class="payment" style="height: 100%;">
      <div class="page">
        <div class="content">
               <div class="order">  
                 <span style="white-space:pre;"></span><span class="line" style="vertical-align: 6%;margin-right: 3%"></span>  
                 <span style="white-space:pre;"></span><span class="txt">{{detailsRegion}}</span>  
                 <span style="white-space:pre;"></span><span class="line" style="vertical-align: 6%;margin-left: 3%"></span>  
               </div> 
               <div class="saleNum">
                  <div style="border-bottom: 1px solid #DFDFDF;"><span>{{paySchool}}咖啡机</span><span>{{productNum}}份</span></div>
                  <div style="border-bottom: 1px solid #DFDFDF;"><span>金额</span><span>{{payPrice}}</span></div>
                  <div style="border-bottom: 1px solid #DFDFDF;"><span>月收益</span><span>约150元</span></div>
                  <div style="border-bottom: 1px solid #DFDFDF;"><span>购买日期</span><span>{{payTime}}</span></div>
                  <div style="border-bottom: 1px solid #DFDFDF;"><span>收益日期</span><span>{{profit}}</span></div>
                  <!-- <div><span>月收入</span><span>100元起</span></div> -->
               </div>
               <div class="pay">
                  <div style="border-bottom: 1px solid #DFDFDF;"><span><img src="../../static/img/weipay.png" alt="" > 微信支付</span><span><img src="../../static/img/noxuan.png" alt="" @click="weixinPay($event)"></span></div>
                 <!--  <div><span><img src="../../static/img/bankpay.png" alt=""> 银行卡支付</span><span><img src="../../static/img/noxuan.png" alt="" @click="weixinPay($event)"></span></div> -->
               </div>    
        </div>
        <div class="footer">
              <div><span>合计￥{{allPrice}}&nbsp&nbsp&nbsp&nbsp</span><span @click="payOk()">确认付款</span></div>
        </div>
      </div>  
  </div>
</template>
<script>
import $ from 'jquery'
// import wx from 'weixin-js-sdk'
// import wexinPay from '../weipay.js'
import apiUrls from '../apiUrls'
export default {
  name: 'payment',
  data () {
    return {
        paySchool:"",
        payPrice:"",
        payTime:"",
        productNum:"",//商品数量宋体的
        allPrice:"",//总价格
        isSelected:"",//是否选择了支付方式
        openid:"",//openid
    }
  },
  methods:{
    weixinPay(even){
      var _this = this;
      if (!$(event.target).attr("checked")) {
        console.log("选中")
        var xuanImg = require("../../static/img/xuan.png");
        $(event.target).attr("checked",true);
        $(event.target).attr("src",xuanImg);
        _this.isSelected = {isSelected:true,payWay:event.target};
      }else{
        console.log("取消");
        var noxuanImg = require("../../static/img/noxuan.png");
        $(event.target).attr("checked",false);
        $(event.target).attr("src",noxuanImg);
      }
    },
    weixinConfig:function(){
         var allpayInformation = {
          "url":window.location.href.split('#')[0],
          }
        $.ajax({
              // url:'http://192.168.1.101:8080/eh/ycb/wxpay/config.do',    //请求的url地址
              url:apiUrls['paymentpageConfig'],    //请求的url地址
              dataType:"json",   //返回格式为json
              async:true,//请求是否异步，默认为异步，这也是ajax重要特性 
              data:allpayInformation,  
              type:"post",   //请求方式
              success:function(req){
                  alert(req + '微信config请求成功');
                  wx.config({
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: req.appId, // 必填，公众号的唯一标识
                    timestamp: req.timestamp, // 必填，生成签名的时间戳
                    nonceStr: req.nonceStr, // 必填，生成签名的随机串
                    signature: req.signature, // 必填，签名，见附录1
                    jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                  });         
              },
              error:function(err){
                  //请求出错处理
                  // alert(JSON.stringify(err) + '失败'); 
              }
            });
 
    },
    payOk:function(){
      var _this = this;
      var a = new Date();
      var dingdanTime =  a.getFullYear()+ "年"+(a.getMonth()+1)+"月"+a.getDate() + "日"+ a.getHours()+ '时'+ a.getMinutes()+ '分'+ a.getSeconds() + '秒';
      if (!this.isSelected.isSelected) {
        alert("勾选付款方式");
        return;
      };
      var allpayInformation = {
      		"area":this.detailsRegion,
      		"unit":this.paySchool,
      		"mach":this.onlyOneListname,
      		"num":this.productNumAlbo,
      		"totalfee":this.allPrice,
      		"startTime":dingdanTime,
          "openid":this.openid,
      		// "openid":'oYYPb0kX_sUAABZZF879tq9vYS44',
          "url":window.location.href,
      };
      console.log("paymentopenid是" + this.openid);
      alert("请求开始");
     	 $.ajax({
        url:apiUrls['paymentpage'],    //请求的url地址
        dataType:"json",   //返回格式为json
        async:true,//请求是否异步，默认为异步，这也是ajax重要特性 
        data:allpayInformation,  
        type:"post",   //请求方式
          success:function(req){
              //请求成功时处理
              // wexinPay(req);
              // alert("请求后台成功");
              alert(JSON.stringify(req) + "payment请求数据成功");
              console.log("请求的数据成功");
              // console.log(req);
              _this.onBridgeReady(req);        
          },
      });
    },
   onBridgeReady:function(data){
       console.log("请求成功+++++");
       console.log(data); 
       var newdata = {
              "appId":data.appId,     //公众号名称，由商户传入     
               "timeStamp":data.timeStamp,         //时间戳，自1970年以来的秒数     
               "nonceStr":data.nonceStr,//随机串     
               "package":data.package,     
               "signType":"MD5",         //微信签名方式：     
               "paySign":data.sign//微信签名 
       }
       console.log(newdata);
       console.log("上面是newdata");
       WeixinJSBridge.invoke(
           // 'getBrandWCPayRequest', {
           //     "appId":data.appId,     //公众号名称，由商户传入     
           //     // "appId":'wx88cb890e1e079473',     //公众号名称，由商户传入     
           //     "timeStamp":data.timeStamp,         //时间戳，自1970年以来的秒数     
           //     "nonceStr":data.nonceStr,//随机串     
           //     "package":data.package,     
           //     "signType":"MD5",         //微信签名方式：     
           //     "paySign":data.sign//微信签名 
           // },
          'getBrandWCPayRequest',newdata,
           function(res){     
                console.log(JSON.stringify(res) + '------------');
               if(res.err_msg == "get_brand_wcpay_request:ok" ) {}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
           }
       ); 
    }

  },
  created:function(){
  //参数
    this.paySchool = this.$route.query.topay;
    this.payPrice = this.$route.query.price;
    this.payTime = this.$route.query.payTime;
    this.productNum = this.$route.query.numToCont;
    this.productNumAlbo = this.$route.query.num;
    this.allPrice = this.$route.query.num*this.payPrice;
    this.detailsRegion = this.$route.query.detailsRegion;
    this.onlyOneList = this.$route.query.onlyOneList;
    this.onlyOneListname = this.$route.query.onlyOneListname;
    this.profit = this.$route.query.profit;

    this.openid = localStorage.getItem("openid");//取本地存储
    // alert("localStorage + openid是" + this.openid);
    console.log(this.openid);
    // alert(window.location.href + '111111111');
    // alert(window.location.href.split('#')[0] + '22222222');
//.....................
   // this.weixinConfig();//配置config
// ......................
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
 .order {  
     height: 1.04941334rem;  
     line-height: 1.04941334rem; 
     text-align: center;  
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
  .saleNum,.pay{
    /*height: 3.76rem;*/
    background: #fff;
    margin-bottom: 0.2668rem;
  }  
  .saleNum>div,.pay>div{
    height: 1.2533333rem;
  }
  .saleNum>div>span,.manNum>div>span,.pay>div>span{
    display: inline-block;
    font-family: PingFangSC-Regular;
    font-size: 0.32rem;
    color: #613F05;
    line-height: 1.2533335rem;
  }
  .saleNum>div>span:nth-child(1),.manNum>div>span:nth-child(1),.pay>div>span:nth-child(1){
    width: 60%;
    text-align: left;
  }
  .saleNum>div>span:nth-child(2),.manNum>div>span:nth-child(2),.pay>div>span:nth-child(2){
    width: 33%;
    text-align: right;
  }
  .pay>div>span:nth-child(1)>img{
    width: 12%;
  }
  .pay>div>span:nth-child(2)>img{
    width: 10%;
  }
  /*flex最外框*/
  .page {
    display: flex;
    flex-direction: column;/* 该框从顶部列出其内容。 */
    height: 100%;
  }
/*滚动条不显示*/
  .content::-webkit-scrollbar {
    display:none
  }
  /*flex内容区*/
  .page .content {
    position: relative;
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    background-color: #f4f4f4;
  }
  .footer {
    overflow: hidden;  
  }
  .footer>div{
    height: 1.30666667rem;
  }
  .footer>div>span{
    line-height: 1.30666667rem;
    display: inline-block;
    font-family: PingFangSC-Regular;
    font-size: 0.4rem;
  }
  .footer>div>span:nth-child(1){
    width: 60.3%;
    text-align: right;
    color: #fff;
    background: #2C2C2C;
  }
  .footer>div>span:nth-child(2){
    width: 39.7%;
    text-align: center;
    color: #613F05;
    background: #EFDCBB;
  }

</style>
