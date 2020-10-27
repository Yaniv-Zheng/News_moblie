import request from '@/utils/request.js'

export const getComments = params =>{
  return request({
    method:"GET",
    url:"app/v1_0/comments",
    params
  })
}

export const setComments = data =>{
  return request({
    method:"POST",
    url:"app/v1_0/comments",
    data
  })
}