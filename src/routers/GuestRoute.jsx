import React, { useContext } from 'react'
import { AuthContext } from '../auth/Authprovider'
import { Outlet } from 'react-router-dom'

export default function GuestRoute() {
    const { user, loading} = useContext(AuthContext)

    if(loading) return <>loading</>

    if(user?.role == "normal")return <Navigate to="/"/>

    if(user) return <Navigate to="/"/>
  return <Outlet/>
}
