import React from "react"

import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'User Profile | Todo-App',
 }
export default function UserProfileLayout({
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