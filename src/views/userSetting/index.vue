<template>
  <div class="user-setting-container">
    <el-form :model="form" class="demo-form-inline" label-position="top">
      <el-form-item label="用户名">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-input
              v-model="form.user_name"
              placeholder="username"
              disabled
            ></el-input
          ></el-col>
          <el-col :span="4">
            <el-button @click="changeUserName">修改用户名</el-button>
          </el-col></el-row
        >
      </el-form-item>
      <el-form-item label="联系电话">
        <el-select v-model="form.user_phone" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="头像">
        <my-avatar @upload="uploadImg"></my-avatar>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import MyAvatar from "./avatar.vue";

export default {
  components: {
    MyAvatar,
  },
  data() {
    return {
      form: {},
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.dispatch("userSetting/getInfo").then((data) => {
        vm.form = data;
      });
    });
  },
  methods: {
    uploadImg(data) {
      var formdata = new FormData();
      formdata.append("pictureFile", data);
      this.$store.dispatch("userSetting/updateInfo", formdata).then((data) => {
        this.$message({
          type: "success",
          message: data
        });
        this.$store.dispatch("user/getInfo");
      });
    },
    changeUserName() {
      this.$prompt("请输入用户名", "修改用户名", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          var formdata = new FormData();
          formdata.append("user_name", value);
          this.$store
            .dispatch("userSetting/changeUserName", formdata)
            .then((data) => {
              this.$message({
                type: "success",
                message: data,
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
  },
};
</script>
<style scoped>
.user-setting-container {
  padding: 20px;
}
.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>