import { Component } from '@angular/core';
import { AmChartsService } from "amcharts3-angular2";
import { Machine } from '../../theme/components/baMenu/machine.interface';
import { InfoMachine } from '../AssetsOverview/infomachine.interface';
import { Overall } from './overall.interface';
import { assets } from './assets.interface';
import { DataService } from '../data.service';
import { Http } from '@angular/http';
import { BaMenu } from "../../theme/components/baMenu/baMenu.component";
import * as Chart from 'chart.js';
import {BaThemeConfigProvider, colorHelper} from '../../theme';
@Component({
    selector: 'maindashboard',
    providers : [BaMenu],
    templateUrl: './maindashboard.component.html',
    styleUrls:['./maindashboard.component.scss']
})

export class MainDashboardComponent {

   public doughnutDataa: Array<Object>;
    legend:any;
    selected:any;
    machines:Machine[]=[];
    show:boolean=false;
    yearMonth:string="year";
    pointType:string="ovelo";
    initialsoverall:Overall[];
    assetss:assets[];
    measurements:any=[]

    ngOnInit(){
     
        this.GoodRefresh();
        this.OverAllRefresh();
         this.AssetsCriticalityRefresh();
         this.MeasurementsRefresh();
if(this.dataService.isLoading){
 var elem  = document.body;

elem.style.pointerEvents = 'none'; 
 
}



    }


    constructor(private bamenu:BaMenu,private AmCharts: AmChartsService,public dataService: DataService,private http: Http,private _baConfig:BaThemeConfigProvider) {
   
 console.log("constructeeeeuur mainDashh")

   this.GoodRefresh();
   this.OverAllRefresh();
   this.AssetsCriticalityRefresh();
   this.MeasurementsRefresh();
if(localStorage.getItem("dbmachines")){
    //initialiser les selected a 0 pour la navigation

       
      


  this.dataService.isLoading=false
   var elem  = document.body;

elem.style.pointerEvents = 'auto'; 
    console.log("D5al db Machines")
        var machines=JSON.parse(localStorage.getItem("dbmachines"))
         this.goodd=0;
          this.warningg=0;
          this.alarmm=0;
          this.dangerr=0;
           var machiness:Machine[]=[];
          var machinaaa:Machine;
          console.log(machines.length)
          for (var i=0; i<machines.length; i++)
          {
            machiness.push(machines[i]);
            // console.log("machines:") ;
            // console.log(machiness[i].MachineName) ;
            // BaMenu.mch=machiness;
          }
          this.dataService.serviceData = machiness;
          for (var i = 0; i < this.dataService.serviceData.length; i++) {
            if (this.dataService.serviceData[i].MachineState=="Green"){this.goodd++}
              else if (this.dataService.serviceData[i].MachineState=="Yellow"){this.warningg++}
                else if (this.dataService.serviceData[i].MachineState=="Orange"){this.alarmm++}
                  else if (this.dataService.serviceData[i].MachineState=="Red"){this.dangerr++}
                }
            console.log(this.goodd+"ahahaahh******")
    this.total=JSON.parse(localStorage.getItem("dbtotal"));
    this.createGoodChart();
    this.doughnutData = this.getData();
    // this.loadDoughnutCharts();
 

}


if(localStorage.getItem("dbinitialsoverall")){

 this.initialsoverall=JSON.parse(localStorage.getItem("dbinitialsoverall"))

            


this.createOverAllChart()



}


if(localStorage.getItem("dbassetscr")){

 this.assetss=JSON.parse(localStorage.getItem("dbassetscr"))

            


this.createAssetsCriticalityChart()



}

if(localStorage.getItem("dbmesurments")){

 this.measurements=JSON.parse(localStorage.getItem("dbmesurments"))

            


this.createMeasurementChart()



}



    }
    // ngOnDestroy() {
        //     this.AmCharts.destroyChart(this.chart);
        // }

 







        //********************************************************************************************
        public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
        public doughnutChartData:number[] = [350, 450, 100];
        public doughnutChartType:string = 'doughnut';

        // events
        public chartClicked(e:any):void {
            console.log(e);
        }

        public chartHovered(e:any):void {
            console.log(e);
        }


        public handleRollOver(e){
            var wedge = e.dataItem.wedge.node;
            wedge.parentNode.appendChild(wedge);
        }
        //********************************************************************************************

       

createGoodChart(){

          this.chart =this.AmCharts.makeChart("chartdiv", {
            "type": "pie",
            "startDuration": 0,
            "theme": "light",
            "addClassNames": true,
            "legend":{
              "position":"right",
              "marginRight":180,
              "autoMargins":false
            },
            "innerRadius": "30%",
            "defs": {
              "filter": [{
                "id": "shadow",
                "width": "200%",
                "height": "200%",
                "feOffset": {
                  "result": "offOut",
                  "in": "SourceAlpha",
                  "dx": 0,
                  "dy": 0
                },
                "feGaussianBlur": {
                  "result": "blurOut",
                  "in": "offOut",
                  "stdDeviation": 5
                },
                "feBlend": {
                  "in": "SourceGraphic",
                  "in2": "blurOut",
                  "mode": "normal"
                }
              }]
            },
            "dataProvider": [ {
              "country": "Good",
              "litres": this.goodd,
              "color": "#55aa67"
            }, {
              "country": "Alarm",
              "litres": this.alarmm,
              "color":"#efed51"
            } 
            , {
              "country": "Danger",
              "litres": this.dangerr,
              "color":"#ef3823"
            }
            , {
              "country": "Warning",
              "litres": this.warningg,
              "color":"#f7a522"
            },
            {
              "country": "Other",
              "litres": this.total-(this.goodd+this.warningg+this.dangerr+this.alarmm),
              "color":"#95a5a6"
            }
            ],
            "valueField": "litres",
            "titleField": "country",
            "colorField": "color"
            // ,
            // "export": {
              //   "enabled": true,
              //   "position": "bottom-right"
              // }
            });
        }






