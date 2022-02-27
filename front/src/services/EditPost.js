import { api } from "../config/config"

export function editPost(textId, postid, img, imgval, msgval, msg) {

  function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&qut;');
    }
    const userInfo = JSON.parse(localStorage.getItem('info'))
    const axios = require('axios').default;
    let msgValue = new FormData();
    msgValue.append('msg', htmlEntities(msgval ? msgval : msg));
    console.log(img)
    console.log(imgval)
    if (imgval) {
        msgValue.append('profilImg', imgval)
    }
    if (!imgval && img) {
        msgValue.append('img', img)
    }
    if (!msg && !msgval && !img && !imgval) {
      return false
    }
    if (img || imgval || msg || msgval) {
      axios.put(api + '/api/post/' + postid, msgValue, {
        headers: {
          'Authorization' : 'Bearer ' + userInfo.token,
          "Accept": 'application/json',
          "Content-Type": "application/json"}
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
