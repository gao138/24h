<template>
  <div class="addbank" style="height: 100%;">
      <div class="smallTtle">为保证您的资金安全，请绑定账户本人的银行卡</div>
      <div class="addcard"><span>卡号</span><span><input id="haorooms" type="text" placeholder="无须网银/免手续费" v-model="bankcard" maxlength="23"></span></div>
      <div class="bank" ><span v-show="bankcard">中信银行</span></div>
      <div class="next">
        <router-link to="/verificationbank">
         <button style="-webkit-tap-highlight-color:transparent;" :disabled="!bankcard" :class="{active:bankcard}" @change="bankVal()" @click="next()" >下一步</button>
         </router-link>
      </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'addbank',
  data () {
    return {
      bankcard:"",
    }
  },
  methods:{
    next(){
      console.log("1111")
    },
    bankVal(val){
      console.log(val)
      // val = val.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
    }
  },
  created:function(){
    
  },
  mounted:function(){
     document.getElementById('haorooms').onkeyup = function (event) {
      if((event.which >= 48 && event.which <= 57) ||(event.which >= 96 && event.which <= 105 )){
        var v = this.value;
        if(/\S{5}/.test(v)){
            this.value = v.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
        }
      };
   }
  },
  destroyed: function () {
      
  },
  watch:{
   
  },
  // filters: {
  //   setNum: function (value) {
  //     if (!value) return ''
  //     return value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- scoped说明样式只能在当前组件用 -->
<style scoped>
  .smallTtle{
    width: 93%;
    margin: 0 auto;
    height: 1.08498667rem;
    line-height: 1.5rem;
    text-align: left;
    font-family: PingFangSC-Medium;
    font-size: 0.32rem;
    color: #878787;
  }
  .addcard{
    line-height: 1.2533333rem;
    background: #fff;
  }
  .addcard>span{
    display: inline-block;
    font-family: PingFangSC-Regular;
    font-size: 0.32rem;
    color: #363636;
    line-height: 1.2533335rem;
  }
  .addcard>span:nth-child(1){
    width: 10%;
    text-align: left;
  }
  .addcard>span:nth-child(2){
    width: 83%;
  }
  .addcard>span:nth-child(2)>input{
    width: 100%;
    border: none;
    font-family: PingFangSC-Regular;
    font-size: 0.32rem;
    color: #B1B1B1;
  }
  .bank{
    width: 93%;
    margin: 0 auto;
    text-align: left;
    font-family: PingFangSC-Regular;
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 0.32rem;
    color: #8D8D8D;
  }
  .next{
    width: 100%;
    text-align: center;
    margin: 0.8051466rem auto 0;   
  }
  .next button{
    width: 65.9%;
    height: 1.08rem;
    line-height: 1.08rem;
    border-radius: 1.3333333rem;
    font-family: PingFangSC-Regular;
    font-size: 0.4rem;
    color: #FFFFFF;
    border: none;
    background: #CDCDCD;
  }
  .active{
    background: #EFDCBB !important;
  }
</style>
