import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { Navigate } from 'react-router-dom'

const ProtectedLayout:React.FC<{children : React.ReactNode}> = ({children}) => {
    const token = localStorage.getItem("token")
    const user = useSelector((state:RootState)=>state.auth.user)
    //console.log(user);

    // useEffect(()=>{},[user])
    

    return user || token ? <>{children}</> : <Navigate to={"/signIn"}/>
}

export default ProtectedLayout
