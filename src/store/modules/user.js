import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    user_id: -1,
    user_role: 0,
    token: getToken(),
    name: '',
    avatar: '',
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_AUTHROUTES: (state) => {
    state.routeList = state.authRoutes
  },
  SET_USERID: (state, user_id) => {
    state.user_id = user_id
  },
  SET_USERROLE: (state, user_role) => {
    state.user_role = user_role
  }
}

const actions = {
  // user login
  login({ state, commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ user_name: username.trim(), user_pwd: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
        if (data.user_role === 2) {
          commit('SET_USERROLE', 1)
          sessionStorage.setItem('roleRoute', 1)
        } else {
          commit('SET_USERROLE', 0)
          sessionStorage.setItem('roleRoute', 0)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { user_name, user_headPortrait, user_id } = data

        commit('SET_NAME', user_name)
        commit('SET_AVATAR', user_headPortrait)
        commit('SET_USERID', user_id)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken()
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  setAuthRoutes({ commit }) {
    commit('SET_AUTHROUTES')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

