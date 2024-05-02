<template>
    <div class="login-container">
      <h3 class="title">开放世界目标检测系统</h3>
        <div class="container">
            <div class="left_box"
                v-motion
                :initial="{ opacity: 0, x: -100}"
                :enter="{ opacity: 1, x:0}"
                :delay="200"
            >
                <img src ="../../assets/imgs/image.jpg" alt=""/>
            </div>
            <div class="right_box">
                <div class="from-container">

                  <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                  <!-- 登录注册共用表单 -->
                  <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
                  </el-form-item>

                  <!-- 仅注册表单 -->
                  <el-form-item label="确认密码" prop="checkPass" v-if="isRegistering">
                    <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
                  </el-form-item>

                  <!-- 操作按钮 -->
                  <el-form-item>
                    <el-button type="primary" @click="isRegistering ? register() : login()">提交</el-button>
                    <el-button @click="toggleForm">{{ isRegistering ? '登录' : '注册' }}</el-button>
                  </el-form-item>
                </el-form>
                    
                </div>
            </div>
        </div>
        
    </div>
  </template>
  

  <script>
  export default {
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.checkPass !== '') {
            this.$refs.form.validateField('checkPass');
          }
          callback();
        }
      };
      
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        form: {
          username: '',
          password: '',
          checkPass: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
        },
        isRegistering: false, // 控制是登录还是注册
        users: {} // 存储注册的用户信息
      };
    },
    methods: {
      login() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            // 前端验证通过，进行用户名和密码的匹配
            if(this.users[this.form.username] === this.form.password) {
              // 登录成功后的逻辑，比如路由跳转
              this.$router.push('/Home');
            } else {
              // 用户名密码不匹配的错误提示
              this.$message.error('用户名或密码错误');
            }
          } 
        });
      },
      register() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            // 注册用户，存储用户名和密码
            this.users[this.form.username] = this.form.password;
            // 注册成功后的逻辑
            this.isRegistering = false; // 切换到登录表单
            this.$message.success('注册成功，请登录');
          }
        });
      },
      toggleForm() {
        this.isRegistering = !this.isRegistering;
        this.form.username = '';
        this.form.password = '';
        this.form.checkPass = '';
        // 切换表单时重置验证
        this.$refs.form.resetFields();
      }
    }
  }
</script>

<style>

.login-container {
  height: 100vh;
  width: 100%;
  background-color: #939c7f;
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.container {
    /* @include bg_color(); */
    background-color: var(--el-bg-color);
    width: 750px;
    height: 400px;
    display: flex;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 5px 20px 2px rgba(26, 1, 1, 0.1);
  }

.left_box {
  width: 258px;
  img {
    height: 100%;
    display: block; /* 防止图片下方出现间隙 */
  }
}

.right_box {
  display: flex;
  flex-direction: column;
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
  width: 100%; /* 根据需要调整宽度 */
  max-width: 344px; /* 限制最大宽度 */
  margin: auto; /* 自动边距实现水平居中 */
  padding: 20px;
}

.form-container {
  width: 100%;
}

/* 确保el-form也是宽度100%，并且margin为auto以实现居中 */
.el-form {
  height: 140px;
  width: 100%;
  margin: auto;
}


.title {
  font-size: 45px;
  text-align: right; /* 将文字向右对齐 */
  margin: 20px auto 40px auto;
  font-weight: 700; /* 加粗 */
  color: #030108; /* 变黑 */
}

.el-form-item__label {
  font-weight: bold; /* 加粗标签字体 */
  color: #000; /* 标签字体颜色变黑 */
}
</style>
  