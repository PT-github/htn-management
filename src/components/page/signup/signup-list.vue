<template>
    <div class="table certificate-management">
        <div class="container">
            <div class="handle-box">
                <el-input v-model="name" placeholder="姓名" class="handle-input mr10"></el-input>
                <el-input v-model="tel" placeholder="手机号" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <div style="float: right">
                  <el-button type="primary" @click="_editCerti(null)">新增</el-button>
                  <el-button type="primary" @click="_batchDeleteNews">一键删除</el-button>
                </div>
            </div>
            <el-table tooltip-effect="light" v-loading="loading" :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column align="center" prop="username" fixed label="姓名"></el-table-column>
                <el-table-column align="center" prop="account" fixed label="账号"></el-table-column>
                <el-table-column align="center" prop="tel" fixed label="手机"></el-table-column>
                <el-table-column align="center" fixed label="状态">
                  <template slot-scope="scope">
                    {{ scope.row.status === 0 ? '无效' : '有效' }}
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="200">
                    <template slot-scope="scope">
                      <template v-if="scope.row.status === 0">
                        <el-button size="small" @click="_modifyStatus(scope.row, 1)">置为有效</el-button>
                      </template>
                      <template v-else>
                        <el-button size="small" type="info" @click="_modifyStatus(scope.row, 0)">置为失效</el-button>
                      </template>
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
        <el-dialog :title="title" :visible.sync="editVisible" width="500px" :close-on-click-modal="false">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="姓名">
                <el-input v-model="form.username"></el-input>
              </el-form-item>
              <el-form-item label="账号">
                <el-input v-model="form.account"></el-input>
              </el-form-item>
              <el-form-item label="手机">
                <el-input v-model="form.tel"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button @click="editVisible = false">取消</el-button>
              </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import { querySignupList, deleteSignupList, modifySignupList } from "@/api/service";
export default {
  name: "signupListManagement",
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      name: "",
      tel: "",
      total: 0,
      title: "",
      tableData: [],
      loading: false,
      editVisible: false,
      multipleSelection: [],
      form: {
        id: '',
        username: '',
        account: '',
        tel: ''
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
    _modifyStatus (data, status) {
      const loading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.1)",
        fullscreen: true
      });
      modifySignupList({id: data.id, status})
        .then((res) => {
          loading.close();
          if (res.success) {
            this.getData()
          }
        })
        .catch(error => {
          loading.close();
        });
    },
    onSubmit() {
      const loading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.1)",
        fullscreen: true
      });
      modifySignupList(this.form)
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
      if (data && data.id) {
        this.form.id = data.id
        this.form.username = data.username
        this.form.account = data.account
        this.form.tel = data.tel
      } else {
        this.form.id = ''
        this.form.username = ''
        this.form.account = ''
        this.form.tel = ''
      }
      this.$nextTick(() => {
        this.editVisible = true
      })
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
      console.log(id)
      const loading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.1)",
        fullscreen: true
      });
      deleteSignupList(id)
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
      querySignupList({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        name: this.name,
        tel: this.id_no
      }).then(res => {
        this.loading = false
        this.tableData.push(...res.list);
        this.total = res.total;
      }).catch(e => {
        this.loading = false
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
<style>
/* .certificate-management .el-table .cell {
  white-space: nowrap;
} */
</style>
