<template>
  <div class="vip" style="height: 100%;">
    <div class="vip-img"><img src="../../static/img/vip.png" alt=""></div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'vip',
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
.vip-img{
  width: 100%;
}
.vip-img img{
  width: 100%;
}
</style>
