<template>
  <div class="mine" style="height: 100%;background: #F4F4F4;">
      <div class="head">
          <div class="headImg"><img src="../../static/img/headimg.png" alt=""></div>
          <div class="name">Type something</div>
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
export default {
  name: 'mine',
  data () {
    return {

    }
  },
  created:function(){
    // bus.$on("info",function(a){
    //   console.log(a);
    //   bus.$off("info");
    // })
    alert(window.location.href);
  },
  mounted () {
    // document.title = '我的';
  },
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
