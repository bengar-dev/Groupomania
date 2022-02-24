import { Link } from 'react-router-dom'

function Error() {
    return (
        <div className='pt-14 container items-center w-full mb:w-4/12 mx-auto w-full flex flex-col h-screen'>
            <h1 className='text-9xl font-medium text-red-800'>404</h1>
            <h2 className='text-4xl font-medium text-gray-600 mb-4'>Oops !</h2>
            <p className='text-sm text-gray-600 font-medium'>This page not found</p>
            <p className='text-sm text-gray-600'>This link might be corrupted</p>
            <p className='text-sm text-gray-600 mb-6'>or the page may have been removed</p>
            <Link to='/'><button className='transition-all text-black font-medium text-sm border border-black p-2 w-24 rounded-lg hover:bg-black hover:text-white hover:shadow-lg'>Go back</button></Link>
        </div>
    )
}

export default Error
