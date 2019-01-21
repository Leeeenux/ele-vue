<template>
  <div class="header">
    <div class="wrapper">
      <div class="collapse-btn" @click="collapseChage">
        <i class="el-icon-menu"></i>
      </div>
    </div>
  </div>

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
  .wrapper {
    width: 100%;
    height: 80px;
    background-color: red;
  }
</style>