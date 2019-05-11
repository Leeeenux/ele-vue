<template>
    <div>
        <el-row>
            <el-col>
                <el-card>
                    <el-row>
                        <el-select v-model="noticeInfo.classId" placeholder="请选择班级">
                            <el-option label="15软件1班" value="101"></el-option>
                            <el-option label="15软件2班" value="102"></el-option>
                            <el-option label="15软件3班" value="103"></el-option>
                            <el-option label="15软件4班" value="104"></el-option>
                        </el-select>
                        <el-button style="margin-left:20px;" icon="el-icon-upload2" type="success">批量导入</el-button>
                    </el-row>
                    <el-row style="margin-top:20px;">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column prop="date" label="序号" width="80">
                            </el-table-column>
                            <el-table-column prop="date" label="学号" width="180">
                            </el-table-column>
                            <el-table-column prop="name" label="姓名" width="180">
                            </el-table-column>
                            <el-table-column prop="address" label="班级">
                            </el-table-column>
                            <el-table-column prop="address" label="职务">
                            </el-table-column>
                            <el-table-column label="操作" width="120">
                                <template slot-scope="scope">
                                    <el-button @click="handleClick(scope.row)" icon="el-icon-search" type="text" size="small">查看</el-button>
                                    <el-button icon="el-icon-edit" type="text" size="small">编辑</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                    <el-row style="margin-top:20px;">
                        <el-button icon="el-icon-download" type="primary">导出本班级</el-button>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        <el-row style="text-align: center;">
            <div style="margin-top:20px;">
                <el-pagination background layout="prev, pager, next" :total="100">
                </el-pagination>
            </div>
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
                noticeInfo: {
                    title: '',
                    content: '',
                    type: '',
                    classId: ''
                },
                tableData: [{
                    date: '1',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1517 弄',
                    zip: 200333
                }, {
                    date: '3',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1519 弄',
                    zip: 200333
                }, {
                    date: '4',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1516 弄',
                    zip: 200333
                }]
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
            handleClick(num){
                console.log(num)
            },
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