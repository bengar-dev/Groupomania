import logo from '../assets/logo_height.png'

import {getLogin} from '../services/getLogin.js'

import { useRecoilState } from 'recoil'
import { authState } from '../atoms/auth.js'
import { formState, msgForm, emailValue, passwordValue, firstnameValue, lastnameValue } from '../atoms/form.js'


function Login() {

    const [form, updateForm] = useRecoilState(formState)
    const [msg, updateMsg] = useRecoilState(msgForm)
    const [first, updateFirst] = useRecoilState(firstnameValue)
    const [last, updateLast] = useRecoilState(lastnameValue)
    const [email, updateMail] = useRecoilState(emailValue)
    const [pass, updatePass] = useRecoilState(passwordValue)
    const [auth, updateAuth] = useRecoilState(authState)

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
        updateMsg('')
        updateMail('')
        updatePass('')
        updateAuth(1)
        updateFirst('')
        updateLast('')
      }
    }
    repLogin() // appel de la fonction async repLogin
    }

    return (
        <div className='container mx-auto bg-white flex flex-col min-w-min max-w-screen-sm h-fit items-center rounded-lg mt-10 shadow-lg'>
            <img className='mt-2 w-auto h-40 object-contain' src={logo} alt='Logo Groupomania'/>
            <p className='mt-2 text-xs font-medium text-red-500 h-6'>{msg}</p>
            <label htmlFor='login' className='ml-8 mr-auto text-sm text-gray-800 font-medium'>Email</label>
            <input id='login' className='bg-gray-50 border text-gray-800 text-xs w-11/12 h-10 p-2 rounded focus:outline-none focus:bg-gray-100' type='text' onChange={(e) => e.preventDefault(updateMail(e.target.value))}/>
            <label htmlFor='password' className='mt-4 ml-8 mr-auto text-sm text-gray-800 font-medium'>Password</label>
            <input id='password' className='bg-gray-50 border text-gray-800 text-xs w-11/12 h-10 p-2 rounded focus:outline-none focus:bg-gray-100' type='password' onChange={(e) => e.preventDefault(updatePass(e.target.value))}/>
            <button type='submit' className='w-11/12 bg-gray-900 mt-6 m-6 h-10 rounded-lg text-gray-50 text-sm font-medium hover:bg-emerald-300 hover:text-emerald-800 hover:shadow-sm' onClick={(e) => e.preventDefault(verifLogin(e))}>Sign In</button>
            <div className='h-px bg-gray-100 w-11/12' />
            <p className='m-4 text-sm font-medium'>Not a member ? Get <a href='#' className='text-red-400 hover:text-red-600' onClick={(e) => e.preventDefault(updateForm(1))}>Register Here</a></p>
        </div>
    )
}

export default Login
