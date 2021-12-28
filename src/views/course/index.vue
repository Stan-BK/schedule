<template>
  <div class="course-container">
    <el-container>
      <el-header>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-button-group>
              <el-button
                v-if="!!$store.state.user.user_role"
                @click="addFormShow = true"
              >添加课程</el-button>
              <el-button @click="queryFormShow = true">查找教室信息</el-button>
              <el-button
                @click="showAll($event)"
              >显示全部</el-button>
            </el-button-group>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="exportCourse">导出课程信息</el-button>
          </el-col>
          <el-col :span="6">
            <span style="opacity: 0">1</span>
          </el-col>
          <el-col :span="4">
            <p>当前课程数量：{{ $store.state.course.courseCount }}</p>
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
                prop="course_name"
                label="课程名"
              />
              <el-table-column
                prop="course_category"
                label="课程类别"
              />
              <el-table-column prop="course_nature" label="课程性质" />
              <el-table-column
                prop="course_computerTime"
                label="课时"
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
                    @click="deleteCourse(scope.row)"
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
    <el-dialog :close-on-click-modal="false" title="添加课程" :visible.sync="addFormShow" width="350px" :center="true">
      <el-form ref="addForm" :model="addForm" :label-position="'left'" :rules="rules">
        <el-form-item label="课程名" :label-width="formLabelWidth" required prop="course_name">
          <el-input v-model="addForm.course_name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="课程类别" :label-width="formLabelWidth" required prop="course_category">
          <el-input v-model="addForm.course_category" autocomplete="off" placeholder="如: 专业领域课" />
        </el-form-item>
        <el-form-item label="课时" :label-width="formLabelWidth" required prop="course_computerTime">
          <el-input-number v-model="addForm.course_computerTime" :min="1" :max="20" />
        </el-form-item>
        <el-form-item label="课程性质" :label-width="formLabelWidth" required prop="course_nature">
          <el-select v-model="addForm.course_nature" placeholder="请选择">
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
        <el-button @click="addFormShow = false">取 消</el-button>
        <el-button type="primary" @click="addCourse('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="查找课程" :visible.sync="queryFormShow" width="350px" :center="true">
      <el-form ref="queryForm" :model="queryForm" :label-position="'left'" :rules="rules">
        <el-form-item label="课程名" :label-width="formLabelWidth" required prop="course_name">
          <el-input v-model="queryForm.course_name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="queryFormShow = false">取 消</el-button>
        <el-button type="primary" @click="queryCourse('queryForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="修改课程" :visible.sync="updateFormShow" width="350px" :center="true">
      <el-form ref="updateForm" :model="updateForm" :label-position="'left'" :rules="rules">
        <el-form-item label="课程名" :label-width="formLabelWidth" required prop="course_name">
          <el-input v-model="updateForm.course_name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="课程类别" :label-width="formLabelWidth" required prop="course_category">
          <el-input v-model="updateForm.course_category" autocomplete="off" />
        </el-form-item>
        <el-form-item label="课时" :label-width="formLabelWidth" required prop="course_computerTime">
          <el-input-number v-model="updateForm.course_computerTime" :min="1" :max="20" />
        </el-form-item>
        <el-form-item label="课程性质" :label-width="formLabelWidth" required prop="course_nature">
          <el-input v-model="updateForm.course_nature" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateFormShow = false">取 消</el-button>
        <el-button type="primary" @click="updateCourse('updateForm')">确 定</el-button>
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
      formLabelWidth: '80px',
      courseList: [],
      showList: [],
      addFormShow: false,
      queryFormShow: false,
      updateFormShow: false,
      updateForm: {
        course_name: '',
        course_category: '',
        course_nature: '',
        course_computerTime: 1
      },
      queryForm: {
        course_name: ''
      },
      addForm: {
        course_name: '',
        course_category: '',
        course_nature: '',
        course_computerTime: 1
      },
      options: [
        {
          value: '选修课',
          label: '选修课'
        },
        {
          value: '必修课',
          label: '必修课'
        }
      ],
      rules: {
        course_name: [
          { required: true, message: '请输入课程名', trigger: 'blur' }
        ],
        course_category: [{ required: true, message: '请输入课程类别', trigger: 'blur' }],
        course_nature: [
          { required: true, message: '请输入课程性质', trigger: 'blur' }
        ],
        course_computerTime: [
          { required: true, message: '请选择课时', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.initCourseInfo()
  },
  methods: {
    initCourseInfo() {
      this.$store.dispatch('course/getCourseCount')
      this.$store.dispatch('course/getCourseList').then((response) => {
        this.courseList = response
        this.initShowList(this.courseList)
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
    addCourse(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('course/addCourse', this.addForm).then(data => {
            this.$message({
              type: 'success',
              message: data
            })
            this.initCourseInfo()
          })
          this.addFormShow = false
        }
      })
    },
    queryCourse(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('course/getCourse', this.queryForm).then(data => {
            this.initShowList(data)
          })
          this.queryFormShow = false
        }
      })
    },
    deleteCourse(info) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          course_id: info.course_id
        }
        this.$store.dispatch('course/deleteCourse', params).then(data => {
          this.$message({
            type: 'success',
            message: data
          })
          this.initCourseInfo()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    showUpdateForm(info) {
      this.updateFormShow = true
      this.updateForm = {
        course_id: info.course_id,
        course_name: info.course_name,
        course_category: info.course_category,
        course_nature: info.course_nature,
        course_computerTime: info.course_computerTime
      }
    },
    updateCourse(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('course/updateCourse', this.updateForm).then(data => {
            this.$message({
              type: 'success',
              message: data
            })
            this.initCourseInfo()
          })
          this.updateFormShow = false
          this.updateForm = {
            course_id: '',
            course_name: '',
            course_category: '',
            course_nature: '',
            course_computerTime: 1
          }
        }
      })
    },
    showAll(e) {
      this.paikeStatus = !this.paikeStatus
      if (e.target.nodeName === 'BUTTON') {
        e.target.blur()
      } else {
        e.target.parentNode.blur()
      }
      this.initShowList(this.courseList, () => {
        this.$message({
          type: 'success',
          message: '已显示全部数据'
        })
      })
    },
    exportCourse() {
      this.$store.dispatch('course/exportCourse')
    }
  }
}
</script>
<style scoped>
.course-container {
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

