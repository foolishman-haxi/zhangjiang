import axios from "axios"
import '@/mock/index'

// 获取订单信息
export const getOrdersList = (param)=>{
  return axios.post('/order/list',param)
}
// 删除订单
export const deleteOrder = (param)=>{
  return axios.post('/order/delete',param)
}