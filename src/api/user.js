import request from '@/utils/request'
import qs from 'qs'

export function login(data) {
  return request({
    url: '/user/web/login',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getInfo() {
  return request({
    url: '/user/web/getinfo',
    method: 'post'
  })
}

