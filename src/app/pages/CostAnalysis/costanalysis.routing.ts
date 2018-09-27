import { Routes, RouterModule } from '@angular/router';

import { CostAnalysisComponent } from './costanalysis.component';

const routes: Routes = [
  {
    path: '',
    component: CostAnalysisComponent
  }
];

export const routing = RouterModule.forChild(routes);