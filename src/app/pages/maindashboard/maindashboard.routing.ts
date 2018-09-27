import { Routes, RouterModule } from '@angular/router';

import { MainDashboardComponent } from './maindashboard.component';

const routes: Routes = [
  {
    path: '',
    component: MainDashboardComponent,
    children: [
      //{ path: 'treeview', component: TreeViewComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
