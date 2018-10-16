<template>
    <div class="table certificate-management">
        <div class="container">
            <div class="handle-box">
                <el-input v-model="username" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-input v-model="tel" placeholder="手机号" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <div style="float: right">
                  <el-button type="primary" @click="_editCerti(null)">新增</el-button>
                  <el-button type="primary" @click="_batchDeleteNews">一键删除</el-button>
                </div>
            </div>
            <el-table tooltip-effect="light" v-loading="loading" :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column align="center" prop="username" fixed label="用户名"></el-table-column>
                <el-table-column align="center" prop="nickname" label="昵称"></el-table-column>
                <el-table-column align="center" prop="inviteCode" label="邀请码"></el-table-column>
                <el-table-column align="center" prop="phone" label="手机号"></el-table-column>
                <el-table-column align="center" prop="lastLoginTime" label="上次登录时间" width="150"></el-table-column>
                <el-table-column align="center" prop="score" label="积分"></el-table-column>
                <el-table-column align="center" prop="level" label="级别"></el-table-column>
                <el-table-column align="center" prop="invitor" label="邀请人"></el-table-column>
                <el-table-column fixed="right" label="操作" width="250">
                    <template slot-scope="scope">
                      <el-button size="small" @click="_editCerti(scope.row)">编辑</el-button>
                      <el-button size="small" type="info" @click="resetPwd(scope.row.id)">重置密码</el-button>
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
              <el-form-item label="昵称">
                <el-input v-model="form.nickname"></el-input>
              </el-form-item>
              <el-form-item label="手机号">
                <el-input v-model="form.phone"></el-input>
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
import { queryOnlineUser, deleteOnlineUser, resetPwdOnlineUser, modifyOnlineUser } from "@/api/service";
export default {
  name: "onlineUserListManagement",
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      username: "",
      tel: "",
      total: 0,
      title: "",
      tableData: [],
      editVisible: false,
      multipleSelection: [],
      loading: false,
      form: {
        id: '',
        username: '',
        nickname: '',
        phone: ''
      }
    };
  },
  created() {
    this.getData();
  },
  computed: {},
  methods: {
    resetPwd(id) {
      this.$confirm("确认是否重置该用户密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const loading = this.$loading({
            lock: true,
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.1)",
            fullscreen: true
          });
          resetPwdOnlineUser(id)
            .then(() => {
              loading.close();
              this.$message({
                message: "密码重置成功",
                type: "success"
              });
            })
            .catch(error => {
              loading.close();
            })
        })
        .catch(() => {});
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
      modifyOnlineUser(this.form)
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
        this.form.nickname = data.nickname
        this.form.phone = data.phone
      } else {
        this.form.id = ''
        this.form.username = ''
        this.form.nickname = ''
        this.form.phone = ''
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
      deleteOnlineUser(id)
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
      queryOnlineUser({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        username: this.name,
        tel: this.id_no
      }).then(res => {
        this.loading = false
        this.tableData.push(...res.list);
        this.total = res.total;
      }).catch(() => {
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
