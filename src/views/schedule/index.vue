<template>
  <div class="schedule-container">
    <el-container>
      <el-header>
        <el-row :gutter="24" align="middle" type="flex">
          <el-col :span="5">
            <el-button-group>
              <el-button
                @click="queryFormShow = true"
              >查询课表</el-button>
              <el-tooltip class="item" effect="dark" :disabled="confirmForm.value === 'scheduled_classroom'" content="仅允许对教室课表进行排课" placement="top-start">
                <div style="display: inline-block;">
                  <el-button
                    :style="{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0
                    }"
                    :type="paikeStatus ? 'info' : 'primary'"
                    :disabled="confirmForm.value === 'scheduled_classroom' ? false : 'disabled'"
                    @click="changePaikeStatus"
                  >{{ paikeStatus ? '退出排课' : '开始排课' }}</el-button>
                </div>
              </el-tooltip>
            </el-button-group>
          </el-col>
          <el-col :span="3">
            <el-tooltip class="item" effect="dark" :disabled="!!confirmForm.input" content="请先查询课表" placement="top-start">
              <div style="display: inline-block;">
                <el-button
                  :disabled="!confirmForm.input"
                  @click="exportSchedule"
                >导出课表</el-button>
              </div>
            </el-tooltip>
          </el-col>
          <el-col :span="8">
            周数：<el-input-number v-model="week" :min="1" :max="22" @change="searchByWeek" />
          </el-col>
          <el-col :span="8">
            <div v-if="confirmForm.input">
              <span class="identify">{{ confirmForm.input }}</span>
              <span>{{ identify }}</span>
            </div>
          </el-col>
        </el-row></el-header>
      <el-main>
        <el-table
          :key="Date.now()"
          :data="tableData"
          border
          style="width: 100%"
          :header-cell-style="{
            textAlign: 'center'
          }"
          :cell-style="isPaike"
          :cell-class-name="isCellHover"
          @cell-click="paike"
        >
          <el-table-column
            prop="time"
            label="课时"
            width="180"
          />
          <el-table-column
            prop="周1"
            label="周一"
          >
            <template slot-scope="scope">
              <template v-if="hasProps(scope)">
                <p><i class="fa fa-book" aria-hidden="true" /> {{ takeCourse(scope) }}</p>
                <p v-if="confirmForm.value !== 'teacher_name'">{{ takeTeacherName(scope) }}</p>
                <p v-if="confirmForm.value !== 'classes_name'">{{ takeClassName(scope) }}</p>
                <p v-if="confirmForm.value !== 'scheduled_classroom'">{{ takeClassroom(scope) }}</p>
              </template>
            </template>
          </el-table-column>
          <el-table-column
            prop="周2"
            label="周二"
          >
            <template slot-scope="scope">
              <template v-if="hasProps(scope)">
                <p><i class="fa fa-book" aria-hidden="true" /> {{ takeCourse(scope) }}</p>
                <p v-if="confirmForm.value !== 'teacher_name'">{{ takeTeacherName(scope) }}</p>
                <p v-if="confirmForm.value !== 'classes_name'">{{ takeClassName(scope) }}</p>
                <p v-if="confirmForm.value !== 'scheduled_classroom'">{{ takeClassroom(scope) }}</p>
              </template>
            </template>
          </el-table-column>
          <el-table-column
            prop="周3"
            label="周三"
          >
            <template slot-scope="scope">
              <template v-if="hasProps(scope)">
                <p><i class="fa fa-book" aria-hidden="true" /> {{ takeCourse(scope) }}</p>
                <p v-if="confirmForm.value !== 'teacher_name'">{{ takeTeacherName(scope) }}</p>
                <p v-if="confirmForm.value !== 'classes_name'">{{ takeClassName(scope) }}</p>
                <p v-if="confirmForm.value !== 'scheduled_classroom'">{{ takeClassroom(scope) }}</p>
              </template>
            </template>
          </el-table-column>
          <el-table-column
            prop="周4"
            label="周四"
          >
            <template slot-scope="scope">
              <template v-if="hasProps(scope)">
                <p><i class="fa fa-book" aria-hidden="true" /> {{ takeCourse(scope) }}</p>
                <p v-if="confirmForm.value !== 'teacher_name'">{{ takeTeacherName(scope) }}</p>
                <p v-if="confirmForm.value !== 'classes_name'">{{ takeClassName(scope) }}</p>
                <p v-if="confirmForm.value !== 'scheduled_classroom'">{{ takeClassroom(scope) }}</p>
              </template>
            </template>
          </el-table-column>
          <el-table-column
            prop="周5"
            label="周五"
          >
            <template slot-scope="scope">
              <template v-if="hasProps(scope)">
                <p><i class="fa fa-book" aria-hidden="true" /> {{ takeCourse(scope) }}</p>
                <p v-if="confirmForm.value !== 'teacher_name'">{{ takeTeacherName(scope) }}</p>
                <p v-if="confirmForm.value !== 'classes_name'">{{ takeClassName(scope) }}</p>
                <p v-if="confirmForm.value !== 'scheduled_classroom'">{{ takeClassroom(scope) }}</p>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <el-dialog :close-on-click-modal="false" title="查询课表" :visible.sync="queryFormShow" width="350px" :center="true">
      <el-form :model="queryForm" :label-position="'left'">
        <el-form-item label="查询类型" :label-width="formLabelWidth">
          <el-select v-model="queryForm.value" placeholder="请选择" @change="queryForm.input = ''">
            <el-option
              v-for="item in query_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="查询内容" :label-width="formLabelWidth">
          <el-select v-model="queryForm.input" placeholder="请选择" filterable>
            <el-option
              v-for="item in current_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="searchInfo">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="排课" :visible.sync="paikeFormShow" width="350px" :center="true">
      <el-form ref="paikeForm" :model="paikeForm" :label-position="'left'" :rules="rules">
        <el-form-item label="课程名" :label-width="formLabelWidth" prop="course_name">
          <el-select v-model="paikeForm.course_name" placeholder="请选择" filterable>
            <el-option
              v-for="item in course_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="班级名" :label-width="formLabelWidth" prop="classes_name">
          <el-select v-model="paikeForm.classes_name" placeholder="请选择" filterable>
            <el-option
              v-for="item in class_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="教师名" :label-width="formLabelWidth" prop="teacher_name">
          <el-select v-model="paikeForm.teacher_name" placeholder="请选择" filterable>
            <el-option
              v-for="item in teacher_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="时间段" :label-width="formLabelWidth" prop="number_sections">
          <el-select v-if="!section" v-model="paikeForm.number_sections" placeholder="请选择" filterable>
            <el-option
              v-for="item in section_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <!-- 如果排课为空白项则固定其排课节数  -->
          <el-select v-else :value="paikeForm.number_sections" disabled>
            <el-option
              v-for="item in section_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="工作日" :label-width="formLabelWidth" prop="weeks">
          <el-select v-if="!section" v-model="paikeForm.weeks" placeholder="请选择" filterable>
            <el-option
              v-for="item in week_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <!-- 如果排课为空白项则固定其排课节数  -->
          <el-select v-else :value="paikeForm.weeks" disabled>
            <el-option
              v-for="item in week_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button v-if="cancelBtnShow" type="warning" @click="cancelPaike">取消排课</el-button>
        <el-button type="primary" @click="confirmPaike('paikeForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      scheduleList: [],
      formLabelWidth: '80px',
      paikeStatus: false,
      week: 1, // 当前周数
      queryFormShow: false,
      paikeFormShow: false,
      cancelBtnShow: false, // '取消排课'按钮的显示
      tableData: [],
      classroom_options: [],
      course_options: [],
      teacher_options: [],
      class_options: [],
      queryForm: {
        value: 'classes_name',
        input: ''
      },
      confirmForm: {
        value: 'classes_name',
        input: ''
      },
      paikeForm: {
        schedule_id: '',
        class_weeks: '',
        classes_name: '',
        course_name: '',
        number_sections: '',
        scheduled_classroom: '',
        teacher_name: '',
        weeks: ''
      },
      query_options: [
        {
          value: 'classes_name',
          label: '根据班级查询'
        },
        {
          value: 'scheduled_classroom',
          label: '根据教室查询'
        },
        {
          value: 'teacher_name',
          label: '根据教师查询'
        }
      ],
      section_options: [
        {
          value: '1、2',
          label: '第1、2节'
        },
        {
          value: '3、4',
          label: '第3、4节'
        },
        {
          value: '5、6',
          label: '第5、6节'
        },
        {
          value: '7、8',
          label: '第7、8节'
        },
        {
          value: '9、10',
          label: '第9、10节'
        },
        {
          value: '11、12',
          label: '第11、12节'
        }
      ],
      week_options: [
        {
          value: '一',
          label: '周一'
        },
        {
          value: '二',
          label: '周二'
        },
        {
          value: '三',
          label: '周三'
        },
        {
          value: '四',
          label: '周四'
        },
        {
          value: '五',
          label: '周五'
        }
      ],
      rules: {
        course_name: [
          { required: true, message: '请选择课程名', trigger: 'blur' }
        ],
        classes_name: [
          { required: true, message: '请选择班级名', trigger: 'blur' }
        ],
        number_sections: [
          { required: true, message: '请选择时间段', trigger: 'blur' }
        ],
        teacher_name: [
          { required: true, message: '请选择教师', trigger: 'blur' }
        ],
        weeks: [
          { required: true, message: '请选择教师', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    identify() {
      switch (this.confirmForm.value) {
        case 'teacher_name': return ' 老师的课表'
        case 'scheduled_classroom': return ' 课室的课表'
        default: return ' 的课表'
      }
    },
    current_options() {
      var obj = {
        'teacher_name': 'teacher_options',
        'scheduled_classroom': 'classroom_options',
        'classes_name': 'class_options'
      }
      return this[obj[this.queryForm.value]]
    },
    section() { // 求得排课的时间段,可同时用于排课表单中节数和工作日是否需要固定值的判断
      var section = ''
      this.section_options.forEach(item => {
        if (item.value === this.paikeForm.number_sections) {
          if (!this.paikeForm.schedule_id) {
            section = item.label
          }
        }
      })
      return section
    }
  },
  created() {
    // 初始化展示表格及各类选项组（课程、教室等）
    for (var i = 0; i < 6; i++) {
      this.tableData[i] = {}
      this.tableData[i]['time'] = `第${2 * i + 1}、${2 * i + 2}节课`
    }
    this.$store.dispatch('course/getCourseList').then((response) => {
      response.forEach(item => {
        this.course_options.push({
          value: item.course_name,
          label: item.course_name
        })
      })
    })
    this.$store.dispatch('classroom/getClassroomList').then((response) => {
      response.forEach(item => {
        this.classroom_options.push({
          value: item.classroom_address,
          label: `${item.classroom_address}(${item.classroom_name})`
        })
      })
    })
    this.$store.dispatch('teacher/getTeacherList').then((response) => {
      var teacherList = response.filter((elem) => {
        return elem.is_delete !== 1
      })
      teacherList.forEach(item => {
        this.teacher_options.push({
          value: item.teacher_name,
          label: item.teacher_name
        })
      })
    })
    this.$store.dispatch('tb_class/getClassList').then((response) => {
      response.forEach(item => {
        this.class_options.push({
          value: item.class_name,
          label: item.class_name
        })
      })
    })
  },
  methods: {
    searchInfo(event, oValue, nValue, form) {
      var tableData = JSON.parse(JSON.stringify(this.tableData))
      var queryForm = form || this.queryForm
      var value = queryForm.value
      var input = queryForm.input.toString()
      var searchStr = {}
      searchStr[value] = input
      var params = {
        type: value,
        searchStr
      }
      if (input === '') {
        this.$message({
          type: 'warning',
          message: '未确认查询内容'
        })
        return
      }
      this.confirmForm.value = value
      this.confirmForm.input = input
      this.$store.dispatch('schedule/searchInfo', params).then((response) => {
        var weekData = response.lists[0]['节数'] // 根据后端传回数据格式获取
        for (var i = 0; i < weekData.length; i++) {
          this.generateData(weekData[i], String(i + 1), tableData) // 遍历工作日每天的课程
        }
        this.tableData = tableData
        this.cancelForm()
      })
      this.queryFormShow = false
    },
    generateData(data, day, tableData) {
      var week = String(this.week)
      for (var i in data) {
        switch (i) {
          case '第1,2节': tableData[0]['周' + day] = data[i].filter(item => {
            return item.class_weeks.split('、').includes(week)
          })[0]; break
          case '第3,4节': tableData[1]['周' + day] = data[i].filter(item => {
            return item.class_weeks.split('、').includes(week)
          })[0]; break
          case '第5,6节': tableData[2]['周' + day] = data[i].filter(item => {
            return item.class_weeks.split('、').includes(week)
          })[0]; break
          case '第7,8节': tableData[3]['周' + day] = data[i].filter(item => {
            return item.class_weeks.split('、').includes(week)
          })[0]; break
          case '第9,10节': tableData[4]['周' + day] = data[i].filter(item => {
            return item.class_weeks.split('、').includes(week)
          })[0]; break
          case '第11,12节': tableData[5]['周' + day] = data[i].filter(item => {
            return item.class_weeks.split('、').includes(week)
          })[0]; break
        }
      }
    },
    searchByWeek() { // 切换周数触发该事件
      this.searchInfo(undefined, undefined, undefined, this.confirmForm)
    },
    cancelForm() {
      this.queryFormShow = false
      this.queryForm.input = ''
      this.paikeFormShow = false
      this.paikeForm = {
        schedule_id: '',
        class_weeks: '',
        classes_name: '',
        course_name: '',
        number_sections: '',
        scheduled_classroom: '',
        teacher_name: '',
        weeks: ''
      }
    },
    hasProps(scope) {
      var property = scope.column.property
      return !!scope.row[property]
    },
    takeCourse(scope) {
      var property = scope.column.property
      return scope.row[property] ? scope.row[property].course_name : ''
    },
    takeTeacherName(scope) {
      var property = scope.column.property
      return scope.row[property] ? scope.row[property].teacher_name : ''
    },
    takeClassName(scope) {
      var property = scope.column.property
      return scope.row[property] ? scope.row[property].classes_name : ''
    },
    takeClassroom(scope) {
      var property = scope.column.property
      return scope.row[property] ? scope.row[property].scheduled_classroom : ''
    },
    paike(row, column) { // 处理排课逻辑
      if (!this.paikeStatus) {
        return
      } else if (!this.confirmForm.input) {
        this.$message({
          type: 'warning',
          message: '未确认查询内容'
        })
        return
      }

      this.paikeFormShow = true
      var form = this.paikeForm // 操作排课表单
      var timeReg = /(\d+、\d+)/
      var item = row[column.property]
      this.cancelBtnShow = !!item
      for (var key in item) {
        if (form.hasOwnProperty(key)) {
          form[key] = item[key]
        }
      }
      form.weeks = column.label.slice(1)
      form.number_sections = row.time.match(timeReg)[0]
    },
    confirmPaike(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.cancelBtnShow) { // 通过cancelBtnShow判断当前排课项初始是否为空白项
            this.deleteSchedule(true)
            this.addSchedule(true)
          } else {
            this.paikeForm.scheduled_classroom = this.confirmForm.input // 获取查询表单中的教室
            this.paikeForm.class_weeks = this.week
            this.addSchedule(false)
          }
        }
      })
    },
    cancelPaike() {
      this.$confirm('确认取消该课程安排?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteSchedule().then(data => {
          this.$message({
            type: 'success',
            message: data
          })
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '取消排课失败'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作已取消'
        })
      })
    },
    addSchedule(isUpdate) { // 添加排课记录
      this.$store.dispatch('schedule/addSchedule', this.paikeForm).then(data => {
        this.$message({
          type: 'success',
          message: isUpdate ? '修改成功' : '排课成功'
        })
        this.searchInfo(undefined, undefined, undefined, this.confirmForm)
        this.paikeFormShow = false
        this.cancelForm()
      })
    },
    deleteSchedule(isUpdate) { // 删除排课记录
      return new Promise((resolve, reject) => {
        const params = {
          xiugaizhoushu: this.week,
          schedule_id: this.paikeForm.schedule_id
        }
        this.$store.dispatch('schedule/deleteSchedule', params).then(data => {
          resolve(data)
          !isUpdate && this.searchInfo(undefined, undefined, undefined, this.confirmForm) // 判断是否为更新排课，避免重复请求
          this.paikeFormShow = false
          this.cancelForm()
        })
      })
    },
    changePaikeStatus() { // 切换排课状态
      this.paikeStatus = !this.paikeStatus
      if (this.paikeStatus === true) {
        this.$message({
          type: 'success',
          message: '已进入排课状态'
        })
      } else {
        this.$message({
          type: 'info',
          message: '已退出排课状态'
        })
      }
    },
    isPaike({ columnIndex }) { // 排课状态下单元格基础样式
      if (this.paikeStatus && columnIndex > 0) {
        return {
          textAlign: 'center',
          cursor: 'pointer',
          background: '#fff'
        }
      }
      return {
        textAlign: 'center',
        background: '#fff'
      }
    },
    isCellHover({ columnIndex }) { // 排课状态下单元格悬停样式
      if (columnIndex > 0) {
        return this.paikeStatus ? 'hover' : ''
      } else {
        return ''
      }
    },
    exportSchedule() {
      const params = {
        str: this.confirmForm.value,
        value: this.confirmForm.input
      }
      this.$store.dispatch('schedule/exportSchedule', params)
    }
  }
}
</script>
<style scoped>
@import '../../assets/table.css'; /* 引入外部css确保el-table的cell-class-name字段生效 */
.schedule-container {
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
.identify {
  font-size: 1.2em;
}
</style>
