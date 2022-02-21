//Recoil JS
import { useRecoilState } from 'recoil'
import {content} from '../atoms/contenu.js'
import { userInfo } from '../atoms/userinfo.js'

function Profil() {

  const [ contenu, updateContenu ] = useRecoilState(content)
  const [ user, updateUser ] = useRecoilState(userInfo)

  return ( <div className='mt-10 flex flex-col items-center container mx-auto max-w-screen-md bg-white rounded-lg shadow-lg'>
    {user.map(info =>
        <div key={info.id} className='container flex flex-col w-full items-center p-6 rounded-lg md:flex-row'>
        <div className='container w-full flex flex-col items-center md:w-2/5'>
          <img className='w-32 h-32 object-cover w-fit rounded-full' src={info.avatar} alt='avatar' />
          {info.admin === 0 ? <span className='mt-4 bg-blue-400 text-white text-center p-0.5 w-24 text-sm font-medium'>Membre</span> : <span className='mt-4 bg-red-400 text-white text-center p-0.5 w-24 text-sm font-medium'>Admin</span> }
        </div>
        <div className='container flex flex-col w-full mt-6 md:mt-0 md:w-3/5'>
          <h1 className='text-center font-bold uppercase text-2xl text-gray-600 mb-2 md:mb-0'>My Profil</h1>
          <h2 className='font-medium uppercase text-gray-600'>Firstname</h2>
          <p className='ml-4 text-sm text-slate-500'>{info.firstname}</p>
          <h2 className='mt-4 font-medium uppercase text-gray-600'>Lastname</h2>
          <p className='ml-4 text-sm text-slate-500'>{info.lastname}</p>
          <h2 className='mt-4 font-medium uppercase text-gray-600'>Email</h2>
          <p className='ml-4 text-sm text-slate-500'>{info.email}</p>
        </div>
        </div>
        )}
        <button className='w-11/12 mb-2 flex justify-center items-center p-2 bg-gray-200 hover:bg-orange-400 rounded uppercase text-sm border border-gray-400 hover:border-orange-600 text-gray-800 hover:text-white hover:shadow' onClick={(e) => e.preventDefault(updateContenu(2))}>Edit my profil</button>
        </div>
  )
}

export default Profil
