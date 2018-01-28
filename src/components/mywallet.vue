<template>
  <div class="mywallet" style="height: 100%;">
     <div class="wallet-head">
        <div class="wallet-img"><img src="../../static/img/money.png" alt=""></div>
        <div class="wallet-p">总收益￥3000</div>
     </div>
     <div class="order">  
       <span style="white-space:pre;"></span><span class="line" style="vertical-align: 6%;margin-right: 3%"></span>  
       <span style="white-space:pre;"></span><span class="txt">朝阳区</span>  
       <span style="white-space:pre;"></span><span class="line" style="vertical-align: 6%;margin-left: 3%"></span>  
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
</style>
