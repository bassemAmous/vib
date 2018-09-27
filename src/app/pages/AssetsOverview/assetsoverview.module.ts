import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { AssetsOverviewComponent } from './assetsoverview.component';
import { routing } from './assetsoverview.routing';
import { AmChartsModule } from "amcharts3-angular2";
import { AssetsOverViewService } from "./assetsoverview.service";
import { BaMenu } from "../../theme/components/baMenu/baMenu.component";
import {NgxPaginationModule} from 'ngx-pagination';  
import { SearchPipe1 } from "./searchpipe";
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
  AssetsOverviewComponent,
  SearchPipe1
  ],
  providers:[AssetsOverViewService,BaMenu]
})
export class AssetsOverviewModule {}
