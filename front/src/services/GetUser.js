import { api } from '../config/config.js'

export function getInfo(userId, token) {
  // utilisation axios
  const axios = require('axios').default;

  return axios.get(api + '/api/user/' + userId, {
    headers: {'Authorization' : 'Bearer ' + token}
  })
    .then(function (response){ // Récupération des données, et mis en state.
      return response.data.rows[0]
    })
    .catch(function (error){
      return false
    })
}
