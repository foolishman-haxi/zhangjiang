//mock
import axios from "axios"
import '@/mock/index'
//后端接口
import request from '@/utils/request'

// 获取公告列表
export function getNoticeList() {
  return request({
    url: '/system/notice/list',
    method: 'get',
  })
}

// 查询公告
export function queryNotice(data) {
  return request({
    url: '/system/notice/queryNotice',
    method: 'get',
    params:data
  })
}

// 删除公告
export const deleteNotice = (id)=>{
  return request({
    url: '/system/notice/'+id,
    method: 'delete',
  })
}

//新增公告
export function submitAnnounce(data){
  return request({
    url:'/system/notice',
    method:'post',
    data:{
      noticeTitle:"noticeTitle",
      noticeContent:'noticeContent'
    }
  })
} 