import React from 'react';
import { RouteSpecification } from '../infrastructure/routing/route-specification';


const Dashboard = React.lazy(() => import('../views/pages/dashboard'));

const routes: RouteSpecification[] = [
  { path: '/', name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard }
];

export default routes;

