<template>
  <div class="loading">
      <!--<img src="../../static/img/add.png" alt="">-->
      	加载中，请稍后...  
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'loading',
  data () {
    return {
     
    }
  },
  created:function(){
    
  },
  methods:{
   
  },
  mounted:function(){
   
  },
  destroyed: function () {
      
  },
  watch:{
   
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- scoped说明样式只能在当前组件用 -->
<style scoped>
 .loading{
    position: fixed;
    top:0;
    left:0;
    z-index:121;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .loading img{
    margin:5rem auto;
  }
</style>
