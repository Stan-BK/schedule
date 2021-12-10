<template>
  <div class="user-controller-container">
    <el-container>
      <el-header>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-button
              @click="addFormShow = true"
              v-if="!!$store.state.user.user_role"
              >注册新用户</el-button
            >
          </el-col>
          <el-col :span="8">
            <span style="opacity: 0">1</span>
          </el-col>
          <el-col :span="4">
            <p>当前用户数量：{{ $store.state.userController.userCount }}</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table :data="userList" height="500" border style="width: 100%">
          <el-table-column prop="user_name" label="用户名" width="180" />
          <el-table-column prop="user_role" label="用户权限" width="180" />
          <el-table-column prop="user_phone" label="联系方式" />
          <el-table-column prop="address" label="地址" />
          <el-table-column label="操作" v-if="!!$store.state.user.user_role">
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="small"
                @click="deleteUser(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <el-dialog title="注册新用户" :visible.sync="addFormShow" width="400px">
      <el-form ref="addForm" :model="addForm" :rules="rules">
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
          required
          prop="user_name"
        >
          <el-input v-model="addForm.user_name" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          required
          prop="user_pwd"
        >
          <el-input
            v-model="addForm.user_pwd"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="确认密码"
          :label-width="formLabelWidth"
          required
          prop="user_confirmpwd"
        >
          <el-input
            v-model="addForm.user_confirmpwd"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="用户权限"
          :label-width="formLabelWidth"
          required
          prop="user_role"
        >
          <el-select v-model="addForm.user_role" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSubmit">取 消</el-button>
        <el-button type="primary" @click="addUser('addForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userList: [],
      addFormShow: false,
      addForm: {
        user_name: "",
        user_pwd: "",
        user_confirmpwd: "",
        user_role: "",
      },
      options: [
        {
          value: "1",
          label: "普通用户",
        },
        {
          value: "2",
          label: "管理员",
        },
      ],
      rules: {
        user_name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        user_pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        user_confirmpwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
        user_role: [
          { required: true, message: "请选择用户权限", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  created() {
    this.initUserInfo();
  },
  methods: {
    initUserInfo() {
      this.$store.dispatch("userController/getUserCount");
      this.$store.dispatch("userController/getUserList").then((response) => {
        this.userList = this.formatArr(response);
      });
    },
    deleteUser(row) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const { user_id } = row;
          const _self = this;
          const params = {
            user_id,
          };
          _self.$store
            .dispatch("userController/deleteUser", params)
            .then(() => {
              _self.$message({
                message: "删除成功",
                type: "success",
              });
              _self.initUserInfo();
            })
            .catch(() => {
              _self.$message({
                message: "删除失败",
                type: "error",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    formatArr(arr) {
      const _self = this;
      var newArr = [];
      newArr = arr.filter((elem) => {
        return (
          !elem.is_delete && elem.user_id !== _self.$store.state.user.user_id
        );
      });
      newArr.forEach((elem) => {
        switch (elem.user_role) {
          case 1:
            elem.user_role = "普通用户";
            break;
          case 2:
            elem.user_role = "管理员";
            break;
          default:
            break;
        }
        for (var i in elem) {
          if (elem[i] == null) {
            elem[i] = "--未填写--";
          }
        }
      });
      return newArr;
    },
    addUser(formName) {
      const _self = this;
      _self.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            user_name: _self.addForm.user_name,
            user_pwd: _self.addForm.user_pwd,
            user_role: _self.addForm.user_role,
          };
          if (_self.addForm.user_pwd !== _self.addForm.user_confirmpwd) {
            _self.$message({
              message: "两次输入密码不一致，请重新输入",
              type: "error",
            });
          } else {
            _self.$store.dispatch("userController/addUser", params).then(() => {
              _self.$message({
                message: "添加成功",
                type: "success",
              });
              _self.clearForm();
              _self.initUserInfo();
            });
            _self.addFormShow = false;
          }
        } else {
          console.log("error submit!!");
        }
      });
    },
    clearForm() {
      this.addForm = {
        user_name: "",
        user_pwd: "",
        user_confirmpwd: "",
        user_role: "",
      };
    },
    cancelSubmit() {
      this.addFormShow = false;
      this.clearForm();
    },
  },
};
</script>
<style scoped>
.user-controller-container {
  padding: 20px;
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.noData {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c0c4cc;
}
</style>
