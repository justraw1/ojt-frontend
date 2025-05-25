import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './components/protected-route'
import PublicRoute from './components/public-route'
import Login from './pages/Login'
import Register from './pages/Register'
import Documents from './pages/Documents'
import NarrativeList from './data/narrative-table'
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
      path: "/home",
      element: <ProtectedRoute><Documents /></ProtectedRoute>
    }
  ]);

  return <RouterProvider router={ routes } />;
}
