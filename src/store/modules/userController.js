import { getUserCount, getUserList, deleteUser, addUser } from '@/api/userController'

const state = {
  userCount: 0,
  userList: []
}

const mutations = {
  SET_USERCOUNT(state, count) {
    state.userCount = count
  }
}

const actions = {
  getUserCount({ commit }) {
    return new Promise((resolve, reject) => {
      getUserCount().then(response => {
        const { count } = response.data
        commit('SET_USERCOUNT', count)
        resolve()
      })
    })
  },
  getUserList({ commit }) {
    return new Promise((resolve, reject) => {
      getUserList().then(response => {
        const { user } = response.data
        resolve(user)
      })
    })
  },
  addUser({ commit }, params) {
    return new Promise((resolve, reject) => {
      addUser(params).then(() => {
        resolve()
      }).catch(() => {
        reject('添加失败')
      })
    })
  },
  deleteUser({ commit }, params) {
    return new Promise((resolve, reject) => {
      deleteUser(params).then(() => {
        resolve()
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
