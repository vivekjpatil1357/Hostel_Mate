import React from 'react'
import IntroNavbar from './IntroNavbar'

const IntroHeader = ({ email }) => {
  // console.log(verification);
  return (
    <div>
      <IntroNavbar email={email}/>
    </div>
  )
}

export default IntroHeader