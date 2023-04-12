import request from '@/utils/request'

// 查询列表
export function listCollections(id) {
  return request({
    url: '/system/collections/list/' + id,
    method: 'get'
  })
}

// 查询详细
export function getCollections(id) {
  return request({
    url: '/system/collections/' + id,
    method: 'get'
  })
}

// 新增
export function addCollections(data) {
  return request({
    url: '/system/collections',
    method: 'post',
    data: data
  })
}

// 修改
export function updateCollections(data) {
  return request({
    url: '/system/collections',
    method: 'put',
    data: data
  })
}

// 删除
export function delCollections(id) {
  return request({
    url: '/system/collections/' + id,
    method: 'delete'
  })
}
