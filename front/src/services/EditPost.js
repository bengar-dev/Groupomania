import { api } from "../config/config"

export function editPost(textId, postid, img) {

    const userInfo = JSON.parse(localStorage.getItem('info'))
    const axios = require('axios').default;
    console.log(img)
    let textValue = document.getElementById(textId).value
    let msgValue = {
      msg: textValue,
      img: ''
    }
    if (img) {
      let msgValue = {
        msg: textValue,
        img: img
      }
    }
    if (!textValue && !img) {
      return false
    }
    if (img || textValue !== '') {
      axios.put(api + '/api/post/' + postid, msgValue, {
        headers: {'Authorization' : 'Bearer ' + userInfo.token}
      })
        .then(function (response){ // Récupération des données, et mis en state.
          document.getElementById(textId).value = ''
          console.log('ok')
        })
        .catch(function (error){
          console.log(error)
        })
    }
  }
