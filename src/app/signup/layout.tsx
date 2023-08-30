import React from "react"

import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Sign Up | Todo-App',
 }
export default function SignupLayout({
    children,
}:{
    children:React.ReactNode
}){
    return(
        <main>
        {children}
        </main>
    )
}