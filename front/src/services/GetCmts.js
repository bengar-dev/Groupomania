import { api } from '../config/config.js'

export function getCmts(postid) {

    const userInfo = JSON.parse(localStorage.getItem('info'))
    const axios = require('axios').default;

      return axios.get(api + '/api/post/cmt/all', {
        headers: {'Authorization' : 'Bearer ' + userInfo.token}
      })
        .then(function (response) {
          const data = response.data.rows
          return data 
        })
        .catch(function (error) {
          console.log(error)
          return error
        })
    }
