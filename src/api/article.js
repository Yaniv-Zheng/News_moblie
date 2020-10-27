import request from '@/utils/request.js'

export const getArticles = params =>{
  return request({
    method:"GET",
    url:"app/v1_1/articles",
    params
  })
}

export const getChannels = () =>{
  return request({
    method:"GET",
    url:"/app/v1_0/channels"
  })
}


export const getArticleText = articleId =>{
  return request({
    method:"GET",
    url:`app/v1_0/articles/${articleId}`
  })
}