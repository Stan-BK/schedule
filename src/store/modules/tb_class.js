import { getClassList, getClassCount, getClassInfo, addClass, updateClass, deleteClass, exportTbClass } from '@/api/tb_class'

const state = {
  classList: [],
  classCount: 0
}

const mutations = {
  SET_CLASS: (state, classList) => {
    state.classList = classList
  },
  SET_CLASSCOUNT: (state, classCount) => {
    state.classCount = classCount
  }
}

const actions = {
  getClassList({ commit }) {
    return new Promise((resolve, reject) => {
      getClassList().then(response => {
        const { data } = response
        commit('SET_CLASS', data.Tb_class)
        resolve(data.Tb_class)
      })
    })
  },
  getClassCount({ commit }) {
    return new Promise((resolve, reject) => {
      getClassCount().then(response => {
        const { data } = response
        commit('SET_CLASSCOUNT', data.count)
        resolve()
      })
    })
  },
  getClassInfo({ commit }, params) {
    return new Promise((resolve, reject) => {
      getClassInfo(params).then(response => {
        const { data } = response
        commit('SET_CLASS', data.tb_class)
        resolve(data.tb_class)
      })
    })
  },
  addClass({ commit }, params) {
    return new Promise((resolve, reject) => {
      addClass(params).then(response => {
        const { data } = response
        resolve(data.msg)
      })
    })
  },
  updateClass({ commit }, params) {
    return new Promise((resolve, reject) => {
      updateClass(params).then(response => {
        const { data } = response
        resolve(data.msg)
      })
    })
  },
  deleteClass({ commit }, params) {
    return new Promise((resolve, reject) => {
      deleteClass(params).then(response => {
        const { data } = response
        resolve(data.msg)
      })
    })
  },
  exportTbClass() {
    return new Promise((resolve, reject) => {
      exportTbClass().then(() => {
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
