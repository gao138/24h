<template>
  <div class="mine" style="height: 100%;background: #F4F4F4;">
      <div class="head">
          <div class="headImg"><img :src="headimgurl" alt=""></div>
          <div class="name">{{nickname}}</div>
          <div class="service"><img src="../../static/img/service.png" alt=""><br><span>客服</span></div>
      </div>
      <div class="mineLists">
          <router-link to="/coffeemachine">
              <div class="mineList"><span>我的咖啡机</span><span>共3份</span></div>
          </router-link>
          <router-link to="/mywallet">
              <div class="mineList"><span>我的钱包</span><span></span></div>
          </router-link>
      </div>
  </div>
</template>

<script>
import $ from "jquery";
import apiUrls from '../apiUrls'
export default {
  name: 'mine',
  data () {
    return {
      mineOpenid:"",
      headimgurl:"",
      nickname:"",
      code:""
    }
  },
  created:function(){
    　 // 使用方法：url转为对象
    if (!localStorage.getItem("firstTime")) {//无 第一次进入
        var url = window.location.href.split('#')[0];
        var obj = this.parseQueryString(url);
        if (!obj.code) {
          console.log('没code');
           var appid="wx88cb890e1e079473";
           var redirect_uri=encodeURIComponent("http://ch.jwangkun.com/24h/#/mine");//这里的地址需要http://
           var wurl='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ appid +'&redirect_uri='+ redirect_uri +'&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';          
           window.location.href=wurl;
           return;
        }else{             
            if (!sessionStorage.getItem("sessfirstTime")) {//没
                console.log("没sess");
                this.code = obj.code;  
                this.mineAjax();
            }else{//有 返回的时候已经有sessionStoragegetItem("sessfirstTime")
                console.log("有sess");
                var strsessUserinfo = sessionStorage.getItem("sessfirstTime");
                var sessuserInfo = JSON.parse(strsessUserinfo);
                this.headimgurl = sessuserInfo.headimgurl;
                this.nickname = sessuserInfo.nickname;
            }       
        };     
    }else{//有 刷新的时候已经有localStorage.getItem("firstTime")
        var strUserinfo = localStorage.getItem("firstTime");
        var userInfo = JSON.parse(strUserinfo);
        this.headimgurl = userInfo.headimgurl;
        this.nickname = userInfo.nickname;
    }
     
// ................

    // this.mineOpenid = "oYYPb0kX_sUAABZZF879tq9vYS44";
    // this.mineAjax();  
    
  },
  mounted () {
    
  },
  methods:{
    mineAjax(){
       console.log("mineAjax开始");
       var _this = this;
       // var openid = {"openID":this.mineOpenid};
       var code = {code:this.code};
       $.ajax({
        url:apiUrls['minePage'],    //请求的url地址
        dataType:"json",   //返回格式为json
        async:false,//请求是否异步，默认为异步，这也是ajax重要特性 
        data:code,  
        type:"post",   //请求方式
        success:function(req){     
              console.log(req);       
              _this.headimgurl = req.headimgurl;
              _this.nickname = req.nickname;
              localStorage.setItem("firstTime",JSON.stringify(req));  
              sessionStorage.setItem("sessfirstTime",JSON.stringify(req));
          },
      });
    },
    // .......
    //   getOpenid:function(){  
    //   console.log("请求openid");
    //   var _this = this;
    //   var code = {'code':this.code}
    //   $.ajax({
    //   url:apiUrls['homeGetopenid'],
    //   async:true,//请求是否异步，默认为异步，这也是ajax重要特性 
    //   type:"post",     //请求方式
    //   data:code,
    //   success:function(req){
    //       //请求成功时处理
    //        _this.mineOpenid = req.openid;        
    //        localStorage.setItem("openid",_this.mineOpenid);//存openid  
    //        // mineAjax
    //       console.log('openid是local' + localStorage.getItem("openid"));
    //   },
    //   error:function(err){
    //       //请求出错处理
    //       console.log('失败' + JSON.stringify(err));

    //   }
    //   });
    // },
// .................
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
// ...............

  },
  destroyed:function(){
    localStorage.removeItem('firstTime');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- scoped说明样式只能在当前组件用 -->
<style scoped>
.head{
  height: 4.24rem;
  background: rgba(255,255,255,0.64);
  margin-bottom: 0.2668rem;
  background-image: url(../../static/img/headimgbg.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
}
.headImg{
  text-align: center;
  width: 100%;
}
.headImg img{
  width: 1.866667rem;
  height: 1.866667rem;
  border-radius: 50%;
  margin-top: 0.41552rem;
}
.service{
  position: absolute;
  right: 0;
  top: 0;
  text-align: center;
  width: 10.5%;
  height: 1.8666667rem;
  background: rgba(78,78,78,0.38);
}
.service img{
  width: 50%;
  margin-top: 28.5%;
}
.service span{
  font-family: PingFangSC-Regular;
  font-size: 0.32rem;
  color: #000000;
}
.name{
  font-family: PingFangSC-Medium;
  font-size: 0.4rem;
  color: #613F05;
  margin-top: 0.1rem;
}
.mineLists{
  background: #fff;
}
.mineLists>a{
  display: block;
  height: 1.25333333rem;
  line-height: 1.25333333rem;
}
.mineList{
  background-image: url(../../static/img/next.png);
  background-repeat: no-repeat;
  background-size: 3% 25%;
  background-position: 96.6% center;
}
.mineList>span{
  display: inline-block;
  font-family: PingFangSC-Regular;
  font-size: 0.32rem;
  color: #613F05;
}
.mineList>span:nth-child(1){
  width: 25%;
  text-align: right;
}
.mineList>span:nth-child(2){
  width: 60%;
  text-align: right;
}


</style>
