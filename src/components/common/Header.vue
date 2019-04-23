<template>
  <el-header>
    <div>
      <div class="collapse-btn" @click="collapseChage" style="cursor:hand">
        <i class="iconfont icon-liebiaomoshi_kuai"></i>
      </div>
      <div class="title">
        <h1 style="font-size: 20px;">考勤管理系统</h1>
      </div>
    </div>
    <div style="float: right;padding-right: 40px;">
      <el-dropdown>
        <span class="el-dropdown-link">
          你好，{{username}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>{{username}}</el-dropdown-item>
          <!-- <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item> -->
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>


</template>



<script>
  import bus from '@/components/bus';
  import { Axios } from '@/plugins/AxiosPlugin'
  export default {
    name: 'Header',
    data() {
      return {
        isCollapse: false,

      }

    },
    props: ['username'],
    methods: {
      // 侧边栏折叠
      collapseChage() {
        this.isCollapse = !this.isCollapse;
        console.log(this.isCollapse)
        bus.$emit('isCollapse', this.isCollapse);//bus.$emit用来实现组件之间的通信，待研究
      },
      logout() {
        console.log("退出登录")
        localStorage.removeItem('token');
        Axios.defaults.headers['token'] = null;
        this.$router.push("/login");
      }
    },
    mounted() {
      if (document.body.clientWidth < 1500) {
        this.collapseChage();
      }
    }
  };
</script>

<style scoped>
  .el-header {
    line-height: 60px;
    background-color: #fff;
    padding: 0px;
    overflow: hidden;
  }

  .collapse-btn {
    float: left;
    text-align: center;
    height: 60px;
    width: 60px;
  }

  /* .collapse-btn:hover {
    background-color: #666;
  } */

  .title {
    float: left;
    text-align: center;
    line-height: 60px;
    width: 150px;
    height: 60px;
  }
</style>