        GoodRefresh(){

            if (AmCharts.isReady) {
                this.createGoodChart();
            } else {
                AmCharts.ready(() => this.createGoodChart());
            }

        }

OverAllRefresh(){

            if (AmCharts.isReady) {
                this.createOverAllChart();
            } else {
                AmCharts.ready(() => this.createOverAllChart());
            }

        }

AssetsCriticalityRefresh(){

            if (AmCharts.isReady) {
                this.createMeasurementChart();
            } else {
                AmCharts.ready(() => this.createMeasurementChart());
            }

        }


MeasurementsRefresh(){

            if (AmCharts.isReady) {
                this.createAssetsCriticalityChart();
            } else {
                AmCharts.ready(() => this.createAssetsCriticalityChart());
            }

        }



createOverAllChart(){
          this.chart = this.AmCharts.makeChart( "chartdiv2", {
            "type": "serial",
            "theme": "light",
            "color":"#FFFFFF",
            "fontSize":14,
             // "addClassNames": true,
             // "plotAreaBorderAlpha": 1,
             //  "plotAreaBorderColor": "#c00",
            "marginRight": 40,
            "marginLeft": 40,
            "autoMarginOffset": 20,
            "dataDateFormat": "YYYY",
            "valueAxes": [ {
              "id": "v1",
              "axisAlpha": 0,
              "position": "left",
              "ignoreAxisWidth": true,
              "minimum":0
            } ]
            ,
            "graphs": [ {
              "id": "g1",  
              "fillAlphas": 0.2,
              "bullet": "round",
              "bulletBorderAlpha": 1,
              "bulletColor": "#FFFFFF",
              "bulletSize": 5,
              "hideBulletsCount": 50,
              "lineThickness": 2,
              "title": "red line",
              "useLineColorForBulletBorder": true,
              "valueField": "value"
            } ],
            "chartCursor": {
              "valueLineEnabled": true,
              "valueLineBalloonEnabled": true,
              "cursorAlpha": 0,
              "zoomable": false,
              "valueZoomable": false,
              "valueLineAlpha": 0.5
            },
            "categoryField": "date",
            "categoryAxis": {
              "parseDates": true,
              "dashLength": 1,
              "minorGridEnabled": true
            },
            "export": {
              "enabled": true
            },
            "dataProvider": this.initialsoverall
          } );

        }






        createAssetsCriticalityChart(){
          var chart1 =AmCharts.makeChart("chartdiv1", {
            "type": "serial",
            "theme": "light",
            "color":"#FFFFFF",
            "fontSize":14,
            "dataProvider": this.assetss,
            "valueAxes": [{
              "integersOnly": false,
              "maximum": 40,
              "minimum": 1,
              "reversed": false,
              "axisAlpha": 0,
              "dashLength": 5,
              "gridCount": 10,
              "position": "left",
              "title": "Assets Criticality"
            }],
            "startDuration": 0.5,
            "graphs": [{
              "balloonText": "Good: [[category]]: [[value]]%",
              "bullet": "round",
              "hidden": false,
              "title": "Good",
              "valueField": "Good",
              "fillAlphas": 0
            }, {
              "balloonText": " PreAlarm: [[category]]: [[value]]%",
              "bullet": "round",
              "title": "PreAlarm",
              "valueField": "PreAlarm",
              "fillAlphas": 0
            }, {
              "balloonText": "Alarm: [[category]]: [[value]]%",
              "bullet": "round",
              "title": "Alarm",
              "valueField": "Alarm",
              "fillAlphas": 0
            },
            {
              "balloonText": "Danger: [[category]]: [[value]]%",
              "bullet": "round",
              "title": "Danger",
              "valueField": "Danger",
              "fillAlphas": 0
            },
            {
              "balloonText": " NA: [[category]]: [[value]]%",
              "bullet": "round",
              "title": "NA",
              "valueField": "NA",
              "fillAlphas": 0
            }
            ],
            "chartCursor": {
              "cursorAlpha": 0,
              "zoomable": false
            },
            "categoryField": "OperationYear",
            "categoryAxis": {
              "gridPosition": "start",
              "axisAlpha": 0,
              "fillAlpha": 0.05,
              "fillColor": "#000000",
              "gridAlpha": 0,
              "position": "top"
            },
            "export": {
              "enabled": true,
              "position": "bottom-right"
            }
          });

        }





