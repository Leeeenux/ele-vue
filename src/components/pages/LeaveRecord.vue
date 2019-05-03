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
                prop="studentNum"
                label="学号"
                width="120">
              </el-table-column>
              <el-table-column
                prop="studentName"
                label="姓名"
                width="120">
              </el-table-column>
              <el-table-column
                prop="name"
                label="课程名"
                >
              </el-table-column>
              <el-table-column
                prop="reason"
                label="节次"
                width="150">
              </el-table-column>
              <el-table-column
                prop="time"
                label="签到时间"
                width="200">
              </el-table-column>
              
              <el-table-column
                prop="address"
                label="状态"
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
          studentName: '林佳苗',
          studentNum: '1001',
          name: 'C语言程序设计',
          reason:'星期三第5节-第6节',
          time:'2019年4月30日  14:25:36',
          address:'迟到'
        },
        {
          num: '2',
          studentName: '林佳苗',
          studentNum: '1002',
          name: 'C语言程序设计',
          reason:'星期三第5节-第6节',
          time:'2019年4月30日  14:27:16',
          address:'迟到'
        },
        {
          num: '3',
          studentName: '陈丽',
          studentNum: '1003',
          name: 'C语言程序设计',
          reason:'星期三第5节-第6节',
          time:'2019年4月30日  14:24:54',
          address:'准点'
        },
        {
          num: '4',
          studentName: '林佳苗',
          studentNum: '1004',
          name: 'C语言程序设计',
          reason:'星期三第5节-第6节',
          time:'2019年4月30日  14:21:30',
          address:'准点'
        },
        {
          num: '5',
          studentName: '林佳苗',
          studentNum: '1005',
          name: 'C语言程序设计',
          reason:'星期三第5节-第6节',
          time:'2019年4月30日  14:15:15',
          address:'准点'
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