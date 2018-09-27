import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { AssetsCriticalityComponent } from './assetscriticality.component';
import { routing } from './assetscriticality.routing';
import { AmChartsModule } from "amcharts3-angular2";
import {NgxPaginationModule} from 'ngx-pagination';  
import { SearchPipe } from "./searchpipe";
 import {MdProgressSpinnerModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    NgaModule,
    AmChartsModule,
    NgxPaginationModule,
    MdProgressSpinnerModule
  ],
  declarations: [
    AssetsCriticalityComponent,
    SearchPipe
  ]
})
export class AssetsCriticalityModule {}
