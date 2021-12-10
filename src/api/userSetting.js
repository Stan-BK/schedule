import request from '@/utils/request'
import qs from 'qs'

export function getInfo() {
  return request({
    url: '/user/web/getinfo',
    method: 'post'
  })
}

export function updateInfo(data) {
  return request({
    url: '/user/web/update_info',
    method: 'post',
    data
  })
}

export function changeUserName(data) {
  return request({
    url: '/user/web/update_info',
    method: 'post',
    data
  })
}
