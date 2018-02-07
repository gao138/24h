<template>
  <div class="mywallet" style="height: 100%;">
      <div class="page">
          <div class="header">
          </div>
          <div class="content">
              <div class="wallet-head">
                  <div class="wallet-img"><img src="../../static/img/money.png" alt=""></div>
                  <div class="wallet-p">总收益￥3000</div>
               </div>
               <div class="order">  
                 <span style="white-space:pre;"></span><span class="line" style="vertical-align: 6%;margin-right: 3%"></span>  
                 <span style="white-space:pre;"></span><span class="txt">朝阳区</span>  
                 <span style="white-space:pre;"></span><span class="line" style="vertical-align: 6%;margin-left: 3%"></span>  
               </div> 
                <div class="specifications">
                  <div class="specifications-cont">
                    <div><span>北京联合大学咖啡机</span><span>688元/1份</span></div>
                    <div><span></span><span>3月份收益100元</span></div>
                    <div><span></span><span>4月份收益100元</span></div>
                    <div><span></span><span>4月份收益100元</span></div>
                    <div><span></span><span>4月份收益100元</span></div>
                    <!-- <div><span>2018年3月8日收益</span><span>已收益</span></div> -->
                  </div>
               </div>
          </div>
          <div class="footer">
            <div class="footer-btn">
                <span>总收益￥688</span><span>提现</span>
            </div>
          </div>
        </div>
  









   
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'mywallet',
  data () {
    return {

    }
  },
  methods:{
    mywalletAjax:function(){
       $.ajax({
        url:apiUrls['mywalletPage'],    //请求的url地址
        dataType:"json",   //返回格式为json
        async:false,//请求是否异步，默认为异步，这也是ajax重要特性 
        data:code,  
        type:"post",   //请求方式
        success:function(req){   
             
          },
      });
    },
  },
  created:function(){
    
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
