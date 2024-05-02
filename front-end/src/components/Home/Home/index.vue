<template>
  <div>
    <el-carousel :interval="4000" type="card" height="400px"  style="margin-top: 20px;">
      <el-carousel-item v-for="item in imageList" :key="item.id">
        <img :src="item.url" alt="" style="width: 100%; height: 100%; object-fit: cover;">
      </el-carousel-item>
    </el-carousel>
    <div class="left-panel">
      <h2 class="panel-title">数据集（OWOD Split）</h2>
      <!-- 柱状图 -->
      <div id="mychart" :style="myChartStyle"></div>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%;">
        <el-table-column prop="leibie" label="" width="155"></el-table-column>
        <el-table-column prop="task1" label="Task 1" width="130"></el-table-column>
        <el-table-column prop="task2" label="Task 2" width="130"></el-table-column>
        <el-table-column prop="task3" label="Task 3" width="130"></el-table-column>
        <el-table-column prop="task4" label="Task 4" width="130"></el-table-column>
      </el-table>
    </div>
    <div class="right-panel">
      <h2 class="panel-title">GOC + Deformable DETR 性能</h2>
      <div id="main" style="width: 100%;height: 300px;margin-top: 50px; background:#fff"></div>

      <div id="main_2" style="width: 100%;height: 300px ;margin-top: 75px; background:#fff"></div>

    </div>
  </div>
  </template>


  <script>
   import * as echarts from "echarts";
  

  export default {
    data() {
      return {
        imageList: [
          { id: 1, url: require('@/assets/Home_result/image_1.jpg') },
          { id: 2, url: require('@/assets/Home_result/image_2.jpg') },
          { id: 3, url: require('@/assets/Home_result/image_3.jpg') },
          { id: 4, url: require('@/assets/Home_result/image_4.jpg') },
          { id: 5, url: require('@/assets/Home_result/image_5.jpg') },
          // 添加更多图片路径
        ],
        xData: ["T1", "T2", "T3",'T4'], //横坐标
        yData: [20, 40, 60, 80], //人数数据
        taskDate: [60, 40, 20, 0],
        myChartStyle: { float: "left", width: "100%", height: "400px" }, //图表样式
        tableData: [{
            leibie: 'Semantic split',
            task1: 'VOC Class',
            task2: 'Outdoor Truck',
            task3: 'Sports Food',
            task4: 'Kitchen Indoor'
          }, {
            leibie: '#training images',
            task1: '16551',
            task2: '45520',
            task3: '39402',
            task4: '46260'
          }, {
            leibie: '#test images',
            task1: '4952',
            task2: '1914',
            task3: '1642',
            task4: '1738'
          }, {
            leibie: '#training instances',
            task1: '47223',
            task2: '113741',
            task3: '114452',
            task4: '138996'
          },{
            leibie: '#test images',
            task1: '14976',
            task2: '4966',
            task3: '4826',
            task4: '6039'
          }],
        charts: '',
        opinionData: ["28.9", "30.4", "30.8", "0"],//数据
        opinionData2: ["7.5", "6.2", "5.7", "0"],//数据
        opinionData3: ["19.4", "17.4", "19.6", "0"],//数据
        opinionData4: ["23.7", "19.1", "24.4", "0"],//数据
        opinionData5: ["10.6", "6.3", "7.8", "0"],//数据
        mapData: ["59.2", "44.5", "34.2", "27.9"],//数据
        mapData2: ["59.2", "42.9", "30.8", "27.8"],//数据
        mapData3: ["59.5", "44.0", "36.0", "31.5"],//数据
        mapData4: ["60.0", "44.1", "34.8", "30.4"],//数据
        mapData5: ["61.8", "45.3", "39.4", "35.4"],//数据
      }
    },
    mounted() {
      this.initEcharts();
      this.drawLine('main');
      this.drawLine_2('main_2');
    },
    created() {
    this.initData();
    },

    methods: {
      drawLine(id) {
          this.charts = echarts.init(document.getElementById(id))
          this.charts.setOption({
              title: {
                  left: '3%',
                  top: '5%',
                  text: "DETR+GOC的U-recall表现以及与其他模型对比", // 标题文本
              },
              tooltip: {
                  trigger: 'axis'
              },
              legend: {
                  align: 'right',
                  left: '3%',
                  top: '15%',
                  data: ['DETR+GOC', 'OWDETR', 'PROB', 'CAT','RandBox'] // 更新图例
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
                  {
                      name: 'OWDETR',
                      type: 'line',
                      itemStyle: {
                          color: 'rgb(70,130,180)', // 不同颜色
                          lineStyle: {
                              color: 'rgb(70,130,180)' // 不同颜色
                          }
                      },
                      
                      data: this.opinionData2 // 新数据集
                  },
                  {
                      name: 'PROB',
                      type: 'line',
                      itemStyle: {
                          color: 'rgb(60,179,113)', // 不同颜色
                          lineStyle: {
                              color: 'rgb(60,179,113)' // 不同颜色
                          }
                      },
                      data: this.opinionData3 // 新数据集
                  },
                  {
                      name: 'CAT',
                      type: 'line',
                      itemStyle: {
                          color: 'rgb(255,165,0)', // 不同颜色
                          lineStyle: {
                              color: 'rgb(255,165,0)' // 不同颜色
                          }
                      },
                      data: this.opinionData4 // 新数据集
                  },
                  {
                      name: 'RandBox',
                      type: 'line',
                      itemStyle: {
                          color: 'rgb(20,50,64)', // 不同颜色
                          lineStyle: {
                              color: 'rgb(20,50,64)' // 不同颜色
                          }
                      },
                      data: this.opinionData5 // 新数据集
                  }
              ]
          });
      },

      drawLine_2(id) {
          this.charts = echarts.init(document.getElementById(id))
          this.charts.setOption({
              title: {
                  left: '3%',
                  top: '5%',
                  text: "DETR+GOC的map表现以及与其他模型对比", // 标题文本
              },
              tooltip: {
                  trigger: 'axis'
              },
              legend: {
                  align: 'right',
                  left: '3%',
                  top: '15%',
                  data: ['DETR+GOC', 'OWDETR', 'PROB', 'CAT','RandBox'] // 更新图例
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
                      data: this.mapData // 原始数据
                  },
                  {
                      name: 'OWDETR',
                      type: 'line',
                      itemStyle: {
                          color: 'rgb(70,130,180)', // 不同颜色
                          lineStyle: {
                              color: 'rgb(70,130,180)' // 不同颜色
                          }
                      },
                      
                      data: this.mapData2 // 新数据集
                  },
                  {
                      name: 'PROB',
                      type: 'line',
                      itemStyle: {
                          color: 'rgb(60,179,113)', // 不同颜色
                          lineStyle: {
                              color: 'rgb(60,179,113)' // 不同颜色
                          }
                      },
                      data: this.mapData3 // 新数据集
                  },
                  {
                      name: 'CAT',
                      type: 'line',
                      itemStyle: {
                          color: 'rgb(255,165,0)', // 不同颜色
                          lineStyle: {
                              color: 'rgb(255,165,0)' // 不同颜色
                          }
                      },
                      data: this.mapData4 // 新数据集
                  },
                  {
                      name: 'RandBox',
                      type: 'line',
                      itemStyle: {
                          color: 'rgb(20,50,64)', // 不同颜色
                          lineStyle: {
                              color: 'rgb(20,50,64)' // 不同颜色
                          }
                      },
                      data: this.mapData5 // 新数据集
                  }
              ]
          });
      },

      initEcharts() {
        // 多列柱状图
        const mulColumnZZTData = {
          xAxis: {
            data: this.xData
          },
          // 图例
          legend: {
            data: ["已知类数量", "未知类数量"],
            top: "0%"
          },
          yAxis: {},
          series: [
            {
              type: "bar", //形状为柱状图
              data: this.yData,
              name: "已知类数量", // legend属性
              label: {
                // 柱状图上方文本标签，默认展示数值信息
                show: true,
                position: "top"
              }
            },
            {
              type: "bar", //形状为柱状图
              data: this.taskDate,
              name: "未知类数量", // legend属性
              label: {
                // 柱状图上方文本标签，默认展示数值信息
                show: true,
                position: "top"
              }
            }
          ]
        };

        const myChart = echarts.init(document.getElementById("mychart"));
        myChart.setOption(mulColumnZZTData);
        //随着屏幕大小调节图表
        window.addEventListener("resize", () => {
          myChart.resize();
        });
      }
      
    },

  }
  </script>
  
  
  <style>
    .panel-title {
      font-size: 24px; /* 设置标题大小 */
      color: #333; /* 设置标题颜色 */
      margin-bottom: 20px; /* 在标题和下方内容之间添加一些间隔 */
      text-align: center; /* 标题居中显示 */
    }
    .left-panel {
      float: left;
      width: 48%; /* 控制左侧面板宽度 */
      padding: 20px;
      margin-left: 5px;
      box-sizing: border-box;
      border: 2px solid #433f3f; /* 添加边框 */
    }
    .right-panel{
      float: right;
      width: 48%; /* 控制右侧面板宽度 */
      padding: 20px;
      margin-right: 5px;
      box-sizing: border-box;
      border: 2px solid #433f3f; /* 添加边框 */
    }

    .el-table .cell {
      color: #333; /* 加深表格文字颜色 */
      font-weight: bold; /* 加粗文字 */
    }

    el-carousel__item h3 {
      color: #475669;
      font-size: 20px;
      opacity: 0.75;
      line-height: 300px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
  </style>