import React from 'react'
import IntroFooter from '../components/footer/IntroFooter'
import IntroHeader from '../components/header/IntroHeader'
import { useUserContext } from '../userContext/UserContextProvider'
import { Outlet } from 'react-router-dom'
const PendingVerificationLayout = () => {
    const user = useUserContext().user
    console.log(user,"hellowprld");
    return (
        <div className='flex flex-col min-h-screen'>
            <IntroHeader email={user?user.displayName?user.displayName:user.email:false} />
            <main className='flex-grow flex bg-red-400 justify-center items-center'>
                <Outlet/>
            </main>

            <IntroFooter />
        </div>
    )
}

export default PendingVerificationLayout