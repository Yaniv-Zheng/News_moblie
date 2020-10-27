import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router/index'

const refreshReq = axios.create({
  baseURL:'http://ttapi.research.itcast.cn/'
}) 

const request = axios.create({
  baseURL:'http://ttapi.research.itcast.cn/',
  transformResponse:[function(data){
    try {
      return JSONbig.parse(data)
    } catch (error) {
      return data
    }
  }]
})

//请求拦截器
request.interceptors.request.use(function (config) {
  const {user} = store.state
  if(user){
    config.headers.Authorization=`Bearer ${user.token}`
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

//响应拦截器
request.interceptors.response.use(function (response) {
  return response;
}, async function (error) {
  const status = error.response.status
  const { user } = store.state
  if(status===400){
    Toast.fail('客户端请求参数异常')
  }else if(status===401){
    if(!user || !user.token){
      return redirectLogin()
    }
    try {
      const { data } = await refreshReq({
        url:'/app/v1_0/authorizations',
        method:'PUT',
        headers:{
          Authorization:`Bearer ${user.refresh_token}`
        }
      })
      user.token = data.data.token
      store.commit('setUsers',user)
      return request(error.config)
    } catch (error) {
      Toast.fail('登录已过期')
      return redirectLogin()
    }
  }else if(status===403){
    Toast.fail('没有操作权限')
  }else if(status>=500){
    Toast.fail('服务器异常，请稍后重试')
  }

  function redirectLogin(){
    router.replace({
      name:'login',
      query:{
        redirect:router.currentRoute.fullPath
      }
    })
  }
  return Promise.reject(error);
});

export default request