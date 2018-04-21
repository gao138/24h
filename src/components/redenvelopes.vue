<template>
  <div class="redenvelopes" style="height: 100%;">
        <ul class="couten">
          <transition v-for="(item,index) in num"
            appear 
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
          >
            <li :style="{left:+ item.Left + 'px',transform:'rotate('+ item.rot + ')'}">
              <a href="javascript:;"><img :src="redenvelopesImg" :style="{width: + item.Wh +'px'}"></a>
            </li>
          </transition>
        </ul> 
  
        <div class="sen">
          <img src="../../static/img/gx.png">
          <h3>获得红包3元</h3>
          <a href="javascript:;">确定</a>
        </div>
        <div class="backward" v-if="numz">
          <span >{{numz}}</span>
        </div>  
        <div class="start" @click="startGame()" v-if="btnShow">{{btn}}</div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  name: 'redenvelopes',
  data () {
    return {
     numz:"",
     num:[],
     hb:"",
     Wh:"",
     Left:"",
     rot:"",
     show: true,
     btnShow:true,
     gameTime:0,
     btn:"开始",
     redenvelopesImg:"",
    }
  },
  methods:{
        add(){
          var _this = this;
          if (this.num.length >= 20) {
            setTimeout(function(){
              _this.btnShow = true;
              _this.btn = "游戏结束";
              console.log(_this.num);
            },5000);
            return;
          }
          var win = (parseInt($(".couten").css("width"))) - 60;
          this.hb = parseInt(Math.random() * (3 - 1) + 1);
          this.Wh = parseInt(Math.random() * (70 - 30) + 20);
          this.Left = parseInt(Math.random() * (win - 0) + 0);
          this.rot = (parseInt(Math.random() * (45 - (-45)) - 45)) + "deg";
          this.redenvelopesImg = require("../../static/img/hb_" + this.hb + ".png");
          this.num.push({hb:this.hb,Wh:this.Wh,Left:this.Left,rot:this.rot});
          setTimeout(this.add,500);
          // console.log(this.num);
        },
        backward(){
          this.numz--;
          if (this.numz < 0) {
            this.numz = 0
            this.add();
            return;
          }
          setTimeout(this.backward,1000);
        },
        beforeEnter: function (el) {
          el.style.top = '-100px';
        },
        enter: function (el, done) {
           var _this = this; 
           $(el).animate({'top':$(window).height()+20},5000,function(){
              //删掉已经显示的红包
              $(el).remove();
            });
        },
        startGame:function(){
          if ($(event.target).html() == "游戏结束") {
            return;
          }
          this.numz = 4;
          this.btnShow = false;
          this.backward();//倒计时
        },
        gameOver:function(){
          
        }
  },
  created:function(){
    
  },
  mounted:function(){
    

     
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
      .couten {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        overflow-y: hidden;
        background:url(../../static/img/bj.jpg) no-repeat top left ;
        background-size: 100% 100%;
      }
      .couten li {
        position: absolute;
        animation: all 3s linear;
        top:100px;
        -webkit-tap-highlight-color:  rgba(0, 0, 0, 0);
      }
      .couten li a{
        display: block;
      }
      .sen {
        width: 70%;
        height: 150px;
        border-radius: 5px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        display: none;
      }
      .sen img {
          width: 60%;
          height: 127px;
          position: absolute;
          top: 0px;
          left: 0;
          right: 0;
          bottom: 212px;
          margin: auto;
          vertical-align: top;
      }
      .sen h3 {
          width: 50%;
          height: 30px;
          position: absolute;
          top: -35px;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          text-align: center;
          color: red;
          font-size: 140%;
          font-weight: bold;
          z-index: 999;
      }
      
     .sen a {
          width: 26%;
          height: 50px;
          background-color: rgb(174, 222, 244);
          box-shadow: rgba(174, 222, 244, 0.8) 0px 0px 2px, rgba(0, 0, 0, 0.0470588) 0px 0px 0px 1px inset;
          position: absolute;
          top: 100px;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          color: #fff;
          border-radius: 5px;
          text-align: center;
          line-height: 50px;
          text-decoration: none;
      }
      .backward{
        width: 100%;
        background:#ccc;
        opacity: 0.5;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;        
      }
      .backward span{
        display: inline-block;
        width: 100px;
        height: 100px;
        color: #000;
        font-weight: bold;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        text-align: center;
        line-height: 100px;
        font-size: 1000%;
      }
      .start{
        width: 30%;
        height: 1.5rem;
        line-height: 1.5rem;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        border-radius: 0.5rem;
        background: red;
        color: #fff;
      }
</style>
