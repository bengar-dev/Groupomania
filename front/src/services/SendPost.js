import { api } from '../config/config.js'

export function sendPost(content, postid, img) {
      const axios = require('axios').default;
      const userInfo = JSON.parse(localStorage.getItem('info'))

      function htmlEntities(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&qut;');
        }

        const data = new FormData();
        data.append('id', postid);
        data.append('content', htmlEntities(content));
        data.append('date', Date.now());
        data.append('profilImg', img)
        data.append('userId', userInfo.userId);

      axios.post(api + '/api/post', data, {
        headers: {
          'Authorization' : 'Bearer ' + userInfo.token,
          "Accept": 'application/json',
          "Content-Type": "application/json"}
      })
        .then(function (response) {
            console.log('Envoyé')
        })
        .catch(function (error){
          console.log(error)
        })
}
