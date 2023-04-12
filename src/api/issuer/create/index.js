import request from '@/utils/request'
import axios from 'axios'


// 创建发行方
export function createIssuer(data) {
  return request({
    url: '/system/issuer',
    method: 'post',
    data,
  })
}

// 修改发行方
export function updateIssuer(data) {
  return request({
    url: '/system/issuer',
    method: 'put',
    data,
  })
}

// 上传头像
export function uploadAvatar(avatar) {
  return request({
    url: '/files/send',
    method: 'post',
    data:avatar,
  })
}