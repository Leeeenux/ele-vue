<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card class="box-card" style="height:301px;">
          <div slot="header" class="clearfix">
            <span>当前课程</span>
          </div>
          <el-row>
            <el-table :data="tableData" border style="width: 100%" size="mini">
              <el-table-column type="index" label="序号" width="80">
              </el-table-column>
              <el-table-column prop="subjectName" label="课程">
              </el-table-column>
              <el-table-column prop="weekday" label="日期">
              </el-table-column>
              <el-table-column prop="className" label="班级">
              </el-table-column>
              <el-table-column prop="arrangeDesc" label="节次">
              </el-table-column>
              <el-table-column prop="startTime" label="开始时间">
              </el-table-column>
              <el-table-column prop="endTime" label="结束时间">
              </el-table-column>
              <el-table-column prop="relationId" label="relationID" v-if="false">
              </el-table-column>
            </el-table>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header" class="clearfix">
            <el-button style="margin-left:20px;" :disabled='!canClick' @click='StartAtd' icon="el-icon-edit"
              type="success">
              开启签到</el-button>
            <span style="margin-left:20px;">剩余签到时间{{totalTime}}s</span>
          </div>
          <div style="text-align: center;">
            <el-progress type="circle" :percentage="percent"></el-progress>
            <h2 style="margin-top:20px;">当前班级共50人，已签到{{sum}}人</h2>
          </div>

        </el-card>
      </el-col>

    </el-row>
    <el-row :gutter="20" style="margin-top:20px;">
      <el-col>
        <el-card>
          <div slot="header" class="clearfix">
            <span style="margin-left:20px;">已签到学生</span>
          </div>
          <el-row>
            <el-table :data="studentData" border style="width: 100%" size="mini">
              <el-table-column type="index" label="序号" width="80">
              </el-table-column>
              <el-table-column prop="studentId" label="学号"  width="180">
              </el-table-column>
              <el-table-column prop="studentName" label="姓名"  width="180">
              </el-table-column>
              <el-table-column prop="signInTime" label="签到时间">
              </el-table-column>
              <el-table-column prop="signInStatus" label="签到状态" width="80">
              </el-table-column>
            </el-table>
          </el-row>
        </el-card>
      </el-col>
    </el-row>


  </div>


</template>



<script>
  import bus from '@/components/bus';
  import { Axios } from '@/plugins/AxiosPlugin'
  export default {
    data() {
      return {
        content: '发送验证码',   // 按钮里显示的内容
        totalTime: 100,           //记录具体倒计时时间
        percent: 0,
        sum: 0,
        canClick: true,
        tableData: [],
        studentData: [],
        value2: '',
        swiper: [
          {
            src: 'http://wx3.sinaimg.cn/large/006haIIAly1g2e1k1nz8zj30p00an0w5.jpg'
          },
          {
            src: 'http://wx3.sinaimg.cn/large/006haIIAly1g2loaj2whhj30p00antck.jpg'
          }
        ]
      }

    },


    created: function () {


      Axios({
        method: "get",
        url: "/teacher/current"
      })
        .then(res => {
          this.tableData.push(res.data.subject) //subject只有一个
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    methods: {
      StartAtd() {
        this.start()
        this.student()
        this.countDown()
      },
      start(){
        Axios({
        method: "get",
        url: "/atd/start"
      })
        .then(res => {

        })
        .catch(err => {
          console.log(err)
        })
      },
      allow(){
        
      }
      ,
      countDown() {
        if (!this.canClick) return   //改动的是这两行代码
        this.canClick = false
        this.content = this.totalTime + 's后重新发送'
        this.totalTime = 100
        let clock = window.setInterval(() => {
          this.totalTime--
          this.content = this.totalTime + 's后重新发送'
          if (this.totalTime < 0) {
            window.clearInterval(clock)
            this.content = '重新发送验证码'
            this.totalTime = 0
            this.canClick = true   //这里重新开启
          }
        }, 1000)
      },
      student() {
        let clock = window.setInterval(() => {
          Axios({
            method: "get",
            url: "/teacher/student"
          })
            .then(res => {
              this.studentData = res.data.list
              this.percent = parseInt(res.data.list.length / 50 * 100)//只取整数
              this.sum = res.data.list.length
            })
            .catch(err => {
              console.log(err)
            })
          if (this.totalTime == 0) {
            window.clearInterval(clock)
            console.log("结束查询")
          }
        }, 3000)

      }

    }
  };
</script>

<style scoped>
</style>