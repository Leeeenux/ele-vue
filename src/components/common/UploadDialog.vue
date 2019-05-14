<template>
  <div>
    <el-dialog title="批量导入" :visible.sync="visible" @close="$emit('update:show', false)" :show="show">
      <el-upload ref="upload" accept=".xls,.xlsx" action="/" :show-file-list="false" :on-change="importExcel"
        :auto-upload="false">
        <el-button type="primary" size="mini">上传Excel</el-button>
      </el-upload>
      <el-table :data="tableData" style="width: 100%" size="mini">
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="studentId" label="学号">
        </el-table-column>
        <el-table-column prop="studentName" label="姓名">
        </el-table-column>
        <el-table-column prop="phone" label="手机号">
        </el-table-column>
        <el-table-column prop="classId" label="班级ID">
        </el-table-column>
        <el-table-column prop="duty" label="职务">
        </el-table-column>
      </el-table>
      <div style="margin-top:20px;">
        <el-button type="primary" @click="onSubmit">立即导入</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
  import XLSX from 'xlsx';
  import { Axios } from '@/plugins/AxiosPlugin';
    
  export default {
    name: 'UploadDialog',
    data() {
      return {
        visible: this.uploadshow,
        tableData: []
      };
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      rowInfo: {}
    },
    watch: {
      show() {
        var that = this
        this.visible = this.show;
      }
    },
    methods: {
      nameChange(e) {
        this.student.name = e
      },
      onSubmit() {
        Axios({
          method: "post",
          url: "/person/upload",
          data: this.tableData,
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => {
            console.log(res.data)
          })
          .catch(err => {
            console.log(err)
          })
      },
      importExcel(file) {
        // let file = file.files[0] // 使用传统的input方法需要加上这一步
        const types = file.name.split('.')[1]
        const fileType = ['xlsx', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'csv'].some(item => item === types)
        if (!fileType) {
          alert('格式错误！请重新选择')
          return
        }
        this.file2Xce(file).then(tabJson => {
          if (tabJson && tabJson.length > 0) {
            this.xlsxJson = tabJson
            this.tableData = tabJson[0].sheet
            console.log(this.xlsxJson[0].sheet)
            // xlsxJson就是解析出来的json数据,数据格式如下
            // [
            //   {
            //     sheetName: sheet1
            //     sheet: sheetData
            //   }
            // ]
          }
        })
      },
      file2Xce(file) {
        return new Promise(function (resolve, reject) {
          const reader = new FileReader()
          reader.onload = function (e) {
            const data = e.target.result
            this.wb = XLSX.read(data, {
              type: 'binary'
            })
            const result = []
            this.wb.SheetNames.forEach((sheetName) => {
              result.push({
                sheetName: sheetName,
                sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName])
              })
            })
            resolve(result)
          }
          reader.readAsBinaryString(file.raw)
          // reader.readAsBinaryString(file) // 传统input方法
        })
      }

    }
  };
</script>