import Logo from '../assets/logo.png'

import { Link, useNavigate } from 'react-router-dom'

import { getInfo } from '../services/GetUser.js'
import Logout from '../services/Logout.js'

// RecoilJS
import { useRecoilState } from 'recoil'
import { content } from '../atoms/contenu.js'
import { userInfo, userPublic } from '../atoms/userinfo.js'
import { authState } from '../atoms/auth.js'

function Header() {
  const [user, updateUser] = useRecoilState(userInfo)
  const [users, updateUsers ] = useRecoilState(userPublic)
  const [auth, updateAuth] = useRecoilState(authState)
  const navigate = useNavigate()

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

  // si notre state user est vide alors on appel notre fonction async GetUser pour récupérer les infos.
  if(user.length === 0) {
      repGetUser()
  }

  return(<div>
      <header className='bg-gray-400 w-full h-14 flex justify-around items-center shadow-lg'>
      <button><img className='h-10' src={Logo} alt='Groupomania Logo' onClick={(e) => e.preventDefault(updateUsers([]), navigate('/'))}/></button>
      {user.map(info =>
      <div className='flex items-center' key={info.id}>
        <img className='w-10 h-10 object-cover rounded-full shadow border-2' src={info.avatar} alt='avatar' />
        <button className='transition-all ml-4 mr-2 text-sm font-medium text-gray-800 hover:text-black' onClick={(e) => e.preventDefault(updateUsers([]), navigate('/profil'))}>{info.firstname} {info.lastname}</button>
        <Logout />
      </div>
      )}
    </header>
    </div>
  )
}

export default Header
