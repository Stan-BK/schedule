<template>
  <div class="curriculum">
    <el-container>
      <el-header>
        <el-button-group>
          <el-button
            @click="dialogFormVisible = true"
          >查找教室安排</el-button>
        </el-button-group>
      </el-header>
      <el-main>
        <el-table
          :data="tableData"
          :span-method="isCommonCourse"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="id"
            label="时间段"
            width="180"
          />
          <el-table-column
            prop="name"
            label="周一"
          />
          <el-table-column
            prop="amount1"
            label="周二"
          />
          <el-table-column
            prop="amount2"
            label="周三"
          />
          <el-table-column
            prop="amount3"
            label="周四"
          />
          <el-table-column
            prop="amount3"
            label="周五"
          />
        </el-table>
      </el-main>
    </el-container>
    <el-dialog title="选择课室" :visible.sync="dialogFormVisible" width="350px" :center="true">
      <el-form :model="form" :label-position="'left'">
        <el-form-item label="教室" :label-width="formLabelWidth" prop="id">
          <el-input v-model="form.id" autocomplete="off" />
        </el-form-item>
        <el-form-item label="周数" :label-width="formLabelWidth">
          <el-input-number v-model="form.week" :min="1" :max="20" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '50px',
      form: {
        id: undefined,
        week: undefined
      },
      tableData: [{
        id: '12987122',
        name: '王小虎',
        amount1: '234',
        amount2: '3.2',
        amount3: 10
      }, {
        id: '12987123',
        name: '王小虎',
        amount1: '165',
        amount2: '4.43',
        amount3: 12
      }, {
        id: '12987124',
        name: '王小虎',
        amount1: '324',
        amount2: '1.9',
        amount3: 9
      }, {
        id: '12987125',
        name: '王小虎',
        amount1: '621',
        amount2: '2.2',
        amount3: 17
      }, {
        id: '12987126',
        name: '王小虎',
        amount1: '539',
        amount2: '4.1',
        amount3: 15
      }]
    }
  },
  methods: {
    isCommonCourse({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        return [1, 1]
      }
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2]
        } else if (columnIndex === 1) {
          return [0, 0]
        }
      }
    }
  }
}
</script>
<style scoped>
.curriculum {
  position: absolute;
  width: 90%;
  height: 90%;
  margin: auto;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
</style>
