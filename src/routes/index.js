import { Navigate, useRoutes } from 'react-router-dom';
import MainRoutes from './MainRoutes';

export default function ThemeRoutes() {
  return useRoutes([{ path: '/', element: <Navigate to="/" /> }, MainRoutes]);
}
