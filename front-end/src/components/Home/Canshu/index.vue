<template>
    <div class="box">
      <div class="zhixindu">
        <span>置信度选择:</span>
      </div>
      <hr class="divider"> <!-- 水平分割线 -->
      <div class="block">
        <div class="description">
          <span>know threshold:</span>
        </div>
        <el-slider
          v-model="value1"
          show-input
          :min="0"
          :max="1"
          :step="0.01">
        </el-slider>
      </div>
      <div class="block">
        <div class="description">
          <span>unknow threshold:</span>
        </div>
        <el-slider
          v-model="value2"
          show-input
          :min="0"
          :max="1"
          :step="0.01">
        </el-slider>
      </div>
      <hr class="divider"> <!-- 水平分割线 -->
      <div class="zhixindu">
        <span>模型选择:</span>
      </div>
      <hr class="divider"> <!-- 水平分割线 -->
      <div class="options">
        <el-radio-group v-model="checkedCity">
          <el-radio :label="city" v-for="city in cities" :key="city">{{city}}</el-radio>
        </el-radio-group>
      </div>
      <hr class="divider"> <!-- 水平分割线 -->
      <div>
        <div id="main" style="width: 100%;height: 300px; background:#fff"></div>
      </div>
    </div>
  </template>
  
  <script>
  import * as echarts from "echarts";
  const cityOptions = ['OWOD_T1.pth', 'OWOD_T2.pth', 'OWOD_T3.pth', 'OWOD_T4.pth'];
  export default {
    data() {
      return {
        value1: 0.7, // 初始值为 0.7
        value2: 0.65, // 初始值为 0.7
        checkedCity: 'OWOD_T1.pth', // 默认选中第一个选项
        cities: cityOptions,
        opinionData: ["20", "40", "60", "80"],//数据
      }
    },
    mounted() {
        this.drawLine('main');
      },
    methods: {
      drawLine(id) {
            this.charts = echarts.init(document.getElementById(id))
            this.charts.setOption({
                title: {
                    left: '5%',
                    top: '5%',
                    text: "DETR+GOC的增量学习已知类别数", // 标题文本
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    align: 'right',
                    left: '5%',
                    top: '15%',
                    data: ['DETR+GOC'] // 更新图例
                },
                grid: {
                    top: '30%',
                    left: '5%',
                    right: '5%',
                    bottom: '5%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {} // 保存为图片
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    axisTick: {
                        alignWithLabel: true
                    },
                    data: ["Task 1", "Task 2", "Task 3", "Task 4"] // x坐标的名称
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: true,
                    splitNumber: 4,
                    interval: 10 // 强制设置坐标轴分割间隔
                },
                series: [
                    {
                        name: 'DETR+GOC',
                        type: 'line',
                        itemStyle: {
                            color: 'rgb(255,96,64)', // 折线颜色
                            lineStyle: {
                                color: 'rgb(255,96,64)' // 折线颜色
                            }
                        },
                        markPoint: {
                            data: [
                                {
                                    type: 'max',
                                    name: 'U-recall',
                                    label: {
                                        show: true,
                                        formatter: 'DETR+GOC'
                                    }
                                }
                            ],
                            itemStyle: {
                                color: 'rgb(255,96,64)'
                            }
                        },
                        data: this.opinionData // 原始数据
                    },
                    
                ]
            });
        },
    }
  }
  </script>
  
  <style scoped>
  .box{
    margin-left: 80px;
    border-radius: 15px;
    margin-top: 50px;
    border: 2.5px solid #928d8d;
    width: 1250px;
    display: inline-block;
  }
  .block {
    margin-top: 25px;
    margin-left: 25px;
    border-radius: 10px;
    width: 1200px;
    border: 2.5px solid #928d8d;
    padding: 20px; /* 增加内边距 */
    display: inline-block;
  }
  
  .description {
    display: flex;
    align-items: center;
    padding-bottom: 5px;
  }
  
  .zhixindu{
    margin-top: 15px;
    margin-left: 25px;
    font-size: 20px;
  }
  
  .description span {
    margin-right: 10px;
  }
  
  .divider {
    margin-top: 20px; /* 调整分割线与上方的距离 */
  }
  
  .options {
    margin-left: 25px;
    margin-top: 20px; /* 调整单选按钮组与分割线的距离 */
  }
  
  .el-radio {
    font-size: 15px;
    margin-bottom: 2px; /* 调整单选按钮之间的垂直间距 */
  }
  </style>
  