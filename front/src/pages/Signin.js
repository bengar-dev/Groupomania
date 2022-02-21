import Login from '../components/Login'
import Register from '../components/Register'

// Recoil JS
import { useRecoilState } from 'recoil'
import { formState } from '../atoms/form.js'

function SignIn() {

    const [form, updateForm] = useRecoilState(formState)

    if(form) {
        return (
            <Register />
        )
    } else {
        return <Login />
    }

}

export default SignIn
