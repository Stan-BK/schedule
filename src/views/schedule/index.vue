<template>
  <div class="schedule-container">
    <el-container>
      <el-header>
        <el-row :gutter="24" align="middle" type="flex">
          <el-col :span="8">
            <el-button-group>
              <el-button
                type="primary"
                @click="dialogFormVisible = true"
              >查询课表</el-button>
            </el-button-group>
          </el-col>
          <el-col :span="8">
            周数：<el-input-number v-model="week" :min="1" :max="22" @change="searchInfo" />
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
          :cell-style="{
            textAlign: 'center'
          }"
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
    <el-dialog title="查询课表" :visible.sync="dialogFormVisible" width="350px" :center="true">
      <el-form :model="form" :label-position="'left'">
        <el-form-item label="查询类型" :label-width="formLabelWidth">
          <el-select v-model="form.value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="查询内容" :label-width="formLabelWidth">
          <el-input v-model="form.input" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="searchInfo">确 定</el-button>
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
      form: {
        value: 'classes_name',
        input: ''
      },
      confirmForm: {
        value: 'classes_name',
        input: ''
      },
      week: 1,
      dialogFormVisible: false,
      tableData: [],
      options: [
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
      ]
    }
  },
  computed: {
    identify() {
      switch (this.confirmForm.value) {
        case 'teacher_name': return ' 老师的课表'
        case 'scheduled_classroom': return ' 课室的课表'
        default: return ' 的课表'
      }
    }
  },
  created() {
    for (var i = 0; i < 5; i++) {
      this.tableData[i] = {}
      this.tableData[i]['time'] = `第${2 * i + 1}、${2 * i + 2}节课`
    }
  },
  methods: {
    searchInfo() {
      var tableData = JSON.parse(JSON.stringify(this.tableData))

      var value = this.form.value
      var input = this.form.input.toString()
      this.confirmForm = {
        value,
        input
      }
      var searchStr = {}
      searchStr[value] = input
      var params = {
        type: value,
        searchStr
      }
      if (input === '') {
        this.$message({
          type: 'warning',
          message: '未填写查询内容'
        })
        return
      }
      this.$store.dispatch('schedule/searchInfo', params).then((response) => {
        var weekData = response.lists[1]['节数']
        for (var i = 0; i < weekData.length; i++) {
          this.generateData(weekData[i], String(i + 1), tableData) // 遍历工作日每天的课程
        }
        this.tableData = tableData
      })
      this.dialogFormVisible = false
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
        }
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
      return scope.row[property] ? 'b5-' + scope.row[property].scheduled_classroom : ''
    }
  }
}
</script>
<style scoped>
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
