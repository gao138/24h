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
                  <div style="border-bottom: 1px solid #DFDFDF;"><span>金额</span><span>{{payPrice}}/1份</span></div>
                  <div style="border-bottom: 1px solid #DFDFDF;"><span>月收益</span><span>约150元/1份</span></div>
                  <div style="border-bottom: 1px solid #DFDFDF;"><span>购买日期</span><span>{{payTime}}</span></div>
                  <!-- <div style="border-bottom: 1px solid #DFDFDF;"><span>收益日期</span><span>{{profit}}</span></div> -->
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
      <!-- 模板 -->
      <div class="mould">
          <div class="paySuccess">
              <div class="paySuccess-title">支付成功</div>
              <div class="paySuccess-money">￥{{allPrice}}</div>
              <router-link :to="{path:'coffeemachine',query:{openid:openid}}"><div class="paySuccess-btn"><button>确定</button></div></router-link>
          </div>
      </div>
      <div class="Agreement">
        <div class="Agreement-con">
            <div class="Agreement-title">24咖啡服务协议</div>
            <div class="Agreement-content">
                <div class="Agreement-content-con">
                    <img src="../../static/img/agreecont.png" alt="">
                </div>
            </div>
            <div class="Agreement-btn">
              <span @click="isAgree('agree')">同意</span><span @click="isAgree('noagree')">不同意</span>
            </div>
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
        btnAgree:"",//点击同意，不同意
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
        console.log(_this.isSelected);
      }else{
        console.log("取消");
        var noxuanImg = require("../../static/img/noxuan.png");
        $(event.target).attr("checked",false);
        $(event.target).attr("src",noxuanImg);
        _this.isSelected.isSelected = false;
      }
    },
    weixinConfig:function(){
         var allpayInformation = {
          "url":window.location.href.split('#')[0],
          }
        $.ajax({
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
      if (!this.btnAgree === true) {
        // alert("请点击同意协议");
        $(".Agreement").show();
        return;
      }
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
          "openid":this.openid,
          // "openid":"oYYPb0gIcCPq0IDh_fedDoJRavJU",
      };
      console.log("paymentopenid是" + this.openid);
      // alert("请求开始");
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
              console.log("请求的数据成功");
              // alert(JSON.stringify(req) + "payment数据");
              _this.onBridgeReady(req);        
          },
      });
    },
   onBridgeReady:function(data){
        var _this = this;
       console.log(data);
       console.log("开始WeixinJSBridge");
       WeixinJSBridge.invoke(
           'getBrandWCPayRequest', {
               "appId":data.appId,     //公众号名称，由商户传入     
               // "appId":'wx88cb890e1e079473',     //公众号名称，由商户传入     
               "timeStamp":data.timeStamp,         //时间戳，自1970年以来的秒数     
               "nonceStr":data.nonceStr,//随机串     
               "package":data.package,     
               "signType":"MD5",         //微信签名方式：     
               "paySign":data.sign//微信签名 
           },
           function(res){     
                console.log(JSON.stringify(res) + '------------');
               if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                  $(".mould").show();
               };     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
           }
       ); 
    },
    isAgree(isAgreebtn){
      console.log(isAgreebtn);
      $(".Agreement").hide();
      if (isAgreebtn ==="agree") {
          this.btnAgree = true;
      }else if (isAgreebtn ==="noagree"){
          this.btnAgree = false;
      }
    }

  },
  created:function(){
  //参数
    this.paySchool = this.$route.query.topay;//学校
    this.payPrice = this.$route.query.price;//支付价格
    this.payTime = this.$route.query.payTime;//支付时间
    this.productNum = this.$route.query.numToCont;//中文数字
    this.productNumAlbo = this.$route.query.num;//数量阿拉伯数字
    this.allPrice = this.$route.query.num*this.payPrice;//总价
    this.detailsRegion = this.$route.query.detailsRegion;//地区
    this.onlyOneList = this.$route.query.onlyOneList;
    this.onlyOneListname = this.$route.query.onlyOneListname;//机器型号
    this.profit = this.$route.query.profit;//收益日期

    this.openid = localStorage.getItem("openid");//取本地存储
    // this.openid = 'oYYPb0kX_sUAABZZF879tq9vYS44';

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
  /*支付成功和协议模板*/
  .mould,.Agreement{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(12,12,12,0.50);
  display: none;
}
/*协议*/
.paySuccess{
  width: 67.7%;
  height: 19%;
  background: #FFFFFF;
  border-radius: 0.37333333rem;
  position: absolute;
  top: 34.9%;
  left:0;
  right: 0;
  bottom:46%;
  margin: auto;
}
.paySuccess-title,.paySuccess-money,.paySuccess-btn{
  text-align: center;
}
.paySuccess-title{
  font-family: PingFangSC-Light;
  font-size: 0.3466667rem;
  color: #3D3D3D;
  margin-top: 0.5rem;
}
.paySuccess-money{
  font-family: PingFangSC-Medium;
  font-size: 0.6666667rem;
  color: #3D3D3D;
}
.paySuccess-btn{
  width: 100%;
  margin-top: 0.1rem;
}
.paySuccess-btn button{
  width: 33.1%;
  height: 0.6133333rem;
  line-height: 0.6133333rem;
  background: #EFDCBB;
  border-radius: 0.3733333rem;
  border: none;
  font-family: PingFangSC-Regular;
  font-size: 0.346666667rem;
  color: #3D3D3D;
}
.Agreement-con{
  width: 74.5%;
  height: 9rem;
  background: #FFFFFF;
  border-radius: 0.3733333333rem;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  overflow:hidden;
}
.Agreement-title{
  font-family: PingFangSC-Medium;
  font-size: 0.4rem;
  color: #3A3A3A;
  line-height: 1rem;
  margin-top: 0.3rem;
}
.Agreement-content{
  width: 100%;
  margin:  auto;
}
.Agreement-content-con{
  height: 6.5rem;
  overflow-y: auto;
  font-family: PingFangSC-Regular;
  font-size: 0.32rem;
  color: #5E5E5E;
  text-align: left;
}
.Agreement-content-con img{
  width: 100%;
}
.Agreement-btn>span{
    text-align: center;
    display:inline-block;
    width: 50%;
    background: #FFFFFF;
    height: 100%;
    line-height: 1.2rem;
}
.Agreement-btn>span:nth-child(1){
  font-family: PingFangSC-Regular;
  font-size: 0.3466667rem;
  color: #6B4A12;
  border-top: 1px solid #D3D3D3;
  border-right: 1px solid #D3D3D3;
}
.Agreement-btn>span:nth-child(2){
  font-family: PingFangSC-Regular;
  font-size: 0.3466667rem;
  color: #A4A4A4;
  border-top: 1px solid #D3D3D3;
}
</style>
