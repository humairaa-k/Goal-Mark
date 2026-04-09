import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

// routes
import AuthenticationRoutes from './AuthenticationRoutes';
import MainRoutes from './MainRoutes';

const NotFound = Loadable(lazy(() => import('views/goal-tracker/NotFound')));

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([
  MainRoutes, 
  AuthenticationRoutes,
  {
    path: '*',
    element: <NotFound />
  }
], {
  basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
