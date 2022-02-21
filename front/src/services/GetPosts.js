import { api } from '../config/config.js'

export function getPosts() {

  const userInfo = JSON.parse(localStorage.getItem('info'))
  // utilisation axios
  const axios = require('axios').default;
  // utilisation de state temp afin d'éviter un flood de requete

    return axios.get(api + '/api/post/', {
      headers: {'Authorization' : 'Bearer ' + userInfo.token}
    })
      .then(function (response){ // Récupération des données, et mis en state.
        const data = response.data.rows
        return data
      })
      .catch(function (error){
        console.log(error)
        return false
      })
  
}