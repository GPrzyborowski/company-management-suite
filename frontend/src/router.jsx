import { createBrowserRouter } from 'react-router-dom'
import Employees from './pages/Employees'

export const router = createBrowserRouter([
    {
        path: '/employees',
        element: <Employees />
    }
])