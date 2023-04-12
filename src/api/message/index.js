import request from '@/utils/request'
import qs from 'qs'; //引入 == 局部引入不需要在main.js配置中引入

//获取消息列表
export function getMessageList(list){
    return request({
        url:'system/infos/list',
        method:'get'
    })
}
//搜索消息功能
export function searchMessage(title){
    return request({
        url:'/system/infos/queryLcd?title='+title,
        method:'get'
    })
}
//删除消息
export const messageDel = (id) =>{
    return request({
        url:'/system/infos/' + id,
        method: 'delete'
    })
}
//新增消息
export function submitMessage(data){
    return request({
        url:'/system/infos',
        method:'post',
        data:qs.stringify("addTitle"),
    }) 
}