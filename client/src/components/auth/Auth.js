
export const getAccessToken = () => {
  return window.localStorage.getItem('wittle-user-token')
}

export const getPayLoad = () => {
  const token = getAccessToken()
  if (!token) return
  const payLoad = token.split('.')[1]
  // console.log(payLoad)
  // console.log(JSON.parse(atob(payLoad)))
  return JSON.parse(atob(payLoad)) // can try and use Buffer
}

export const isUserAuth = () => {
  const payLoad = getPayLoad()
  if (!payLoad) return false
  const currentTime = Math.floor(Date.now() / 1000)
  return payLoad.exp > currentTime
}

export const isUserOwner = (resort) => {
  const payLoad = getPayLoad()
  if (!payLoad) return
  console.log(payLoad.sub)
  console.log(resort.owner._id)
  return resort.owner._id === payLoad.sub
}

export const getUserToken = () => {
  return window.localStorage.getItem('wittle-username')
}