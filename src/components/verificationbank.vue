<template>
  <div class="verificationbank" style="height: 100%;">
     <div class="bankcardInf">
          <div class="bankcardInf-mation">
              <div><span>银行卡</span><span>中信银行储蓄卡</span></div>
              <div><span>卡&nbsp&nbsp&nbsp&nbsp号</span><span>1234578997655443</span></div>
          </div>
     </div>
     <div class="manInf">
           <div class="addmanInf"><span>持卡人</span><span><input type="text" placeholder="持卡人姓名" v-model="name"></span></div>
           <div class="addmanInf"><span>身份证</span><span><input type="text" placeholder="请输入身份证号码" v-model="idCard"></span></div>
           <div class="addmanInf"><span>手机号</span><span style="position: relative;"><input type="text" placeholder="银行预留手机号" v-model="tel"><img src="../../static/img/why.png" alt="" @click="why()"></span></div>
     </div>
     <div class="agree"><img src="../../static/img/agree.png" alt="">同意《用户服务手册》</div>
     <div class="verification"> <router-link to="/verificationbank">
         <button style="-webkit-tap-highlight-color:transparent;" :disabled="!name && !idCard && tel" :class="{active:name && idCard && tel}">验证信息</button>
         </router-link>
    </div>
    <div class="whyInf-bg">
       <div class="whyInf">
              <p>手机号</p>
              <p>银行预留手机号是在银行办卡时填写的手机号，若遗忘，换号可联系银行客服电话处理</p>
              <p>知道了</p>
        </div>
    </div>
   
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'verificationbank',
  data () {
    return {
      name:"",
      idCard:"",
      tel:""
    }
  },
  methods:{
    why(){
      alert(1);
    }
  },
  created:function(){
    
  },
  mounted:function(){

  },
 destroyed: function () {
    
 },
 filters: {
    setNum: function (value) {
      if (!value) return ''
      return value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- scoped说明样式只能在当前组件用 -->
<style scoped>
.bankcardInf{
  height: 1.88rem;
  background: #fff;
  overflow: hidden;
  margin-bottom: 0.2688rem;
}
.bankcardInf-mation{
  height: 1.1rem;
  margin: 0.39rem 0;
  
}
.bankcardInf-mation>div{
  line-height: 0.55rem;
}
.bankcardInf-mation>div>span{
  display: inline-block;
  font-family: PingFangSC-Regular;
  font-size: 0.32rem;
  color: #333333;
}
.bankcardInf-mation>div>span:nth-child(1){
  width: 10%;
  text-align: right;
}
.bankcardInf-mation>div>span:nth-child(2){
  width: 83%;
  text-align: left;
  text-indent: 0.1rem;
}
 .addmanInf{
    line-height: 1.2533333rem;
    background: #fff;
  }
  .addmanInf>span{
    display: inline-block;
    font-family: PingFangSC-Regular;
    font-size: 0.32rem;
    color: #363636;
    line-height: 1.2533335rem;
  }
  .addmanInf>span:nth-child(1){
    width: 10%;
    text-align: left;
  }
  .addmanInf>span:nth-child(2){
    width: 83%;
    text-align: left;
  }
  .addmanInf>span:nth-child(2)>input{
    width: 80%;
    border: none;
    font-family: PingFangSC-Regular;
    font-size: 0.32rem;
    color: #B1B1B1;
    text-indent: 0.1rem;
  }
  .addmanInf>span:nth-child(2)>img{
    width: 7%;
    position: absolute;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
  }
  .agree{
    width: 93%;
    font-family: PingFangSC-Regular;
    font-size: 0.2666667rem;
    color: #AF915E;
    line-height: 0.6rem;
    text-align: left;
    margin: 0 auto;
  }
  .agree>img{
    width: 3%;
  }
  .verification{
    width: 100%;
    text-align: center;
    margin: 0.8051466rem auto 0;   
  }
  .verification button{
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
  .whyInf-bg{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.50);
    position: absolute;
    top: 0;
    left: 0;
  }
  .whyInf{
    width: 79.2%;
    height: 4.9333333rem;
    background: #FFFFFF;
    border-radius: 0.3733333rem;
    position: absolute;
    left: 0;
    top: -1.9rem;
    right: 0;
    bottom: 0;
    margin: auto;
  }
</style>
