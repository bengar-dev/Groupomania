import { Link } from 'react-router-dom'

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
          {info.admin === 0 ? <span className='mt-4 bg-teal-700 text-white text-center p-0.5 w-24 text-sm font-medium'>Membre</span> : <span className='mt-4 bg-red-400 text-white text-center p-0.5 w-24 text-sm font-medium'>Admin</span> }
        </div>
        <div className='container flex flex-col w-full mt-6 md:mt-0 md:w-3/5'>
          <div className='flex w-full justify-between'><h1 className='text-center font-bold uppercase text-2xl text-gray-600 mb-2 md:mb-0'>My Profil</h1></div>
          <h2 className='font-medium uppercase text-gray-600'>Firstname</h2>
          <p className='ml-4 text-sm text-slate-500'>{info.firstname}</p>
          <h2 className='mt-4 font-medium uppercase text-gray-600'>Lastname</h2>
          <p className='ml-4 text-sm text-slate-500'>{info.lastname}</p>
          <h2 className='mt-4 font-medium uppercase text-gray-600'>Email</h2>
          <p className='ml-4 text-sm text-slate-500'>{info.email}</p>
        </div>
        </div>
        )}
        <div className='flex flex-row-reverse w-full mb-2 mr-2'>
        <Link to='/edit-profil'><button aria-label="Edit Profil" title="Edit Profil" type='button' className='ml-auto mr-auto mt-2 md:mt-0 md:mr-1 p-2 bg-emerald-100 border border-emerald-400 w-11/12 md:w-20 text-center rounded text-emerald-700 hover:bg-emerald-400 hover:text-white'><i className='fas fa-pen' /></button></Link>
        <Link to='/'><button aria-label="Back to Home" title="Back to Home" type='button' className='ml-auto mr-auto mt-2 md:mt-0 md:mr-1 p-2 bg-orange-100 border border-orange-400 w-11/12 md:w-20 text-center rounded text-orange-700 hover:bg-orange-400 hover:text-white'><i className="fas fa-arrow-circle-left"></i></button></Link>
        </div>
        </div>
  )
}

export default Profil
