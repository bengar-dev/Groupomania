import Logo from '../assets/logo.png'

import { getInfo } from '../services/GetUser.js'
import Logout from '../services/Logout.js'

// RecoilJS
import { useRecoilState } from 'recoil'
import { content } from '../atoms/contenu.js'
import { userInfo } from '../atoms/userinfo.js'

function Header() {
  const [contenu, updateContenu ] = useRecoilState(content)
  const [user, updateUser] = useRecoilState(userInfo)

  // récupération info utilisateur
  async function repGetUser() {
    const userInfo = JSON.parse(localStorage.getItem('info'))
    const result = await getInfo(userInfo.userId, userInfo.token)
    if(!result) {
        console.log(result)
    } else {
        updateUser([result])
    }
  }

  // gestion contenu du forum
  function handleContent() {
    if (contenu === 0) {
      updateContenu(1)
    } else {
      updateContenu(0)
    }
  }
  // si notre state user est vide alors on appel notre fonction async GetUser pour récupérer les infos.
  if(user.length === 0) {
      repGetUser()
  }

  return(<div>
      <header className='bg-gray-400 w-full h-14 flex justify-around items-center shadow-lg'>
      <img className='h-10' src={Logo} alt='Groupomania Logo' />
      {user.map(info =>
      <div className='flex items-center' key={info.id}>
        <img className='w-10 h-10 object-cover rounded-full shadow border-2' src={info.avatar} alt='avatar' />
        <button className='ml-4 mr-2 text-sm font-medium text-white' onClick={handleContent}>{info.firstname} {info.lastname}</button>
        <Logout />
      </div>
      )}
    </header>
    </div>
  )
}

export default Header
