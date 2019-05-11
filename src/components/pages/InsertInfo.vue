<template>
    <div>
        <el-row>
            <el-col>
                <el-card>
                    <el-upload ref="upload" action="/" :show-file-list="false" :on-change="importExcel"
                        :auto-upload="false">
                        <el-button slot="trigger" icon="el-icon-upload" size="small" type="primary">
                            上传文件
                        </el-button>
                    </el-upload>
                    <div>
                        <el-button @click="submit">sss</el-button>
                    </div>
                    <div>
                        <el-table :data="courses" border style="width: 100%">
                            <el-table-column type="index" label="序号" width="100">
                            </el-table-column>
                            <el-table-column prop="学号" label="课程名称" width="250">
                            </el-table-column>
                            <el-table-column prop="姓名" label="日期">
                            </el-table-column>
                            <el-table-column prop="班级" label="节次">
                            </el-table-column>
                            <el-table-column prop="startTime" label="开始时间">
                            </el-table-column>
                            <el-table-column prop="endTime" label="结束时间">
                            </el-table-column>
                            <el-table-column prop="teacher" label="任课教师" width="120">
                            </el-table-column>
                        </el-table>
                    </div>

                </el-card>
            </el-col>
        </el-row>

    </div>


</template>



<script>
    import bus from '@/components/bus';
    import { Axios } from '@/plugins/AxiosPlugin'
    import XLSX from 'xlsx'
    export default {
        name: 'Header',
        data() {
            return {
                courses:[{
                        "num":"1001",
                        "name":"林佳苗",
                        "classid":"1"
                    }],
                sizeForm: {
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
            // Axios({
            //   method: "get",
            //   url: "/user/info"
            // })
            //   .then(res => {
            //     console.log(res.data)
            //     this.data.userinfo = res.data
            //   })
            //   .catch(err => {
            //     console.log(err)
            //   })
        },
        methods: {
            submit() {
                let data = {
                    list: this.courses
                }
                Axios({
                    method: "post",
                    url: "/class/array",
                    data: this.courses,
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
            },
            importExcel(file) {
                // let file = file.files[0] // 使用传统的input方法需要加上这一步
                const types = file.name.split('.')[1]
                const fileType = ['xlsx', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'csv'].some(item => item === types)
                if (!fileType) {
                    alert('格式错误！请重新选择')
                    return
                }
                this.file2Xce(file).then(tabJson => {
                    if (tabJson && tabJson.length > 0) {
                        this.xlsxJson = tabJson
                        this.courses = tabJson[0].sheet
                        console.log(this.xlsxJson[0].sheet)
                        // xlsxJson就是解析出来的json数据,数据格式如下
                        // [
                        //   {
                        //     sheetName: sheet1
                        //     sheet: sheetData
                        //   }
                        // ]
                    }
                })
            },
            file2Xce(file) {
                return new Promise(function (resolve, reject) {
                    const reader = new FileReader()
                    reader.onload = function (e) {
                        const data = e.target.result
                        this.wb = XLSX.read(data, {
                            type: 'binary'
                        })
                        const result = []
                        this.wb.SheetNames.forEach((sheetName) => {
                            result.push({
                                sheetName: sheetName,
                                sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName])
                            })
                        })
                        resolve(result)
                    }
                    reader.readAsBinaryString(file.raw)
                    // reader.readAsBinaryString(file) // 传统input方法
                })
            }

        }
    };
</script>

<style scoped>
    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>