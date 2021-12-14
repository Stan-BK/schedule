import request from '@/utils/request'

export function getClassList() {
  return request({
    url: '/tbclass/web/classList',
    method: 'post'
  })
}

export function getClassCount() {
  return request({
    url: '/tbclass/web/count',
    method: 'get'
  })
}

export function getClassInfo(params) {
  return request({
    url: '/tbclass/web/selectByLikeClassName',
    method: 'put',
    params
  })
}

export function addClass(params) {
  return request({
    url: '/tbclass/web/addClass',
    method: 'post',
    params
  })
}

export function updateClass(params) {
  return request({
    url: '/tbclass/web/updateClass',
    method: 'put',
    params
  })
}

export function deleteClass(params) {
  return request({
    url: '/tbclass/web/deleteClass',
    method: 'put',
    params
  })
}
