<template>
  <div class="details" style="height: 100%;display: none;">
     <div class="order">  
       <span style="white-space:pre;"></span><span class="line" style="vertical-align: 6%;margin-right: 3%"></span>  
       <span style="white-space:pre;"></span><span class="txt">{{detailsRegion}}</span>  
       <span style="white-space:pre;"></span><span class="line" style="vertical-align: 6%;margin-left: 3%"></span>  
     </div> 
     <div class="school">
        <span>{{school}}</span>
     </div>
     <div class="smallTtle">咖啡机预投放位置</div>
     <div class="saleNum">
        <div style="border-bottom: 1px solid #DFDFDF;" v-for="(item,index) in detailsList"><span>{{item.name}}</span><span>一台&nbsp;&nbsp;<img src="../../static/img/noxuan.png" alt="" @click="weixinPay(index)" class="selImg" ></span></div>
     </div>
     <div class="smallTtle">购买量</div>
     <div class="manNum">
        <div style="border-bottom: 1px solid #DFDFDF;"><span>限购买份额</span><span class="aplces">{{onlyOneList['aplces']}}</span></div>
        <div style="border-bottom: 1px solid #DFDFDF;"><span>已购买份额</span><span class="laplces">{{parseInt(onlyOneList['laplces'])+parseInt(productNum)}}</span></div>
        <div style="border-bottom: 1px solid #DFDFDF;"><span>剩余份额</span><span class="residue">{{parseInt(onlyOneListlaplces)-parseInt(productNum)}}</span></div>
        <div style="border-bottom: 1px solid #DFDFDF;"><span>购买份额</span><span><div class="add"><span><img src="../../static/img/del.png" alt="" @click="del()"></span> <span>{{productNum}}</span> <span><img src="../../static/img/add.png" alt=""  @click="add()"></span></div></span></div>
        <div><span>购买日期</span><span>{{payTime}}</span></div>
        <!-- <div><span>收益日期</span><span>{{profit}}</span></div> -->
     </div>
     <div class="prompt">
          <span>每人限购十个名额哦！<br>可在不同区域的大学分别购买</span>
     </div>
     <div class="buyBtn">
      <router-link :to="{path: 'payment', query: { topay:school,price:price,payTime:payTime,numToCont:numberConvertToUppercase()(productNum),num:productNum,detailsRegion:detailsRegion,onlyOneList:onlyOneList,profit:profit,onlyOneListname:onlyOneListname}}">
        <button style="-webkit-tap-highlight-color:transparent;">我要购买</button>
      </router-link>
     </div>
  </div>
</template>

