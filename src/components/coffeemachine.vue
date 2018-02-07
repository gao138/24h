<template>
  <div class="coffeemachine" style="height: 100%;">
    <div class="myCoffeemachine" v-for="item in myCoffeemachine">
       <div class="order">  
         <span style="white-space:pre;"></span><span class="line" style="vertical-align: 6%;margin-right: 3%"></span>  
         <span style="white-space:pre;"></span><span class="txt">{{item.area}}</span>  
         <span style="white-space:pre;"></span><span class="line" style="vertical-align: 6%;margin-left: 3%"></span>  
       </div> 
       <div class="specifications" v-for="itemCont in item.data">
        <div class="specifications-cont">
          <div><span>{{itemCont.unit}}咖啡机</span><span>{{itemCont.money}}元/{{itemCont.num}}份</span></div>
          <div><span>{{itemCont.paytime}}</span><span></span></div>
          <!-- <div><span>2018年3月8日收益</span><span>已收益</span></div> -->
        </div>
       </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import apiUrls from "../apiUrls"
export default {
  name: 'coffeemachine',
  data () {
    return {
      coffeemachineOpenid:"",
      myCoffeemachine:"",
    }
  },
  methods:{
    coffeemachineAjax(openid){
        var _this = this;
        $.ajax({
            url:apiUrls['coffeemachinePage'],    //请求的url地址
            dataType:"json",   //返回格式为json
            async:false,//请求是否异步，默认为异步，这也是ajax重要特性 
            // data:{openID:"oYYPb0gIcCPq0IDh_fedDoJRavJU"},  
            data:{openID:openid},  
            type:"post",   //请求方式
            success:function(req){     
              console.log("coffeemachineAjax是下面"); 
              console.log(req);
              _this.myCoffeemachine = req;
            },
        });
    },
  },
  created:function(){
     this.coffeemachineOpenid = this.$route.query.openid;//路径拿oenid
     // console.log("coffeemachineOpenid是" + this.coffeemachineOpenid);
     this.coffeemachineAjax(this.coffeemachineOpenid);
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
  .specifications{
    background: #fff;
    overflow: hidden;
  }
    .specifications-cont{
    /*height: 3.76rem;*/
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
  .specifications-cont>div:nth-child(2),.specifications-cont>div:nth-child(3){
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
</style>
