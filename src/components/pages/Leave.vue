<template>
  <el-card>
    <!-- <div>
      <el-form ref="form" :model="form" :rules="rules" status-icon label-width="80px">
        <el-form-item label="请假类型">
          <el-select v-model="form.type" placeholder="请选择请假类型">
            <el-option label="事假" value="shanghai"></el-option>
            <el-option label="病假" value="beijing"></el-option>
            <el-option label="公假" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请假时间">
          <el-date-picker 
            v-model="form.time" 
            type="datetimerange" 
            range-separator="至" 
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="请假理由">
          <el-input 
          :rows="4" 
          type="textarea" 
          v-model="form.desc"  
          placeholder="请输入请假理由">
        </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">申请</el-button>
        </el-form-item>
      </el-form> -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="请假类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择请假类型">
          <el-option label="事假" value="shijia"></el-option>
          <el-option label="公假" value="gongjia"></el-option>
          <el-option label="病假" value="bingjia"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="请假时间" prop="time" required>
          <el-col :span="12">
              <el-date-picker 
              v-model="ruleForm.time" 
              type="datetimerange" 
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日 HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 100%;"
              >
              <!-- format="yyyy-MM-dd HH:mm:ss" -->
              </el-date-picker>
          </el-col>
      </el-form-item>
      <el-form-item label="请假理由" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即申请</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    </div>

  </el-card>

</template>



<script>
  import bus from '@/components/bus';
  import { Axios } from '@/plugins/AxiosPlugin';
  import Qs from 'qs';

  export default {
    name: 'Header',
    data() {
      return {
        ruleForm: {
          type: '',
          time: '',
          desc: ''
        },
        rules: {
          time: [
            { required: true, message: '请选择日期', trigger: 'change' }
          ],
          type: [
            { required: true, message: '请选择请假类型', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写请假理由', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm)
            Axios({
              method: "post",
              url: "/api/shenqing",
              data: Qs.stringify(this.ruleForm),
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            })
              .then(res => {
                console.log("ss")

              })
              .catch(err => {
                console.log(err)
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      onSubmit() {
        this.$refs.form.validate(valid => {

        });
      }
    },
    mounted() {

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