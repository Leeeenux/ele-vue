<template>
  <el-header>
    <div class="collapse-btn" @click="collapseChage" style="cursor:hand">
      <i class="iconfont icon-liebiaomoshi_kuai"></i>
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
    text-align: center;
    height: 60px;
    width: 60px;
  }

  .collapse-btn:hover{
    background-color: #666;
  }

</style>