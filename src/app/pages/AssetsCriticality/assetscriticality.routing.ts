import { Routes, RouterModule } from '@angular/router';

import { AssetsCriticalityComponent } from './assetscriticality.component';

const routes: Routes = [
  {
    path: '',
    component: AssetsCriticalityComponent
  }
];

export const routing = RouterModule.forChild(routes);