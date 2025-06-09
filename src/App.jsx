import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './components/protected-route'
import PublicRoute from './components/public-route'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Documents from './pages/Documents'
import Pending from './pages/Pending'
import './App.css'

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoute><Login /></PublicRoute>
    },
    {
      path: "/login",
      element: <PublicRoute><Login /></PublicRoute>
    },
    {
      path: "/register",
      element: <PublicRoute><Register /></PublicRoute>
    },
    {
      path: "/documents",
      element: <ProtectedRoute><Documents /></ProtectedRoute>
    },
    {
      path: "/dashboard",
      element: <ProtectedRoute><Dashboard /></ProtectedRoute>
    },
    {
      path: "/pending",
      element: <ProtectedRoute><Pending /></ProtectedRoute>
    },

  ]);

  return <RouterProvider router={ routes } />;
}
