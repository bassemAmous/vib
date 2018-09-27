import { Component } from '@angular/core';
import { AmChartsService } from "amcharts3-angular2";
import { DataService } from '../data.service';
import { Http } from '@angular/http';
import { Machine } from '../../theme/components/baMenu/machine.interface';
import { BaMenu } from "../../theme/components/baMenu/baMenu.component";
import * as Chart from 'chart.js';
import {BaThemeConfigProvider, colorHelper} from '../../theme';
@Component({
  selector: 'costanalysis',
  providers : [BaMenu],
  templateUrl: './costanalysis.component.html',
  styleUrls: ['./costanalysis.component.scss']
})

export class CostAnalysisComponent {
   public doughnutData: Array<Object>;
  private chart8: any;
  failures:any=[]
  DataProviderfailures:any[]=[]
  ngOnInit() {
    this.FailureTypeRefresh();
   if(this.dataService.isLoading){
 var elem  = document.body;

elem.style.pointerEvents = 'none'; 
 
}


    // this.chart8 = AmCharts.makeChart("chartdiv44", {
    //   "type": "serial",
    //   "addClassNames": true,
    //   "theme": "light",
    //   "autoMargins": false,
    //   "marginLeft": 40,
    //   "marginRight": 8,
    //   "marginTop": 10,
    //   "marginBottom": 26,
    //   "balloon": {
    //     "adjustBorderColor": false,
    //     "horizontalPadding": 10,
    //     "verticalPadding": 8,
    //     "color": "#ffffff"
    //   },

    //   "dataProvider": this.DataProviderfailures,
    //   "valueAxes": [{
    //     "axisAlpha": 0,
    //     "position": "left"
    //   }],
    //   "startDuration": 1,
    //   "graphs": [{
    //     "alphaField": "alpha",
    //     "balloonText": "<span style='font-size:12px;'> [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
    //     "fillAlphas": 1,
    //     "title": "Income",
    //     "type": "column",
    //     "valueField": "count",
    //     "dashLengthField": "dashLengthColumn"
    //   }, {
    //     "id": "graph2",
    //     "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
    //     "bullet": "round",
    //     "lineThickness": 3,
    //     "bulletSize": 7,
    //     "bulletBorderAlpha": 1,
    //     "bulletColor": "#FFFFFF",
    //     "useLineColorForBulletBorder": true,
    //     "bulletBorderThickness": 3,
    //     "fillAlphas": 0,
    //     "lineAlpha": 1,
    //     "title": "%",
    //     "valueField": "expense",
    //     "dashLengthField": "dashLengthLine"
    //   }],
    //   "categoryField": "BrisType",
    //   "categoryAxis": {
    //     "gridPosition": "start",
    //     "axisAlpha": 0,
    //     "tickLength": 0,
    //     "labelsEnabled": false
    //   },
    //   "export": {
    //     "enabled": true
    //   }
    // });




    this.chart8 = AmCharts.makeChart("chartdiv44", {
  "type": "serial",
  "theme": "light",
  "dataDateFormat": "YYYY-MM-DD",
  "precision": 2,
  "valueAxes": [{
    "id": "v1",
    "title": "",
    "position": "left",
    "autoGridCount": false
    
  }, {
    "id": "v2",
    "title": "",
    "gridAlpha": 0,
    "position": "right",
    "minimum":0,
    "maximum":100
  }],
   "startDuration": 1,
  "graphs": [ {
    "id": "g4",
    "valueAxis": "v1",
    "lineColor": "#3498db",
    "fillColors": "#3498db",
    "fillAlphas": 1,
    "type": "column",
    "title": "Target Sales",
    "valueField": "count",
    "clustered": true,
    "columnWidth": 0.7,
    "legendValueText": "[[value]]",
    "balloonText": "<span style='font-size:12px;'> [[category]]:<br><span style='font-size:20px;'>[[value]]</span>"
  }, {
    "id": "g1",
    "valueAxis": "v2",
    "bullet": "round",
    "bulletBorderAlpha": 1,
    "bulletColor": "#2ecc71",
    "bulletSize": 7,
    "hideBulletsCount": 50,
    "lineThickness": 2,
    "lineColor": "#f39c12",
    "type": "smoothedLine",
    "title": "Market Days",
    "useLineColorForBulletBorder": true,
    "valueField": "market1",
    "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>"
  }, {
    "id": "g2",
    "valueAxis": "v2",
    "bullet": "round",
    "bulletBorderAlpha": 1,
    "bulletColor": "#2ecc71",
    "bulletSize": 7,
    "hideBulletsCount": 50,
    "lineThickness": 2,
    "lineColor": "#f39c12",
    "type": "smoothedLine",
    "dashLength": 5,
    "title": "%",
    "useLineColorForBulletBorder": true,
    "valueField": "expense",
    "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>"
  }],
  
  "chartCursor": {
    "pan": false,
    "valueLineEnabled": false,
    "valueLineBalloonEnabled": true,
    "cursorAlpha": 0,
    "valueLineAlpha": 0.2
  },
  "categoryField": "BrisType",
  "categoryAxis": {
    "parseDates": false,
    "dashLength": 1,
    "minorGridEnabled": true,
    "labelsEnabled": false
  },
  "balloon": {
    "borderThickness": 1,
    "shadowAlpha": 0
  },
  
  "dataProvider": this.DataProviderfailures
});





  }








