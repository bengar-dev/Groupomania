//Recoil JS
import { useRecoilState } from 'recoil'
import { authState } from '../atoms/auth.js'

function Logout() {

    const [auth, updateAuth] = useRecoilState(authState)

    function Reset() {
        localStorage.removeItem('info')
        updateAuth(0)
    }

  return <i className='fas fa-sign-out-alt text-sm text-white hover:text-gray-200' onClick={Reset}></i>
}
export default Logout
