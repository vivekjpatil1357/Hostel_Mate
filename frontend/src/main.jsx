import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import UserLogin from './authentication/login/UserLogin.jsx'
import AdminLogin from './authentication/login/AdminLogin.jsx'
import AuthLayout from './layouts/AuthLayout.jsx'
import IntroBody from './components/body/IntroBody.jsx'
import UserRegister from './authentication/register/UserRegister.jsx'
import AdminRegister from './authentication/register/AdminRegister.jsx'
import RequestVerfication from './authentication/verification/RequestVerification.jsx'
import { UserContextProvider } from './userContext/UserContextProvider.jsx'
import PendingVerification from './components/PendingVerification.jsx'
import RequestVerification from './authentication/verification/RequestVerification.jsx'
import PendingVerificationLayout from './layouts/PendingVerificationLayout.jsx'
const router = createBrowserRouter([

  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '',
        element: <IntroBody />,
      },
    ]
  },
  {
    path: '/login',
    element: <AuthLayout />,
    children: [
      {
        path: 'user',
        element: <UserLogin />
      },
      {
        path: 'admin',
        element: <AdminLogin />
      }
    ]
  },
  {
    path: '/register',
    element: <AuthLayout />,
    children: [
      {
        path: 'user',
        element: <UserRegister />
      },
      {
        path: 'admin',
        element: <AdminRegister />
      }
    ]
  },
  {
    path: '/verification',
    element: <PendingVerificationLayout />,
    children: [
      {
        path: '',
        element: <RequestVerification />
      },
      {
        path: 'requestPending',
        element: <PendingVerification />
      }
    ]
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} >
        <App />
      </RouterProvider>
    </UserContextProvider>
  </StrictMode>,
)