        createMeasurementChart(){
          var chart4 = this.AmCharts.makeChart( "chartdiv3", {
            "type": "serial",
            "theme": "light",
            "color":"#FFFFFF",
            "fontSize":14,
            
            "marginLeft": 70,
            "autoMarginOffset": 20,
            "dataDateFormat": "YYYY",
            "valueAxes": [ {
              "id": "v1",
              "axisAlpha": 0,
              "position": "left",
              "ignoreAxisWidth": true
            } ],
            "balloon": {
              "borderThickness": 1,
              "shadowAlpha": 0
            },
            "graphs": [ {
              "id": "g1",
              "fillAlphas": 0.2,
              "bullet": "round",
              "bulletBorderAlpha": 1,
              "bulletColor": "#FFFFFF",
              "bulletSize": 5,
              "hideBulletsCount": 50,
              "lineThickness": 2,
              "title": "red line",
              "useLineColorForBulletBorder": true,
              "valueField": "value",
              "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
            } ],
            "chartCursor": {
              "valueLineEnabled": true,
              "valueLineBalloonEnabled": true,
              "cursorAlpha": 0,
              "zoomable": false,
              "valueZoomable": true,
              "valueLineAlpha": 0.5
            },
            "categoryField": "date",
            "categoryAxis": {
              "parseDates": true,
              "dashLength": 1,
              "minorGridEnabled": true
            },
            "export": {
              "enabled": true
            },
            "dataProvider": this.measurements
          } );

        }







        //********************************************************************************************

        //********************************************************************************************








        //********************************************************************************************
        get data():Machine[] { 
            return this.dataService.serviceData; 
        } 
        set data(value: Machine[]) { 
            this.dataService.serviceData = value; 
        } 
        get goodd():number{ 
            return this.dataService.good; 
        } 
        set goodd(value: number) { 
            this.dataService.good = value; 
        }
        get warningg():number{ 
            return this.dataService.warning; 
        } 
        set warningg(value: number) { 
            this.dataService.warning = value; 
        }
        get alarmm():number{ 
            return this.dataService.alarm; 
        } 
        set alarmm(value: number) { 
            this.dataService.alarm = value; 
        }
        get dangerr():number{ 
            return this.dataService.danger; 
        } 
        set dangerr(value: number) { 
            this.dataService.danger = value; 
        }
        get total():number{ 
            return this.dataService.total; 
        } 
        set total(value: number) { 
            this.dataService.total = value; 
        }
        get isLoading():boolean{ 
            return this.dataService.isLoading; 
        } 
        set isLoading(value: boolean) { 
            this.dataService.isLoading = value; 
        }
        get chart():any{ 
            return this.dataService.chart; 
        } 
        set chart(value: any) { 
            this.dataService.chart = value; 
        }
        get chart1():any{ 
            return this.dataService.chart1; 
        } 
        set chart1(value: any) { 
            this.dataService.chart1 = value; 
        }
        get chart2():any{ 
            return this.dataService.chart2; 
        } 
        set chart2(value: any) { 
            this.dataService.chart2 = value; 
        }
        get chart3():any{ 
            return this.dataService.chart3; 
        } 
        set chart3(value: any) { 
            this.dataService.chart3 = value; 
        }
        get chart4():any{ 
            return this.dataService.chart4; 
        } 
        set chart4(value: any) { 
            this.dataService.chart4 = value; 
        }
        get chart6():any{ 
            return this.dataService.chart6; 
        } 
        set chart6(value: any) { 
            this.dataService.chart6 = value; 
        }
        get doughnutData():Array<Object>{ 
            return this.dataService.doughnutData; 
        } 
        set doughnutData(value: Array<Object>) { 
            this.dataService.doughnutData = value; 
        }
        get initials():Overall[]{ 
            return this.dataService.initials; 
        } 
        set initials(value: Overall[]) { 
            this.dataService.initials = value; 
        }
        get assets():assets[]{ 
            return this.dataService.assets; 
        } 
        set assets(value: assets[]) { 
            this.dataService.assets = value; 
        }
        //********************************************************************************************

        //*************************************YEAR*************************************************
        getOveloYear() {
            var server=sessionStorage.getItem('server');
            var user=sessionStorage.getItem('user');
            var password=sessionStorage.getItem('password');
            var database=sessionStorage.getItem('database'); 
            return this.http.get('https://betavib.herokuapp.com/betavib/OverYearOvelo/'+server+'/'+user+'/'+password+'/'+database)
            .map(res => res.json());
        }

        getPeakYear() {
            var server=sessionStorage.getItem('server');
            var user=sessionStorage.getItem('user');
            var password=sessionStorage.getItem('password');
            var database=sessionStorage.getItem('database'); 
            return this.http.get('https://betavib.herokuapp.com/betavib/OverYearOvelo/'+server+'/'+user+'/'+password+'/'+database)
            .map(res => res.json());
        }

        getRmsYear() {
            var server=sessionStorage.getItem('server');
            var user=sessionStorage.getItem('user');
            var password=sessionStorage.getItem('password');
            var database=sessionStorage.getItem('database'); 
            return this.http.get('https://betavib.herokuapp.com/betavib/OverYearRms/'+server+'/'+user+'/'+password+'/'+database)
            .map(res => res.json());
        }

        getCfYear() {
            var server=sessionStorage.getItem('server');
            var user=sessionStorage.getItem('user');
            var password=sessionStorage.getItem('password');
            var database=sessionStorage.getItem('database'); 
            return this.http.get('https://betavib.herokuapp.com/betavib/OverYearCf/'+server+'/'+user+'/'+password+'/'+database)
            .map(res => res.json());
        }
        getKuYear() {
            var server=sessionStorage.getItem('server');
            var user=sessionStorage.getItem('user');
            var password=sessionStorage.getItem('password');
            var database=sessionStorage.getItem('database'); 
            return this.http.get('https://betavib.herokuapp.com/betavib/OverYearKu/'+server+'/'+user+'/'+password+'/'+database)
            .map(res => res.json());
        }


