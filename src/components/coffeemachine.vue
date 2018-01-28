<template>
  <div class="coffeemachine" style="height: 100%;">
     <div class="order">  
       <span style="white-space:pre;"></span><span class="line" style="vertical-align: 6%;margin-right: 3%"></span>  
       <span style="white-space:pre;"></span><span class="txt">朝阳区</span>  
       <span style="white-space:pre;"></span><span class="line" style="vertical-align: 6%;margin-left: 3%"></span>  
     </div> 
     <div class="specifications">
      <div class="specifications-cont">
        <div><span>北京联合大学咖啡机</span><span>1份</span></div>
        <div><span>2018年2月8日购买</span><span></span></div>
        <div><span>2018年3月8日收益</span><span>已收益</span></div>
      </div>
     </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'coffeemachine',
  data () {
    return {

    }
  },
  methods:{
    
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
