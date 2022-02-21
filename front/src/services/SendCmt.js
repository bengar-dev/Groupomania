import { api } from '../config/config.js'

import { htmlEntities } from '../functions/htmlEntities.js';

export function postCmt(postid, content, id) {

  const userInfo = JSON.parse(localStorage.getItem('info'))
  const axios = require('axios').default;

  function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&qut;');
    }

  let cmt = {
    userId: userInfo.userId,
    msg: htmlEntities(content),
    id: id
  }

  axios.post(api + '/api/post/' + postid + '/cmt', cmt, {
    headers: {'Authorization' : 'Bearer ' + userInfo.token}
  })
    .then(function (response) {
      console.log('ok')
    })
    .catch(function (error) {
      console.log(error)
    })
}