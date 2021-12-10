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
