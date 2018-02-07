<template>
  <div class="redenvelopes" style="height: 100%;">
    <ul class="couten">
      <li v-for="item in num">
        <a href="#"><img src="../../static/img/hb_1.png"></a>
      </li>
    </ul>
    <div class="mo">
      <div class="sen">
        <img src="../../static/img/gx.png">
        <h3>获得红包3元</h3>
        <a href="javascript:;">确定</a>
      </div>
    </div>
    <div class="backward" v-if="numz">
      <span >{{numz}}</span>
    </div>  
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'redenvelopes',
  data () {
    return {
     numz:4,
     num:0,
    }
  },
  methods:{
    add(){
          // var win = (parseInt($(".couten").css("width"))) - 60;
          // var hb = parseInt(Math.random() * (3 - 1) + 1);
          // var Wh = parseInt(Math.random() * (70 - 30) + 20);
          // var Left = parseInt(Math.random() * (win - 0) + 0);
          // var rot = (parseInt(Math.random() * (45 - (-45)) - 45)) + "deg";
          this.num++;
          // setTimeout(this.add,200);
        },
        backward(){
          this.numz--;
          if (this.numz < 0) {
            this.numz = 0
            return;
          }
          setTimeout(this.backward,1000);

        },

  },
  created:function(){
    
  },
  mounted:function(){
    // this.backward();//倒计时
    this.add();
     
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
        top:-100px;
        -webkit-tap-highlight-color:  rgba(0, 0, 0, 0);
      }
      .couten li a{
        display: block;
      }
      .mo {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .2);
        z-index: 100;
        display: none;
      }
      .mo .sen {
        width: 70%;
        height: 150px;
        border-radius: 5px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
      }
      .mo .sen img {
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
      .mo .sen h3 {
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
      
      .mo .sen a {
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


</style>
