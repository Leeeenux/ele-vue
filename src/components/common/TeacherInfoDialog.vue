<template>
  <div>
    <el-dialog title="信息编辑" :visible.sync="visible" @close="$emit('update:show', false)" :show="show" width="25%">

      <el-form ref="teacher" :model="teacher" label-width="80px" size="mini">
        <el-form-item label="姓名">
          <el-input v-model="teacher.teacherName" @input="nameChange" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="工号">
          <el-input v-model="teacher.teacherId" style="width:200px;" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="teacher.phone" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="职务">
          <el-select v-model="teacher.duty">
            <div v-for="item in duty" >
                <el-option :label="item.label" :value="item.value"></el-option>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认修改</el-button>
          <el-button type="success" @click="onSubmit">重置密码</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { Axios } from '@/plugins/AxiosPlugin';
  export default {
    name: 'TeacherInfoDialog',
    data() {
      return {
        visible: this.show,
        teacher: {
          name: '',
          teacherId: ''
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
        this.teacher = JSON.parse(JSON.stringify(this.rowInfo));
      }
    },
    methods: {
      nameChange(e) {
        this.teacher.name = e
      },
      onSubmit() {
        console.log(this.teacher)
        Axios({
          method: "post",
          url: "/teacher/update",
          data: this.teacher,
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