<script>
import $ from 'jquery'
import apiUrls from "../apiUrls"
export default {
  name: 'details',
  data () {
    return {
      school:"",
      detailsRegion:"",
      productNum:1,
      payTime:"",
      getNextdate:"",//获得下个月的一个变量
      profit:"",
      onlyOneList:"",
      detailsList:[],
      price:"",
      numToCont:"",
      onlyOneListname:'',
      onlyOneListlaplces:0,
      isSelectedmachine:false,//是否选择了机器
    }
  },
  methods:{
    add(){ 
      if (!this.isSelectedmachine) {
        alert("请选择投放位置");
        return;
      }      
      if (this.productNum >=10) {
        this.productNum = 10;
      }else{
        this.productNum++;   
      }
    },
    del(){
      if (!this.isSelectedmachine) {
        alert("请选择投放位置");
        return;
      }   
      if (this.productNum<=1) {
        this.productNum = 1;
      }else{
        this.productNum--;
      }
    },
    weixinPay(imgIndex){
      console.log(imgIndex);
      console.log($('.selImg').eq(imgIndex)[0]);
      var _this = this;
      var xuanImg = require("../../static/img/xuan.png");
      var noxuanImg = require("../../static/img/noxuan.png"); 
      $(".selImg").each(function(index,element){
          console.log("111"); 
          if ($(".selImg")[index] == $('.selImg').eq(imgIndex)[0]) {
            console.log("选中"+ index);
            $(this).attr("checked",true);
            $(this).attr("src",xuanImg);
            _this.isSelectedmachine = true;//选择了一个机器
            //机器地  是男生宿舍还是食堂
            _this.onlyOneList = _this.detailsList[index];
            _this.onlyOneListlaplces = _this.onlyOneList['rplces'];
            _this.onlyOneListname = _this.detailsList[index]['name'];
            _this.price = _this.detailsList[index].price;
             console.log(_this.onlyOneListname);
          }else{
            $(this).attr("checked",false);
            $(this).attr("src",noxuanImg);            
            console.log("取消" + index + $(this).attr("checked"));

          };
      });               
    },
    // 数字转换
    numberConvertToUppercase() {
      return function(num) {
        num = Number(num);
        var upperCaseNumber = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '万', '亿'];
        var length = String(num).length;
        if (length == 1) {
          return upperCaseNumber[num];
        } else if (length == 2) {
          if (num == 10) {
            return upperCaseNumber[num];
          } else if (num > 10 && num < 20) {
            return '十' + upperCaseNumber[String(num).charAt(1)];
          } else {
            return upperCaseNumber[String(num).charAt(0)] + '十' + upperCaseNumber[String(num).charAt(1)].replace('零', '');
          }
        }
      }
    },
     /** 
         * 获取下一个月 
         * 
         * @date 格式为yyyy-mm-dd的日期，如：2014-01-25 
         */  
    getNextMonth:function(date) {  //获取下个月
            var arr = date.split('-');  
            var year = arr[0]; //获取当前日期的年份  
            var month = arr[1]; //获取当前日期的月份  
            var day = arr[2]; //获取当前日期的日  
            var days = new Date(year, month, 0);  
            days = days.getDate(); //获取当前日期中的月的天数  
            var year2 = year;  
            var month2 = parseInt(month) + 1;  
            if (month2 == 13) {  
                year2 = parseInt(year2) + 1;  
                month2 = 1;  
            }  
            var day2 = day;  
            var days2 = new Date(year2, month2, 0);  
            days2 = days2.getDate();  
            if (day2 > days2) {  
                day2 = days2;  
            }  
            if (month2 < 10) {  
                month2 =  month2;  
            }  
          
            var t2 = year2 + '年' + month2 + '月' + day2 + '日';  
            return t2;  
    }, 
    $ajaxdetailsJson:function(){
       var _this = this;      
        // 请求http
        $.ajax({
        url:apiUrls['detailsPage'],    //请求的url地址
        dataType:"json",   //返回格式为json
        async:true,//请求是否异步，默认为异步，这也是ajax重要特性
        data:{"name":this.school},    //参数值
        type:"post",   //请求方式
        success:function(req){
            //请求成功时处理
            console.log(req);
            _this.detailsList = req;   
            setTimeout(function(){
                _this.weixinPay(0);//初始化样式
                $(".details").show();
            },100);       
        },
        error:function(){
            //请求出错处理
        }
        });
        }
  },
 
  created:function(){
    var a = new Date();//日期对象
    // 接受home的传的参数
    this.school = this.$route.query.title;
    //接受home参数
    this.detailsRegion = this.$route.query.region;
    this.payTime = a.getFullYear()+ "年"+(a.getMonth()+1)+"月"+a.getDate() + "日"; //秒;
    this.getNextdate = a.getFullYear()+ "-"+(a.getMonth()+1)+"-"+a.getDate(); //秒;
    this.profit = this.getNextMonth(this.getNextdate);
     //ajax
    this.$ajaxdetailsJson(); 

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
     background: #fff;
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
  .school{
    height: 1.2533335rem;
    background: #fff;
  }
  .school span{
    display: inline-block;
    /*width: 40.7%;*/
    padding: 0 8.4%;
    height: 0.72rem;
    line-height: 0.72rem;
    border-radius: 1.3333334rem;
    background: #EFDCBB;
    font-family: PingFangSC-Medium;
    font-size: 0.4rem;
    color: #7B7D5C;
  }
  .smallTtle{
    width: 93%;
    margin: 0 auto;
    height: 0.8794667rem;
    line-height: 0.8794667rem;
    text-align: left;
    font-family: PingFangSC-Medium;
    font-size: 0.2666667rem;
    color: #7B7D5C;
  }
  .saleNum{
    /*height: 2.506667rem;*/
    background: #fff;
    /*margin-bottom: 0.2668rem;*/
  }  
  .saleNum>div{
    height: 1.2533335rem;
  }
  .saleNum>div>span,.manNum>div>span{
    display: inline-block;
    font-family: PingFangSC-Regular;
    font-size: 0.32rem;
    color: #613F05;
    line-height: 1.2533335rem;
  }
  .saleNum>div>span:nth-child(1),.manNum>div>span:nth-child(1){
    width: 46.5%;
    text-align: left;
  }
  .saleNum>div>span:nth-child(2),.manNum>div>span:nth-child(2){
    width: 46.5%;
    text-align: right;
  }
   .saleNum>div>span:nth-child(2)>img{
    width: 10%;
  }
  .manNum{
    /*height: 4.3933067rem;*/
    background: #fff;
  }

  .add>span{
    font-family: PingFangSC-Regular;
    font-size: 0.32rem;
    color: #613F05;
  }
   .add>span:first-child,.add>span:last-child {
      display: inline-block;
      width: 0.38666667rem;
      height:  0.38666667rem;     
   }
  .add>span:first-child img,.add>span:last-child img{
    width: 100%;
  }
  .prompt{
    width: 100%;
    display: table;
    height: 1.84rem;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size:0.32rem;
    color: #7C7C7C;
  }
  .prompt span{
    display: table-cell;
    vertical-align:middle;
  }
  .buyBtn{
    width: 100%;
    height: 1.08rem;
    text-align: center;
  }
  .buyBtn button{
    width: 65.9%;
    height: 100%;
    background: #EFDCBB;
    border-radius: 1.333333rem;
    outline: none;
    border: none;
    font-family: PingFangSC-Regular;
    font-size: 0.4rem;
    color: #613F05;
  }
</style>
