//import Auth from './services/Auth.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './components/Login.js'
import Register from './components/Register.js'

import Header from './components/Header.js'
import Footer from './components/Footer.js'

import Posts from './components/Posts.js'
import Profil from './components/Profil.js'
import EditProfil from './components/EditProfil.js'
import DeleteProfil from './components/DelProfil.js'
import UserProfil from './components/UserProfil.js'

// Recoil JS
import { useRecoilState } from 'recoil'
import { displayDark } from './atoms/settings.js'

import Error from './components/404.js'

function App() {

  const isAuth = localStorage.getItem('info')
  const [ dark, updateDark ] = useRecoilState(displayDark)
  const localSetting = localStorage.getItem('settings')

  if (!localSetting) {
    localStorage.setItem('settings', 'light')
  }

  return (
          <BrowserRouter>
            {isAuth !== null ?
                  <div className={localSetting}>
                    <Header />
                    <Routes>
                      <Route exact path='/' element={<Posts />} />
                      <Route path='profil' element={<Profil />} />
                      <Route path='edit-profil' element={<EditProfil />} />
                      <Route path='delete-profil' element={<DeleteProfil />} />
                      <Route path='user-profil/:id' element={<UserProfil />} />
                      <Route path='*' element={<Error />} />
                    </Routes>
                    <Footer />
                  </div>
                  :
                  <Routes>
                    <Route exact path='/' element={<Login />} />
                    <Route path='register' element={<Register />} />
                    <Route path='*' element={<Login />} />
                  </Routes>
            }
          </BrowserRouter>
  );
}

export default App;
