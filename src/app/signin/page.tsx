import React from 'react'
import { SignIn } from '@clerk/nextjs'

const SigninPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn/>
      </div>
  )
}

export default SigninPage