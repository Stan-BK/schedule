import request from '@/utils/request'
import qs from 'qs'

export function getUserCount() {
  return request({
    url: '/user/web/count',
    method: 'get'
  })
}

export function getUserList() {
  return request({
    url: '/user/web/users_list',
    method: 'post'
  })
}

export function addUser(data) {
  return request({
    url: '/user/web/register',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function deleteUser(params) {
  return request({
    url: '/user/web/delete',
    method: 'get',
    params
  })
}
