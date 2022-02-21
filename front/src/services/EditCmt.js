import { api } from "../config/config"

export function editCmt(textId, cmtid) {

    const userInfo = JSON.parse(localStorage.getItem('info'))
    const axios = require('axios').default;

    let textValue = document.getElementById(textId).value
    let msgValue = {
      msg: textValue
    }
    axios.put(api + '/api/post/cmt/' + cmtid, msgValue, {
      headers: {'Authorization' : 'Bearer ' + userInfo.token}
    })
      .then(function (response){ 
        document.getElementById(textId).value = ''
        console.log(response)
      })
      .catch(function (error){
        console.log(error)
      })
  }