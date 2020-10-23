export const storage = (name,data) =>{
  if(data instanceof Object){
    return window.localStorage.setItem(name,JSON.stringify(data))
  }else{
    try {
      return JSON.parse(window.localStorage.getItem(name))
    } catch (error) {
      return data
    }
  }
}

export const removeStorage = name =>{
  window.localStorage.removeItem(name)
}