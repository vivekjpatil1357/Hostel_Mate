import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Navigate, RouterProvider, useNavigate } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import UserLogin from './authentication/login/UserLogin.jsx'
import AdminLogin from './authentication/login/AdminLogin.jsx'
import AuthLayout from './layouts/AuthLayout.jsx'
import IntroBody from './components/body/IntroBody.jsx'
import UserRegister from './authentication/register/UserRegister.jsx'
import AdminRegister from './authentication/register/AdminRegister.jsx'
import { UserContextProvider } from './userContext/UserContextProvider.jsx'
import PendingVerification from './components/PendingVerification.jsx'
import RequestVerification from './authentication/verification/RequestVerification.jsx'
import PendingVerificationLayout from './layouts/PendingVerificationLayout.jsx'
import UserDashboard from './components/Dashboard/User/UserDashboard.jsx'

import AdminDashboard from './components/Dashboard/Admin/AdminDashboard.jsx'
import Grievances from './components/Dashboard/Admin/Grievances.jsx'
import PendingStudents from './components/Dashboard/Admin/PendingStudents.jsx'
import GrievanceHistory from './components/Dashboard/Admin/GrievanceHistory.jsx'
import AdminDashboardLayout from './layouts/AdminDashboardLayout.jsx'
import UserDashboardLayout from './layouts/UserDashboardLayout.jsx'
import AddGrievance from './components/Dashboard/User/AddGrievance.jsx'

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
  {
    path: '/dashboard',
    children: [
      {
        path: 'admin/:uuid',
        element:<AdminDashboardLayout />,
        children: [
          {
            path: '',
            element: <AdminDashboard />
          },
          {
            path: 'grievances',
            element: <Grievances />
          },
          {
            path: 'students_request',
            element: <PendingStudents />
          },
          {
            path: 'grievance_history',
            element: <GrievanceHistory />
          }
        ]
      },
      {
        path: 'user/:uuid',
        element:<UserDashboardLayout/>,
        children: [
          {
            path: '',
            element: <UserDashboard />
          },
          {
            path: 'add_grievance',
            element:<AddGrievance/>
          }
          
        ]
      }

    ]
  }
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
