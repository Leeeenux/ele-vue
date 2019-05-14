<template>
  <div>
    <el-dialog title="信息编辑" :visible.sync="visible" @close="$emit('update:show', false)" :show="show" width="25%">
      <el-form ref="leave" :model="leave" label-width="80px" size="mini">
        <el-form-item label="请假类型" prop="type">
          <el-col :span="24">
            <el-select v-model="leave.type" placeholder="请选择请假类型" style="width:200px;">
              <el-option label="事假" value="事假"></el-option>
              <el-option label="公假" value="公假"></el-option>
              <el-option label="病假" value="病假"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker v-model="leave.startTime" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="leave.endTime" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="请假理由">
          <el-input type="textarea" v-model="leave.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { Axios } from '@/plugins/AxiosPlugin';
  export default {
    name: 'LeaveInfoDialog',
    data() {
      return {
        visible: this.show,
        leave: {
          type: '',
          content: ''
        },
        duty: [{
          label: '讲师',
          value: '讲师'
        }, {
          label: '教授',
          value: '教授'
        }, {
          label: '副教授',
          value: '副教授'
        }],
        clazz: [{
          label: '15软件1班',
          classId: '101'
        }, {
          label: '15软件2班',
          classId: '102'
        }, {
          label: '15软件3班',
          classId: '103'
        }, {
          label: '15软件4班',
          classId: '104'
        }]
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
        this.leave = JSON.parse(JSON.stringify(this.rowInfo));
      }
    },
    methods: {
      onSubmit() {
        console.log(this.leave)
        Axios({
          method: "post",
          url: "/leave/update",
          data: this.leave,
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
        console.log(this.content);
        this.$message.success('提交成功！');
      },
    }
  };
</script>