import request from '@/utils/request'
import qs from 'qs'

export function getCourseList() {
  return request({
    url: '/course/web/CourseList',
    method: 'post'
  })
}

export function getCourseCount() {
  return request({
    url: '/course/web/count',
    method: 'get'
  })
}

export function addCourse(data) {
  return request({
    url: '/course/web/addCourse',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getCourse(params) {
  return request({
    url: '/course/web/selectByLikeCourseName',
    method: 'put',
    params
  })
}

export function deleteCourse(params) {
  return request({
    url: '/course/web/deleteCourse',
    method: 'put',
    params
  })
}

export function updateCourse(params) {
  return request({
    url: '/course/web/updateCourse',
    method: 'put',
    params
  })
}

export function exportCourse() {
  return request({
    url: '/course/web/exportCourse',
    method: 'post',
    responseType: 'blob'
  })
}
