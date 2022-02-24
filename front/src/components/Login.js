import { Link, useNavigate } from 'react-router-dom'

import logo from '../assets/logo_height.png'

import {getLogin} from '../services/getLogin.js'

import { useRecoilState } from 'recoil'
import { authState } from '../atoms/auth.js'
import { msgForm, emailValue, passwordValue, firstnameValue, lastnameValue } from '../atoms/form.js'


function Login() {

    const [msg, updateMsg] = useRecoilState(msgForm)
    const [first, updateFirst] = useRecoilState(firstnameValue)
    const [last, updateLast] = useRecoilState(lastnameValue)
    const [email, updateMail] = useRecoilState(emailValue)
    const [pass, updatePass] = useRecoilState(passwordValue)
    const [auth, updateAuth] = useRecoilState(authState)
    const navigate = useNavigate()

    function verifLogin(e) {
      if (email === '' || pass === '') {
        updateMsg('All fields must be filled')
      }
      async function repLogin() { // fonction async pour verif le login
      const result = await getLogin(email, pass)
      if(!result) {
        updateMsg('Email / Password incorrect')
        updateAuth(0)
      } else {
        localStorage.setItem('info', JSON.stringify(result))
        navigate('/')
        window.location.reload(false);
        updateMsg('')
        updateMail('')
        updatePass('')
        updateFirst('')
        updateLast('')
      }
    }
    repLogin() // appel de la fonction async repLogin
    }

    return (
        <main className='container mx-auto bg-white flex flex-col min-w-min max-w-screen-sm h-fit items-center rounded-lg mt-10 shadow-lg'>
            <img className='mt-2 w-auto h-40 object-contain' src={logo} alt='Logo Groupomania'/>
            <div className='mt-2 text-xs font-medium text-red-500 h-6'>{msg}</div>
            <label htmlFor='login' className='ml-8 mr-auto text-sm text-gray-800 font-medium'>Email</label>
            <input id='login' className='bg-gray-50 border text-gray-800 text-xs w-11/12 h-10 p-2 rounded focus:outline-none focus:bg-gray-100' type='text' onChange={(e) => e.preventDefault(updateMail(e.target.value))}/>
            <label htmlFor='password' className='mt-4 ml-8 mr-auto text-sm text-gray-800 font-medium'>Password</label>
            <input id='password' className='bg-gray-50 border text-gray-800 text-xs w-11/12 h-10 p-2 rounded focus:outline-none focus:bg-gray-100' type='password' onChange={(e) => e.preventDefault(updatePass(e.target.value))}/>
            <button type='submit' className='w-11/12 bg-gray-900 mt-6 m-6 h-10 rounded-lg text-gray-50 text-sm font-medium hover:bg-emerald-300 hover:text-emerald-800 hover:shadow-sm' onClick={(e) => e.preventDefault(verifLogin(e))}>Sign In</button>
            <div className='h-px bg-gray-100 w-11/12' />
            <p className='m-4 text-sm font-medium'>Not a member ? Get <Link to='/register'><button className='font-medium text-red-600 hover:text-red-400'>Register Here</button></Link></p>
        </main>
    )
}

export default Login

//<a href='#' className='text-red-600 hover:text-red-600' onClick={(e) => e.preventDefault(updateForm(1))}>Register Here</a>
