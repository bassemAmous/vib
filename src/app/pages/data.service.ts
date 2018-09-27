import { Injectable } from '@angular/core';
import { Machine } from '../theme/components/baMenu/machine.interface';
import { Overall } from '../pages/maindashboard/overall.interface';
import { assets } from '../pages/maindashboard/assets.interface';
import { Failure } from '../pages/CostAnalysis/failure.interface';
@Injectable() 
export class DataService {
  serviceData: Machine[]; 
  good:number=0;
  warning:number=0;
  alarm:number=0;
  danger:number=0;
  total:number=0;
  chart:any;
  chart1:any;
  chart2:any;
  chart3:any;
  chart4:any;
  chart5:any;
  chart6:any;
  chart7:any;
  doughnutData:Array<Object>;
  doughnutDataf:Array<Object>;
  initials:Overall[]=[];
  assets:assets[]=[];
  measurements:any[]=[];
  failures:Failure[]=[];
  table:any[]=[];
  isLoading=true;
  isOverlayVisible=false;
}