        remplirChartsDiv2(){
            this.chart4= this.AmCharts.makeChart( "chartdiv2", {
                "type": "serial",
                "theme": "light",
                "color":"#FFFFFF",
                "fontSize":14,
                "marginRight": 40,
                "marginLeft": 40,
                "autoMarginOffset": 20,
                "dataDateFormat": "YYYY",
                "valueAxes": [ {
                    "id": "v1",
                    "axisAlpha": 0,
                    "position": "left",
                    "ignoreAxisWidth": true,
                    "minimum":0
                } ],
                "graphs": [ {
                    "id": "g1",
                    "fillAlphas": 0.2,
                    "bullet": "round",
                    "bulletBorderAlpha": 1,
                    "bulletColor": "#FFFFFF",
                    "bulletSize": 5,
                    "hideBulletsCount": 50,
                    "lineThickness": 2,
                    "title": "red line",
                    "useLineColorForBulletBorder": true,
                    "valueField": "value"
                } ],
                "chartCursor": {
                    "valueLineEnabled": true,
                    "valueLineBalloonEnabled": true,
                    "cursorAlpha": 0,
                    "zoomable": false,
                    "valueZoomable": true,
                    "valueLineAlpha": 0.5
                },
               
                "categoryField": "date",
                "categoryAxis": {
                    "parseDates": true,
                    "dashLength": 1,
                    "minorGridEnabled": true
                },
                "export": {
                    "enabled": true
                },
                "dataProvider": this.dataService.initials
            } );
        }

        remplirChartsAssets(){
            var chart1 =AmCharts.makeChart("chartdiv1", {
                "type": "serial",
                "theme": "light",
                "color":"#FFFFFF",
                "fontSize":14,
                "dataProvider": this.dataService.assets,
                "valueAxes": [{
                    "integersOnly": true,
                    "maximum": 40,
                    "minimum": 1,
                    "reversed": false,
                    "axisAlpha": 0,
                    "dashLength": 5,
                    "gridCount": 10,
                    "position": "left",
                    "title": "Assets Criticality"
                }],
                "startDuration": 0.5,
                "graphs": [{
                    "balloonText": "Good: [[category]]: [[value]]%",
                    "bullet": "round",
                    "hidden": false,
                    "title": "Good",
                    "valueField": "Good",
                    "fillAlphas": 0
                }, {
                    "balloonText": "PreAlarm: [[category]]: [[value]]%",
                    "bullet": "round",
                    "title": "PreAlarm",
                    "valueField": "PreAlarm",
                    "fillAlphas": 0
                }, {
                    "balloonText": "Alarm: [[category]]: [[value]]%",
                    "bullet": "round",
                    "title": "Alarm",
                    "valueField": "Alarm",
                    "fillAlphas": 0
                },
                {
                    "balloonText": "Danger: [[category]]: [[value]]%",
                    "bullet": "round",
                    "title": "Danger",
                    "valueField": "Danger",
                    "fillAlphas": 0
                },
                {
                    "balloonText": "NA: [[category]]: [[value]]%",
                    "bullet": "round",
                    "title": "NA",
                    "valueField": "NA",
                    "fillAlphas": 0
                }
                ],
                "chartCursor": {
                    "cursorAlpha": 0,
                    "zoomable": false
                },
                "categoryField": "OperationYear",
                "categoryAxis": {
                    "gridPosition": "start",
                    "axisAlpha": 0,
                    "fillAlpha": 0.05,
                    "fillColor": "#000000",
                    "gridAlpha": 0,
                    "position": "top"
                },
                "export": {
                    "enabled": true,
                    "position": "bottom-right"
                }
            });
        }


