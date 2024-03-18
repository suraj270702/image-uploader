import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Login from './components/Login/Login.tsx'
import Navbar from './components/navbar/Navbar.tsx'
import ImageUploadForm from './components/form/ImageUploadForm.tsx'
import AllImagePage from './components/all-images/AllImagePage.tsx'

import Register from './components/register/Register.tsx'



const router = createBrowserRouter([
  {
    path:"/",
    element:<App />,
    
  },
  {
    path:"/login",
    element:<Navbar />,
    children:[
      {
        path:"/login",
        element:<Login />
      },
    
    ]
  },
  {
    path:"/upload",
    element:<ImageUploadForm />
  },
  {
    path:"/all-image",
    element:<AllImagePage /> 
  },
  {
    path:"/register",
    element:<Register />
  }
  
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      
    </RouterProvider>
  </React.StrictMode>,
)
