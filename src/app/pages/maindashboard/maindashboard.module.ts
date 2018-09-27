import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { MainDashboardComponent } from './maindashboard.component';
import { routing } from './maindashboard.routing';
import { AmChartsModule } from "amcharts3-angular2";
 import {MdProgressSpinnerModule} from '@angular/material';
import { BaMenu } from "../../theme/components/baMenu/baMenu.component";
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
    MainDashboardComponent
  ],
providers:[BaMenu]
})
export class MainDashboardModule {}
