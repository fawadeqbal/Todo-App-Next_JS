import React from "react"

import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Todo-Dashboard',
 }
export default function TodoLayout({
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