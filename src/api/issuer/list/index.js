import request from '@/utils/request'
import axios from 'axios'

// 获取发行方列表
export function getIssuerList(data) {
  return request({
    url: '/system/issuer/list',
    method: 'get',
    params:data
  })
}
// 删除发行方
export function deleteIssuer(id) {
  return request({
    url: '/system/issuer/'+id,
    method: 'delete',
  })
}
// 按名字查询
export function findIssuer(data) {
  return request({
    url: '/system/issuer/searchIssuer',
    method: 'get',
    params:data,
  })
}

