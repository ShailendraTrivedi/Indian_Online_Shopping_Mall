import React from 'react'
import { Link } from 'react-router-dom'

const NotLoggedIn = () => {
  return (
    <>
        <div className="flex justify-center w-full h-full mt-10">
        <div className="flex flex-col items-center justify-around w-[90%] h-[30rem] bg-white">
          <img src="/IMG/empty.jpg" alt="" className="h-[23rem] w-[23rem]" />
          <Link to="/login" className="bg-green-700 p-2 text-white w-[10rem] rounded justify-center flex">Login</Link>
        </div>
        </div>
    </>
  )
}

export default NotLoggedIn
