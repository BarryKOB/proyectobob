import React from 'react'
import Login from "./pages/Login"
import Home from './pages/Home'
import Gestion from './pages/Gestion'
import Reports from './pages/Reports'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import ErrorPage from "./pages/ErrorPage";


const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Login/>
      },
      {
        path: 'Home',
        element: <Home/>
      },
      {
        path: 'Reports',
        element: <Reports/>
      },
      {
        path: 'Gestion',
        element: <Gestion/>
      },
    ],
    errorElement: <ErrorPage/>,
  },
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App
