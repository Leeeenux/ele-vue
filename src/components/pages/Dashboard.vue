<template>
  <div>
    <el-row :gutter="20">
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>我参与的课程</span>
          </div>
          <h1>sada</h1>
        </el-card>
      </el-col>
    </el-row>
  </div>


</template>



<script>
  import bus from '@/components/bus';

  export default {
    name: 'Header',
    data() {
      return {

      }

    },
    methods: {

    }
  };
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>