<template>
    <div class="table certificate-management">
        <div class="container">
            <div class="handle-box">
                <el-input v-model="name" placeholder="姓名" class="handle-input mr10"></el-input>
                <el-input v-model="id_no" placeholder="身份证" class="handle-input mr10"></el-input>
                <el-input v-model="cert_no" placeholder="证书编号" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <div style="float: right">
                  <el-button type="primary" @click="_editCerti(null)">新增</el-button>
                  <el-button type="primary" @click="_batchDeleteNews">一键删除</el-button>
                </div>
            </div>
            <el-table tooltip-effect="light" :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column align="center" prop="username" fixed label="姓名"></el-table-column>
                <el-table-column align="center" prop="sex" label="性别" width="50"></el-table-column>
                <el-table-column align="center" label="头像" width="100">
                  <template slot-scope="scope">
                    <img :src="scope.row.imgUrl" alt="" width="40" height="52">
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="certId" label="身份证" width="180"></el-table-column>
                <el-table-column align="center" prop="birth" label="生日" width="120"></el-table-column>
                <el-table-column align="center" prop="cerType" label="证书类型" width="180"></el-table-column>
                <el-table-column align="center" prop="cerName" label="岗位名称" width="180"></el-table-column>
                <el-table-column align="center" prop="cerNo" label="证书编号" width="200"></el-table-column>
                <el-table-column align="center" prop="cerLevel" label="级别" width="80"></el-table-column>
                <el-table-column align="center" prop="cerReport" label="成绩" width="80"></el-table-column>
                <el-table-column align="center" prop="education" label="文化程度" width="80"></el-table-column>
                <el-table-column align="center" prop="getCerTime" label="获证时间" width="120"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="issuingAgency" label="发证机构" width="300"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="remark" label="备注说明" width="300"></el-table-column>
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
                <el-input v-model="form.username"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-select v-model="form.sex" placeholder="请选择性别">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="头像">
                <el-upload
                  class="upload-demo"
                  action="/upload"
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
              <el-form-item label="身份证">
                <el-input v-model="form.certId"></el-input>
              </el-form-item>
              <el-form-item label="生日">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.birth" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="证书类型">
                <el-input v-model="form.cerType"></el-input>
              </el-form-item>
              <el-form-item label="岗位名称">
                <el-input v-model="form.cerName"></el-input>
              </el-form-item>
              <el-form-item label="证书编号">
                <el-input v-model="form.cerNo"></el-input>
              </el-form-item>
              <el-form-item label="级别">
                <el-input v-model="form.cerLevel"></el-input>
              </el-form-item>
              <el-form-item label="成绩">
                <el-input v-model="form.cerReport"></el-input>
              </el-form-item>
              <el-form-item label="文化程度">
                <el-input v-model="form.education"></el-input>
              </el-form-item>
              <el-form-item label="获证时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.getCerTime" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="发证机构">
                <el-input v-model="form.issuingAgency"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" v-model="form.remark"></el-input>
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
import { queryCertificate, deleteCert, modifyCert } from "@/api/service";
export default {
  name: "certificateManagement",
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      name: "",
      id_no: "",
      cert_no: "",
      total: 0,
      title: "",
      tableData: [],
      editVisible: false,
      fileList: [],
      multipleSelection: [],
      dialogVisible: false,
      dialogImageUrl: '',
      form: {
        id: "",
        username: "",
        sex: "",
        certId: "",
        birth: "",
        imgUrl: "",
        cerType: "",
        cerName: "",
        cerNo: "",
        cerLevel: "",
        cerReport: "",
        education: "",
        getCerTime: "",
        issuingAgency: "",
        remark: ""
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
      modifyCert(this.form)
        .then((res) => {
          loading.close();
          if (res.success) {
            this.$message({
              message: "修改成功",
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
      for (let prop in this.form) {
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
      deleteCert(id)
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
      queryCertificate({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        name: this.name,
        id_no: this.id_no,
        cert_no: this.cert_no
      }).then(res => {
        this.tableData = res.list;
        this.total = res.total;
      });
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
<style>
/* .certificate-management .el-table .cell {
  white-space: nowrap;
} */
</style>




