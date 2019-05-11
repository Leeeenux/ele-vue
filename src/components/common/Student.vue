<template>
    <div class="dialog-container">
        <el-dialog
            title="title"
            :visible.sync="visible"
            @close="$emit('update:show', false)"
            :show="show">
            <span>this is a dialog.</span>
        </el-dialog>
    </div>s
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
    box-shadow: 0 0px 10px 0 rgba(0, 0, 0, 0.1);
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