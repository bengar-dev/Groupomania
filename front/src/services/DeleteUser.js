import { api } from '../config/config.js'

export function deleteUser(pass){
  const userInfo = JSON.parse(localStorage.getItem('info'))
  const axios = require('axios').default;
  let data = {
      password: pass
  }

  return axios.delete(api + '/api/user/' + userInfo.userId, { data }, {
    headers: {'Authorization' : 'Bearer ' + userInfo.token}
  })
    .then(function (response){
      return true 
    })
    .catch(function (error){
      return false
    })
}