import { getInfo, updateInfo, updateAvatar, changeUserName } from '@/api/userSetting'

const state = {
  userInfo: {}
}

const mutations = {
}

const actions = {
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        resolve(response.data)
      })
    })
  },
  updateInfo({ }, form) {
    return new Promise((resolve, reject) => {
      updateInfo(form).then(() => {
        resolve('修改成功')
      })
    })
  },
  updateAvatar({}, form) {
    return new Promise((resolve, reject) => {
      updateAvatar(form).then(() => {
        resolve('修改头像成功')
      })
    })
  },
  changeUserName({ }, form) {
    return new Promise((resolve, reject) => {
      changeUserName(form).then(() => {
        resolve('修改用户名成功')
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
