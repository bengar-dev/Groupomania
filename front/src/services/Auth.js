import { api } from '../config/config.js'

import { useRecoilState } from 'recoil'
import { authState } from '../atoms/auth.js'
// components
import SignIn from '../pages/Signin.js'
import Forum from '../pages/Forum.js'

import { Routes, Route, Link } from "react-router-dom";

function Auth() {

  const [auth, updateAuth] = useRecoilState(authState)

  const isAuth = () => localStorage.getItem("info") != null

  return (
      isAuth() ?
        <Forum />
      : <SignIn />
  )
}

export default Auth

/* <Routes>
  {auth === 0 ? <Route path="/" element={<SignIn />} /> : <Route path="/forum" element={<Forum />} />}
</Routes> */
