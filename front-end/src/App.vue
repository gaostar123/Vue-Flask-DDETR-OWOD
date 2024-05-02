<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<script>

export default{
  name: 'app',
  components:{

  }
}
</script>


<style scope="this api replaced by slot-scope in 2.5.0+">
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box; /* 确保内边距和边框不增加元素大小 */
  }
</style>
