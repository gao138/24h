<template>
  <div id="app" style="height: 100%;">
          <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'app',
  data(){
    return{
      
    }
  },
  created(){
    
  },
  mounted(){
                        
  },
  computed(){
     
  }, 

}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html,body{
  width: 100%;
  height: 100%;
}
body{
  margin: 0;
  padding: 0;
/*  overflow-x: hidden;*/
  /*overflow-y: auto;*/
  /*overflow: hidden;*/
  background: #f4f4f4;
}

</style>
