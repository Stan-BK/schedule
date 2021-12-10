import request from '@/utils/request'
import qs from 'qs'

export function getTeacherCount() {
  return request({
    url: '/teacher/web/count',
    method: 'get'
  })
}

export function getTeacherList() {
  return request({
    url: '/teacher/web/teachersList',
    method: 'post'
  })
}

export function addTeacher(data) {
  return request({
    url: '/teacher/web/addTeacher',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function deleteTeacher(data) {
  return request({
    url: '/teacher/web/deleteTeacher',
    method: 'put',
    data: qs.stringify(data)
  })
}

export function updateTeacher(data) {
  return request({
    url: '/teacher/web/updateTeacher',
    method: 'put',
    data: qs.stringify(data)
  })
}

export function selectByTeacherId(data) {
  return request({
    url: '/teacher/web/selectByTeacherId',
    method: 'put',
    data: qs.stringify(data)
  })
}