        remplirChartsDiv2Month(){
            this.chart4= this.AmCharts.makeChart( "chartdiv2", {
                "type": "serial",
                "theme": "light",
                "color":"#FFFFFF",
                "fontSize":14,
                "marginRight": 40,
                "marginLeft": 40,
                "autoMarginOffset": 20,
                "dataDateFormat": "YYYY-MM",
                "valueAxes": [ {
                    "id": "v1",
                    "axisAlpha": 0,
                    "position": "left",
                    "ignoreAxisWidth": true,
                    "minimum":0
                } ],
                "graphs": [ {
                    "id": "g1",
                    "fillAlphas": 0.2,
                    "bullet": "round",
                    "bulletBorderAlpha": 1,
                    "bulletColor": "#FFFFFF",
                    "bulletSize": 5,
                    "hideBulletsCount": 50,
                    "lineThickness": 2,
                    "title": "red line",
                    "useLineColorForBulletBorder": true,
                    "valueField": "value"
                } ],
                "chartCursor": {
                    "valueLineEnabled": true,
                    "valueLineBalloonEnabled": true,
                    "cursorAlpha": 0,
                    "zoomable": false,
                    "valueZoomable": true,
                    "valueLineAlpha": 0.5
                },
                "categoryField": "date",
                "categoryAxis": {
                    "parseDates": true,
                    "dashLength": 1,
                    "minorGridEnabled": true
                },
                "export": {
                    "enabled": true
                },
                "dataProvider": this.dataService.initials
            } );
        }
        private getOveloYeare(){

            this.getOveloYear().subscribe(initial => {

                this.initials=[];
                for (var i=0;i< initial.length;i++) {
                    this.dataService.initials.push({
                        value: initial[i][""][0],
                        date:initial[i][""][1]
                    });
                    console.log(this.dataService.initials+"ahahahahaahahahaahahahahahaha");
                }

            }
            ,
            (error)=>{},
            ()=>{
                this.remplirChartsDiv2();

                /////////////////////////////
                // Completion event handler
                /////////////////////////////

            }


            );

        }
        private getRmsYeare(){

            this.getRmsYear().subscribe(initial=> {

                this.initials=[];
                for (var i=0;i< initial.length;i++) {
                    this.dataService.initials.push({
                        value: initial[i][""][0],
                        date:initial[i][""][1]
                    });
                    console.log(this.dataService.initials+"ahahahahaahahahaahahahahahaha");
                }
            }
            ,
            (error)=>{},
            ()=>{
                this.remplirChartsDiv2();

                /////////////////////////////
                // Completion event handler
                /////////////////////////////

            }
            );

        }
        private getPeakYeare(){

            this.getOveloYear().subscribe(initial => {

                this.initials=[];
                for (var i=0;i< initial.length;i++) {
                    this.dataService.initials.push({
                        value: initial[i][""][0],
                        date:initial[i][""][1]
                    });
                    console.log(this.dataService.initials+"ahahahahaahahahaahahahahahaha");
                }
            }
            ,
            (error)=>{},
            ()=>{
                this.remplirChartsDiv2();

                /////////////////////////////
                // Completion event handler
                /////////////////////////////

            });

        }
        private getCfYeare(){

            this.getCfYear().subscribe(initial => {
                this.initials=[];
                for (var i=0;i< initial.length;i++) {
                    this.dataService.initials.push({
                        value: initial[i][""][0],
                        date:initial[i][""][1]
                    });
                    console.log(this.dataService.initials+"ahahahahaahahahaahahahahahaha");
                }
            }
            ,
            (error)=>{},
            ()=>{
                this.remplirChartsDiv2();

                /////////////////////////////
                // Completion event handler
                /////////////////////////////

            });

        }
        private getKuYeare(){

            this.getKuYear().subscribe(initial => {
                this.initials=[];
                for (var i=0;i< initial.length;i++) {
                    this.dataService.initials.push({
                        value: initial[i][""][0],
                        date:initial[i][""][1]
                    });
                    console.log(this.dataService.initials+"ahahahahaahahahaahahahahahaha");
                }

            }
            ,
            (error)=>{},
            ()=>{
                this.remplirChartsDiv2();

                /////////////////////////////
                // Completion event handler
                /////////////////////////////

            });

        }
        //************************************Month*****************
        getOveloMonth() {
            var server=sessionStorage.getItem('server');
            var user=sessionStorage.getItem('user');
            var password=sessionStorage.getItem('password');
            var database=sessionStorage.getItem('database'); 
            return this.http.get('https://betavib.herokuapp.com/betavib/OverMonthOvelo/'+server+'/'+user+'/'+password+'/'+database)
            .map(res => res.json());
        }

        getPeakMonth() {
            var server=sessionStorage.getItem('server');
            var user=sessionStorage.getItem('user');
            var password=sessionStorage.getItem('password');
            var database=sessionStorage.getItem('database'); 
            return this.http.get('https://betavib.herokuapp.com/betavib/OverMonthPeak/'+server+'/'+user+'/'+password+'/'+database)
            .map(res => res.json());
        }

        getRmsMonth() {
            var server=sessionStorage.getItem('server');
            var user=sessionStorage.getItem('user');
            var password=sessionStorage.getItem('password');
            var database=sessionStorage.getItem('database'); 
            return this.http.get('https://betavib.herokuapp.com/betavib/OverMonthRMS/'+server+'/'+user+'/'+password+'/'+database)
            .map(res => res.json());
        }

        getCfMonth() {
            var server=sessionStorage.getItem('server');
            var user=sessionStorage.getItem('user');
            var password=sessionStorage.getItem('password');
            var database=sessionStorage.getItem('database'); 
            return this.http.get('https://betavib.herokuapp.com/betavib/OverMonthCf/'+server+'/'+user+'/'+password+'/'+database)
            .map(res => res.json());
        }
        getKuMonth() {
            var server=sessionStorage.getItem('server');
            var user=sessionStorage.getItem('user');
            var password=sessionStorage.getItem('password');
            var database=sessionStorage.getItem('database'); 
            return this.http.get('https://betavib.herokuapp.com/betavib/OverMonthKu/'+server+'/'+user+'/'+password+'/'+database)
            .map(res => res.json());
        }

