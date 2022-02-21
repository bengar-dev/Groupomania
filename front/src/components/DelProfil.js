import { deleteUser } from '../services/DeleteUser.js'

import { useRecoilState } from 'recoil'
import { content } from '../atoms/contenu.js'
import { passwordValue } from '../atoms/form'
import { authState } from '../atoms/auth'
import { userInfo } from '../atoms/userinfo.js'
import {alertMsg} from '../atoms/alertmsg.js'
import { firstnameValue, lastnameValue, avatarValue, avatarPrev } from '../atoms/edituser.js'
import { displayPosts, displayCmts, cmtsValue } from '../atoms/posts.js'

function DelProfil() {

    const [ contenu, updateContenu ] = useRecoilState(content)
    const [ pass, updatePass ] = useRecoilState(passwordValue)
    const [ auth, updateAuth ] = useRecoilState(authState)
    const [user, updateUser] = useRecoilState(userInfo)
    const [alrtmsg, updatealrtMsg] = useRecoilState(alertMsg)
    const [first, upfirst] = useRecoilState(firstnameValue)
    const [last, uplast] = useRecoilState(lastnameValue)
    const [avat, upavat] = useRecoilState(avatarValue)
    const [avatPr, upavatPr] = useRecoilState(avatarPrev)
    const [posts, upposts] = useRecoilState(displayPosts)
    const [cmts, upcmts] = useRecoilState(displayCmts)
    const [cmtsVal, upcmtsVal] = useRecoilState(cmtsValue)


    // fonction async
    async function repDel(pass) {
      const res = await deleteUser(pass)
      if(!res) {
        console.log(res)

      } else {
        updatePass('')
        localStorage.removeItem('info')
        updateAuth(0)
        updateUser([])
        updateContenu(0)
        updatealrtMsg('')
        upfirst('')
        uplast('')
        upavat('')
        upavatPr('')
        upposts([])
        upcmts([])
        upcmtsVal('')
      }
    }

    return(
        <div className='mt-10 container mx-auto max-w-screen-md bg-white rounded-lg shadow-lg p-2'>
        <form encType='multipart/form-data' className='flex flex-col items-center'>
          <p className='text-center font-medium text-red-400' id='alert-del'><i className="fas fa-exclamation-triangle mr-2"></i>Warning, this action is irreversible</p>
          <p className='w-9/12 text-center text-xs text-red-400' id='alert-del-desc'>All of your data will be lost, if you are sure to delete your accout, please confirm your password.</p>
          <label htmlFor='firstname' className='mt-6 w-full ml-0 text-sm font-medium'>Confirm your password</label>
          <input className='mt-2 w-full bg-gray-50 border text-gray-800 text-xs h-10 p-2 rounded focus:outline-none focus:bg-gray-100' type='password' id='passconfirm_del' name='passconfirm_del' value={pass} onChange={(e) => updatePass(e.target.value)}/>
          <div className="w-full flex flex-row-reverse">
            <button type='submit' className='md:ml-0 md:mr-0 md:mt-2 p-2 bg-emerald-100 border border-emerald-400 w-11/12 md:w-20 text-center rounded text-emerald-700 hover:bg-emerald-400 hover:text-white' onClick={(e) => e.preventDefault(repDel(pass))}><i className='fas fa-check' /></button>
            <button className='mt-2 md:mt-2 mr-0 md:mr-1 p-2 bg-orange-100 border border-orange-400 w-11/12 md:w-20 text-center rounded text-orange-700 hover:bg-orange-400 hover:text-white' onClick={(e) => e.preventDefault(updateContenu(2))}><i className="fas fa-arrow-circle-left"></i></button>
          </div>
        </form>
      </div>
    )
}

export default DelProfil
