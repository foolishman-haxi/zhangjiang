import request from '@/utils/request'

//获取套系列表
export function listSystem(query) {
    return request({
      url: '/system/system/list',
      method: 'get',
      params: query
    })
  }
  // 查询【请填写功能名称】详细
export function getSystem(id) {
    return request({
      url: '/system/system/' + id,
      method: 'get'
    })
  }
  //按套系名字查询
  export function findSystem(query) {
    return request({
      url: '/system/system/queryCollections',
      method: 'get',
      params: query
    })
  }
  // 新增套系
  export function addSystem(data) {
    return request({
      url: '/system/system',
      method: 'post',
      data: data
    })
  }
  
  // 修改套系列表
  export function updateSystem(data) {
    return request({
      url: '/system/system',
      method: 'put',
      data: data
    })
  }
  
  // 删除套系
  export function delSystem(id) {
    return request({
      url: '/system/system/' + id,
      method: 'delete'
    })
  }