        private getOveloMonthe(){

            this.getOveloMonth().subscribe(initial => {

                this.initials=[];
                for (var i=0;i< initial.length;i++) {
                    this.dataService.initials.push({
                        value: initial[i][""][0].toFixed(3),
                        date:initial[i][""][2]+"-"+initial[i][""][1]
                    });
                    console.log(this.dataService.initials+"ahahahahaahahahaahahahahahaha");
                }

            }
            ,
            (error)=>{},
            ()=>{
                this.remplirChartsDiv2Month();

                /////////////////////////////
                // Completion event handler
                /////////////////////////////

            }


            );

        }
        private getRmsMonthe(){

            this.getRmsMonth().subscribe(initial=> {

                this.initials=[];
                for (var i=0;i< initial.length;i++) {
                    this.dataService.initials.push({
                        value: initial[i][""][0].toFixed(3),
                        date:initial[i][""][2]+"-"+initial[i][""][1]
                    });
                    console.log(this.dataService.initials+"ahahahahaahahahaahahahahahaha");
                }
            }
            ,
            (error)=>{},
            ()=>{
                this.remplirChartsDiv2Month();

                /////////////////////////////
                // Completion event handler
                /////////////////////////////

            }
            );

        }
        private getPeakMonthe(){

            this.getOveloMonth().subscribe(initial => {

                this.initials=[];
                for (var i=0;i< initial.length;i++) {
                    this.dataService.initials.push({
                        value: initial[i][""][0].toFixed(3),
                        date:initial[i][""][2]+"-"+initial[i][""][1]
                    });
                    console.log(this.dataService.initials+"ahahahahaahahahaahahahahahaha");
                }
            }
            ,
            (error)=>{},
            ()=>{
                this.remplirChartsDiv2Month();

                /////////////////////////////
                // Completion event handler
                /////////////////////////////

            });

        }
        private getCfMonthe(){

            this.getCfMonth().subscribe(initial => {
                this.initials=[];
                for (var i=0;i< initial.length;i++) {
                    this.dataService.initials.push({
                        value: initial[i][""][0].toFixed(3),
                        date:initial[i][""][2]+"-"+initial[i][""][1]
                    });
                    console.log(this.dataService.initials+"ahahahahaahahahaahahahahahaha");
                }
            }
            ,
            (error)=>{},
            ()=>{
                this.remplirChartsDiv2Month();

                /////////////////////////////
                // Completion event handler
                /////////////////////////////

            });

        }
        private getKuMonthe(){

            this.getKuMonth().subscribe(initial => {
                this.initials=[];
                for (var i=0;i< initial.length;i++) {
                    this.dataService.initials.push({
                        value: initial[i][""][0].toFixed(3),
                        date:initial[i][""][2]+"-"+initial[i][""][1]
                    });
                }

            }
            ,
            (error)=>{},
            ()=>{
                this.remplirChartsDiv2Month();

                /////////////////////////////
                // Completion event handler
                /////////////////////////////

            });

        }




        //*********************************************************



        year(event){

            document.getElementById(event.target.id).style.backgroundColor = "#2c3e50"; 
            document.getElementById("month").style.backgroundColor = "#1D9F93"; 
            this.yearMonth=event.target.id;
            if(this.pointType=="ovelo"){
                this.getOveloYeare();

            }
            if(this.pointType=="rms"){
                this.getRmsYeare();
            }
            if(this.pointType=="peak"){
                this.getPeakYeare();
            }
            if(this.pointType=="cf"){
                this.getCfYeare();
            }
            if(this.pointType=="ku"){
                this.getKuYeare();
            }

        }
        month(event){
            document.getElementById(event.target.id).style.backgroundColor = "#2c3e50";  
            document.getElementById("year").style.backgroundColor = "#1D9F93"; 
            this.yearMonth=event.target.id;

            if(this.pointType=="ovelo"){
                this.getOveloMonthe();

            }
            if(this.pointType=="rms"){
                this.getRmsMonthe();
            }
            if(this.pointType=="peak"){
                this.getPeakMonthe();
            }
            if(this.pointType=="cf"){
                this.getCfMonthe();
            }
            if(this.pointType=="ku"){
                this.getKuMonthe();
            }


        }
        ovelo(event){
            document.getElementById(event.target.id).style.backgroundColor = "#2c3e50"; 
            document.getElementById("rms").style.backgroundColor = "#1D9F93"; 
            document.getElementById("peak").style.backgroundColor = "#1D9F93"; 
            document.getElementById("cf").style.backgroundColor = "#1D9F93"; 
            document.getElementById("ku").style.backgroundColor = "#1D9F93"; 
            this.pointType=event.target.id;
            if(this.yearMonth=="year"){
                this.getOveloYeare();
            }
            else{
                this.getOveloMonthe();
            }



        }
        rms(event){
            document.getElementById(event.target.id).style.backgroundColor = "#2c3e50"; 
            document.getElementById("ovelo").style.backgroundColor = "#1D9F93"; 
            document.getElementById("peak").style.backgroundColor = "#1D9F93"; 
            document.getElementById("cf").style.backgroundColor = "#1D9F93"; 
            document.getElementById("ku").style.backgroundColor = "#1D9F93"; 
            this.pointType=event.target.id;

            if(this.yearMonth=="year"){
                this.getRmsYeare();
            }
            else{
                this.getRmsMonthe();  
            }
        }
        peak(event){
            document.getElementById(event.target.id).style.backgroundColor = "#2c3e50"; 
            document.getElementById("rms").style.backgroundColor = "#1D9F93"; 
            document.getElementById("ovelo").style.backgroundColor = "#1D9F93"; 
            document.getElementById("cf").style.backgroundColor = "#1D9F93"; 
            document.getElementById("ku").style.backgroundColor = "#1D9F93"; 
            this.pointType=event.target.id;
            if(this.yearMonth=="year"){
                this.getPeakYeare();
            }
            else{
                this.getPeakMonthe();  
            }
        }
        cf(event){
            document.getElementById(event.target.id).style.backgroundColor = "#2c3e50"; 

            document.getElementById("rms").style.backgroundColor = "#1D9F93"; 
            document.getElementById("peak").style.backgroundColor = "#1D9F93"; 
            document.getElementById("ovelo").style.backgroundColor = "#1D9F93"; 
            document.getElementById("ku").style.backgroundColor = "#1D9F93"; 
            this.pointType=event.target.id;
            if(this.yearMonth=="year"){
                this.getCfYeare();
            }
            else{
                this.getCfMonthe();  
            }
        }
        ku(event){

            document.getElementById(event.target.id).style.backgroundColor = "#2c3e50"; 

            document.getElementById("rms").style.backgroundColor = "#1D9F93"; 
            document.getElementById("peak").style.backgroundColor = "#1D9F93"; 
            document.getElementById("ovelo").style.backgroundColor = "#1D9F93"; 
            document.getElementById("cf").style.backgroundColor = "#1D9F93"; 
            this.pointType=event.target.id;
            if(this.yearMonth=="year"){
                this.getKuYeare();
            }
            else{
                this.getKuMonthe();  
            }
        }
        assetsmonth(event){
            //document.getElementById(event.target.id).style.backgroundColor = "#1D9F93"; 
            document.getElementById("monthasset").style.backgroundColor = "#2c3e50"; 
            document.getElementById("yearasset").style.backgroundColor = "#1D9F93"; 
            if(sessionStorage.getItem("plantchange")==null && sessionStorage.getItem("depchange")==null)
                {this.getAssetsCriticalityMonthe();
                    console.log("zouz null")}
                    else if(sessionStorage.getItem("plantchange")!=null &&sessionStorage.getItem("depchange")==null)
                        {this.getAssetsCriticalitMonthe();
                            console.log("dep null")}
                            else if (sessionStorage.getItem("depchange")) {this.getAssetsCriticalitMonthByDepe()
                                console.log("fama dep")
                            }
                         
                        }
                        assetsyear(event){

                            document.getElementById(event.target.id).style.backgroundColor = "#2c3e50"; 
                            document.getElementById("monthasset").style.backgroundColor = "#1D9F93"; 
                            this.getAssetsCriticalitye();


                            console.log("finished")
                        }
                        mesurmentsyear(event){
                            document.getElementById(event.target.id).style.backgroundColor = "#2c3e50"; 
                            document.getElementById("monthasset").style.backgroundColor = "#1D9F93"; 
                            this.getMeasurementse();
                            console.log("yeaaaar");
                        }
                        mesurmentsmonth(event){
                            document.getElementById(event.target.id).style.backgroundColor = "#2c3e50"; 
                            document.getElementById("mesurmentsmonth").style.backgroundColor = "#1D9F93"; 
                            //   this.getMeasurementse();
                            console.log("month");
                        }

