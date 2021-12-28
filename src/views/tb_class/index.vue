<template>
  <div class="tb-class-container">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-button-group>
              <el-button @click="queryFormShow = true">查询班级</el-button>
              <el-button
                v-if="!!$store.state.user.user_role"
                @click="addFormShow = true"
              >添加班级</el-button>
            </el-button-group>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="exportTbClass">导出班级信息</el-button>
          </el-col>
          <el-col :span="10">
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
                    @click="deleteClass(scope.row)"
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
    <el-dialog :close-on-click-modal="false" title="添加班级" :visible.sync="addFormShow" width="400px">
      <el-form ref="addForm" :model="addForm" :rules="rules">
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
          @click="addClass()"
        >确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="修改班级信息" :visible.sync="updateFormShow" width="400px">
      <el-form :model="updateForm" :rules="rules">
        <el-form-item
          label="班级名"
          :label-width="formLabelWidth"
          required
          prop="class_name"
        >
          <el-input v-model="updateForm.class_name" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="班级人数"
          :label-width="formLabelWidth"
          required
          prop="class_count"
        >
          <el-input v-model="updateForm.class_count" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="专业"
          :label-width="formLabelWidth"
          required
          prop="class_profession"
        >
          <el-input v-model="updateForm.class_profession" tautocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateFormShow = false">取 消</el-button>
        <el-button
          type="primary"
          @click="updateClass()"
        >确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="查找班级" :visible.sync="queryFormShow" width="400px">
      <el-form ref="queryForm" :model="queryForm" :rules="rules">
        <el-form-item
          label="班级名"
          :label-width="formLabelWidth"
          required
          prop="class_id"
        >
          <el-input v-model="queryForm.class_id" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="queryFormShow = false">取 消</el-button>
        <el-button
          type="primary"
          @click="searchInfo()"
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
      updateFormShow: false,
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
      updateForm: {
        class_count: '',
        class_name: '',
        class_profession: ''
      },
      rules: {
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
      var value = this.queryForm.class_id
      var params = {}
      params['class_name'] = value
      if (value === '') {
        this.$message({
          type: 'warning',
          message: '未填写查询内容'
        })
        return
      }
      this.$store.dispatch('tb_class/getClassInfo', params).then((response) => {
        this.initShowList(response)
      })
      this.queryFormShow = false
    },
    addClass() {
      const params = this.addForm
      this.$store.dispatch('tb_class/addClass', params).then((response) => {
        this.$message({
          type: 'success',
          message: response
        })
      })
    },
    updateClass() {
      const params = this.updateForm
      this.$store.dispatch('tb_class/updateClass', params).then(response => {
        this.$message({
          type: 'success',
          message: response
        })
        this.initClass()
      })
      this.updateFormShow = false
    },
    showUpdateForm(info) {
      this.updateForm = {
        class_id: info.class_id,
        class_count: info.class_count,
        class_name: info.class_name,
        class_profession: info.class_profession
      }
      this.updateFormShow = true
    },
    deleteClass(info) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          class_id: info.class_id
        }
        this.$store.dispatch('tb_class/deleteClass', params).then(response => {
          this.$message({
            message: response,
            type: 'success'
          })
          this.initClass()
        })
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
      if (this.total > 0) { this.isHide = false } else { this.isHide = true }
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
    },
    exportTbClass() {
      this.$store.dispatch('tb_class/exportTbClass')
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
