<template>
  <div class="tb-class-container">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-button-group>
              <el-button @click="queryFormShow = true">查询班级</el-button>
              <el-button
                v-if="!!$store.state.user.user_role"
                @click="addFormShow = true"
              >添加班级</el-button>
            </el-button-group>
          </el-col>
          <el-col :span="2">
            <el-button
              v-if="!!$store.state.user.user_role"
              type="danger"
            >删除班级</el-button>
          </el-col>
          <el-col :span="14">
            <span style="opacity: 0">1</span>
          </el-col>
          <el-col :span="4">
            <p>当前班级数量：{{ $store.state.tb_class.classCount }}</p>
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
          <div v-show="index === curpage - 1" class="show">
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
              <el-table-column prop="class_id" label="班级id" />
              <el-table-column prop="class_name" label="班级名" />
              <el-table-column prop="class_count" label="人数" />
            </el-table>
          </div>
        </div>
        <div v-if="showList.length === 0" class="noData">
          <h2>No Data</h2>
        </div>
      </el-main>
    </el-container>
    <el-dialog title="添加班级" :visible.sync="addFormShow" width="400px">
      <el-form ref="addForm" :model="addForm" :rules="rules">
        <el-form-item
          label="班级代号"
          :label-width="formLabelWidth"
          required
          prop="class_code"
        >
          <el-input v-model="addForm.class_code" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="班级名"
          :label-width="formLabelWidth"
          required
          prop="class_name"
        >
          <el-input v-model="addForm.class_name" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="班级人数"
          :label-width="formLabelWidth"
          required
          prop="class_count"
        >
          <el-input v-model="addForm.class_count" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="专业"
          :label-width="formLabelWidth"
          required
          prop="class_profession"
        >
          <el-input v-model="addForm.class_profession" tautocomplete="off" />
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
    <el-dialog title="查找班级" :visible.sync="queryFormShow" width="400px">
      <el-form ref="queryForm" :model="queryForm" :rules="rules">
        <el-form-item
          label="班级id"
          :label-width="formLabelWidth"
          required
          prop="classroom_id"
        >
          <el-input v-model="queryForm.classroom_id" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSubmit">取 消</el-button>
        <el-button
          type="primary"
          @click="selectByClassroomId('queryForm')"
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
      classList: [],
      showList: [],
      value: '',
      input: '',
      isHide: true,
      queryFormShow: false,
      addFormShow: false,
      addForm: {
        class_code: '',
        class_count: '',
        class_name: '',
        class_profession: '',
        grade: ''
      },
      queryForm: {
        class_id: ''
      },
      rules: {
        class_id: [
          { required: true, message: '请输入班级id', trigger: 'blur' }
        ],
        class_count: [
          { required: true, message: '请输入班级人数', trigger: 'blur' }
        ],
        class_name: [
          { required: true, message: '请输入班级名', trigger: 'blur' }
        ],
        class_profession: [
          { required: true, message: '请输入专业', trigger: 'blur' }
        ],
        grade: [
          { required: true, message: '请输入年级', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.initClass()
  },
  methods: {
    initClass() {
      this.$store.dispatch('tb_class/getClassList').then((response) => {
        this.classList = response
        this.initShowList(response)
      })
      this.$store.dispatch('tb_class/getClassCount')
    },
    searchInfo() {
      var value = this.value
      var input = this.input.toString()
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
      this.$store.dispatch('class/searchInfo', params).then((response) => {
        this.initShowList(response)
      })
    },
    initShowList(content) {
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
      this.isHide = false
    },
    clearForm() {
      this.addForm = {
        class_code: '',
        class_count: '',
        class_name: '',
        class_profession: '',
        grade: ''
      }
    },
    cancelSubmit() {
      this.addFormShow = false
      this.queryFormShow = false
      this.clearForm()
    }
  }
}
</script>
<style scoped>
.tb-class-container {
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