  constructor(private AmCharts: AmChartsService,public dataService: DataService,private http: Http,private bamenu:BaMenu,private _baConfig:BaThemeConfigProvider) {
this.FailureTypeRefresh();
if(localStorage.getItem("dbfailures")){
 this.dataService.isLoading=false
   var elem  = document.body;
elem.style.pointerEvents = 'auto';
 this.failures=JSON.parse(localStorage.getItem("dbfailures"))

            


this.createFailureTypeChart()

 this.doughnutData = this.getData();
 this.doughnutDataf = this.getData();
 var totalpercent:any=0;
 var totalcount:any=0;
    for(var i=0;i<this.failures.length;i++){
      totalcount+=this.failures[i]["count"];
    }
for(var i=0;i<this.failures.length;i++){
 totalpercent+=(this.failures[i]["count"]*100)/totalcount
this.DataProviderfailures.push({
BrisType: this.failures[i]["BrisType"],
count:this.failures[i]["count"],
expense:totalpercent.toFixed(0)


})


}




}


if(localStorage.getItem("dbtable")){

 this.table=JSON.parse(localStorage.getItem("dbtable"))

            

}

if(localStorage.getItem("dbmachines")){

 this.data=JSON.parse(localStorage.getItem("dbmachines"))

            

}


  }


FailureTypeRefresh(){

            if (AmCharts.isReady) {
                this.createFailureTypeChart();
            } else {
                AmCharts.ready(() => this.createFailureTypeChart());
            }

        }




createFailureTypeChart(){
 var chart5 = this.AmCharts.makeChart("chartdiv33", {
      "type": "pie",
      "theme": "light",
      "dataProvider": this.failures,
      "valueField": "count",
      "titleField": "BrisType",
      "outlineAlpha": 0.4,
      "depth3D": 15,
      "balloonText": "[[title]]<br><span style='font-size:6px'><b>[[value]]</b> ([[percents]]%)</span>",
      "angle": 30
    });

}









 ngAfterViewInit() {
 
    this.loadDoughnutCharts();
  }




private loadDoughnutCharts() {
   this.chart7 =$('#chart-areaaf').get(0) as HTMLCanvasElement;
    new Chart( this.chart7.getContext('2d')).Doughnut(this.doughnutData, {
      segmentShowStroke: false,
      percentageInnerCutout : 64,
      responsive: true
    });

  }


getData() {
    let dashboardColors = this._baConfig.get().colors.dashboard;
   var failuresData:any[]=[];
   
      var colors :any[]= ["Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];
   var totalcount:any=0;
    for(var i=0;i<this.failures.length;i++){
      totalcount+=this.failures[i]["count"];
    }
    for(var i=0;i<this.failures.length;i++){
  
     failuresData.push({
        value:this.failures[i]["count"],
        color: colors[i],
        highlight: colorHelper.shade(colors[i], 15),
        label: this.failures[i]["BrisType"],
        percentage: ((this.failures[i]["count"]*100)/totalcount).toFixed(2),
        order: i,

     })

    }
       return failuresData;
  }













get data():Machine[] { 
    return this.dataService.serviceData; 
  } 
  set data(value: Machine[]) { 
    this.dataService.serviceData = value; 
  } 


 get chart5():any{ 
            return this.dataService.chart5; 
        } 
set chart5(value: any) { 
            this.dataService.chart5 = value; 
     }   

 get chart7():any{ 
            return this.dataService.chart7; 
        } 
set chart7(value: any) { 
            this.dataService.chart7 = value; 
     } 
 get doughnutDataf():Array<Object>{ 
       return this.dataService.doughnutDataf; 
   } 
   set doughnutDataf(value: Array<Object>) { 
        this.dataService.doughnutDataf = value; 
        }

get table():any{ 
            return this.dataService.table; 
        } 
set table(value: any) { 
            this.dataService.table = value; 
     }   

     get isLoading():boolean{ 
       return this.dataService.isLoading; 
     } 
     set isLoading(value: boolean) { 
       this.dataService.isLoading = value; 
     }








}
