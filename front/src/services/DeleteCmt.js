import { api } from '../config/config.js'

export function deleteCmt(cmtid){

  const userInfo = JSON.parse(localStorage.getItem('info'))
  const axios = require('axios').default;
  axios.delete(api + '/api/post/cmt/' + cmtid, {
    headers: {'Authorization' : 'Bearer ' + userInfo.token}
  })
    .then(function (response){ // Récupération des données, et mis en state.
      console.log('ok') // On rappelle notre fonction GetPosts
    })
    .catch(function (error){
      console.log(error)
    })
}