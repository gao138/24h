<template>
  <div class="home" style="height: 100%;">
      <div class="page">
        <div class="header">
           <div class="swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in headList">
                    <div class="headtab" @click="tab($event,index,item)">
                      <p class="area">{{item['name']}}</p>           
                      <p class="school">大学</p>
                      <img src="../../static/img/bottom.png" alt="" class="bottomImg">             
                    </div>
                </div>            
              </div>
            </div>
        </div>
        <div class="content" style="background: #000000;">
             <div class="homebg">
                <img src="../../static/img/bg.png" alt="">
                <div class="cont-all">
                    <div class="cont-one"  v-bind:style="{backgroundImage: 'url(' + albumpic_big + ')'}">
                        <div class="pos" :style="item.positions" v-for="item in areaList">
                            <div class="tp" v-if="item.way">
                                <p><button style="-webkit-tap-highlight-color:transparent;" @click="jump(item.title)">查看</button></p>
                                <p>{{item.title}}</p>
                            </div>
                            <div class="bt" v-else>
                                 <p>{{item.title}}</p>
                                <p><button style="-webkit-tap-highlight-color:transparent;" @click="jump(item.title)">查看</button></p>
                            </div>
                        </div>                    
                    </div>
                </div>
            </div> 
        </div>
        <div class="footer">
          <!-- <div class="foot-nav">
            <b>首页</b>
            <b>其他</b>
            <b>中心</b>
          </div> -->
        </div>
      </div>
  </div>
</template>
<script>
var allArea =  [
          {positions:'top:35.4%;left:12.9%',title:"",way:true},
          {positions:'top:2.9%;left:24.4%',title:"",way:true},
          {positions:'top:7.9%;left:55%',title:"",way:false},
          {positions:'top:82.9%;left:14.7%',title:"",way:false},
          {positions:'top:37.9%;left:61.7%',title:"",way:false},
          {positions:'top:95.9%;left:52.7%',title:"",way:false},
          {positions:'top:77.9%;left:86.7%',title:"",way:false},
          {positions:'top:23.9%;left:93%',title:"",way:true},
          {positions:'top:8.9%;left:72.7%',title:"",way:true},
          {positions:'top:34.9%;left:84.7%',title:"",way:false},
          {positions:'top:67.9%;left:49%',title:"",way:false},
          {positions:'top:40.9%;left:25.7%',title:"",way:false},
          {positions:'top:-3.1%;left:50%',title:"",way:true},
        ];
