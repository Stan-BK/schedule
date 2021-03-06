import request from '@/utils/request'
import qs from 'qs'

export function getClassroomCount() {
  return request({
    url: '/classroom/web/count',
    method: 'get'
  })
}

export function getClassroomList() {
  return request({
    url: '/classroom/web/classroomList',
    method: 'post'
  })
}

export function selectByClassroomAddress(data) {
  return request({
    url: '/classroom/web/selectByClassroomAddress',
    method: 'put',
    data: qs.stringify(data)
  })
}

export function addClassroom(data) {
  return request({
    url: '/classroom/web/addClassroom',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function updateClassroom(data) {
  return request({
    url: '/classroom/web/updateClassroom',
    method: 'put',
    data: qs.stringify(data)
  })
}

export function deleteClassroom(data) {
  return request({
    url: '/classroom/web/deleteClassroom',
    method: 'put',
    data: qs.stringify(data)
  })
}

export function deleteClassroomList(params) {
  return request({
    url: '/classroom/web/deleteClassroomList',
    method: 'get',
    params: qs.stringify(params['arr'], { arrayFormat: 'repeat' })
  })
}

export function exportClassroom() {
  return request({
    url: '/classroom/web/exportClassroom',
    method: 'post',
    responseType: 'blob'
  })
}
