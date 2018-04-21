<template>
  <div class="addbank" style="height: 100%;">
      <!--<div class="smallTtle">为保证您的资金安全，请绑定账户本人的银行卡</div>-->
      <div class="smallTtle">请绑定账户本人的银行卡</div>
      <div class="addcard addBorder"><span>姓名</span><span><input id="" type="text" placeholder="" maxlength="" v-model="userName"></span></div>
       <div class="addcard addBorder"><span>银行</span><span>
      	<div  class="select">
			　　<select class="choice" v-on:change="indexSelect" v-model="bankname" style="width: 100%;border: none;margin-top:-0.1rem ;">
			　　　　<option v-for="item in index" v-bind:value="item.name">{{item.name}}</option>
			　　</select>
				</div>
      </span>
      </div>
      <div class="addcard"><span>卡号</span><span><input id="t_bankno" type="number" placeholder="" v-model="bankcard" maxlength="19"></span></div>
     

      <!--<div class="bank" ><span v-show="bankcard">中信银行</span></div>-->
      
      <div class="next">
         <button style="-webkit-tap-highlight-color:transparent;" :disabled="!bankcard || !bankname" :class="{active:bankcard && bankname}" @change="bankVal()" @click="next(bankcard)" >下一步</button>
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
      userName:"",
      bankname:"",
      index: [{
		　　"indexId":1,
		　　"name": "中兴银行"
		　　}, {
		　　"indexId":2,
		　　"name": "中国建设银行"
		　　}, {
		　　"indexId":3,
		　　"name": "招商银行"
		　　}, {
		　　"indexId":4,
		　　"name": "工商银行"
		}],
    }
  },
  methods:{
    bankVal(val){
      console.log(val)
      // val = val.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
    },
	  indexSelect(event){
		　　console.log(event.target.value);
		},
		next(bankno) {
		 var bankno = bankno.replace(/\s/g, '');
     if (bankno.length < 16 || bankno.length > 19) {
         alert("银行卡号长度必须在16到19之间");
         return false;
     }
     var num = /^\d*$/;// 全数字
     if (!num.exec(bankno)) {
         alert("银行卡号必须全为数字");
         return false;
     }     // 开头两位
     var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
     if (strBin.indexOf(bankno.substring(0, 2)) == -1) {
         alert("银行卡号开头两位不符合规范");
         return false;
     }
     this.$router.push({path:"/verificationbank",query:{bankname:this.bankname,bankcard:this.bankcard,userName:this.userName}});
     return true;
  	},
  },
  created:function(){
    
  },
  mounted:function(){
//   document.getElementById('t_bankno').onkeyup = function (event) {
//    if((event.which >= 48 && event.which <= 57) ||(event.which >= 96 && event.which <= 105 )){
//      var v = this.value;
//      if(/\S{5}/.test(v)){
//          this.value = v.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
//      }
//    }else{
//    	this.value = "";
//    }
// }
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
    line-height: 0.7rem;
    text-align: left;
    font-family: PingFangSC-Medium;
    font-size: 0.32rem;
    color: #878787;
  }
  .addcard{
    line-height: 0.924444rem;
    background: #fff;
    position: relative;
  }
  .addBorder:before{
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 0;
		border-bottom: 1px solid  #DFDFDF;
		}
  .addcard>span{
    display: inline-block;
    font-family: PingFangSC-Regular;
    font-size: 0.32rem;
    color: #363636;
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
  .choice{
  appearance:none;
  -moz-appearance:none;/*?Firefox?*/
  -webkit-appearance:none;/*?Safari?和?Chrome?*/
 	background: url(../../static/img/Triangle.png) no-repeat right center;
 	background-size: 4%;
 }	
  .active{
    background: #EFDCBB !important;
  }
</style>
