import { getClassroomCount, getClassroomList, addClassroom, deleteClassroom, updateClassroom, selectByClassroomId, deleteClassroomList } from '@/api/classroom'

const state = {
  classroomCount: 0
}

const mutations = {
  SET_CLASSROOMCOUNT(state, count) {
    state.classroomCount = count
  }
}

const actions = {
  getClassroomCount({ commit }) {
    return new Promise((resolve, reject) => {
      getClassroomCount().then(response => {
        const { data } = response
        commit('SET_CLASSROOMCOUNT', data.count)
        resolve()
      })
    })
  },
  getClassroomList() {
    return new Promise((resolve, reject) => {
      getClassroomList().then(response => {
        const { data } = response
        resolve(data.classroom)
      })
    })
  },
  addClassroom({ commit }, params) {
    return new Promise((resolve, reject) => {
      addClassroom(params).then(() => {
        resolve()
      }).catch(() => {
        reject()
      })
    })
  },
  updateClassroom({ commit }, params) {
    return new Promise((resolve, reject) => {
      updateClassroom(params).then(() => {
        resolve()
      }).catch(() => {
        reject()
      })
    })
  },
  deleteClassroom({ commit }, params) {
    return new Promise((resolve, reject) => {
      deleteClassroom(params).then(() => {
        resolve()
      }).catch(() => {
        reject()
      })
    })
  },
  deleteClassroomList({ commit }, params) {
    return new Promise((resolve, reject) => {
      deleteClassroomList(params).then(() => {
        resolve()
      }).catch(() => {
        reject()
      })
    })
  },
  selectByClassroomId({ commit }, params) {
    return new Promise((resolve, reject) => {
      selectByClassroomId(params).then(response => {
        const { data } = response
        resolve(data.classroom)
      }).catch(() => {
        reject()
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
