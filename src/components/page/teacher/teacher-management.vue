<template>
    <div class="table certificate-management">
        <div class="container">
            <div class="handle-box">
                <el-input v-model="name" placeholder="姓名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <div style="float: right">
                  <el-button type="primary" @click="_editCerti(null)">新增</el-button>
                  <el-button type="primary" @click="_batchDeleteNews">一键删除</el-button>
                </div>
            </div>
            <el-table tooltip-effect="light" v-loading="loading" :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column align="center" prop="name" fixed label="姓名" width="100"></el-table-column>
                <el-table-column align="center" prop="subject" label="学科" width="100"></el-table-column>
                <el-table-column align="center" label="头像" width="100">
                  <template slot-scope="scope">
                    <img :src="scope.row.imgUrl" alt="" width="65" height="60">
                  </template>
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="detail" label="描述"></el-table-column>
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
              <el-form-item label="姓名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="学科">
                <el-input v-model="form.subject"></el-input>
              </el-form-item>
              <el-form-item label="头像">
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
              <el-form-item label="描述">
                <el-input type="textarea" v-model="form.detail"></el-input>
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
import { queryTeacher, deleteTeacher, modifyTeacher } from "@/api/service";
export default {
  name: "teacherManagement",
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      name: "",
      total: 0,
      title: "",
      tableData: [],
      editVisible: false,
      fileList: [],
      multipleSelection: [],
      loading: false,
      dialogVisible: false,
      dialogImageUrl: '',
      form: {
        id: "",
        name: "",
        imgUrl: "",
        subject: "",
        detail: ""
      }
    };
  },
  created() {
    this.getData();
  },
  computed: {},
  methods: {
    _confirmDelete(id) {
      this.$confirm("确认是否删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this._deleteNews(id);
        })
        .catch(() => {});
    },
    onSubmit() {
      const loading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.1)",
        fullscreen: true
      });
      modifyTeacher(this.form)
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
      if (data) {
        this.fileList.push({
          name: '头像',
          url: data.imgUrl
        })
      }
      data = data || {}
      if (data.id) {
        this.title = data.name + '-修改'
      } else {
        this.title = '教师新增'
      }
      this.form.id = ''
      for (let prop in data) {
        this.$set(this.form, prop, data[prop] || '')
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
    uploadSuccess(response, file, fileList) {
      this.form.imgUrl = response.data.url;
      this.fileList.splice(0, this.fileList.length);
      this.fileList.push({
        name: file.name,
        url: response.data.url
      });
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove() {},
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
      deleteTeacher(id)
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
    getData() {
      this.loading = true
      this.tableData.splice(0, this.tableData.length)
      queryTeacher({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        name: this.name,
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
</style>