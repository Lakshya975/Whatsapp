import React from 'react'
import Head from 'next/head'
import { Button } from '@mui/material'
import { auth,provider } from '../firebase'

function Login() {
    const Signin=()=>{
        auth.signInWithPopup(provider).catch(alert);
    }
    return (
        <div className="grid place-items-center h-screen bg-gray-300">
            <Head>
                <title>Login</title>
            </Head>
            <div className="flex flex-col p-24 items-center bg-white rounded shadow-lg">
                <img src="https://cdn.pixabay.com/photo/2015/08/03/13/58/soon-873316__480.png" className="h-28 w-28 mb-12"></img>
                <Button onClick={Signin} variant="outlined">Sign in with google</Button>
            </div>
        </div>
    )
}

export default Login
