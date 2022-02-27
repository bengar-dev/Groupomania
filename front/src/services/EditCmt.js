import { api } from "../config/config"

export function editCmt(textId, cmtid) {

  function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&qut;');
    }

    const userInfo = JSON.parse(localStorage.getItem('info'))
    const axios = require('axios').default;

    let textValue = document.getElementById(textId).value
    let msgValue = {
      msg: htmlEntities(textValue)
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
