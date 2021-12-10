import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import schedule from './modules/schedule'
import tb_class from './modules/tb_class'
import userController from './modules/userController'
import teacher from './modules/teacher'
import classroom from './modules/classroom'
import userSetting from './modules/userSetting'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    schedule,
    tb_class,
    userController,
    teacher,
    classroom,
    userSetting
  },
  getters
})

export default store
