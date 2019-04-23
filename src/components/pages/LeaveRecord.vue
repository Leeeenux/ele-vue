<template>
  <div>
    <el-row :gutter="20">
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>请假记录</span>
          </div>
          <el-row>
            <div id="out-table">
              <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                prop="num"
                label="序号"
                width="100">
              </el-table-column>
              <el-table-column
                prop="name"
                label="请假时间"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="请假理由">
              </el-table-column>
              <el-table-column
                prop="address"
                label="状态"
                width="120">
              </el-table-column>
              <el-table-column
                prop="address"
                label="操作"
                width="120">
              </el-table-column>
            </el-table>
          </div>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-button type="primary" @click="exportExcel">导出excel</el-button>
  </div>
  


</template>



<script>
  import bus from '@/components/bus';
  import { Axios } from '@/plugins/AxiosPlugin'
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  export default {
    name: 'Header',
    data() {
      return {
        userinfo:[],
        tableData: [{
          num: '1',
          name: 'C语言程序设计',
          address: '进入'
        }, {
          num: '2',
          name: 'C语言程序设计',
          address: '进入'
        }, {
          num: '3',
          name: 'C语言程序设计',
          address: '进入'
        }, {
          num: '4',
          name: 'C语言程序设计',
          address: '撤销'
        }]
      }

    },
    

    created: function () {
     
    },
    methods: {
      clicktest: function () {
        console.log(this.$route.path)

      },
      exportExcel () {
         /* generate workbook object from table */
         var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
         /* get binary string as output */
         var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
         try {
             FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
         } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
         return wbout
     }
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