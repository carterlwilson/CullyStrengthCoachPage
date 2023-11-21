import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ClientPage from './pages/ClientPage/ClientPage'
import ExerciseEditorPage from './pages/ExerciseEditorPage'
import HomePage from './pages/HomePage/homePage'
import ScheduleBuilder from './pages/ScheduleBuilder/ScheduleBulder'
import { ChakraProvider } from '@chakra-ui/react'
import MaxesPage from './pages/MaxesPage'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
    errorElement: <LoginPage />
  },
  {
    path: '/home',
    element: <HomePage />,
    children: [
      {
        path: 'clients',
        element: <ClientPage />
      },
      {
        path: 'schedule-builder',
        element: <ScheduleBuilder />
      },
      {
        path: 'exercises',
        element: <ExerciseEditorPage />
      },
      {
        path: 'max-editor',
        element: <MaxesPage />
      }
    ]
  }
])

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
