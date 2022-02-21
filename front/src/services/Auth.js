import { api } from '../config/config.js'

import { useRecoilState } from 'recoil'
import { authState } from '../atoms/auth.js'
// components
import SignIn from '../pages/Signin.js'
import Forum from '../pages/Forum.js'

function Auth() {

  const [auth, updateAuth] = useRecoilState(authState)

  const axios = require('axios').default;
  const userInfo = JSON.parse(localStorage.getItem('info'))
  // si token présent en localStorage..
  if (userInfo) {
    axios.get(api + '/api/user/' + userInfo.userId, {
      headers: {'Authorization' : 'Bearer ' + userInfo.token}
    })
      .then(function (response){
        updateAuth(1)
      })
      .catch(function (error){
        localStorage.removeItem('info')
        updateAuth(0)
      })
  }
  //vérification si on est auth ou non.
  if(auth === 0) {
    return (
      <SignIn />
    )
  } else {
    return (
      <Forum />
    )
  }
}

export default Auth
