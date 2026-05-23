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
    path: '/Newlead',
    element: <CreateLead />,
     errorElement:<Error/>

  },
  {
    path:"/Leads",
    element:<Leads/>,
     errorElement:<Error/>
  },
  {
    path:"/LeadData/:id",
    element:<LeadData/>,
     errorElement:<Error/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)