                        //************************************************************************


                        getMeasurements(){

                            var server=sessionStorage.getItem('server');
                            var user=sessionStorage.getItem('user');
                            var password=sessionStorage.getItem('password');
                            var database=sessionStorage.getItem('database');
                            return this.http.get('https://betavib.herokuapp.com/betavib/Measurements/'+server+'/'+user+'/'+password+'/'+database)
                            .map(res => res.json());
                        }
                        getMeasurementse(){
                            this.getMeasurements().subscribe(measurements => {
                                this.dataService.measurements=[];
                                for (var i=0;i< measurements.length;i++) {
                                    this.dataService.measurements.push({
                                        value: measurements[i][""][0],
                                        date:measurements[i][""][1]
                                    });
                                    console.log(this.dataService.measurements[i]["OperationYear"]+"looooooooooolili");
                                }

                                // BaMenu.mch=machiness;

                            },
                            (error)=>{},
                            ()=>{
                                //this.createOverAllChart();
                                /////////////////////////////
                                // Completion event handler
                                /////////////////////////////
                               
                            }
                            );
                        }


                        getAssetsCriticality(){

                            var server=sessionStorage.getItem('server');
                            var user=sessionStorage.getItem('user');
                            var password=sessionStorage.getItem('password');
                            var database=sessionStorage.getItem('database');

                            return this.http.get('https://betavib.herokuapp.com/betavib/AssetsCrYear/'+server+'/'+user+'/'+password+'/'+database)
                            .map(res => res.json());


                        }





                        getAssetsCriticalitye(){

                         
                            this.getAssetsCriticality().subscribe(assets => {
                                this.dataService.assets=[];
                                for (var i=0;i< assets.length;i++) {
                                    this.dataService.assets.push({
                                        OperationYear: assets[i]["OperationYear"],
                                        Good:assets[i]["Good"],
                                        PreAlarm:assets[i]["PreAlarm"],
                                        Alarm:assets[i]["Alarm"],
                                        Danger:assets[i]["Danger"],
                                        NA:assets[i]["NA"]
                                    });
                                    console.log(this.dataService.assets[i]["OperationYear"]+"looooooooooolili");
                                }

                                // BaMenu.mch=machiness;

                            },
                            (error)=>{},
                            ()=>{
                                //this.createOverAllChart();
                                this.remplirChartsAssets();
                                /////////////////////////////
                                // Completion event handler
                                /////////////////////////////
                            }
                            );

                        }


