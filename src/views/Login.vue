<template>
    <el-row type="flex" justify="center">
        <el-form ref="loginForm" :model="user" :rules="rules" status-icon label-width="50px">
            <el-form-item label="账号" prop="name">
                <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input v-model="user.pass" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-upload" @click="login">登录</el-button>
                <el-button type="primary" icon="el-icon-upload" @click="info">测试</el-button>
                <el-button type="primary" icon="el-icon-upload" @click="out">退出</el-button>
            </el-form-item>
        </el-form>
    </el-row>
</template>

<script>
    import { Axios } from '@/plugins/AxiosPlugin'
    import Qs from 'qs'
    import axios from 'axios'
    export default {
        methods: {
            login22() {//使用elementui validate验证
                this.$refs.loginForm.validate(valid => {
                    if (valid) {//这里在下边会改写成登录信息 感谢 @风格不同 提醒注释错误问题
                        if (this.user.name === "admin" && this.user.pass === "123") {
                            this.$notify({
                                type: "success",
                                message: "欢迎你," + this.user.name + "!",
                                duration: 3000
                            });
                            this.$router.replace("/");
                        } else {
                            this.$message({
                                type: "error",
                                message: "用户名或密码错误",
                                showClose: true
                            });
                        }
                    } else {
                        return false;
                    }
                });
            },

            login() {
                let params = {
                    username: this.user.name,
                    password: this.user.pass
                }

                this.$refs.loginForm.validate(valid => {

                    Axios({
                        method: "post",
                        url: "/user/login",
                        data: Qs.stringify(params),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })
                        .then(res => {
                            console.log(res.data.token)
                            localStorage.setItem("token", res.data.token);
                            Axios.defaults.headers['token'] = res.data.token
                            this.$router.push("/");
                        })
                        .catch(err => {
                            console.log(err)
                        })

                });

            },
            info() {
                Axios.get("/user/info", {
                    params: "s"
                })
                    .then(res => {
                        console.log(res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            out(){
                localStorage.removeItem('token');
                Axios.defaults.headers['token'] = null
            }
        },
        data() {
            return {
                user: {},//配合页面内的 prop 定义数据
                rules: {//配合页面内的 prop 定义规则
                    name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
                    pass: [{ required: true, message: "密码不能为空", trigger: "blur" }]
                }
            };
        }
    };
</script>