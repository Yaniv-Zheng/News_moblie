import request from '@/utils/request.js'

export const getSuggestion = q =>{
  return request({
    method:'GET',
    url:'/app/v1_0/suggestion',
    params:{
      q
    }
  })
}

export const getResult = params =>{
  return request({
    method:'GET',
    url:'app/v1_0/search',
    params
  })
}

//获取历史记录
export const getHistory = () =>{
  return request({
    method:'GET',
    url:'app/v1_0/search/histories'
  })
}