import React from "react"

import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Sign In | Todo-App',
 }
export default function SigninLayout({
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