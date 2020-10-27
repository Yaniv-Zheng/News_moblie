export const setStorage = (name,data) =>{
    return window.localStorage.setItem(name,JSON.stringify(data))
  }

export const getStorage = name =>{
  try {
    return JSON.parse(window.localStorage.getItem(name))
  } catch (error) {
    return data
  }
}

export const removeStorage = name =>{
  window.localStorage.removeItem(name)
}