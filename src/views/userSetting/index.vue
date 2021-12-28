<template>
  <div class="user-setting-container">
    <el-form :model="form" class="demo-form-inline" label-position="top">
      <el-form-item label="头像">
        <my-avatar @upload="uploadImg" />
      </el-form-item>
      <el-form-item label="用户名">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-input
              v-model="form.user_name"
              placeholder="username"
              disabled
            />
          </el-col>
          <el-col :span="4">
            <el-button @click="updateInfo('user_name')">修改用户名</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-row :gutter="20">
          <el-col :span="5">
            <el-input
              v-model="form.user_phone"
              placeholder="user_phone"
              disabled
            />
          </el-col>
          <el-col :span="4">
            <el-button @click="updateInfo('user_phone')">修改联系方式</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="地址">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input
              v-model="form.address"
              placeholder="address"
              disabled
            />
          </el-col>
          <el-col :span="4">
            <el-button @click="updateInfo('address')">修改地址</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="密码">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-input
              v-model="form.user_pwd"
              placeholder="user_pwd"
              disabled
              :type="'password'"
            />
          </el-col>
          <el-col :span="4">
            <el-button type="warning" @click="pwdVisible = true">修改密码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <el-dialog :close-on-click-modal="false" title="修改密码" :visible.sync="pwdVisible" width="400px">
      <el-form ref="pwd" :model="form" :rules="rules">
        <el-form-item label="密码" :label-width="formLabelWidth" prop="user_pwd">
          <el-input
            v-model="form.user_pwd"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="updatePwd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import MyAvatar from './avatar.vue'

export default {
  components: {
    MyAvatar
  },
  data() {
    return {
      form: {},
      options: {
        'user_name': '用户名',
        'user_phone': '联系方式',
        'address': '地址'
      },
      pwdVisible: false,
      rules: {
        user_pwd: [
          { required: true, trigger: 'blur', message: '请输入密码' }
        ]
      }
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     vm.$store.dispatch('userSetting/getInfo').then((data) => {
  //       vm.form = data
  //     })
  //   })
  // },
  created() {
    this.$store.dispatch('userSetting/getInfo').then((data) => {
      this.form = data
    })
  },
  methods: {
    uploadImg(data) {
      var formdata = new FormData()
      formdata.append('pictureFile', data)
      this.$store.dispatch('userSetting/updateAvatar', formdata).then((data) => {
        this.$message({
          type: 'success',
          message: data
        })
        this.$store.dispatch('user/getInfo')
      })
    },
    updateInfo(updateInfo) {
      const updateKey = this.options[updateInfo]
      this.$prompt(`请输入${updateKey}`, `修改${updateKey}`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /.+/,
        inputErrorMessage: `${updateKey}不能为空`
      })
        .then(({ value }) => {
          var formdata = new FormData()
          formdata.append(updateInfo, value)
          this.$store
            .dispatch('userSetting/updateInfo', formdata)
            .then((data) => {
              this.$message({
                type: 'success',
                message: data
              })
              this.$store.dispatch('user/getInfo').then((data) => {
                this.form = data
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          })
        })
    },
    updatePwd() {
      this.$refs['pwd'].validate((valid) => {
        if (valid) {
          this.$confirm('确认修改密码?', '修改密码', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(({ value }) => {
              var formdata = new FormData()
              formdata.append('user_pwd', value)
              this.$store
                .dispatch('userSetting/updateInfo', formdata)
                .then((data) => {
                  this.$message({
                    type: 'success',
                    message: data
                  })
                })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '取消修改'
              })
            })
        }
      })
    },
    cancelForm() {
      this.pwdVisible = false
      this.form.user_pwd = ''
    }
  }
}
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
