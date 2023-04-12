import request from '@/utils/request'

// 获取用户列表
export function getUsersList(data) {
  return request({
    url: '/system/user/list',
    method: 'get',
    params:data
  })
}