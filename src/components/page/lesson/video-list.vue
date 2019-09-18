<template>
    <div class="table certificate-management">
        <div class="container">
            <div class="handle-box">
                <el-input v-model="name" placeholder="视频名称" class="handle-input mr10"></el-input>
                <el-select v-model="cate" clearable placeholder="请选择视频分类">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <div style="float: right">
                    <el-button type="primary" @click="_editCerti(null)">新增</el-button>
                    <el-button type="primary" @click="_batchDeleteNews">一键删除</el-button>
                </div>
            </div>
            <el-table tooltip-effect="light" v-loading="loading" :data="tableData" border style="width: 100%"
                      ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column align="center" prop="name" fixed label="视频名称" width="150"></el-table-column>
                <el-table-column align="center" label="视频分类" width="150">
                    <template slot-scope="scope">
                        <span>{{ optionsObj[scope.row.cate] }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="封面图" width="100">
                    <template slot-scope="scope">
                        <img :src="scope.row.imgUrl" alt="" width="65" height="60">
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="videoUrl" label="视频地址" width="300"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="detail" label="视频简介"></el-table-column>
                <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button size="small" @click="_editCerti(scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="_confirmDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNo"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="title" :visible.sync="editVisible" width="90%" :close-on-click-modal="false">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="视频名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="视频分类">
                    <el-select v-model="form.cate" clearable placeholder="请选择视频分类">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.name"
                            :value="item.id + ''">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="视频类型">
                    <el-select v-model="form.type" placeholder="请选择">
                        <el-option label="普通视频" value="1"></el-option>
                        <el-option label="学员视频" value="2"></el-option>
                        <el-option label="VIP视频" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="封面图">
                    <el-upload
                        class="upload-demo"
                        action="http://www.hnjkrcw.com/admin/upload"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-success="uploadSuccess"
                        :before-upload="beforeUpload"
                        :file-list="fileList"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="视频地址">
                    <div class="video-src">
                        <el-input v-model="form.videoUrl" style="flex: 1;margin-right: 20px;"></el-input>
                        <el-upload style="width: 80px;"
                                   class="upload-demo"
                                   action="http://www.hnjkrcw.com/admin/upload"
                                   :show-file-list="false"
                                   :on-success="uploadVideoSuccess"
                                   :before-upload="beforeVideoUpload"
                                   list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item label="视频简介">
                    <el-input type="textarea" v-model="form.detail"></el-input>
                </el-form-item>
                <el-form-item label="首页推荐">
                    <el-switch
                        v-model="form.homeFlag"
                        active-text="推荐"
                        inactive-text="不推荐">
                    </el-switch>
                </el-form-item>
                <el-form-item label="优先级">
                    <el-input v-model="form.priority" placeholder="越大越优先(默认100)"></el-input>
                </el-form-item>
                <el-form-item label="观看次数">
                    <el-input v-model="form.clickCount" placeholder="观看次数"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                    <el-button @click="editVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisible" append-to-body>
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>
    import {queryVideoCate, queryVideoList, deleteVideo, modifyVideo} from "@/api/service";
    export default {
        name: "videoListManagement",
        data() {
            return {
                options: [],
                pageNo: 1,
                pageSize: 10,
                name: "",
                cate: "",
                total: 0,
                title: "",
                tableData: [],
                editVisible: false,
                dialogVisible: false,
                dialogImageUrl: '',
                fileList: [],
                multipleSelection: [],
                loading: false,
                form: {
                    id: "",
                    name: "",
                    cate: "",
                    type: "1",
                    priority: "100",
                    clickCount: "0",
                    homeFlag: false,
                    imgUrl: "",
                    videoUrl: "",
                    detail: ""
                }
            };
        },
        created() {
            this.getCateData()
            this.getData();
        },
        computed: {
            optionsObj () {
                let obj = {}
                if (this.options.length > 0) {
                    this.options.forEach(item => {
                        obj[item.id] = item.name
                    })
                }
                return obj
            }
        },
        methods: {
            modifySuccess (id) {
                this.editVisible = false
                id && this.getData()
            },
            _confirmDelete(id) {
                this.$confirm("确认是否删除, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this._deleteNews(id);
                    })
                    .catch(() => {
                    });
            },
            onSubmit() {
                const loading = this.$loading({
                    lock: true,
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.1)",
                    fullscreen: true
                });
                modifyVideo(this.form)
                    .then((res) => {
                        loading.close();
                        if (res.success) {
                            this.$message({
                                message: (this.form.id ? '修改' : '新增') + "成功",
                                type: "success"
                            });
                            this.getData();
                            this.$nextTick(() => {
                                this.editVisible = false
                            })
                        }
                    })
                    .catch(error => {
                        loading.close();
                    });
            },
            _editCerti(data) {
                this.fileList.splice(0, this.fileList.length)
                if (data && data.id) {
                    this.title = data.name + '-修改'
                    for (let prop in data) {
                        this.$set(this.form, prop, data[prop] || '')
                    }
                    if (this.form.imgUrl) {
                        this.fileList.push({
                            name: '封面图',
                            url: this.form.imgUrl
                        })
                    }
                } else {
                    this.title = '视频新增'
                    for (let prop in this.form) {
                        this.$set(this.form, prop, '')
                    }
                }
                this.$nextTick(() => {
                    this.editVisible = true
                })
            },
            beforeUpload(file) {
                const isJPG = file.type.indexOf("image") !== -1; //=== "image/jpeg" || ;
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error("上传头像图片只能是 JPG 格式!");
                    return false;
                }
                if (!isLt2M) {
                    this.$message.error("上传头像图片大小不能超过 2MB!");
                    return false;
                }
                return isJPG && isLt2M;
            },
            beforeVideoUpload(file) {
                console.log(file)
                var regx = /(mp4|3gp)$/
                if (regx.test(file.name)) {
                    return true
                } else {
                    this.$message.error("上传视频只能是 MP4/3GP 格式!");
                    return false
                }
            },
            uploadSuccess(response, file, fileList) {
                this.form.imgUrl = response.data.url;
                this.fileList.splice(0, this.fileList.length);
                this.fileList.push({
                    name: file.name,
                    url: response.data.url
                });
            },
            uploadVideoSuccess(response, file, fileList) {
                this.form.videoUrl = response.data.url;
            },
            handlePreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleRemove() {
            },
            _batchDeleteNews() {
                if (this.multipleSelection.length > 0) {
                    let ids = [];
                    this.multipleSelection.forEach(item => {
                        ids.push(item.id);
                    });
                    this._deleteNews(ids.join(","));
                } else {
                    this.$message({
                        message: "请至少选择一项",
                        type: "warning"
                    });
                }
            },
            _deleteNews(id) {
                const loading = this.$loading({
                    lock: true,
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.1)",
                    fullscreen: true
                });
                deleteVideo(id)
                    .then(() => {
                        loading.close();
                        this.$message({
                            message: "删除成功",
                            type: "success"
                        });
                        this.getData();
                    })
                    .catch(error => {
                        loading.close();
                    });
            },
            getCateData() {
                queryVideoCate().then(res => {
                    if (res.list && res.list.length > 0) {
                        this.options.push(...res.list)
                    }
                }).catch(e => {
                    console.log(e)
                })
            },
            getData() {
                this.loading = true
                this.tableData.splice(0, this.tableData.length)
                queryVideoList({
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                    name: this.name,
                    cate: this.cate
                }).then(res => {
                    this.loading = false
                    if (res.list && res.list.length > 0) {
                        this.tableData.push(...res.list)
                        this.total = res.total;
                    }
                }).catch(e => {
                    this.loading = false
                    console.log(e)
                })
            },
            search() {
                this.pageNo = 1;
                this.getData();
            },
            // 分页导航
            handleCurrentChange(val) {
                this.pageNo = val;
                this.getData();
            },
            // 分页导航
            handleSizeChange(val) {
                this.pageNo = 1;
                this.pageSize = val;
                this.getData();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    };
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 200px;
        display: inline-block;
    }

    .del-dialog-cnt {
        font-size: 16px;
        text-align: center;
    }

    .video-src {
        display: flex;
        align-items: baseline;
    }
</style>
