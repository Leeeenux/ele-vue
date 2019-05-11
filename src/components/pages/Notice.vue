<template>
    <div>

        <el-row>
            <el-col>
                <el-card>
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="通知标题">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="通知对象">
                            <el-select v-model="form.region" placeholder="请选择班级">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        
                        <el-form-item label="重要通知">
                            <el-switch v-model="form.delivery"></el-switch>
                        </el-form-item>
                        <el-form-item label="通知类型">
                            <el-radio-group v-model="form.resource">
                                <el-radio label="班级通知"></el-radio>
                                <el-radio label="考试通知"></el-radio>
                                <el-radio label="团建活动"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="通知详情">
                            <el-input type="textarea" v-model="form.desc"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">立即创建</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import bus from '@/components/bus';
    import { Axios } from '@/plugins/AxiosPlugin'
    export default {
        name: 'Header',
        data() {
            return {
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }

        },


        created: function () {
            Axios({
                method: "get",
                url: "/class/getclass"
            })
                .then(res => {
                    console.log(res.data)
                    this.courses = res.data.courses
                    this.className = res.data.className.className
                })
                .catch(err => {
                    console.log(err)
                })
        },
        methods: {
            clicktest: function (event) {


            }

        }
    };
</script>