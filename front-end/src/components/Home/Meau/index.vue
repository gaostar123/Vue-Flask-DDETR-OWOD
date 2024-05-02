<template>
<el-menu default-active="/Home" router background-color="#545c64" text-color="#fff" 
  active-text-color="#ffd04b" class="el-menu-vertical-demo" :collapse="isCollapse">
    <el-menu-item>
      <span slot="title">开放世界目标检测系统</span>
    </el-menu-item>
  <el-menu-item index="/Home">
    <i class="el-icon-menu"></i>
    <span slot="title">系统首页</span>
  </el-menu-item>
  <el-menu-item index="/Project">
    <i class="el-icon-document"></i>
    <span slot="title">项目介绍</span>
  </el-menu-item>
  <el-menu-item index="/Canshu">
    <i class="el-icon-setting"></i>
    <span slot="title">参数设置</span>
  </el-menu-item>
  <el-submenu index="4">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">未知物体检测</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="/Content">图片检测</el-menu-item>
      <el-menu-item index="1-2">视频检测</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
</el-menu>
</template>

<script>
export default{
  props:['isCollapse']
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
}
.el-menu{
  border-right: none;
}
</style>