<template>
    <div>
      <el-row>
        <el-col>
          <el-card>
              <el-row>
                  <el-select v-model="days" placeholder="请选择时间" @change="daysChange">
                      <el-option label="近7天考勤记录" value="1"></el-option>
                      <el-option label="近30天考勤记录" value="2"></el-option>
                      <el-option label="全部考勤记录" value="3"></el-option>
                  </el-select>
              </el-row>
            <el-row style="margin-top:20px;">
              <el-table :data="tableData" border style="width: 100%" size="mini">
                <el-table-column type="index" label="序号" width="80">
                </el-table-column>
                <el-table-column prop="subjectName" label="课程">
                </el-table-column>
                <el-table-column prop="weekday" label="日期" width="180">
                </el-table-column>
                <el-table-column prop="arrangeDesc" label="节次" width="180">
                </el-table-column>
                <el-table-column prop="createTime" label="开课时间">
                  </el-table-column>
                <el-table-column prop="signInTime" label="签到时间">
                </el-table-column>
                <el-table-column prop="signInStatus" label="签到状态" width="80">
                </el-table-column>
                <!-- <el-table-column label="操作" width="120">
                  <template slot-scope="scope">
                    <el-button @click="deleteClick(scope.row)" icon="el-icon-delete" type="text" size="small">删除
                    </el-button>
                    <el-button @click="editClick(scope.row)" icon="el-icon-edit" type="text" size="small">编辑</el-button>
                  </template>
                </el-table-column> -->
              </el-table>
            </el-row>
  
          </el-card>
        </el-col>
      </el-row>
      <el-row style="text-align: center;">
        <div style="margin-top:20px;">
          <el-pagination background layout="prev, pager, next" :total="100">
          </el-pagination>
        </div>
      </el-row>
      <EditorDialog :show.sync="show" :rowInfo="rowInfo"></EditorDialog>
    </div>
  
  </template>
  
  
  
  <script>
    import bus from '@/components/bus';
    import { Axios } from '@/plugins/AxiosPlugin'
    import EditorDialog from '@/components/common/EditorDialog'
    export default {
      data() {
        return {
          tableData: [{
            title: 'title',
            type: 'type',
            content: 'content',
            createTime: '2019'
          }],
          show: false,
          rowInfo: {},
          days:'1'
        }
  
      },
      components: {
        EditorDialog
      },
      created: function () {
        Axios({
          method: "get",
          url: "/student/record",
          params:{
            days:this.days
          }
        })
          .then(res => {
            console.log(res.data)
            this.tableData = res.data.list
          })
          .catch(err => {
            console.log(err)
          })
      },
      activated() {
        this.reloadRecord()
      },
      watch: {
        show(){
          if(!this.show){
            this.reloadRecord()
          }
        }
      },
      methods: {
        daysChange(e){
          this.days = e
          this.reloadRecord()
        },
        editClick(row) {
          this.show = true;
          this.rowInfo = row;
        },
        deleteClick(row) {
          var noticeId = row.noticeId
          Axios({
            method: "get",
            url: "/notice/delete",
            params: {
              noticeId: noticeId
            }
          })
            .then(res => {
              this.reloadRecord()
            })
            .catch(err => {
              console.log(err)
            })
        },
        reloadRecord(){
          Axios({
          method: "get",
          url: "/student/record",
          params:{
            days:this.days
          }
        })
          .then(res => {
            console.log(res.data)
            this.tableData = res.data.list
          })
          .catch(err => {
            console.log(err)
          })
        }
      }
    };
  </script>
  
  <style scoped>
  </style>