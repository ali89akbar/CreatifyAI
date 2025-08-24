import React from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react';
import {useClerk, UserButton, useUser} from '@clerk/clerk-react'
function Navbar() {
    const navigate = useNavigate();
    const {user} = useUser();
    const {openSignIn, openSignUp, signOut} = useClerk();

  return (
 <div className="fixed -top-10 z-50 backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32 w-full">
  <img
    src={assets.logo}
    alt=""
    className="w-32 sm:w-44 cursor-pointer"
    onClick={() => navigate('/')}
  />
  {
    user? <UserButton/> :
     ( 
    <button onClick={openSignIn} className="flex items-center  gap-2 rounded-full text-sm w-auto h-12 bg-primary text-white px-5 sm:px-10 cursor-pointer">
    Get Started
    <ArrowRight className="w-4 h-4" />
  </button>
  ) 
  }

 
</div>


  )
}

export default Navbar