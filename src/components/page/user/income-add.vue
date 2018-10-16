<template>
  <div class="income-add">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" disabled placeholder="请选择用户">
          <el-button slot="append" icon="el-icon-search" @click="showUserDialog(0)"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="上级用户">
        <el-input v-model="form.parentUsername" disabled placeholder="请选择上级用户">
          <el-button slot="append" icon="el-icon-search" @click="showUserDialog(1)"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="收益">
        <el-input v-model="form.income"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="请选择用户" :visible.sync="editVisible" width="800px" :close-on-click-modal="false">
        <div class="handle-box" style="margin-bottom: 20px;">
            <el-input v-model="username" placeholder="名称" class="handle-input mr10" style="width: 200px;"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table tooltip-effect="light" v-loading="loading" :data="tableData" border style="width: 100%" ref="multipleTable">
            <el-table-column align="center" prop="name" fixed label="用户名"></el-table-column>
            <el-table-column align="center" prop="level" label="级别"></el-table-column>
            <el-table-column align="center" prop="contact" label="手机号"></el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button size="small" @click="selectUser(scope.row)">选择</el-button>
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
    </el-dialog>
  </div>
</template>
<script>
import { queryEmployeeUser, addIncome } from "@/api/service";
export default {
  name: 'incomeAdd',
  data () {
    return {
      pageNo: 1,
      pageSize: 10,
      username: "",
      total: 0,
      loading: false,
      tableData: [],
      editVisible: false,
      active: 0,
      loading: false,
      form: {
        userId: '',
        username: '',
        parentUserId: '',
        parentUsername: '',
        income:''
      }
    }
  },
  methods: {
    showUserDialog (v) {
      this.tableData.length === 0 && this.getData()
      this.active = v
      this.editVisible = true
    },
    selectUser (data) {
      if (this.active === 0) {
        this.form.userId = data.id
        this.form.username = data.name
      } else {
        this.form.parentUserId = data.id
        this.form.parentUsername = data.name
      }
      this.editVisible = false
    },
    onSubmit () {
      const loading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.1)",
        fullscreen: true
      });
      addIncome(this.form)
        .then(() => {
          loading.close();
          this.$message({
            message: "收益新增成功",
            type: "success"
          });
          this.form.userId = ''
          this.form.username = ''
          this.form.parentUserId = ''
          this.form.parentUsername = ''
          this.form.income = ''
        })
        .catch(error => {
          loading.close();
        });
    },
    getData() {
      this.loading = true
      this.tableData.splice(0, this.tableData.length)
      queryEmployeeUser({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        username: this.name
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
  }
}
</script>
<style lang="scss" scoped>
.income-add {
  padding: 30px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid #ddd;
  background-color: #FFF;
  border-radius: 5px;
}
</style>

