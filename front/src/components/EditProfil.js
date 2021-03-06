import { Link, useNavigate } from 'react-router-dom'

//function
import { editUser } from '../services/EditUser'
import { htmlEntities } from '../functions/htmlEntities.js'

//Recoil JS
import { useRecoilState } from 'recoil'
import { content } from '../atoms/contenu.js'
import { userInfo } from '../atoms/userinfo.js'
import { firstnameValue, lastnameValue, avatarValue, avatarPrev } from '../atoms/edituser.js'
import { alertMsg } from '../atoms/alertmsg.js'

function EditProfil() {

  const [ user, updateUser ] = useRecoilState(userInfo)
  const [ contenu, updateContenu ] = useRecoilState(content)
  const [ firstname, updateFirstname ] = useRecoilState(firstnameValue)
  const [ lastname, updateLastname ] = useRecoilState(lastnameValue)
  const [ avatar, updateAvatar ] = useRecoilState(avatarValue)
  const [ avatarPreview, updateAvatarPreview ] = useRecoilState(avatarPrev)
  const [ alertmsg, updateAlertmsg] = useRecoilState(alertMsg)
  const navigate = useNavigate();


  // fonction verification
  function verifEditUser(first, last, userid, useradmin, useremail, avatarprev) {
    const userinfo = { // déclaration de la constante pour mettre à jour notre state User
        admin: useradmin,
        avatar: avatarPreview,
        email: useremail,
        firstname: firstname,
        lastname: lastname,
        id: userid
    }

    if (!avatarPreview) { // dans le cas il n'y a aucun changement d'image, on récupère l'avatar actuel.
      updateAvatarPreview(avatarprev)
      userinfo.avatar = avatarprev

    }
    if(firstname && lastname) { // verification si l'utilisateur à changer des informations
        editUser(firstname, lastname, avatar)
        updateUser([userinfo])
    } else if (!firstname && lastname) {
        editUser(first, lastname, avatar)
        updateFirstname(first)
        userinfo.firstname = first
        updateUser([userinfo])
    } else if (!lastname && firstname) {
        editUser(firstname, last, avatar)
        updateLastname(last)
        userinfo.lastname = last
        updateUser([userinfo])
    } else if (!firstname && !lastname) {
        editUser(first, last, avatar)
        updateFirstname(first)
        updateLastname(last)
        userinfo.firstname = first
        userinfo.lastname = last
        updateUser([userinfo])
    }
    updateAlertmsg('Your profil has been edited')
  }

    function changeFile(e) {
        const reader = new FileReader() // Utilisation de FileReader pour réaliser une preview image.
        reader.onloadend = () => {
            updateAvatarPreview(reader.result) // stockage du résultat FileReader dans un state Avatar Preview
        }
        reader.readAsDataURL(e.target.files[0])
        updateAvatar(e.target.files[0]) // stockage du fichier charger dans un state Avatar
    }

  return (<div>
      {user.map(info =>
        <div key={info.id} className='container mx-auto max-w-screen-md bg-white rounded-lg shadow-lg'>
        <form encType='multipart/form-data' className='flex flex-col'>
          <input type='file' className='h-0' id='avatar' accept='images/*' onChange={(e) => changeFile(e, info.avatar)}/>
          <label htmlFor='avatar' className='flex flex-col items-center'><img className='mt-2 mb-2 w-28 h-28 object-cover rounded-full' src={avatarPreview ? avatarPreview : info.avatar} alt={'Avatar ' + info.firstname} /><span className='bg-gray-200 hover:bg-gray-600 hover:text-white hover:shadow flex justify-center items-center pl-2 pt-1 pb-1 pr-2 rounded text-xs uppercase'><i className="fas fa-upload mr-2"></i> Upload avatar</span></label>
          <p className='mt-1 h-6 text-emerald-400 text-sm uppercase font-medium text-center'>{alertmsg}</p>
          <label htmlFor='firstname' className='mt-2 ml-2 uppercase text-sm font-medium text-red-600'>Firstname</label>
          <input type='text' className='ml-2 mr-2 bg-gray-50 border text-gray-800 text-xs w-auto h-10 p-2 rounded focus:outline-none focus:bg-gray-100' id='firstname' placeholder={htmlEntities(info.firstname)} name='firstname' onChange={(e) => updateFirstname(e.target.value)}/>
          <label htmlFor='lastname' className='mt-4 ml-2 uppercase text-sm font-medium text-red-600'>Lastname</label>
          <input type='text' className='ml-2 mr-2 bg-gray-50 border text-gray-800 text-xs w-auto h-10 p-2 rounded focus:outline-none focus:bg-gray-100' id='lastname' placeholder={htmlEntities(info.lastname)} name='lastname' onChange={(e) => updateLastname(e.target.value)} />
          <label htmlFor='email' className='mt-4 ml-2 uppercase flex items-center text-sm font-medium text-red-600'>Email <p className='ml-2 text-xs text-red-600 italic lowercase'>Contact administrator to change your email</p></label>
          <input type='email' className='ml-2 mr-2 bg-gray-200 border text-gray-800 text-xs w-auto h-10 p-2 rounded focus:outline-none' id='email' name='email' value={info.email} readOnly/>
          <div className="flex flex-col md:flex-row md:flex-row-reverse items-center mt-4">
            <button aria-label="Edit Profil" title="Edit Profil" type='button' type='submit' className='md:ml-0 md:mr-2 p-2 bg-emerald-100 border border-emerald-400 w-11/12 md:w-20 text-center rounded text-emerald-700 hover:bg-emerald-400 hover:text-white' onClick={(e) => e.preventDefault(verifEditUser(info.firstname, info.lastname, info.id, info.admin, info.email, info.avatar))}><i className='fas fa-check' /></button>
            <button aria-label="Back to Profil" title="Back to Profil" type='button' onClick={(e) => e.preventDefault(updateAlertmsg(''), navigate('/profil'))} className='mt-2 md:mt-0 mr-0 md:mr-1 p-2 bg-orange-100 border border-orange-400 w-11/12 md:w-20 text-center rounded text-orange-700 hover:bg-orange-400 hover:text-white'><i className="fas fa-arrow-circle-left"></i></button>
          </div>
          <button className='ml-auto mb-2 mr-auto w-11/12 md:w-auto mt-6 md:m-2 p-2 bg-gray-200 hover:bg-red-400 rounded uppercase text-sm border border-gray-400 hover:border-red-600 text-gray-800 hover:text-white hover:shadow' onClick={(e) => e.preventDefault(navigate('/delete-profil'))}>Delete my account</button>
        </form>
      </div>
        )}
    </div>
  )
}

export default EditProfil
