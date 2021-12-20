import request from '@/utils/request'
import qs from 'qs'

export function getScheduleList() {
  return request({
    url: '/schedule/web/schedulesList',
    method: 'post'
  })
}

export function getInfoByClassId(data) {
  return request({
    url: '/schedule/web/selectByClassId',
    method: 'put',
    data: qs.stringify(data)
  })
}

export function getInfoByClassName(data) {
  return request({
    url: '/schedule/web/selectByClassName',
    method: 'put',
    data: qs.stringify(data)
  })
}

export function getInfoByClassroomName(params) {
  return request({
    url: '/schedule/web/selectByClassroomName',
    method: 'put',
    params
  })
}

export function getInfoByTeacherName(data) {
  return request({
    url: '/schedule/web/selectByTeacherName',
    method: 'put',
    data: qs.stringify(data)
  })
}

export function getInfoByTime(data) {
  return request({
    url: '/schedule/web/selectByTime',
    method: 'put',
    data: qs.stringify(data)
  })
}

export function tiaoke(params) {
  return request({
    url: '/schedule/web/tiaoke',
    method: 'post',
    params
  })
}

export function addTiaoke(params) {
  return request({
    url: '/schedule/web/addTiaoKe',
    method: 'post',
    params
  })
}

