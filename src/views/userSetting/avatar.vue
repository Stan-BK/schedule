<template>
  <div class="avatar">
    <input ref="file" type="file" class="file" @change="chooseAvatar">
    <div :class="src ? 'wrap' : 'shadow'" @click="triggerFile">
      <img v-if="src" :src="src" alt="">
    </div>
  </div>
</template>
<script>
export default {
  name: 'MyAvatar',
  data() {
    return {
      src: ''
    }
  },
  methods: {
    triggerFile() {
      this.$refs.file.click()
    },
    chooseAvatar() {
      var file = this.$refs.file.files[0]
      var _self = this

      transformImg()
      function transformImg() {
        var imgType = /^image\//
        if (imgType.test(file.type)) {
          var reader = new FileReader()
          reader.onload = function(e) {
            _self.src = e.target.result
          }
          // 读取文件内容，返回Base64字符串
          reader.readAsDataURL(file)
          _self.$emit('upload', file)
        } else {
          _self.src = ''
          _self.$message('只支持上传图片类型')
        }
      }
    }
  }
}
</script>
<style scoped>
.avatar {
  width: 100px !important;
  height: 100px !important;
}
.wrap {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;
  padding: 2px;
  border: 1px dashed #d9d9d9;
  vertical-align: text-bottom;
}
.wrap img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.shadow {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;
  padding: 2px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  transition: border-color 0.5s;
  vertical-align: text-bottom;
}
.shadow::before {
  position: absolute;
  content: "选择图片";
  font-size: 10px;
  display: block;
  width: 50px;
  height: 30px;
  left: 25px;
  top: 35px;
  line-height: 30px;
  color: #d9d9d9;
  transition: color 0.5s;
}
.shadow:hover {
  border-color: #807d7d;
}
.shadow:hover::before {
  color: #807d7d;
}
.file {
  position: absolute;
  z-index: -1;
  display: inline-block;
  width: 100px;
  height: 100px;
  opacity: 0;
}
</style>
