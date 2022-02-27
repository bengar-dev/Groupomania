import { Link, useNavigate } from 'react-router-dom'

import { getInfo } from '../services/GetUser.js'
import { getPosts } from '../services/GetPosts.js'

import { htmlEntities } from '../functions/htmlEntities.js'

//Recoil JS
import { useRecoilState } from 'recoil'
import { userPublic } from '../atoms/userinfo'
import { displayPosts, displayCmts } from '../atoms/posts.js'

import moment from 'moment'

function UserProfil() {

    const [ user, updateUser ] = useRecoilState(userPublic)
    const [ posts, updatePosts ] = useRecoilState(displayPosts)
    const [ comments, updateComments ] = useRecoilState(displayCmts)
    const navigate = useNavigate()

    let url = new URL(window.location.href);
    const getId = url.pathname.split('/user-profil/');
    const userInfo = JSON.parse(localStorage.getItem('info'))

    async function repGetUser() {
        const result = await getInfo(getId[1], userInfo.token)
        if(!result) {
            console.log(result)
        } else {
            updateUser([result])
        }
    }

    if (user.length === 0) {
        repGetUser()
    }

    function usersPosts() {
        let findUsers = posts.findIndex((a) => a.userId == getId[1])
        const filterPosts = posts.filter(u => u.userId == getId[1])
        if(posts.length > 0) { // verification si notre state posts contient bien les publications
            return (
                <div className='bg-slate-400 p-1 rounded-lg m-2 md:m-0'>
                    {filterPosts.map(info =>
                    <div key={info.postId} className='transition-all flex items-center bg-slate-200 hover:bg-slate-300 rounded-full pl-4 mt-1 mb-1'>
                        <p className='w-7/12 md:w-9/12 h-6 flex items-center truncate font-medium mr-1'>{info.msg ? htmlEntities(info.msg) : <i className='fas fa-image text-orange-600 text-xl' />}</p> <p className='w-5/12 md:w-3/12 text-xs'>{moment(info.postedat).format('LLL')}</p>
                        </div>)}
                </div>
            )
        } else { // si il est vide on fait appel à notre service getPosts
            async function repPosts() {
                const result = await getPosts()
                if(!result) {
                  console.log(result)

                } else {
                 updatePosts(result)
                }
              }
              repPosts()
        }
    }

    return(<div className='container mx-auto max-w-screen-md flex flex-col mb-20'>
        <div className='mt-10 flex flex-col items-center container mx-auto max-w-screen-md bg-white rounded-lg shadow-lg'>
    {user.map(info =>
        <div key={info.id} className='container flex flex-col w-full items-center p-6 rounded-lg md:flex-row'>
        <div className='container w-full flex flex-col items-center md:w-2/5'>
          <img className='w-32 h-32 object-cover rounded-full' src={info.avatar} alt='avatar' />
          {info.admin === 0 ? <span className='mt-4 bg-teal-700 text-white text-center p-0.5 w-24 text-sm font-medium'>Membre</span> : <span className='mt-4 bg-red-600 text-white text-center p-0.5 w-24 text-sm font-medium'>Admin</span> }
        </div>
        <div className='container flex flex-col w-full mt-6 md:mt-0 md:w-3/5'>
          <div className='flex w-full justify-between'><h1 className='text-center font-bold uppercase text-2xl text-gray-600 mb-2 md:mb-4'>{htmlEntities(info.firstname)} {htmlEntities(info.lastname)}</h1></div>
          <h2 className='font-medium uppercase text-gray-600'>Firstname</h2>
          <p className='ml-4 text-sm text-slate-500'>{htmlEntities(info.firstname)}</p>
          <h2 className='mt-4 font-medium uppercase text-gray-600'>Lastname</h2>
          <p className='ml-4 text-sm text-slate-500'>{htmlEntities(info.lastname)}</p>
          <h2 className='mt-4 font-medium uppercase text-gray-600'>Email</h2>
          <p className='ml-4 text-sm text-slate-500'>{info.email}</p>
        </div>
        </div>
        )}
        <button aria-label="Back to Home" title="Back to Home" type='button' className='mt-0 mb-2 mr-auto ml-auto md:ml-auto md:mr-1 p-2 bg-orange-100 border border-orange-400 w-11/12 md:w-20 text-center rounded text-orange-700 hover:bg-orange-400 hover:text-white' onClick={(e) => e.preventDefault(navigate('/'), updateUser([]))}><i className="fas fa-arrow-circle-left"></i></button>
        </div>
        <h1 className='font-medium text-lg mt-4 ml-2 md:mb-2 md:mt-4'>Lasts Publications</h1>
        {usersPosts()}
        </div>
    )
}

export default UserProfil
