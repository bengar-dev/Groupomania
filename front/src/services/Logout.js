import { Link, useNavigate } from 'react-router-dom'

//Recoil JS
import { useRecoilState } from 'recoil'
import { authState } from '../atoms/auth.js'
import { userInfo } from '../atoms/userinfo.js'
import { content } from '../atoms/contenu.js'
import {alertMsg} from '../atoms/alertmsg.js'
import { firstnameValue, lastnameValue, avatarValue, avatarPrev } from '../atoms/edituser.js'
import { displayPosts, displayCmts, cmtsValue } from '../atoms/posts.js'

function Logout() {

    const [auth, updateAuth] = useRecoilState(authState)
    const [user, updateUser] = useRecoilState(userInfo)
    const [contenu, updateContenu ] = useRecoilState(content)
    const [alrtmsg, updatealrtMsg] = useRecoilState(alertMsg)
    const [first, upfirst] = useRecoilState(firstnameValue)
    const [last, uplast] = useRecoilState(lastnameValue)
    const [avat, upavat] = useRecoilState(avatarValue)
    const [avatPr, upavatPr] = useRecoilState(avatarPrev)
    const [posts, upposts] = useRecoilState(displayPosts)
    const [cmts, upcmts] = useRecoilState(displayCmts)
    const [cmtsVal, upcmtsVal] = useRecoilState(cmtsValue)
    const navigate = useNavigate();

    function Reset() {
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
        navigate('/')
        window.location.reload(false);
    }

  return (
    <button aria-label="Logout" title="Logout" type='button' className='text-gray-50 hover:text-red-200' onClick={Reset}>
      <i className='fas fa-sign-out-alt'></i>
    </button>
  )
}
export default Logout
