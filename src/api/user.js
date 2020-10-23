import request from '@/utils/request.js'

export const login = data =>{
  return request({
    method:'POST',
    url:'/app/v1_0/authorizations',
    data
  })
}

export const sendSms = num =>{
  return request({
    method:'GET',
    url:`/app/v1_0/sms/codes/${num}`
  })
}