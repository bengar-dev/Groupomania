import PostShare from '../components/PostShare.js'
import PostsContent from '../components/PostContent.js'

function Posts() {

    return (
        <div className='bg-gray-50 dark:bg-slate-800 pt-10 pb-20'>
            <PostShare />
            <PostsContent />
        </div>
    )
}

export default Posts
