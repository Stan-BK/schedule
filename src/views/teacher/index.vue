<template>
  <div class="teacher-container">
    <el-container>
      <el-header>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-button-group>
              <el-button
                v-if="!!$store.state.user.user_role"
                @click="addFormShow = true"
              >添加教师信息</el-button>
              <el-button @click="queryFormShow = true">查找教师信息</el-button>
              <el-button @click="showAll($event)">显示全部</el-button>
            </el-button-group>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="exportTeacher">导出教师信息</el-button>
          </el-col>
          <el-col :span="8">
            <span style="opacity: 0">1</span>
          </el-col>
          <el-col :span="4">
            <p>当前老师数量：{{ $store.state.teacher.teacherCount }}</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-pagination
          :current-page.sync="curpage"
          :page-size="20"
          layout="prev, pager, next"
          :total="total"
          :hide-on-single-page="isHide"
        />
        <div
          v-for="(item, index) in showList"
          :key="index"
          class="showListcontainer"
        >
          <div v-show="index === curpage - 1">
            <el-table
              :data="item"
              border
              :header-cell-style="{
                textAlign: 'center'
              }"
              :cell-style="{
                textAlign: 'center'
              }"
              :height="isHide ? 500 : 480"
            >
              <el-table-column prop="teacher_id" label="教师id" />
              <el-table-column prop="teacher_name" label="教师名" />
              <el-table-column
                prop="teacher_category"
                label="教师类型"
              />
              <el-table-column
                v-if="!!$store.state.user.user_role"
                label="操作"
              >
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="small"
                    @click="showUpdateForm(scope.row)"
                  >修改</el-button>
                  <el-button
                    type="danger"
                    size="small"
                    @click="deleteTeacher(scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div v-if="showList.length === 0" class="noData">
          <h2>No Data</h2>
        </div>
      </el-main>
    </el-container>
    <el-dialog :close-on-click-modal="false" title="添加教师信息" :visible.sync="addFormShow" width="400px">
      <el-form ref="addForm" :model="addForm" :rules="rules">
        <el-form-item
          label="教师名"
          :label-width="formLabelWidth"
          required
          prop="teacher_name"
        >
          <el-input v-model="addForm.teacher_name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="教师类型" :label-width="formLabelWidth">
          <el-input v-model="addForm.teacher_category" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormShow = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addTeacher('addForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      title="修改教师信息"
      :visible.sync="updateFormShow"
      width="400px"
    >
      <el-form ref="updateForm" :model="updateForm" :rules="rules">
        <el-form-item
          label="教师名"
          :label-width="formLabelWidth"
          required
          prop="teacher_name"
        >
          <el-input v-model="updateForm.teacher_name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="教师类型" :label-width="formLabelWidth">
          <el-input v-model="updateForm.teacher_category" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateFormShow = false">取 消</el-button>
        <el-button
          type="primary"
          @click="updateTeacher('updateForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="查找教师信息" :visible.sync="queryFormShow" width="400px">
      <el-form ref="queryForm" :model="queryForm" :rules="rules">
        <el-form-item
          label="教师名"
          :label-width="formLabelWidth"
          required
          prop="teacher_name"
        >
          <el-input v-model="queryForm.teacher_name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="queryFormShow = false">取 消</el-button>
        <el-button
          type="primary"
          @click="queryTeacher('queryForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      curpage: 1,
      total: 0,
      teacherList: [],
      showList: [],
      value: '',
      input: '',
      isHide: true,
      addFormShow: false,
      addForm: {
        teacher_name: '',
        teacher_category: ''
      },
      updateFormShow: false,
      updateForm: {
        teacher_name: '',
        teacher_category: ''
      },
      updateItem: -1,
      queryFormShow: false,
      queryForm: {
        teacher_name: null
      },
      rules: {
        teacher_name: [
          { required: true, message: '请输入教师名称', trigger: 'blur' }
        ],
        teacher_id: [
          { required: true, message: '请输入教师id', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px'
    }
  },
  created() {
    this.initTeacher()
  },
  methods: {
    initTeacher() {
      this.$store.dispatch('teacher/getTeacherList').then((response) => {
        this.teacherList = response.filter((elem) => {
          return elem.is_delete !== 1
        })
        this.initShowList(this.teacherList)
      })
      this.$store.dispatch('teacher/getTeacherCount')
    },
    addTeacher(formName) {
      const _self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            teacher_name: _self.addForm.teacher_name,
            teacher_category: _self.addForm.teacher_category
          }
          _self.$store
            .dispatch('teacher/addTeacher', params)
            .then(() => {
              _self.$message({
                message: '添加成功',
                type: 'success'
              })
              _self.getTeacher()
            })
            .catch((response) => {
              _self.$message({
                message: response,
                type: 'error'
              })
            })
          _self.addFormShow = false
        }
      })
    },
    deleteTeacher(row) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const _self = this
          const params = {
            teacher_id: row.teacher_id
          }
          _self.$store
            .dispatch('teacher/deleteTeacher', params)
            .then(() => {
              _self.$message({
                message: '删除成功',
                type: 'success'
              })
              _self.getTeacher()
            })
            .catch(() => {
              _self.$message({
                type: 'error',
                message: '删除失败'
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    queryTeacher(formName) {
      const _self = this
      _self.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            teacher_name: _self.queryForm.teacher_name
          }
          _self.$store
            .dispatch('teacher/selectByTeacherName', params)
            .then((response) => {
              const res = []
              res.push(response)
              _self.initShowList(res)
            })
            .catch((response) => {
              _self.$message({
                message: response,
                type: 'error'
              })
            })
          _self.queryFormShow = false
        }
      })
    },
    showUpdateForm(row) {
      this.updateItem = row.teacher_id
      this.updateForm.teacher_name = row.teacher_name
      this.updateFormShow = true
    },
    updateTeacher(formName) {
      const _self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            teacher_id: _self.updateItem,
            teacher_name: _self.updateForm.teacher_name,
            teacher_category: _self.updateForm.teacher_category
          }
          _self.$store.dispatch('teacher/updateTeacher', params).then(() => {
            _self.getTeacher()
            _self.$message({
              message: '修改成功',
              type: 'success'
            })
          })
          _self.updateFormShow = false
        }
      })
    },
    initShowList(content, cb) {
      this.showList = []
      var item = []
      if (!content) {
        this.total = 0
        this.isHide = true
        return
      } else if (
        Object.prototype.toString.call(content) === '[object Object]'
      ) {
        item.push(content)
        this.showList.push(item)
        this.total = item.length
        this.isHide = true
        return
      }
      for (var i = 0; i < content.length; i++) {
        if (i % 20 === 0 && i !== 0) {
          this.showList.push(item)
          item = []
        }
        item.push(content[i])
      }
      if (item.length > 0) {
        this.showList.push(item)
      }
      this.total = content.length
      if (this.total > 0) { this.isHide = false } else { this.isHide = true }
      cb && cb()
    },
    showAll(e) {
      this.paikeStatus = !this.paikeStatus
      if (e.target.nodeName === 'BUTTON') {
        e.target.blur()
      } else {
        e.target.parentNode.blur()
      }
      this.initShowList(this.teacherList, () => {
        this.$message({
          type: 'success',
          message: '已显示全部数据'
        })
      })
    },
    exportTeacher() {
      this.$store.dispatch('teacher/exportTeacher')
    }
  }
}
</script>
<style scoped>
.teacher-container {
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
.centent-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
