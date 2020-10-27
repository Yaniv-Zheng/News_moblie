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

export const getUsers = () =>{
  return request({
    method:'GET',
    url:'/app/v1_0/user'
  })
}

export const getChannels = () =>{
  return request({
    method:'GET',
    url:'/app/v1_0/user/channels'
  })
}

export const setChannels = data =>{
  return request({
    method:'PATCH',
    url:'/app/v1_0/user/channels',
    data
  })
}

export const delteChannels = target =>{
  return request({
    method:'DELETE',
    url:`/app/v1_0/user/channels/${target}`
  })
}