import $ from 'jquery'
import apiUrls from '../apiUrls'
export default {
  name: 'home',
  data () {
    return {
      headList:"",
      areaList:"",
      albumpic_big:require("../../static/img/one.png"), 
      region:"",
      code:"",
      openid:"",
    }
  },
  beforeCreate: function () {
  
  },
  methods:{
    tab(event,areaNum,item){
     if ($(event.target).parent()[0].className === "headtab"){
      $(".swiper-slide").each(function(index){
        if (areaNum == index) {
          $(".swiper-slide").eq(index).css("background","#EFDCBB");
          $(".area").eq(index).css("color","#2C2C2C");
          $(".school").eq(index).css("color","#656565");
          $(".bottomImg").eq(index).show();
        }else{
          $(this).css("background","#fff");
          $(".area").eq(index).css("color","#2D2D2D");     
          $(".school").eq(index).css("color","#D1D1D1");   
          $(".bottomImg").eq(index).hide(); 
        }
      })
      if (item['list'].length >= 7) {
        this.albumpic_big = require("../../static/img/one.png");
      }else{
        this.albumpic_big = require("../../static/img/two.png");
      }
      this.region = item['name']; 
      // console.log(this.getRandomArray(item.list.length,allArea.length-1));
      this.areaList = this.setSpot(this.getRandomArray(item.list.length,allArea.length-1),areaNum);  
     }    
    }, 
    jump:function(t){
        // to-details
      this.$router.push({path:"/details",query:{title:t,region:this.region}})
    },
    // 随机不重复数组
    getRandomArray(arrLength,ranNum){
          var array = [];
          while (array.length < arrLength)
          {
              var random = Math.floor(Math.random() * ranNum) + 1;
              if (array.indexOf(random) < 0)
              {
                  array.push(random);
              }
          }
          return array;
      },
    // 放点
    setSpot:function(ranArr,index){
      var arr = [];
      for (var i = 0; i < ranArr.length; i++) {
        allArea[ranArr[i]]['title'] = this.headList[index]['list'][i]['name'];
        arr.push(allArea[ranArr[i]]); 
      }
      return arr;
    },
    createdcss:function(){//初始样式
      $(".swiper-slide").eq(0).css("background","#EFDCBB");
      $(".area").eq(0).css("color","#2C2C2C");
      $(".school").eq(0).css("color","#656565");
      $(".bottomImg").eq(0).show();
    },
    getOpenid:function(){  
      var _this = this;
      var code = {'code':this.code}
    	$.ajax({
      url:apiUrls['homeGetopenid'],
      async:true,//请求是否异步，默认为异步，这也是ajax重要特性 
      type:"post",     //请求方式
      data:code,
      success:function(req){
          //请求成功时处理
           console.log(JSON.stringify(req) + '成功');
           _this.openid = req.openid;        
           localStorage.setItem("openid",_this.openid);//存openid  
          console.log('openid是local' + localStorage.getItem("openid"));
      },
      error:function(err){
          //请求出错处理
          console.log('失败' + JSON.stringify(err));

      }
      });
    },
    parseQueryString:function (url) {  //url 转为对象
          var reg_url = /^[^\?]+\?([\w\W]+)$/,
                  reg_para = /([^&=]+)=([\w\W]*?)(&|$)/g, //g is very important
                  arr_url = reg_url.exec(url),
                  ret = {};
          if (arr_url && arr_url[1]) {
              var str_para = arr_url[1], result;
              while ((result = reg_para.exec(str_para)) != null) {
                  ret[result[1]] = result[2];
              }
          }
          return ret;
    },
    $ajaxjson:function(){
      var _this = this;   
      $.ajax({
      url:apiUrls['homePage'], //请求的url地址
      dataType:"json",   //返回格式为json
      async:true,//请求是否异步，默认为异步，这也是ajax重要特性 
      type:"post",   //请求方式
      success:function(req){

          //请求成功时处理
          console.log(req);    
          _this.headList = req;  
          //初始化学校显示
          _this.areaList = _this.setSpot(_this.getRandomArray(_this.headList[0]['list'].length,allArea.length-1),0);  
          //head轮播 
          var headNum =  0;
          if (_this.headList.length >= 5) {
            headNum = 5;
          } else{
            headNum =  _this.headList.length;
          }
          setTimeout(function(){//swiper
              var mySwiper = new Swiper('.swiper-container', {
                  slidesPerView :headNum,
                  freeMode:true,
                  width: window.innerWidth,
              })
              _this.createdcss();//初始化样式
          },100);
           _this.region = _this.headList[0]['name']; //初始化地区
      },
      error:function(){
          //请求出错处理
      }
      });
    }
  },
  created:function(){   
  　　 // 使用方法：url转为对象
      var url = window.location.href.split('#')[0];
      var obj = this.parseQueryString(url);
      if (!obj.code) {
        console.log('没code');
         var appid="wx88cb890e1e079473";
         var redirect_uri=encodeURIComponent("http://ch.jwangkun.com/24h/#/home");//这里的地址需要http://
         var wurl='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ appid +'&redirect_uri='+ redirect_uri +'&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';          
         window.location.href=wurl;
         return;
      }else{
          console.log("有code");
          this.code = obj.code;
          if (sessionStorage.getItem("ishasCode") == "ok") {//有
              console.log('有session');
              console.log("session是" + sessionStorage.getItem("ishasCode"));
               this.openid = localStorage.getItem("openid");
               this.$ajaxjson(); 
          }else{//没有
            console.log('没有session');
            console.log("session是" + sessionStorage.getItem("ishasCode"));
            sessionStorage.setItem('ishasCode','ok')  
               this.getOpenid();//获取openid  
               this.$ajaxjson();         
          };        
      };     
  },	
  mounted(){
       // 请求home头部数据
       
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- scoped说明样式只能在当前组件用 -->
<style scoped>
   .homebg{
  width: 100%;
  height: 100%;
}
.homebg img{
  width: 100%;
  height: 100%;
  display: block; 
}
.headtab{
  width: 100%;
  display: inline-block;
  text-align: center;
  height: 1.333333rem;
  position: relative;
}

.headtab>p:nth-child(1){
  font-family: PingFangSC-Medium;
  font-size: 0.32rem;
  color: #2D2D2D;
  line-height: 0.7rem;
}
 .headtab>p:nth-child(2){
  font-family: PingFangSC-Medium;
  font-size: 0.2933333rem;
  color: #D1D1D1;
 }
 .headtab>img{
    width: 17%;
    height: 0.15rem;
    position: absolute;
    bottom: -0.14rem;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 10;
    display: none;
 }
  .cont-all{
    width: 100%;
    height: 4rem;
    position: absolute;
    left: 0;
    right: 0;
    top: 4.5538667rem;
  }
  .cont-one{
    width: 90.4%;
    height: 100%;
    margin: 0 auto;
    background-image: url(../../static/img/one.png);
    background-repeat: none;
    background-size: 100% 100%;
    position: relative;
  }
  .pos{
    width: 0.25rem;
    height: 0.25rem;
    position: absolute;
    background-image: url(../../static/img/dian.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .pos img{
    width: 100%;
    display: block;
  }
  .tp{
    position: absolute;
    width: 4.5rem;
    height: 1.6rem;
    top: -1.08rem;
    left: -2.1rem;
    bottom: 0;
    right: 0;
    margin: auto;

  }
  .tp p:nth-child(1) button,.bt p:nth-child(2) button{
    width: 1.36rem;
    border: none;
    height: 0.42666666rem;
    background: #FF6D6D;
    border-radius: 0.16rem;
    ont-family: PingFangSC-Medium;
    font-size: 0.2666667rem;
    color: #FFFFFF;
  }
  .tp p:nth-child(2),.bt p:nth-child(1){
    font-family: PingFangSC-Medium;
    font-size: 0.2666667rem;
    color: #FFFFFF;
  }
  .bt{
    position: absolute;
    width: 4.5rem;
    height: 1.6rem;
    top: 1.8rem;
    left: -2.1rem;
    bottom: 0;
    right: 0;
    margin: auto;
  }
 /* .page{
    display: none;
  }*/
 


    .header{
      width:100%;
      text-align:center;
      /*background-color: red;*/
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
      /*overflow: auto;*/
      overflow:hidden;
      -webkit-overflow-scrolling: touch;
      background-color: #ccc;
    }

    /*flex头部*/
    .header {
      /*display: -webkit-box;*/
      /*text-align: center;*/
    }

    /*flex尾部*/
    .footer {
      overflow: hidden;
      background: #fff;
    }

    .foot-nav {
      display: flex;
      line-height: 45px;
      text-align: center;
    }
    .foot-nav b{
      flex: 1;
    }
</style>
<style>
.home .swiper-container {
  overflow: visible;
}
</style>
