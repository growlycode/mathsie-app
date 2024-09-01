import React from 'react';
import { RouteSpecification } from '../infrastructure/routing/route-specification';


const Dashboard = React.lazy(() => import('../views/pages/dashboard'));
const CreateWorkbook = React.lazy(() => import('../views/pages/create-workbook'));

const routes: RouteSpecification[] = [
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/workbooks/create', name: 'Create worksheet', component: CreateWorkbook, classNames: 'p-0', requiresAdmin: true }
];

export default routes;

