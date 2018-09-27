import { Routes, RouterModule } from '@angular/router';

import { AssetsOverviewComponent } from './assetsoverview.component';

const routes: Routes = [
  {
    path: '',
    component: AssetsOverviewComponent
  }
];

export const routing = RouterModule.forChild(routes);