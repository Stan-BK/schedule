import { getCourseCount, getCourseList, addCourse, getCourse, deleteCourse, updateCourse, exportCourse } from '@/api/course'

const state = {
  courseCount: 0,
  courseList: []
}

const mutations = {
  SET_COURSECOUNT(state, count) {
    state.courseCount = count
  },
  SET_COURSELIST(state, courseList) {
    state.courseList = courseList
  }
}

const actions = {
  getCourseList({ commit }) {
    return new Promise((resolve, reject) => {
      getCourseList().then(response => {
        const { data } = response
        commit('SET_COURSELIST', data.course)
        resolve(data.course)
      })
    })
  },
  getCourseCount({ commit }) {
    return new Promise((resolve, reject) => {
      getCourseCount().then(response => {
        const { data } = response
        commit('SET_COURSECOUNT', data.count)
        resolve()
      })
    })
  },
  addCourse({ commit }, params) {
    return new Promise((resolve, reject) => {
      addCourse(params).then(response => {
        const { data } = response
        resolve(data.msg)
      })
    })
  },
  getCourse({ commit }, params) {
    return new Promise((resolve, reject) => {
      getCourse(params).then(response => {
        const { data } = response
        resolve(data.courses)
      })
    })
  },
  deleteCourse({ commit }, params) {
    return new Promise((resolve, reject) => {
      deleteCourse(params).then(response => {
        const { data } = response
        resolve(data.msg)
      })
    })
  },
  updateCourse({ commit }, params) {
    return new Promise((resolve, reject) => {
      updateCourse(params).then(response => {
        const { data } = response
        resolve(data.msg)
      })
    })
  },
  exportCourse() {
    return new Promise((resolve, reject) => {
      exportCourse().then(() => {
        resolve()
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
