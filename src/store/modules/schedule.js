import { getScheduleList, getInfoByClassId, getInfoByClassName, getInfoByClassroomName, getInfoByTeacherName, getInfoByTime } from '@/api/schedule'
import { Message } from 'element-ui'

const state = {
  scheduleList: []
}

const mutations = {
  SET_SCHEDULELIST: (state, data) => {
    state.scheduleList = data
  }
}

const actions = {
  getScheduleList({ commit }) {
    return new Promise((resolve, reject) => {
      getScheduleList().then(response => {
        const { data } = response
        commit('SET_SCHEDULELIST', data.Schedule)
        resolve(data.Schedule)
      })
    })
  },
  searchInfo({ commit }, params) {
    const type = params.type
    const searchStr = params.searchStr
    return new Promise((resolve, reject) => {
      switch (type) {
        case 'schedule_id': getInfoByClassId(searchStr).then(response => {
          const { data } = response
          resolve(data.schedule)
        })
          break
        case 'classes_name': getInfoByClassName(searchStr).then(response => {
          const { data } = response
          resolve(data)
        })
          break
        case 'scheduled_classroom': getInfoByClassroomName(searchStr).then(response => {
          const { data } = response
          resolve(data)
        })
          break
        case 'teacher_name': getInfoByTeacherName(searchStr).then(response => {
          const { data } = response
          resolve(data)
        })
          break
        case 'time': getInfoByTime(searchStr).then(response => {
          const { data } = response
          resolve(data.schedule)
        })
          break
        default: Message({
          type: 'warning',
          message: '请选择查询类型'
        })
          break
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
