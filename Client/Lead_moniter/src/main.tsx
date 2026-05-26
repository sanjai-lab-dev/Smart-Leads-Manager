import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/Register_page'
import Home from './pages/Home'
import CreateLead from './pages/CreateLead';
import Leads from './pages/Leads';
import LeadData from './pages/LeadData';
import Error from './pages/Error';
import User from './pages/User';
import ExportCSV from './pages/ExportCSV';
import Profile from './pages/Profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
    errorElement:<Error/>
  },
  {
    path: '/register',
    element: <RegisterPage />,
     errorElement:<Error/>
  },
  {
    path: '/home',
    element: <Home />,
     errorElement:<Error/>
  },
  {
    path: '/newlead',
    element: <CreateLead />,
     errorElement:<Error/>

  },
  {
    path:"/leads",
    element:<Leads/>,
     errorElement:<Error/>
  },
  {
    path:"/leadData/:id",
    element:<LeadData/>,
     errorElement:<Error/>
  },
  {
    path:"/User",
    element:<User/>
  },{
    path:"/CSVExport",
    element:<ExportCSV/>
  },
  {
    path:"/Profile",
    element:<Profile/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)