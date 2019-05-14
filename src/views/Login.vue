<template>
    <div :style="backstyle">
        <el-row type="flex" justify="center" style="margin-top:200px;">
            <div style="background: white;border-radius: 5px;">

                <div class="form-box" style="padding:40px;">
                    <!-- <el-form ref="loginForm" :model="user">
                        <el-form-item prop="name">
                            <el-input class="input" placeholder="请输入密码" v-model="user.name"></el-input>
                        </el-form-item>
                        <el-form-item prop="pass">
                            <el-input placeholder="请输入密码" v-model="user.pass" type="password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" style="width:100%;" @click="login">登录</el-button>
                        </el-form-item>
                    </el-form> -->
                    <image src=""></image>
                    <input type="text" placeholder="输入帐号" v-model="username" data-required="required"
                        autocomplete="off">
                    <input type="password" placeholder="输入密码（默认密码1234）" v-model="password" data-required="required"
                        autocomplete="off">
                    <div style="margin-top: 20px;text-align: center;">
                        <el-radio v-model="radio" label="student">学生</el-radio>
                        <el-radio v-model="radio" label="teacher">教师</el-radio>
                        <el-radio v-model="radio" label="admin">管理员</el-radio>
                    </div>

                    <el-button type="primary" style="width:100%;border-radius: 20px;margin-top: 20px;" @click="loging">
                        登录
                    </el-button>
                </div>

            </div>
        </el-row>
    </div>

</template>

<script>
    import { Axios } from '@/plugins/AxiosPlugin'
    import backImg from '@/assets/back.jpg'
    import Qs from 'qs'
    import axios from 'axios'
    export default {
        data() {
            return {
                username: '',
                password: '',
                user: {},
                radio: 'student',
                backstyle: {
                    position: "fixed",
                    top: "0",
                    left: " 0",
                    width: "100%",
                    height: "100%",
                    "min-width": "1000px",
                    "background-color": "#fff",
                    "background-repeat": " no-repeat",
                    "background-size": "cover",
                    "-webkit-background-size": "cover",
                    "-o-background-size": "cover",
                    "background-position": "center 0",
                    backgroundImage: "url(" + require("@/assets/back.png") + ")"
                },
                bgstyle: {
                    width: "100%",
                    height: "100%",
                    backgroundImage: "url(" + require("@/assets/back.jpg") + ")"
                }

            };
        },
        created: function () {
            console.log(this.backImg)
        },
        methods: {
            loging() {
                if (this.username != '' && this.password != '') {
                    if (isNaN(this.username)) {
                        this.$message({
                            message: '请正确输入学号或工号',
                            type: 'warning'
                        });
                    } else {

                        Axios({
                            method: "get",
                            url: "/" + this.radio + "/login",//不同角色不同的登陆接口
                            params: {
                                username: this.username,
                                password: this.password
                            }
                        })
                            .then(res => {

                                if (res.data.success) {
                                    console.log(res.data.token)
                                    this.$message({
                                        message: '登陆成功',
                                        type: 'success'
                                    });
                                    localStorage.setItem("token", res.data.token);
                                    Axios.defaults.headers['token'] = res.data.token
                                    this.$router.push("/");
                                } else {
                                    this.$message({
                                        message: '账号或密码错误',
                                        type: 'warning'
                                    });
                                }
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }
                } else {
                    this.$message({
                        message: '请输入账号和密码',
                        type: 'warning'
                    });
                }
            },
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
            out() {
                localStorage.removeItem('token');
                Axios.defaults.headers['token'] = null
            }
        }
    };
</script>

<style scoped>
    .login-box {
        height: 380px;

    }

    .form-box {
        width: 306px;
    }

    input {
        text-rendering: auto;
        color: initial;
        letter-spacing: normal;
        word-spacing: normal;
        text-transform: none;
        text-indent: 0px;
        text-shadow: none;
        display: inline-block;
        text-align: start;
        margin: 0em;
        font: 400 13.3333px Arial;
        color: #333;
        width: 280px;
        border: 1px solid #cecece;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        padding: 12px;
        margin: 9px 0;
    }
</style>