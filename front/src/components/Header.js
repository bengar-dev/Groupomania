import Logo from '../assets/logo.png'

import { Link } from 'react-router-dom'

import { getInfo } from '../services/GetUser.js'
import Logout from '../services/Logout.js'

// RecoilJS
import { useRecoilState } from 'recoil'
import { content } from '../atoms/contenu.js'
import { userInfo } from '../atoms/userinfo.js'
import { authState } from '../atoms/auth.js'

function Header() {
  const [user, updateUser] = useRecoilState(userInfo)
  const [auth, updateAuth] = useRecoilState(authState)

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
      <Link to='/'><img className='h-10' src={Logo} alt='Groupomania Logo' /></Link>
      {user.map(info =>
      <div className='flex items-center' key={info.id}>
        <img className='w-10 h-10 object-cover rounded-full shadow border-2' src={info.avatar} alt='avatar' />
        <Link to='/profil'><button className='transition-all ml-4 mr-2 text-sm font-medium text-gray-800 hover:text-black'>{info.firstname} {info.lastname}</button></Link>
        <Logout />
      </div>
      )}
    </header>
    </div>
  )
}

export default Header
