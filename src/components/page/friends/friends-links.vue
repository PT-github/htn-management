<template>
    <div class="table certificate-management">
        <div class="container">
            <div class="handle-box">
                <el-input v-model="name" placeholder="链接名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="getData">搜索</el-button>
                <div style="float: right">
                  <el-button type="primary" @click="_editCerti(null)">新增</el-button>
                </div>
            </div>
            <el-table tooltip-effect="light" v-loading="loading" :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column align="center" prop="name" fixed label="链接名称"></el-table-column>
                <el-table-column align="center" prop="url" fixed label="链接地址"></el-table-column>
                <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button size="small" @click="_editCerti(scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="_confirmDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog :title="title" :visible.sync="editVisible" width="90%" :close-on-click-modal="false">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="地址">
                <el-input v-model="form.url"></el-input>
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
import { queryFriendsLinks, modifyFriendLinks, deleteFriendLinks } from "@/api/service";
export default {
  name: "friendsLinksManagement",
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
      fileList: [],
      multipleSelection: [],
      loading: false,
      form: {
        id: "",
        name: "",
        url: ""
      }
    };
  },
  created() {
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
      modifyFriendLinks(this.form)
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
      if (data && data.id) {
        this.title = data.name + '-修改'
        this.form.id = data.id
        this.form.name = data.name
        this.form.url = data.url
      } else {
        this.form.id = ''
        this.form.name = ''
        this.form.url = ''
        this.title = '课程新增'
      }
      this.$nextTick(() => {
        this.editVisible = true
      })
    },
    _deleteNews(id) {
      const loading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.1)",
        fullscreen: true
      });
      deleteFriendLinks(id)
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
      queryFriendsLinks({
        name: this.name
      }).then(res => {
        this.loading = false
        if (res.list && res.list.length > 0) {
          this.tableData.push(...res.list)
        }
      }).catch(e => {
        this.loading = false
        console.log(e)
      })
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