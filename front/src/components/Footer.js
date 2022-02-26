import tailwind from '../assets/tailwind-css-1.svg'
import react from '../assets/react.png'
import mysql from '../assets/mysql.png'
import nodejs from '../assets/node.png'


function Footer() {
  return(
    <div className='fixed bottom-0 w-full h-16 bg-gray-50 dark:bg-slate-700 border-t-2 border-gray-500 dark:border-gray-800 flex flex-col md:flex-row items-center justify-around'>
      <div className='flex flex-row'><p className='text-xs text-slate-600 dark:text-white font-medium'>Created by <a href='https://benoitgarcia.fr' className='text-red-600 dark:text-red-500 hover:text-gray-600'>Benoit Garcia</a> <i className='fas fa-copyright'></i> 2022</p></div>
      <div className='flex w-3/12 justify-around'>
        <img className='h-6 w-auto' src={tailwind} alt='logo tailwind'/>
        <img className='h-6 w-auto' src={react} alt='logo react'/>
        <img className='h-6 w-auto' src={nodejs} alt='logo nodejs'/>
        <img className='h-6 w-auto' src={mysql} alt='logo mysql'/>
      </div>
    </div>
  )
}

export default Footer