                        getAssetsCriticalitMonthe(){

                            this.getAssetsCriticalityMonthByPlant().subscribe(assets => {
                                this.dataService.assets=[];
                                for (var i=0;i< assets.length;i++) {
                                    this.dataService.assets.push({
                                        OperationYear: assets[i]["OperationYear"],
                                        Good:assets[i]["Good"],
                                        PreAlarm:assets[i]["PreAlarm"],
                                        Alarm:assets[i]["Alarm"],
                                        Danger:assets[i]["Danger"],
                                        NA:assets[i]["NA"]
                                    });

                                }

                                // BaMenu.mch=machiness;

                            },
                            (error)=>{},
                            ()=>{
                                //this.createOverAllChart();
                                this.remplirChartsAssets();
                                /////////////////////////////
                                // Completion event handler
                                /////////////////////////////
                            }
                            );

                        }




                        getAssetsCriticalitMonthByDepe(){
                            this.getAssetsCriticalityMonthByDep().subscribe(assets => {
                                this.dataService.assets=[];
                                for (var i=0;i< assets.length;i++) {
                                    this.dataService.assets.push({
                                        OperationYear: assets[i]["OperationYear"],
                                        Good:assets[i]["Good"],
                                        PreAlarm:assets[i]["PreAlarm"],
                                        Alarm:assets[i]["Alarm"],
                                        Danger:assets[i]["Danger"],
                                        NA:assets[i]["NA"]
                                    });

                                }

                                // BaMenu.mch=machiness;

                            },
                            (error)=>{},
                            ()=>{
                                //this.createOverAllChart();
                                this.remplirChartsAssets();
                                /////////////////////////////
                                // Completion event handler
                                /////////////////////////////
                            }
                            );

                        }














                        getAssetsCriticalityMonth(){

                            var server=sessionStorage.getItem('server');
                            var user=sessionStorage.getItem('user');
                            var password=sessionStorage.getItem('password');
                            var database=sessionStorage.getItem('database');

                            return this.http.get('https://betavib.herokuapp.com/betavib/AssetsCrMonth/'+server+'/'+user+'/'+password+'/'+database)
                            .map(res => res.json());


                        }





                        getAssetsCriticalityMonthByPlant(){

                            var server=sessionStorage.getItem('server');
                            var user=sessionStorage.getItem('user');
                            var password=sessionStorage.getItem('password');
                            var database=sessionStorage.getItem('database');
                            var plant=sessionStorage.getItem('plantchange');


                            return this.http.get('https://betavib.herokuapp.com/betavib/AssetsCrMonthByPlant/'+server+'/'+user+'/'+password+'/'+database+'/'+plant)
                            .map(res => res.json());


                        }




                        getAssetsCriticalityMonthByDep(){

                            var server=sessionStorage.getItem('server');
                            var user=sessionStorage.getItem('user');
                            var password=sessionStorage.getItem('password');
                            var database=sessionStorage.getItem('database');
                            var dep=sessionStorage.getItem('depchange');


                            return this.http.get('https://betavib.herokuapp.com/betavib/AssetsCrMonthByDep/'+server+'/'+user+'/'+password+'/'+database+'/'+dep)
                            .map(res => res.json());


                        }







                        getAssetsCriticalityMonthe(){

                        
                            this.getAssetsCriticalityMonth().subscribe(assets => {
                                this.dataService.assets=[];
                                for (var i=0;i< assets.length;i++) {
                                    this.dataService.assets.push({
                                        OperationYear: assets[i]["OperationYear"]+"-"+assets[i][""],
                                        Good:assets[i]["Good"],
                                        PreAlarm:assets[i]["PreAlarm"],
                                        Alarm:assets[i]["Alarm"],
                                        Danger:assets[i]["Danger"],
                                        NA:assets[i]["NA"]
                                    });
                                    console.log(this.dataService.assets[i][""]+this.dataService.assets[i][0]+"looooooooooolili");
                                }

                                // BaMenu.mch=machiness;

                            },
                            (error)=>{},
                            ()=>{
                                //this.createOverAllChart();
                                this.remplirChartsAssets();
                                /////////////////////////////
                                // Completion event handler
                                /////////////////////////////
                            }
                            );

                        }

 ngAfterViewInit() {

      this.loadDoughnutCharts();
  }

private loadDoughnutCharts() {
   this.chart6 =$('#chart-areaa').get(0) as HTMLCanvasElement;
    new Chart( this.chart6.getContext('2d')).Doughnut(this.doughnutData, {
      segmentShowStroke: false,
      percentageInnerCutout : 64,
      responsive: true
    });

  }

getData() {
    let dashboardColors = this._baConfig.get().colors.dashboard;
    return [
     
{
        value: this.goodd,
        color: dashboardColors.green,
        highlight: colorHelper.shade(dashboardColors.green, 15),
        label: 'Good',
        percentage: ((this.goodd*100)/this.total).toFixed(2),
        order: 1,
      }
      , {
        value: this.alarmm,
        color: dashboardColors.yellow,
        highlight: colorHelper.shade(dashboardColors.yellow, 15),
        label: 'Alarm',
        percentage: ((this.alarmm*100)/this.total).toFixed(2),
        order: 4,
      },
       {
        value: this.warningg,
        color: dashboardColors.orange,
        highlight: colorHelper.shade(dashboardColors.orange, 15),
        label: 'Warning',
        percentage:  ((this.warningg*100)/this.total).toFixed(2),
        order: 2,
      },
       {
        value: this.dangerr,
        color: dashboardColors.red,
        highlight: colorHelper.shade(dashboardColors.red, 15),
        label: 'Danger',
        percentage: ((this.dangerr*100)/this.total).toFixed(2),
        order: 3,
      },
    ];

  }

















                    }
