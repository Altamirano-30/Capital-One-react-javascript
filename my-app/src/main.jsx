import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import MainLayout from "./layouts/MainLayout"
import Dashboard from "./pages/Dashboard"
import AccountsPage from "./pages/AccountsPage"
import CardsPage from "./pages/CardsPage";
import Twin from "./pages/Twin"
import TransferPage from "./pages/TransferPage";
import InvestmentsPage from "./pages/InvestmentsPage";
import Chat from './pages/Chat';

import './styles/base.css'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/accounts', element: <AccountsPage /> },
      { path: '/cards', element: <CardsPage /> }, // ⬅️ NEW
      { path: '/twin/', element: <Chat /> },
      { path: "/transfer", element: <TransferPage /> },
{ path: "/investments", element: <InvestmentsPage /> },
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
