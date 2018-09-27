import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { CostAnalysisComponent } from './costanalysis.component';
import { routing } from './costanalysis.routing';
import { BaMenu } from "../../theme/components/baMenu/baMenu.component";
import { AmChartsModule } from "amcharts3-angular2";
import {MdProgressSpinnerModule} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    NgaModule,
    AmChartsModule,
    MdProgressSpinnerModule
    
  ],
  declarations: [
    CostAnalysisComponent
  ],
providers:[BaMenu]
})
export class CostAnalysisModule {}
