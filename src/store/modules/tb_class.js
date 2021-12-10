import { getClassList, getClassCount } from '@/api/tb_class'

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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
