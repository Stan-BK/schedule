<template>
  <div class="schedule-container">
    <el-container>
      <el-header>
        <el-row :gutter="24">
          <el-col :span="4">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-input v-model="input" placeholder="请输入内容" clearable />
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="searchInfo">搜索</el-button>
          </el-col>
          <el-col :span="4">
            <el-button @click="getschedule">显示全部</el-button>
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
              style="width: 100%"
              :height="isHide ? 500 : 480"
            >
              <el-table-column prop="schedule_id" label="课程号" width="180" />
              <el-table-column prop="class_name" label="课程名" width="180" />
              <el-table-column prop="classroom_name" label="教室" width="180" />
              <el-table-column prop="teacher_name" label="教师" width="180" />
              <el-table-column prop="time" label="开课时间段" />
            </el-table>
          </div>
        </div>
        <div v-if="showList.length === 0" class="noData">
          <h2>No Data</h2>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      curpage: 1,
      total: 0,
      scheduleList: [],
      showList: [],
      value: "schedule_id",
      input: "",
      isHide: true,
      options: [
        {
          value: "schedule_id",
          label: "根据课程id查询",
        },
        {
          value: "class_name",
          label: "根据班级查询",
        },
        {
          value: "classroom_name",
          label: "根据教室查询",
        },
        {
          value: "teacher_name",
          label: "根据教师查询",
        },
        {
          value: "time",
          label: "根据时间段查询",
        },
      ],
    };
  },
  created() {
    this.initSchedule();
  },
  methods: {
    initSchedule() {
      this.$store.dispatch("schedule/getScheduleList").then((response) => {
        this.scheduleList = response;
        this.initShowList(response);
      });
    },
    searchInfo() {
      var value = this.value;
      var input = this.input.toString();
      var searchStr = {};
      searchStr[value] = input;
      var params = {
        type: value,
        searchStr,
      };
      if (input === "") {
        this.$message({
          type: "warning",
          message: "未填写查询内容",
        });
        return;
      }
      this.$store.dispatch("schedule/searchInfo", params).then((response) => {
        this.initShowList(response);
      });
    },
    initShowList(content) {
      this.showList = [];
      var item = [];
      if (!content) {
        this.total = 0;
        this.isHide = true;
        return;
      } else if (
        Object.prototype.toString.call(content) === "[object Object]"
      ) {
        item.push(content);
        this.showList.push(item);
        this.total = item.length;
        this.isHide = true;
        return;
      }
      for (var i = 0; i < content.length; i++) {
        if (i % 20 === 0 && i !== 0) {
          this.showList.push(item);
          item = [];
        }
        item.push(content[i]);
      }
      if (item.length > 0) {
        this.showList.push(item);
      }
      this.total = content.length;
      this.isHide = false;
    },
  },
};
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
</style>
