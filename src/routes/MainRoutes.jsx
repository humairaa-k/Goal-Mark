import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

import MainLayout from 'layout/MainLayout';
const EditGoal = Loadable(lazy(() => import('../views/goal-tracker/EditGoal')));

import PrivateRoute from '../component/PrivateRoute';

//render - goal tracker pages, keep lazy loading 
const Dashboard = Loadable(lazy(() => import('views/goal-tracker/Dashboard')));
const Goals = Loadable(lazy(() => import('views/goal-tracker/Goals')));
const NewGoal = Loadable(lazy(() => import('views/goal-tracker/NewGoal')));
const GoalDetails = Loadable(lazy(() => import('views/goal-tracker/GoalDetails')));
const Categories = Loadable(lazy(() => import('views/goal-tracker/Categories')));
const Archive = Loadable(lazy(() => import('views/goal-tracker/Archive')));
const Settings = Loadable(lazy(() => import('views/goal-tracker/Settings')));
const NotFound = Loadable(lazy(() => import('views/goal-tracker/NotFound')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',

  element:(
  <PrivateRoute>
    <MainLayout />
  </PrivateRoute>
  ) ,
  children: [
    {
      index: true,
      element: <Dashboard />
    },
    {
      path: 'dashboard',
      element: <Dashboard />
    },
    {
      path: 'goals',
      element: <Goals />
    },
    {
      path: 'goals/new',
      element: <NewGoal />
    },
    {
      path: 'goals/:id',
      element: <GoalDetails />
    },
      {
      path: 'editGoal/:id',
      element: <EditGoal />
    },
    {
      path: 'categories',
      element: <Categories />
    },
       {
      path: 'archive',
      element: <Archive />
    },
    {
      path: 'settings',
      element: <Settings />
    },
     {
      path: '*',
      element: <NotFound />
    }
  ]
};

export default MainRoutes;
