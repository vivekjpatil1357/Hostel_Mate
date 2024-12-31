import React, { useEffect, useState } from 'react'
import IntroFooter from '../components/footer/IntroFooter'
import IntroHeader from '../components/header/IntroHeader'
import { useUserContext } from '../userContext/UserContextProvider'
import { Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'
const PendingVerificationLayout = () => {
    const [user, setUser] = useState();
    useEffect(() => {
        const c = JSON.parse(Cookies.get('user'))
        if (c) {
            setUser(c)
        }
    }, [])
    return (
        <div className='flex flex-col min-h-screen'>
            <IntroHeader email={user ? user.email : false} />
            <main className='flex-grow flex bg-red-400 justify-center items-center'>
                <Outlet />
            </main>
            <IntroFooter />
        </div>
    )
}

export default PendingVerificationLayout