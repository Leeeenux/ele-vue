<template>

    <div>
        <el-card>
            <div class="crumbs">

            </div>

            <div class="container">
                <el-form label-width="80px">
                    <el-form-item label="通知标题">
                        <el-input v-model="noticeInfo.title" placeholder="请输入通知标题"></el-input>
                    </el-form-item>
                    <el-form-item label="通知班级">
                        <el-select v-model="noticeInfo.classId" placeholder="请选择通知班级">
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
                <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
    import { Axios } from '@/plugins/AxiosPlugin'
    export default {
        name: 'editor',
        data: function () {
            return {
                noticeInfo: {
                    title: '',
                    content: '',
                    type: '',
                    classId:''
                },
                resource: '',
                content: '',
                editorOption: {
                    placeholder: '请输入通知内容'
                },
                classList: [{
                    value: "一班",
                    key: "2"
                }]
            }
        },
        components: {
            quillEditor
        },
        methods: {
            onEditorChange({ editor, html, text }) {
                this.content = html;
            },
            submit() {
                Axios({
                    method: "post",
                    url: "/notice/create",
                    data: this.noticeInfo,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => {
                        if(res.data.success){
                            this.$message.success('提交成功！');
                        }else{
                            this.$message.success('提交失败！');
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
               
            }
        }
    }
</script>
<style scoped>
    .editor-btn {
        margin-top: 20px;
    }
</style>