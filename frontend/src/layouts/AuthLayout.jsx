import React from 'react';
import { Outlet } from 'react-router-dom';
import IntroHeader from '../components/header/IntroHeader';
import IntroFooter from '../components/footer/IntroFooter';

const AuthLayout = () => {
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10">
        <IntroHeader />
      </header>

      {/* Body */}
      <main className="flex-grow flex   bg-blue-200">
        <Outlet />
      </main>
    
      {/* Footer */}
      <footer className=''>
        <IntroFooter />
      </footer>
    </div>
  );
};

export default AuthLayout;
