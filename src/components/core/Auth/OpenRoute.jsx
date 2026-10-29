import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


//openroute means , the route which anyone can access
export function OpenRoute ({children}) {
    const {token} = useSelector((state)=> state.auth)

    if(token=== null){
        return children
    } else {
        return <Navigate to="/dashboard/my-profile"/>
    }

}
