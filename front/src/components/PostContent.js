import { getPosts } from '../services/GetPosts.js'
import { deletePost } from '../services/DeletePost'
import { editPost } from '../services/EditPost'
import { getCmts } from '../services/GetCmts'
import { postCmt } from '../services/SendCmt'
import { deleteCmt } from '../services/DeleteCmt'
import { editCmt } from '../services/EditCmt'
import { likePost } from '../services/LikePost'

import { htmlEntities } from '../functions/htmlEntities'
import { removeItemAtIndex } from '../functions/removeItem'
import { replaceItemAtIndex } from '../functions/replaceItem'
import { randomInt } from '../functions/randomInt'

import { useRecoilState} from 'recoil'
import { displayPosts, displayCmts, cmtsValue, editState, msgValue, cmtState, imgTemp } from '../atoms/posts.js'
import { userInfo } from '../atoms/userinfo.js'
import { firstnameValue, lastnameValue, avatarPrev } from '../atoms/edituser.js'

import moment from 'moment'

function PostsContent() {

    const [ posts, updatePosts ] = useRecoilState(displayPosts)
    const [ user ] = useRecoilState(userInfo)
    const [ msgVal, updateMsgVal ] = useRecoilState(msgValue)
    const [ comments, updateComments ] = useRecoilState(displayCmts)
    const [ commentsVal, updateValueCmts ] = useRecoilState(cmtsValue)
    const [ editcmt, updateEditCmt ] = useRecoilState(cmtState)
    const [ firstname ] = useRecoilState(firstnameValue)
    const [ lastname ] = useRecoilState(lastnameValue)
    const [ imgPrev, updateImgPrev ] = useRecoilState(imgTemp)
    const [ avatarPreview ] = useRecoilState(avatarPrev)
    const [ editpst, updateEditPost ] = useRecoilState(editState)
    const userToken = JSON.parse(localStorage.getItem('info'))

    // fonction async pour récupérer les infos de notre service getPosts
    async function repPosts() {
        const result = await getPosts()
        if(!result) {
          console.log(result)

        } else {
         updatePosts(result)
        }
      }
      if (!posts.length) { // si notre state posts est vide alors on appelle notre fonction async repPosts
          repPosts()
      }

    // fonction async pour récupérer les infos de notre service getComments
    async function repCmts() {
      const res = await getCmts()
      if(!res) {
        console.log(res)

      } else {
        updateComments(res)
      }
    }
    if (!comments.length) { // si notre state posts est vide alors on appelle notre fonction async repPosts
        repCmts()
    }

    //Supprimer Post Array State posts
    function splicePost(postid) {
      const findPost = posts.findIndex(p => p.postId === postid)
      const newPosts = removeItemAtIndex(posts, findPost)
      updatePosts(newPosts)
    }

    //Supprimer Commentaire Array State comments
    function spliceCmt(cmtid) {
      const findCmt = comments.findIndex(p => p.cmtId === cmtid)
      const newCmts = removeItemAtIndex(comments, findCmt)
      updateComments(newCmts)
    }

    // function handle state Edit Post
    function handleEdit(postid) {
      if (editpst === 0) {
        updateEditPost(postid)
      } else {
        updateEditPost(0)
        updateMsgVal('') }
    }

    // function handle state Edit Comment
    function handleEditCmt(cmtid) {
      if (editcmt === 0) {
        updateEditCmt(cmtid)
      } else { updateEditCmt(0) }
    }

    //display Edit Post
    function showEdit(msg, img, postid, postuserid, userid) {
      if (editpst === postid && postuserid === userid) { // vérification utilisateur + ciblage du Post.
          var textId= 'text-' + postid
          const findIndex = posts.findIndex((p) => p.postId === postid) // recherche de l'index du Post dans notre tableau state 'posts'
          const postObject = posts[findIndex] // déclaration de l'objet postObject
          const newPost = replaceItemAtIndex(posts, findIndex, { // constante newPost appelé en cas d'édition
            ...postObject,
            msg: msgVal,
            img: imgPrev
          }) // affichage du Edit Post
          return ( <div className='flex flex-col bg-slate-50 items-center p-4'>
            {imgPrev ? <div><img className='w-auto h-60 object-cover rounded-lg shadow' src={imgPrev} alt='image post' /><button className='relative bottom-60 w-full bg-slate-600/40 hover:bg-slate-600 rounded-lg text-white p-1' onClick={(e) => e.preventDefault(updateImgPrev(null))}><i className="fas fa-trash" aria-hidden="true"></i></button></div> : ''}
          <textarea className='w-full resize-none h-40 text-xs p-2 focus:outline-none rounded-lg border' id={textId} value={msgVal ? msgVal : updateMsgVal(msg)} onChange={(e) => updateMsgVal(e.target.value)}></textarea>
          <button className='mt-2 p-2 bg-emerald-100 border border-emerald-400 w-full text-center rounded text-emerald-700 hover:bg-emerald-400 hover:text-white' onClick={(e) => e.preventDefault(editPost(textId, postid, imgPrev), updateEditPost(0), updatePosts(newPost), updateMsgVal(''), updateImgPrev(''))}><i className="fas fa-paper-plane" aria-hidden="true"></i></button>
          </div>
        )
      } // si on appelle pas edit, on retourne simplement le msg du post
      return (
        <div className='flex flex-col mb-2'>
           {img ? <div className='p-4 flex justify-center'><img className='w-auto h-60 rounded-lg shadow-lg' src={img} alt='image'/></div> : ''}
           <p className='bg-slate-50 p-4 text-gray-800 font-light text-sm rounded'>{htmlEntities(msg)}</p>
        </div>
      )
    }

    //Affichage Post Actions ( Edit / Delete )
    function postActions(postuserid, postid, msg, postimg) {
        if(postuserid === userToken.userId) { // affichage des options edit / delete quand le post appartient à l'utilisateur
          return <div className='flex ml-auto mr-0 justify-between w-20'>
          <button className='bg-orange-100 border border-orange-400 text-orange-700 hover:bg-orange-400 hover:text-white w-8 h-8 rounded-lg' onClick={(e) => e.preventDefault(handleEdit(postid), updateImgPrev(postimg))}><i className='fas fa-pen'></i></button>
          <button className='bg-red-100 border border-red-500 text-red-700 hover:bg-red-500 hover:text-white rounded-lg w-8 h-8' onClick={(e) => e.preventDefault(splicePost(postid), deletePost(postid))}><i className='fas fa-trash'></i></button>
          </div>
        }
        if(userToken.admin === 1) { // affichage des options delete quand l'utilisateur est admin
          return (
            <div className='flex ml-auto mr-0 flex-row-reverse w-20 '>
            <button className='bg-red-100 border border-red-500 text-red-700 hover:bg-red-500 hover:text-white rounded-lg w-8 h-8' onClick={(e) => e.preventDefault(splicePost(postid), deletePost(postid))}><i className='fas fa-trash'></i></button>
            </div>
          )
        }
      }

      //Verification d'un commentaire suite à un submit de l'utilisateur.
      function verifCmt(postid) {
        const getInputId = document.getElementById(postid + '-cmt')
        console.log(getInputId)
        if (getInputId) {
          const randomId = randomInt(0, 100000) * userToken.userId // création d'un ID random.
          const avatarDisplay = ( avatarPreview ? avatarPreview : user.map(info => info.avatar) )
          const firstnameDisplay = ( firstname ? firstname : user.map(info => info.firstname))
          const lastnameDisplay = ( lastname ? lastname : user.map(info => info.lastname))
          postCmt(postid, commentsVal, randomId) // Appel de notre function API post Comment
          const newCmt = () => {
            updateComments((old) => [
                {
                  avatar: avatarDisplay,
                  cmtId: randomId,
                  cmtdate: Date.now(),
                  firstname: firstnameDisplay,
                  lastname: lastnameDisplay,
                  msg: commentsVal,
                  postId: postid,
                  userId: userToken.userId
                  },
                  ...old
                  ])
              }
              newCmt() // on push le commentaire dans notre state comments.
              getInputId.value = ''
        } else {
          // déclaration d'un state erreur. \\\\\\\//////////
          return false
        }
      }

      //display Edit Comment
      function showEditCmt(msg, cmtid, cmtuserid, userid) {
        if (editcmt === cmtid && (cmtuserid === userid)) {
            const findIndex = comments.findIndex((p) => p.cmtId === cmtid)
            const postObject = comments[findIndex]
            const newCmt = replaceItemAtIndex(comments, findIndex, {
              ...postObject,
              msg: commentsVal
            })
            var textId= 'text-' + cmtid
            return ( <div className='flex flex-col md:flex-row'>
            <input type='text' className='w-full bg-gray-50 border text-gray-800 text-xs h-10 md:h-6 p-2 rounded focus:outline-none focus:bg-gray-100' id={textId} value={commentsVal ? commentsVal : msg} onChange={(e) => updateValueCmts(e.target.value)}/>
            <button className='ml-0 mt-1 md:mt-0 md:ml-1 bg-emerald-100 border border-emerald-400 w-full h-10 md:h-auto md:w-12 text-center rounded text-emerald-700 hover:bg-emerald-400 hover:text-white' onClick={(e) => e.preventDefault(updateEditCmt(0), updateComments(newCmt), editCmt(textId, cmtid))}><i className="fas fa-paper-plane" aria-hidden="true"></i></button>
            </div>
          )
        }
        return <p>{htmlEntities(msg)}</p>
      }

       //Affichage Comment Actions ( Edit / Delete )
      function cmtActions(userid, cmtuserid, cmtid) {
        if(userid === cmtuserid) {
          return <div className='mr-0 ml-auto'><button className='bg-orange-100 border border-orange-400 text-orange-700 hover:bg-orange-400 hover:text-white w-6 h-6 rounded-lg text-sm' onClick={(e) => e.preventDefault(handleEditCmt(cmtid))}><i className='fas fa-pen'/></button> <button className='bg-red-100 border border-red-500 text-red-700 hover:bg-red-500 hover:text-white rounded-lg w-6 h-6 text-sm' onClick={(e) => e.preventDefault(spliceCmt(cmtid), deleteCmt(cmtid))}><i className='fas fa-trash'/></button></div>
        }
        if(userToken.admin === 1) {
          return <div className='mr-0 ml-auto'><button className='bg-red-100 border border-red-500 text-red-700 hover:bg-red-500 hover:text-white rounded-lg w-6 h-6 text-sm' onClick={(e) => e.preventDefault(spliceCmt(cmtid), deleteCmt(cmtid))}><i className='fas fa-trash'/></button></div>
        }
      }

    //handleLike
    function handleLikes(postid, userid, userlikearray) {
      if (userlikearray) {
        const findIndex = posts.findIndex((p) => p.postId === postid)
        const postObject = posts[findIndex]
        const valueCount = posts[findIndex].countLike
        const userDislike = JSON.parse(posts[findIndex].userLike)
        const userLike = JSON.parse(posts[findIndex].userLike)
        const foundUser = userLike.findIndex((a) => a == userid)
        const spliceUser = userDislike.splice(foundUser, 1)
        const pushUser = userLike.push(userid)
        const newDislike = replaceItemAtIndex(posts, findIndex, {
          ...postObject,
          countLike: (valueCount - 1),
          userLike: JSON.stringify(userDislike)
        })
        const newLike = replaceItemAtIndex(posts, findIndex, {
          ...postObject,
          countLike: (valueCount + 1),
          userLike: JSON.stringify(userLike)
        })
        if (foundUser > -1) { //L'utilisateur a déjà like le post
          return <button className='ml-1 mb-2 text-xs bg-red-200 border border-red-600 text-red-600 rounded p-1' onClick={(e) => e.preventDefault(updatePosts(newDislike), likePost(postid, 0))}><i className="fas fa-heart-broken"></i> Unlike</button>
        } else { //L'utilisateur n'a pas like le post
          return <button className='ml-1 mb-2 text-xs bg-gray-200 border border-gray-600 text-gray-600 rounded p-1' onClick={(e) => e.preventDefault(updatePosts(newLike), likePost(postid, 1))}><i className="fas fa-heart"></i> Like</button>
        }
      }
    }

    // affichage de notre Page.
    return ( <div className='mt-10 flex flex-col items-center container mx-auto max-w-screen-md bg-white rounded-lg shadow-lg'>
   {posts.map(post =>
           post.postId ? <div key={post.postId} className='w-11/12 bg-slate-100 flex flex-col mt-4 p-1 rounded'>
           <div className='flex w-full items-center p-1'>
             <img className='h-10 w-10 object-cover rounded-full' src={post.userId === userToken.userId ? (avatarPreview === '' ? post.avatar : avatarPreview) : post.avatar} alt={post.firstname}/>
             <div className='flex flex-col ml-2'>
             <h1 className='font-medium'>{post.userId === userToken.userId ? (firstname === '' ? post.firstname : firstname) : post.firstname} {post.userId === userToken.userId ? (lastname === '' ? post.lastname : lastname) : post.lastname}</h1>
             <p className='text-xs'>{moment(post.postedat).calendar()}</p>
             </div>
             {postActions(post.userId, post.postId, post.msg, post.img)}
           </div>
           <div className='post-content'>
           {showEdit(post.msg, post.img, post.postId, post.userId, userToken.userId)}
             {post.countLike ? <div className='ml-2 flex items-center justify-between w-8 h-8 mb-2 text-red-600 rounded text-sm'><i className="fas fa-heart"></i> <p>{post.countLike}</p></div> : <div className='ml-2 flex items-center w-8 mb-2 text-red-600 rounded text-sm h-8'><i className="fas fa-heart"></i></div>}
             <div className='post-sep-line'></div>
            {handleLikes(post.postId, userToken.userId, post.userLike)}
           </div>
           <div className='flex flex-col'>
             <div className='flex flex-col md:flex-row'><input className='w-full bg-gray-50 border text-gray-800 text-xs h-10 p-2 rounded focus:outline-none focus:bg-gray-100' id={post.postId + '-cmt'} type='text' onChange={(e) => e.preventDefault(updateValueCmts(e.target.value))} placeholder='Votre commentaire' /> <button className='ml-1 bg-emerald-100 border border-emerald-400 mt-1 md:mt-0 h-10 md:h-auto md:w-20 text-center rounded text-emerald-700 hover:bg-emerald-400 hover:text-white' onClick={(e) => e.preventDefault(verifCmt(post.postId))}><i className="fas fa-paper-plane" aria-hidden="true"></i></button></div>
              <div className='flex flex-col'>
                {comments.map(cmt => (cmt.postId === post.postId) ? <div className='cmt-model' key={cmt.cmtId}>
                  <div className='flex p-2 mt-2 bg-slate-50'>
                    <img className='h-8 w-8 rounded-full' src={cmt.userId === userToken.userId ? (avatarPreview === '' ? cmt.avatar : avatarPreview) : cmt.avatar} alt='avatar' />
                    <div className='ml-2 flex flex-col'>
                      <h3 className='text-sm font-medium'>{cmt.userId === userToken.userId ? (firstname === '' ? cmt.firstname : firstname) : cmt.firstname} {cmt.userId === userToken.userId ? (lastname === '' ? cmt.lastname : lastname) : cmt.lastname}</h3>
                      <p className='text-xs'>{moment(cmt.cmtdate).calendar()}</p>
                    </div>
                    {cmtActions(userToken.userId, cmt.userId, cmt.cmtId)}
                  </div>
                  <div className='text-sm bg-slate-50 p-2 font-light'>
                    {showEditCmt(cmt.msg, cmt.cmtId, cmt.userId, userToken.userId)}
                  </div>
              </div> : '' )}
            </div>
           </div>
         </div> : '' )}
     </div>)
}

export default PostsContent
