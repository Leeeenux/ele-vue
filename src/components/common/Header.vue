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

  </el-header>


</template>



<script>
  import bus from '@/components/bus';

  export default {
    name: 'Header',
    data() {
      return {
        isCollapse: false
      }

    },
    methods: {
      // 侧边栏折叠
      collapseChage() {
        this.isCollapse = !this.isCollapse;
        console.log(this.isCollapse)
        bus.$emit('isCollapse', this.isCollapse);//bus.$emit用来实现组件之间的通信，待研究
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
  }

  .collapse-btn {
    float: left;
    text-align: center;
    height: 60px;
    width: 60px;
  }

  .collapse-btn:hover {
    background-color: #666;
  }
  
  .title {
    float: left;
    text-align: center;
    line-height: 60px;
    width: 150px;
    height: 60px;
  }
</style>