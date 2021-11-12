<!--
 * @Author: zfz
 * @Date: 2021-11-12 14:23:15
 * @LastEditors: zfz
 * @LastEditTime: 2021-11-12 15:12:15
 * @Description: update
-->
<template>
  <div id="app">
    <muliteTransfer></muliteTransfer>
  </div>
</template>
<script>
import muliteTransfer from "./views/muliteTransfer.vue";
export default{
  components:{
    muliteTransfer
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
