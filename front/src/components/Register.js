import { Link, useNavigate } from 'react-router-dom'

import logo from '../assets/logo_height.png'

import {validMail} from '../functions/verifMail.js'
import {validPass} from '../functions/verifPass.js'
import {getRegister} from '../services/Register.js'

import { useRecoilState } from 'recoil'
import { msgForm, emailValue, firstnameValue, lastnameValue, passwordValue, passState } from '../atoms/form.js'

function Register() {

    const navigate = useNavigate();
    const [msg, updateMsg] = useRecoilState(msgForm)
    const [email, updateMail] = useRecoilState(emailValue)
    const [pass, updatePass] = useRecoilState(passwordValue)
    const [pwstate, updatePwstate] = useRecoilState(passState)
    const [first, updateFirst] = useRecoilState(firstnameValue)
    const [last, updateLast] = useRecoilState(lastnameValue)

    function handleEmail(value) {
      updateMail(value)
      if (validMail(value)) {
        updateMsg('')
      }
      if(!validMail(value)) {
        updateMsg(`L'email n'est pas au bon format`)
      }
      if(value === '') {
        updateMsg('')
      }
    }

    function handlePass(value) {
      updatePass(value)
      if(validPass(value)) {
        updatePwstate(1)
        updateMsg('')
      }
      if(!validPass(value)){
        updatePwstate(0)
      }
      if(value === ''){
        updatePwstate(0)
      }
    }

    function verifRegister(e) {

      async function repRegister() { // fonction async pour verif le login
      const result = await getRegister(email, pass, first, last)
      if(!result) {
        updateMsg('Error : Email already exist')
      } else {
        updateMsg('You has been registered')
        updatePwstate(0)
        navigate('/')
      }
    }

      if (email === '' || first === '' || last === '' || pass === '') {
        updateMsg('All fields must be filled')
        return false
      }
      if (pwstate === 0) {
        updateMsg(`Password must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number`)
        return false
      }
      if (msg === '') {
        repRegister()
        return true
      }
      return false
    }

    return (
        <main className='container mx-auto bg-white flex flex-col min-w-min max-w-screen-sm h-fit items-center rounded-lg mt-10 shadow-lg'>
            <img className='mt-2 w-auto h-40 object-contain' src={logo} alt='Logo Groupomania'/>
            <p className='mt-2 text-xs font-medium text-red-500 h-6'>{msg}</p>
            <label htmlFor='login' className='ml-8 mr-auto text-sm text-gray-800 font-medium'>Email</label>
            <input id='login' className='bg-gray-50 border text-gray-800 text-xs w-11/12 h-10 p-2 rounded focus:outline-none focus:bg-gray-100' type='text' onChange={(e) => e.preventDefault(handleEmail(e.target.value))}/>
            <label htmlFor='firstname' className='mt-4 ml-8 mr-auto text-sm text-gray-800 font-medium'>Firstname</label>
            <input id='firstname' className='bg-gray-50 border text-gray-800 text-xs w-11/12 h-10 p-2 rounded focus:outline-none focus:bg-gray-100' type='text' onChange={(e) => e.preventDefault(updateFirst(e.target.value))}/>
            <label htmlFor='lastname' className='mt-4 ml-8 mr-auto text-sm text-gray-800 font-medium'>Lastname</label>
            <input id='lastname' className='bg-gray-50 border text-gray-800 text-xs w-11/12 h-10 p-2 rounded focus:outline-none focus:bg-gray-100' type='text' onChange={(e) => e.preventDefault(updateLast(e.target.value))}/>
            <label htmlFor='password' className='mt-4 ml-8 mr-auto text-sm text-gray-800 font-medium'>Password</label>
            <input id='password' className='bg-gray-50 border text-gray-800 text-xs w-11/12 h-10 p-2 rounded focus:outline-none focus:bg-gray-100' type='password' onChange={(e) => e.preventDefault(handlePass(e.target.value))}/>
            <div className='mt-4 flex w-11/12'>
              <span className='text-xs bg-gray-100 p-1 rounded-xl'>{pwstate ? <i className='fas fa-check text-green-400'></i> : <i className='fas fa-times text-red-400'></i>} at least : 8 characters, 1 uppercase, 1 lowercase, 1 number</span>
            </div>
            <button type='submit' className='w-11/12 bg-gray-900 m-6 h-10 rounded-lg text-gray-50 text-sm font-medium hover:bg-emerald-300 hover:text-emerald-800 hover:shadow-sm' onClick={(e) => e.preventDefault(verifRegister(e))}>Register</button>
            <div className='h-px bg-gray-100 w-11/12' />
            <p className='m-4 text-sm font-medium'>Already register ? Let's <Link to='/'><button className='font-medium text-red-600 hover:text-red-400'>Sign In</button></Link></p>
        </main>
    )
}

export default Register
