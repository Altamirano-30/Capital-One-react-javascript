import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import MainLayout from "./layouts/MainLayout"
import Dashboard from "./pages/Dashboard"
import AccountsPage from "./pages/AccountsPage"   // ⬅️ NEW
import Twin from "./pages/Twin"

import './styles/base.css'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/accounts', element: <AccountsPage /> }, // ⬅️ NEW
      { path: '/twin', element: <Twin /> },
      // Opcional: 404
      // { path: '*', element: <NotFound /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
