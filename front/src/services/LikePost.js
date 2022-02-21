import { api } from '../config/config.js'

export function likePost(postid, value){

  const userInfo = JSON.parse(localStorage.getItem('info'))
  const axios = require('axios').default;
  
  let like = {
    like: value,
    userId: userInfo.userId
  }

  axios.post(api + '/api/post/' + postid + '/like', like, {
    headers: {'Authorization' : 'Bearer ' + userInfo.token}
  })
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      console.log(error)
    })
}