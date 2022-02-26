import Logo from '../assets/logo.png'

import { Link, useNavigate } from 'react-router-dom'

import { getInfo } from '../services/GetUser.js'
import Logout from '../services/Logout.js'

// RecoilJS
import { useRecoilState } from 'recoil'
import { content } from '../atoms/contenu.js'
import { userInfo, userPublic } from '../atoms/userinfo.js'
import { displayDark, switchDark } from '../atoms/settings.js'
import { authState } from '../atoms/auth.js'

function Header() {
  const [user, updateUser] = useRecoilState(userInfo)
  const [users, updateUsers ] = useRecoilState(userPublic)
  const [auth, updateAuth] = useRecoilState(authState)
  const [dark, updateDark] = useRecoilState(displayDark)
  const [darkSwitch, updateSwitch] = useRecoilState(switchDark)
  const navigate = useNavigate()
  const localSetting = localStorage.getItem('settings')

  // récupération info utilisateur
  async function repGetUser() {
    const userInfo = JSON.parse(localStorage.getItem('info'))
    const result = await getInfo(userInfo.userId, userInfo.token)

    if(!result) {
        console.log(result)
        localStorage.removeItem('info');
        updateAuth(0)
    } else {
        updateUser([result])
    }
  }

  let darkClass = 'transition-all absolute h-8 w-8 shadow-lg border rounded-full'
  if(localSetting === 'light') {
    updateSwitch('ml-0')
    darkClass = darkClass + ' bg-sky-300 border-sky-400 ' + darkSwitch
  } else {
    updateSwitch('ml-6')
    darkClass = darkClass + ' bg-sky-900 border-sky-600 ' + darkSwitch
  }

  // si notre state user est vide alors on appel notre fonction async GetUser pour récupérer les infos.
  if(user.length === 0) {
      repGetUser()
  }

  function handleDark(statut) {
    if (statut === 'light') {
      updateDark('dark')
      updateSwitch('ml-6')
      localStorage.setItem('settings', 'dark')
    } else {
      updateDark('')
      updateSwitch('ml-0')
      localStorage.setItem('settings', 'light')
    }
  }

  function handleButton() {
    if (localSetting === 'light') {
      return <i className="fas fa-sun text-yellow-400"></i>
    }
    else {
      return <i className="fas fa-moon text-white"></i>
    }
  }

  return(<div>
      <header className='bg-gray-400 dark:bg-gray-600 w-full h-14 flex justify-around items-center shadow-lg'>
      <button><img className='h-10' src={Logo} alt='Groupomania Logo' onClick={(e) => e.preventDefault(updateUsers([]), navigate('/'))}/></button>
      {user.map(info =>
      <div className='flex items-center' key={info.id}>
        <div className='flex items-center'>
          <button className={darkClass} onClick={(e) => e.preventDefault(handleDark(localSetting))}>{handleButton()}</button>
          <div className='bg-white h-6 w-14 mr-20 rounded-full'></div>
        </div>
        <img className='w-10 h-10 object-cover rounded-full shadow border-2' src={info.avatar} alt='avatar' />
        <button className='transition-all ml-4 mr-2 text-sm font-medium text-gray-800 dark:text-white dark:hover:text-gray-300 hover:text-black' onClick={(e) => e.preventDefault(updateUsers([]), navigate('/profil'))}>{info.firstname} {info.lastname}</button>
        <Logout />
      </div>
      )}
    </header>
    </div>
  )
}

export default Header
