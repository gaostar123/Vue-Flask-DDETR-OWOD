<template>
<div>
    <div class="header">
      <div class="icon">
        <i v-if='!isCollapse' @click="chagemeau" class="iconfont icon-arrowleft"></i>
        <i v-else @click="chagemeau" class="iconfont icon-arrowright"></i>
      </div>
      <div class="header-right">
        <span>{{nowTime}}</span> 
        <span class="line"> </span>
        <span>欢迎：****</span>
        <span class="line"> </span>
        <span class="exit">
          <i class="iconfont icon-tuichu"></i>
        </span>

      </div>
    </div>
    <router-view></router-view>
</div>
</template>

<script>
import dayjs from 'dayjs'

export default{
  props:["isCollapse"],
  data(){
    return{
      nowTime:''
    }
  },
  methods:{
    chagemeau(){
      this.$emit('chageMenu')
    }
  },
  created(){
    this.nowTime = dayjs(new Date()).format('YYYY年MM月DD日 HH:mm:ss')
  }
}
</script>

<style>
/* Content.vue */
.header {
  background: rgb(160, 183, 189);
  height: 60px;
  line-height: 65px;
  width: 100%;
  color: #fff;
  display: flex;

  .icon{
    i{
      font-size: 28px;
    }
  }

  .header-right{
    flex: 1;
    text-align: right;
    padding-right: 30px;

    .line{
      padding: 20px;
      color: #fff;
    }
    .exit{
      
      i{
        font-size: 20px;
      }

    }
  }

  
}


</style>