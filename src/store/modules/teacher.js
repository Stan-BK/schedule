import { getTeacherCount, getTeacherList, addTeacher, updateTeacher, deleteTeacher, selectByTeacherName, exportTeacher } from '@/api/teacher'

const state = {
  teacherCount: 0
}

const mutations = {
  SET_TEACHERCOUNT(state, count) {
    state.teacherCount = count
  }
}

const actions = {
  getTeacherCount({ commit }) {
    return new Promise((resolve, reject) => {
      getTeacherCount().then(response => {
        const { data } = response
        commit('SET_TEACHERCOUNT', data.count)
        resolve()
      })
    })
  },
  getTeacherList({ dispatch }) {
    return new Promise((resolve, reject) => {
      getTeacherList().then(response => {
        const { data } = response
        dispatch('getTeacherCount')
        resolve(data.user)
      })
    })
  },
  addTeacher({ dispatch }, params) {
    return new Promise((resolve, reject) => {
      addTeacher(params).then(response => {
        dispatch('getTeacherCount')
        resolve()
      }).catch(() => {
        reject('添加教师失败')
      })
    })
  },
  updateTeacher({ commit }, params) {
    return new Promise((resolve, reject) => {
      updateTeacher(params).then(response => {
        resolve()
      })
    })
  },
  deleteTeacher({ dispatch }, params) {
    return new Promise((resolve, reject) => {
      deleteTeacher(params).then(response => {
        dispatch('getTeacherCount')
        resolve()
      })
    })
  },
  selectByTeacherName({ dispatch }, params) {
    return new Promise((resolve, reject) => {
      selectByTeacherName(params).then(response => {
        const { data } = response
        resolve(data.teacher)
      })
    })
  },
  exportTeacher() {
    return new Promise((resolve, reject) => {
      exportTeacher().then(() => {
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
