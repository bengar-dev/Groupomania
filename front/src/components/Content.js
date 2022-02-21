import Profil from '../components/Profil.js'
import EditProfil from '../components/EditProfil.js'
import Posts from '../components/Posts.js'

// Recoil Js
import { useRecoilState } from 'recoil'
import { content } from '../atoms/contenu.js'

function Content() {

  const [ contenu ] = useRecoilState(content)

  // On regarde notre state contenu, et on affiche le component correspondant.
  if(contenu === 1) {
    return <Profil />
  }
  if(contenu === 2) {
    return <EditProfil />
  }
  if(contenu === 0) {
    return <Posts />
  }
   else {
    return (
      <div>Hello</div>
    )
  }
}

export default Content
