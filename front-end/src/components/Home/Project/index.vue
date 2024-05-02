<template>
    <div class="project-introduction">
      <h1>Deformable DETR + GOC（开放世界目标检测器）</h1>
      <p class="authors">
         高世达 ( 合肥工业大学  2020级  智能科学与技术创新实验20-1班 )
      </p>
      <p class="repo-info">
        这个项目的内容被记录在我的CSDN博客：
        <a href="https://blog.csdn.net/weixin_56764022/article/details/134938321?spm=1001.2014.3001.5501">基于DETR+Falsk+Vue实现开放世界目标检测系统</a>.
      </p>
      <h2>项目简介</h2>
      <p>
        本毕设是在Deformable Detr模型的基础上，通过引入广义目标置信度(GOC)分数，从而实现模型从已知类别学习到的知识有效的迁移到未知物体，
        从而实现模型可以检测不在训练集中的未知物体。同时实现模型的增量学习，使模型可以增量的学习新的未知类别。
      </p>
      <div class="figure">
        <img src="../../../assets/project_img/GOC.jpg" alt="">
        <p>Figure 1: GOC基本思想</p>
      </div>
      <p>
        Deformable DETR是基于Transformer架构的目标检测模型，它是对传统的DETR（Detection Transformer）模型的扩展和改进。DETR模型是一种端到端的目标检测模型，
        通过自注意力机制实现了物体检测任务的端到端学习，避免了传统目标检测方法中需要设计复杂的手工特征提取器和区域建议器的问题。
      </p>
      <div class="figure">
        <img src="../../../assets/project_img/DETR.jpg" alt="">
        <p>Figure 2: Deformable DETR基本结构</p>
      </div>
      <p>
        主要思路是在其最后输出的proposal后加入一个GOC评分输出头，使其可以为每个proposal输出一个GOC评分，GOC分数越高的，说明其框住物体的可能性越高，
        这样我们设置一个阈值就可以得到许多个可能包住物体的框，然后再在后面加入n-cut方法，得到未知物体的输出结果，然后再将已知检测结果与未知检测结果融合，得到最后的输出结果。
      </p>
      <div class="figure">
        <img src="../../../assets/project_img/GOC+DETR.jpg" alt="">
        <p>Figure 3: Deformable DETR + GOC 基本结构</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    // Vue 逻辑和数据
  }
  </script>
  
  <style>
  .project-introduction {
    max-width: 1000px;
    margin: auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  h1 {
    color: #333;
  }
  
  .authors {
    font-style: italic;
    color: #555;
  }
  
  .repo-info {
    margin-bottom: 20px;
  }
  
  h2 {
    color: #333;
  }
  
  .figure {
    text-align: center;
    margin-top: 20px;
  }
  
  .figure img {
    max-width: 100%;
    height: auto;
  }
  
  .figure p {
    margin-top: 5px;
    font-size: 0.9em;
  }
  </style>
  