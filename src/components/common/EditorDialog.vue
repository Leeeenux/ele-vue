<template>
  <div>
    <el-dialog title="信息编辑" :visible.sync="visible" @close="$emit('update:show', false)" :show="show">
      <div class="container">
        <el-form label-width="80px">
          <el-form-item label="通知标题">
            <el-input v-model="noticeInfo.title" placeholder="请输入通知标题"></el-input>
          </el-form-item>
          <el-form-item label="通知班级">
            <el-select v-model="noticeInfo.className" placeholder="请选择通知班级">
              <el-option label="15软件1班" value="101"></el-option>
              <el-option label="15软件2班" value="102"></el-option>
              <el-option label="15软件3班" value="103"></el-option>
              <el-option label="15软件4班" value="104"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="通知类型">
            <el-radio-group v-model="noticeInfo.type">
              <el-radio label="班级通知"></el-radio>
              <el-radio label="团日活动"></el-radio>
              <el-radio label="考试通知"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>

        <!-- <div class="ql-editor" v-html="content">

            </div> -->
        <quill-editor ref="myTextEditor" v-model="noticeInfo.content" :options="editorOption"></quill-editor>
        <el-button style="margin-top: 20px;" class="editor-btn" type="primary" @click = "onSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css'; 
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  import { quillEditor } from 'vue-quill-editor';
  import { Axios } from '@/plugins/AxiosPlugin';
  export default {
    name: 'EditorDialog',
    data() {
      return {
        visible: this.show,
        student: {
          name: '',
          studentId: ''
        },
        noticeInfo: {
          title: '',
          content: ''
        },
        editorOption: {
          placeholder: '请输入通知内容'
        },
      };
    },
    components: {
            quillEditor
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
        this.noticeInfo = JSON.parse(JSON.stringify(this.rowInfo));
      }
    },
    methods: {
      onSubmit() {
        Axios({
                    method: "post",
                    url: "/notice/update",
                    data: this.noticeInfo,
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