<template>
  <div class="classroom-container">
    <el-container>
      <el-header>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-button-group>
              <el-button
                v-if="!!$store.state.user.user_role"
                @click="addFormShow = true"
              >添加新教室</el-button>
              <el-button @click="queryFormShow = true">查找教室信息</el-button>
              <el-button
                @click="showAll($event)"
              >显示全部</el-button>
            </el-button-group>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="exportClassroom">导出教室信息</el-button>
          </el-col>
          <el-col v-if="!!$store.state.user.user_role" :span="2">
            <el-tooltip
              v-if="disabledDelete === false"
              class="item"
              effect="dark"
              content="勾选多项以删除"
              placement="top-start"
            >
              <div>
                <el-button type="danger" plain disabled>删除多项</el-button>
              </div>
            </el-tooltip>
            <el-button
              v-else
              type="danger"
              @click="deleteClassroomList"
            >删除多项</el-button>
          </el-col>
          <el-col :span="6">
            <span style="opacity: 0">1</span>
          </el-col>
          <el-col :span="4">
            <p>当前教室数量：{{ $store.state.classroom.classroomCount }}</p>
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
              :header-cell-style="{
                textAlign: 'center'
              }"
              :cell-style="{
                textAlign: 'center'
              }"
              :height="isHide ? 500 : 480"
              border
              @selection-change="classroomListChange"
            >
              <el-table-column
                prop="classroom_name"
                label="教室名"
              />
              <el-table-column
                prop="classroom_address"
                label="教室地点"
              />
              <el-table-column
                prop="classroom_count"
                label="教室人数"
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
                    @click="deleteClassroom(scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
              <el-table-column v-if="!!$store.state.user.user_role" type="selection" label="全选" width="55" />
            </el-table>
          </div>
        </div>
        <div v-if="showList.length === 0" class="noData">
          <h2>No Data</h2>
        </div>
      </el-main>
    </el-container>
    <el-dialog :close-on-click-modal="false" title="添加新教室" :visible.sync="addFormShow" width="400px">
      <el-form ref="addForm" :model="addForm" :rules="rules">
        <el-form-item
          label="教室名"
          :label-width="formLabelWidth"
          required
          prop="classroom_name"
        >
          <el-input v-model="addForm.classroom_name" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="教室人数"
          :label-width="formLabelWidth"
          required
          prop="classroom_count"
        >
          <el-input v-model="addForm.classroom_count" tautocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSubmit">取 消</el-button>
        <el-button
          type="primary"
          @click="addClassroom('addForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      title="修改教室信息"
      :visible.sync="updateFormShow"
      width="400px"
    >
      <el-form ref="updateForm" :model="updateForm" :rules="rules">
        <el-form-item
          label="教室名"
          :label-width="formLabelWidth"
          required
          prop="classroom_name"
        >
          <el-input v-model="updateForm.classroom_name" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="教室人数"
          :label-width="formLabelWidth"
          required
          prop="classroom_count"
        >
          <el-input v-model="updateForm.classroom_count" tautocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSubmit">取 消</el-button>
        <el-button
          type="primary"
          @click="updateClassroom('updateForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="查找教室" :visible.sync="queryFormShow" width="400px">
      <el-form ref="queryForm" :model="queryForm" :rules="rules">
        <el-form-item
          label="教室地点"
          :label-width="formLabelWidth"
          required
          prop="classroom_address"
        >
          <el-input v-model="queryForm.classroom_address" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSubmit">取 消</el-button>
        <el-button
          type="primary"
          @click="selectByClassroomAddress('queryForm')"
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
      isHide: true,
      classroomList: [],
      deleteArr: [],
      showList: [],
      addFormShow: false,
      updateFormShow: false,
      queryFormShow: false,
      disabledDelete: false,
      updateItem: -1,
      addForm: {
        classroom_count: '',
        classroom_name: ''
      },
      updateForm: {
        classroom_count: '',
        classroom_name: ''
      },
      queryForm: {
        classroom_address: ''
      },
      rules: {
        classroom_id: [
          { required: true, message: '请输入教师id', trigger: 'blur' }
        ],
        classroom_count: [
          { required: true, message: '请输入教室人数', trigger: 'blur' }
        ],
        classroom_name: [
          { required: true, message: '请输入教室名', trigger: 'blur' }
        ],
        classroom_address: [
          { required: true, message: '请输入教室地点', trigger: 'blur' }
        ]
      },
      options: [
        {
          value: 0,
          label: '空闲'
        },
        {
          value: 1,
          label: '已借用'
        }
      ],
      formLabelWidth: '120px'
    }
  },
  watch: {
    deleteArr(newValue) {
      if (newValue.length) {
        this.disabledDelete = true
      } else {
        this.disabledDelete = false
      }
    }
  },
  created() {
    this.initClassroomInfo()
  },
  methods: {
    initClassroomInfo() {
      this.$store.dispatch('classroom/getClassroomCount')
      this.$store.dispatch('classroom/getClassroomList').then((response) => {
        this.classroomList = this.formatArr(response)
        this.initShowList(this.classroomList)
      })
    },
    deleteClassroom(row) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const { classroom_id } = row
          const _self = this
          const params = {
            classroom_id
          }
          _self.$store
            .dispatch('classroom/deleteClassroom', params)
            .then(() => {
              _self.$message({
                message: '删除成功',
                type: 'success'
              })
              _self.initClassroomInfo()
            })
            .catch(() => {
              _self.$message({
                message: '删除失败',
                type: 'error'
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
    deleteClassroomList() {
      const _self = this
      const arr = _self.deleteArr.reduce((prev, item) => {
        prev.push(item.classroom_id)
        return prev
      }, [])
      console.log(arr)
      this.$confirm('确认删除多项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = {
            arr: arr
          }
          this.$store
            .dispatch('classroom/deleteClassroomList', params)
            .then(() => {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
            })
            .catch(() => {
              this.$message({
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
    formatArr(arr) {
      const _self = this
      var newArr = []
      newArr = arr.filter((elem) => {
        return (
          !elem.is_delete && elem.user_id !== _self.$store.state.user.user_id
        )
      })
      newArr.forEach((elem) => {
        switch (elem.classroom_status) {
          case 0:
            elem.classroom_status = '空闲'
            break
          case 1:
            elem.classroom_status = '已借用'
            break
          default:
            break
        }
        for (var i in elem) {
          if (elem[i] == null) {
            elem[i] = '未填写'
          }
        }
      })
      return newArr
    },
    addClassroom(formName) {
      const _self = this
      _self.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            classroom_name: _self.addForm.classroom_name,
            classroom_count: _self.addForm.classroom_count,
            classroom_status: _self.addForm.classroom_status
          }
          _self.$store
            .dispatch('classroom/addClassroom', params)
            .then(() => {
              _self.$message({
                message: '添加成功',
                type: 'success'
              })
              _self.clearForm()
              _self.initClassroomInfo()
            })
            .catch(() => {
              _self.$message({
                message: '添加失败',
                type: 'error'
              })
            })
          _self.addFormShow = false
        } else {
          console.log('error submit!!')
        }
      })
    },
    updateClassroom(formName) {
      const _self = this
      _self.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            classroom_id: _self.updateItem,
            classroom_name: _self.updateForm.classroom_name,
            classroom_count: _self.updateForm.classroom_count,
            classroom_status: _self.updateForm.classroom_status
          }
          _self.$store
            .dispatch('classroom/updateClassroom', params)
            .then(() => {
              _self.$message({
                message: '修改成功',
                type: 'success'
              })
              _self.clearForm()
              _self.initClassroomInfo()
            })
            .catch(() => {
              _self.$message({
                message: '修改失败',
                type: 'error'
              })
            })
          _self.updateFormShow = false
        } else {
          console.log('error submit!!')
        }
      })
    },
    selectByClassroomAddress(formName) {
      const _self = this
      _self.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            classroom_address: _self.queryForm.classroom_address
          }
          _self.$store
            .dispatch('classroom/selectByClassroomAddress', params)
            .then((response) => {
              var newArr = []
              newArr.push(response)
              _self.initShowList(this.formatArr(newArr))
              _self.$message({
                message: '查找成功',
                type: 'success'
              })
              _self.queryFormShow = false
            })
          _self.updateFormShow = false
        } else {
          console.log('error submit!!')
        }
      })
    },
    clearForm() {
      this.addForm = {
        classroom_count: '',
        classroom_name: '',
        classroom_status: ''
      }
      this.updateForm = {
        classroom_count: '',
        classroom_name: '',
        classroom_status: ''
      }
    },
    cancelSubmit() {
      this.updateFormShow = false
      this.addFormShow = false
      this.queryFormShow = false
      this.clearForm()
    },
    showUpdateForm(row) {
      this.updateForm = {
        classroom_name: row.classroom_name,
        classroom_count: row.classroom_count,
        classroom_status: row.classroom_status
      }
      this.updateItem = row.classroom_id
      this.updateFormShow = true
    },
    classroomListChange(val) {
      this.deleteArr = val
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
      this.initShowList(this.classroomList, () => {
        this.$message({
          type: 'success',
          message: '已显示全部数据'
        })
      })
    },
    exportClassroom() {
      this.$store.dispatch('classroom/exportClassroom')
    }
  }
}
</script>
<style scoped>
.classroom-container {
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
