import { sendPost } from '../services/SendPost.js'
import { htmlEntities } from '../functions/htmlEntities.js'

// Recoil JS
import { useRecoilState } from 'recoil'
import { userInfo } from '../atoms/userinfo.js'
import { submitButton, contenuPost } from '../atoms/form.js'
import { displayPosts, imgValue, imgTemp, imgTempMsg } from '../atoms/posts.js'

function PostShare() {

    const [user, updateUser] = useRecoilState(userInfo)
    const [subButton, updateSubButton] = useRecoilState(submitButton)
    const [contentPost, updateContent] = useRecoilState(contenuPost)
    const [posts, updatePosts] = useRecoilState(displayPosts)
    const [ img, updateImg ] = useRecoilState(imgValue)
    const [ imgtempo, updateImgtempo ] = useRecoilState(imgTemp)
    const [ imgtempoMsg, updateImgtempoMsg ] = useRecoilState(imgTempMsg)

  function handleChange(e) {
    const text = e.target.value
    updateContent(text)
    if(text) {
        updateSubButton(1)
    } else {
        updateSubButton(null)
    }
  }

  function displaySubButton(id, avatar, firstname, lastname) {
      if(subButton || imgtempo) {
          const randomId = randomInt(0, 100000) * id
          return <button className='ml-2 p-2 h-12 bg-emerald-100 border border-emerald-400 w-20 text-center rounded text-emerald-700 hover:bg-emerald-400 hover:text-white' onClick={(e) => e.preventDefault(sendPost(contentPost, randomId, img), updateContent(''), newPost(randomId, avatar, firstname, lastname, id), updateImgtempo(null), updateSubButton(null), updateImgtempoMsg(null), updateImg(null))}><i className="fas fa-paper-plane"></i></button>
      }
  }

  function randomInt(min, max) { // générer un nombre entier aléatoire
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }

  const newPost = (randomId, avatar, firstname, lastname, id) => { // on push le nouveau Post sur notre state
        updatePosts((old) => [
            {
            postId: randomId,
            avatar: avatar,
            firstname: firstname,
            lastname: lastname,
            postedat: Date.now(),
            msg: contentPost,
            img: imgtempo,
            countLike: null,
            userId: id,
            userLike: JSON.stringify([])
        },
        ...old
        ])
    }

    function changeFile(e) {
        const reader = new FileReader() // Utilisation de FileReader pour réaliser une preview image.
        reader.onloadend = () => {
            updateImgtempo(reader.result) // stockage du résultat FileReader dans un state image Preview
            updateImgtempoMsg(reader.result)
        }
        reader.readAsDataURL(e.target.files[0])
        updateImg(e.target.files[0]) // stockage du fichier charger dans un state Image
    }

  return (
    <div className='flex flex-col items-center container mx-auto max-w-screen-md bg-white dark:bg-gray-500 rounded-lg shadow-lg'>
        {user.map(info =>
            <div key={info.id} className="w-full rounded-lg p-2 mt-2">
            <form className="flex flex-col">
                <label htmlFor='post' className='font-medium text-sm dark:text-white'>Hi {htmlEntities(info.firstname)} , what's up today ? 🙂</label>
                <textarea className='mt-2 h-40 border rounded resize-none p-2 dark:bg-gray-600 dark:text-white text-xs focus:outline-none' id="post" placeholder="Tell us about your day" value={contentPost} onChange={(e) => e.preventDefault(handleChange(e))}></textarea>
                {imgtempoMsg ?<img className='mt-2 ml-auto mr-auto w-auto h-60 object-cover rounded-lg' src={imgtempoMsg} alt='image-post'/> : ''}
                <div className="flex items-center mt-2">
                    <label htmlFor='img' className='p-2 h-12 bg-orange-100 border border-orange-400 w-20 text-center rounded text-orange-700 hover:bg-orange-400 hover:text-white' aria-hidden="true"><i className="fas fa-images"></i><p className='hidden'>Image</p>
                    <input type='file' className='w-0' id='img' accept='images/*' onChange={(e) => changeFile(e)}/></label>
                    {displaySubButton(info.id, info.avatar, info.firstname, info.lastname)}
                </div>
            </form>
        </div>
            )}
    </div>
  )
}

export default PostShare
