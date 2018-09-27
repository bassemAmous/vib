import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { BaMenuService } from '../../services';
import { GlobalState } from '../../../global.state';
import { Http } from '@angular/http';
import { DataService } from '../../../../app/pages/data.service';
import { Machine } from './machine.interface';
import { Overall } from '../../../pages/maindashboard/overall.interface';
import { Failure } from '../../../pages/CostAnalysis/failure.interface';
import { AmChartsService } from "amcharts3-angular2";
import * as Chart from 'chart.js';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';
@Component({
  selector: 'ba-menu',
  templateUrl: './baMenu.html',
  styleUrls: ['./baMenu.scss']
})
export class BaMenu {
  public doughnutData: Array<Object>;
  public doughnutDataf: Array<Object>;
  machines:Machine[]=[];
  public static mch:any=[];
  ok:any=[];
  plants: any = [];
  depts: any = [];
  loadedCharacter: {};
  deptss:any=[];
  plant:any;
  total:number;
  currentUrl:any;
  onOff=false;
  onOffP=false;
  @Input() sidebarCollapsed: boolean = false;
  @Input() menuHeight: number;

  @Output() expandMenu = new EventEmitter<any>();

  public menuItems: any[];
  protected _menuItemsSub: Subscription;
  public showHoverElem: boolean;
  public hoverElemHeight: number;
  public hoverElemTop: number;
  protected _onRouteChange: Subscription;
  public outOfArea: number = -200;
  database:any;
  constructor(private _router: Router, private _service: BaMenuService,private http: Http,private _state: GlobalState,public dataService: DataService,private AmCharts: AmChartsService,private _baConfig:BaThemeConfigProvider) {
    console.log("***********-------------constructeurBamenu")
            
    if(!localStorage.getItem("dbplants")){
      this.dataService.good=0;
      this.dataService.warning=0;
      this.dataService.alarm=0;
      this.dataService.danger=0;
      this.dataService.total=0;



      this._service.getPlant().subscribe(plants => {
        for (var i=0; i<plants.length; i++)
          for (var name in plants[i]) {
            this.plants.push(plants[i][name]);  
            // console.log(plants[i][name]) ;
          }
          sessionStorage.setItem("plant",this.plants[0])

          localStorage.setItem("dbplants",JSON.stringify(this.plants));
        },(error)=>{},
        ()=>{
          /////////////////////////////
          // Completion event handler
          /////////////////////////////


          this.getDepartments();
        });
    }

  }

  public updateMenu(newMenuItems) {
    this.menuItems = newMenuItems;
    this.selectMenuAndNotify();
  }

  public selectMenuAndNotify(): void {
    if (this.menuItems) {
      console.log("d5aaaaal");
      document.getElementById("onoff").textContent="Off";
      document.getElementById("onoffp").textContent="Off";
      var element =   <HTMLSelectElement>document.getElementById("depttt")
      if(localStorage.getItem("dbdepts"))
              this.deptss=JSON.parse(localStorage.getItem("dbdepts"))
              element.disabled = true;
 var element2 =   <HTMLSelectElement>document.getElementById("planttts")
 
              element2.selectedIndex=0;
              element2.disabled = true;
      this.onOff=false;
      this.onOffP=false;
      
      this.menuItems = this._service.selectMenuItem(this.menuItems);
      this._state.notifyDataChanged('menu.activeLink', this._service.getCurrentItem());
    }
    
    
  }

  public ngOnInit(): void {
    console.log("nginiiiiiiiiiiiiitBa")
    this.dataService.good=0;
    this.dataService.warning=0;
    this.dataService.alarm=0;
    this.dataService.danger=0;
    this.dataService.total=0;
    this.database=sessionStorage.getItem("database")
    this.ok=["ok","okok","okokok"];
    this.currentUrl = this._router.url;
    this._onRouteChange = this._router.events.subscribe((event) => {
      
      
      if (event instanceof NavigationEnd) {


        if (this.menuItems) {
          this.selectMenuAndNotify();
          

        } else {
          // on page load we have to wait as event is fired before menu elements are prepared
          setTimeout(() => this.selectMenuAndNotify());

        }

      }
    });

    this._menuItemsSub = this._service.menuItems.subscribe(this.updateMenu.bind(this));
    // this._service.getPlant().subscribe(plants => {
    //   this.plants=[];
    //   for (var i=0; i<plants.length; i++)
    //     for (var name in plants[i]) {
    //       this.plants.push(plants[i][name]);  
          
    //     }
    //     sessionStorage.setItem("plant",this.plants[0])

    //   },(error)=>{},
    //   ()=>{
    //     /////////////////////////////
    //     // Completion event handler
    //     /////////////////////////////
    //     this.getDepartments();
    //   });
    if(localStorage.getItem("dbplants")){
     this.plants= JSON.parse(localStorage.getItem("dbplants"))
        sessionStorage.setItem("plant",this.plants[0])
       if( localStorage.getItem("dbdepts"))
         this.deptss=JSON.parse(localStorage.getItem("dbdepts"))

    }
  }


   ngAfterViewInit() {
      
   
  }


  // public ngOnDestroy(): void {
    //   // if(!sessionStorage.getItem("selectedMachine")){
      //   this._onRouteChange.unsubscribe();
      //   this._menuItemsSub.unsubscribe();
      // // }
      // }




      public hoverItem($event): void {
        this.showHoverElem = true;
        this.hoverElemHeight = $event.currentTarget.clientHeight;
        // TODO: get rid of magic 66 constant
        this.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - 66;
      }

      public toggleSubMenu($event): boolean {
        let submenu = jQuery($event.currentTarget).next();

        if (this.sidebarCollapsed) {
          this.expandMenu.emit(null);
          if (!$event.item.expanded) {
            $event.item.expanded = true;
          }
        } else {
          $event.item.expanded = !$event.item.expanded;
          submenu.slideToggle();
        }

        return false;
      }

      public test(){
        



      }



      private getDepartments(){
        if(!localStorage.getItem("dbdepts"))
          this._service.getDept().subscribe(depts => {
            for (var i=0; i<depts.length; i++)
              for (var name in depts[i]) {

                this.deptss.push(depts[i][name]);
                
              }
              localStorage.setItem("dbdepts",JSON.stringify(this.deptss));
            },(error)=>{},
            ()=>{
              /////////////////////////////
              // Completion event handler
              /////////////////////////////
              this.getMachines();

            });
      }
      //plaaaaaaaaaaaaaaaant changeeeee
      private getDepartmentsOnChange(value){
        

        this.getDeptSessionStorage(value).subscribe(depts => {
          sessionStorage.setItem("plantchange",value)
          this.deptss=[]

          for (var i=0; i<depts.length; i++)
            for (var name in depts[i]) {

              this.deptss.push(depts[i][name]);
              
            }

          },(error)=>{},
          ()=>{
            /////////////////////////////
            // Completion event handler
            /////////////////////////////
            let currentUrl = this._router.url; 

            if(currentUrl=="/pages/maindashboard" && this.onOff==false ){

              this.getMachinesOnChangeDashByPlant(value)}
              else if(currentUrl=="/pages/maindashboard" && this.onOff==true ){

                this.getMachinesOnChangeDashByDep(this.deptss[0])

              }
              else if(currentUrl!="/pages/maindashboard" && this.onOff==false) {
                


                this.getMachinesOnChangeDashByPlant(value)

              }
              else if(currentUrl!="/pages/maindashboard" && this.onOff==true) {


                this.getMachinesOnChange(this.deptss[0])
              }
            });
      }
      private getDepartmentsPageOnChange(value){
        

        this.getDeptSessionStorage(value).subscribe(depts => {
          sessionStorage.setItem("plantchange",value)
          this.deptss=[]

          for (var i=0; i<depts.length; i++)
            for (var name in depts[i]) {

              this.deptss.push(depts[i][name]);
              
            }

          });
      }


      private getMachines(){


        if(!localStorage.getItem("dbmachines")){
          this._service.getMachines().subscribe(machines => {


            var machiness:Machine[]=[];
            var machinaaa:Machine;
            this.dataService.good=0;
            this.dataService.warning=0;
            this.dataService.alarm=0;
            this.dataService.danger=0;
            for (var i=0; i<machines.length; i++)
            {
              machiness.push(machines[i]);
              
            }
            localStorage.setItem("dbmachines",JSON.stringify(machiness));
            this.dataService.serviceData = machiness;
            for (var i = 0; i < this.data.length; i++) {
              if (this.data[i].MachineState=="Green"){this.dataService.good++}
                else if (this.data[i].MachineState=="Yellow"){this.dataService.warning++}
                  else if (this.data[i].MachineState=="Orange"){this.dataService.alarm++}
                    else if (this.data[i].MachineState=="Red"){this.dataService.danger++}
                  }
                this.dataService.total=machiness.length;
                localStorage.setItem("dbtotal",JSON.stringify(this.dataService.total));

              },(error)=>{},
              ()=>{
                /////////////////////////////
                // Completion event handler
                /////////////////////////////

                this.createGoodChart();

                    this.getInitialOverAlle();
                    this.doughnutData = this.getData();
                    this.dataService.doughnutData=this.getData();
                    this.loadDoughnutCharts(); 
              });
        }



        
      }
      //hethi mta departement
      private getMachinesOnChange(value){

        
        this.getDeptMachineStorage(value).subscribe(machines => {
          var machiness:Machine[]=[];
          sessionStorage.setItem("depchange",value)
          for (var i=0; i<machines.length; i++)
          {
            machiness.push(machines[i]);

          }
          
          this.dataService.serviceData = machiness;
          let currentUrl = this._router.url; 
          if(currentUrl=="/pages/maindashboard"){

            this.getMachinesOnChangeDashByDep(value)
          }

          

        }
        ,(error)=>{},
        ()=>{
          /////////////////////////////
          // Completion event handler
          /////////////////////////////
          this.createGoodChart();
          this.doughnutData = this.getData();
          this.dataService.doughnutData=this.getData();
          this.loadDoughnutCharts(); 
          this.getAssetsCriticalityYearByDep(value);
          // this.getInitialOverAlleChange();

        });





      }


      private getMachinesOnChangeDashByDep(value){

        this.getDeptMachineStorage(value).subscribe(machines => {
          var machiness:Machine[]=[];
          this.dataService.good=0
          this.dataService.danger=0
          this.dataService.warning=0
          this.dataService.alarm=0
          for (var i=0; i<machines.length; i++)
          {
            machiness.push(machines[i]);

          }
          
          this.dataService.serviceData = machiness;
          this.dataService.total=machiness.length
          for (var i = 0; i <machiness.length; i++) {



            if (machiness[i].MachineState=="Green"){this.dataService.good++}
              else if (machiness[i].MachineState=="Yellow"){this.dataService.warning++}
                else if (machiness[i].MachineState=="Orange"){this.dataService.alarm++}
                  else if (machiness[i].MachineState=="Red"){this.dataService.danger++}

                }
              this.createGoodChart()
              this.doughnutData = this.getData();
                    this.dataService.doughnutData=this.getData();
                    this.loadDoughnutCharts(); 
              //abcd
            },(error)=>{},
            ()=>{
              /////////////////////////////
              // Completion event handler
              /////////////////////////////
              this.createGoodChart();
              this.doughnutData = this.getData();
                    this.dataService.doughnutData=this.getData();
                    this.loadDoughnutCharts(); 
              this.getAssetsCriticalityYearByDepe(value)
              // this.getInitialOverAlleChange();

            });}


        private getMachinesOnChangeDashByPlant(value){
          
          this.getDeptMachineStorageByPlant(value).subscribe(machines => {
            var machiness:Machine[]=[];
            
            this.dataService.good=0
            this.dataService.danger=0
            this.dataService.warning=0
            this.dataService.alarm=0
            for (var i=0; i<machines.length; i++)
            {
              machiness.push(machines[i]);

            }
            
            this.dataService.serviceData = machiness;
            this.dataService.total=machiness.length
            for (var i = 0; i <machiness.length; i++) {

              if (machiness[i].MachineState=="Green"){this.dataService.good++}
                else if (machiness[i].MachineState=="Yellow"){this.dataService.warning++}
                  else if (machiness[i].MachineState=="Orange"){this.dataService.alarm++}
                    else if (machiness[i].MachineState=="Red"){this.dataService.danger++}

                  }}, 
                (error)=>{},
                ()=>{
                  this.getAssetsCriticalityeByPlant(value);
                  this.createGoodChart();
                  this.doughnutData = this.getData();
                    this.dataService.doughnutData=this.getData();
                    this.loadDoughnutCharts(); 
                  // this.getInitialOverAlleChange();

                  /////////////////////////////
                  // Completion event handler
                  /////////////////////////////

                }
                );


        }


        getDeptSessionStorage(value) {
          var server=sessionStorage.getItem('server');
          var user=sessionStorage.getItem('user');
          var password=sessionStorage.getItem('password');
          var database=sessionStorage.getItem('database');


          return this.http.get('https://betavib.herokuapp.com/betavib/Dep/'+server+'/'+user+'/'+password+'/'+database+'/'+value)
          .map(res => res.json());
        }
        getDeptMachineStorage(value) {
          var server=sessionStorage.getItem('server');
          var user=sessionStorage.getItem('user');
          var password=sessionStorage.getItem('password');
          var database=sessionStorage.getItem('database');
          return this.http.get('https://betavib.herokuapp.com/betavib/MachineByDepWeb/'+server+'/'+user+'/'+password+'/'+database+'/'+value)
          .map(res => res.json());
        }

        getDeptMachineStorageByPlant(value) {
          var server=sessionStorage.getItem('server');
          var user=sessionStorage.getItem('user');
          var password=sessionStorage.getItem('password');
          var database=sessionStorage.getItem('database');
          return this.http.get('https://betavib.herokuapp.com/betavib/MachineByPlantWeb/'+server+'/'+user+'/'+password+'/'+database+'/'+value)
          .map(res => res.json());
        }

        onChangeplant(deviceValue) {
          this.getDepartmentsOnChange(deviceValue)

        }
        onChangedept(deviceValue) {
          this.getMachinesOnChange(deviceValue)
        }
        get mch() {
          return BaMenu.mch;
        }



        get data():Machine[] { 
          return this.dataService.serviceData; 
        } 
        set data(value: Machine[]) { 
          this.dataService.serviceData = value; 
        } 

        getInitialOverAll() {
          var server=sessionStorage.getItem('server');
          var user=sessionStorage.getItem('user');
          var password=sessionStorage.getItem('password');
          var database=sessionStorage.getItem('database');


          return this.http.get('https://betavib.herokuapp.com/betavib/OverYearOvelo/'+server+'/'+user+'/'+password+'/'+database)
          .map(res => res.json());
        }
        private getInitialOverAlle(){
          if(!localStorage.getItem("dbinitialsoverall"))
            // if(!JSON.parse(localStorage.getItem("dbInitialOverAll")))
          this.getInitialOverAll().subscribe(initial => {
            this.dataService.initials=[];
            for (var i=0;i< initial.length;i++) {
              this.dataService.initials.push({
                value: initial[i][""][0].toFixed(3),
                date:initial[i][""][1]
              });
              localStorage.setItem("dbinitialsoverall",JSON.stringify(this.dataService.initials));
            }

            // BaMenu.mch=machiness;

          },
          (error)=>{},
          ()=>{
            this.createOverAllChart();
            this.getAssetsCriticalitye();
            /////////////////////////////
            // Completion event handler
            /////////////////////////////

          }
          );

        }


        getOverAllByPlant() {
          var server=sessionStorage.getItem('server');
          var user=sessionStorage.getItem('user');
          var password=sessionStorage.getItem('password');
          var database=sessionStorage.getItem('database');


          return this.http.get('https://betavib.herokuapp.com/betavib/OverYearOvelo/'+server+'/'+user+'/'+password+'/'+database)
          .map(res => res.json());
        }




        getFailureTypes() {
          var server=sessionStorage.getItem('server');
          var user=sessionStorage.getItem('user');
          var password=sessionStorage.getItem('password');
          var database=sessionStorage.getItem('database');


          return this.http.get('https://betavib.herokuapp.com/betavib/FailuresTypes/'+server+'/'+user+'/'+password+'/TAFISA%20CANADA')
          .map(res => res.json());
        }



        getBigTable() {
          var server=sessionStorage.getItem('server');
          var user=sessionStorage.getItem('user');
          var password=sessionStorage.getItem('password');
          var database=sessionStorage.getItem('database');


          return this.http.get('https://betavib.herokuapp.com/betavib/BigTable/'+server+'/'+user+'/'+password+'/TAFISA%20CANADA')
          .map(res => res.json());
        }

















        private getAssetsCriticalityYearByDepe(value){
          this.getAssetsCriticalityYearByDep(value).subscribe(assets => {
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
            this.createAssetsCriticalityChart();
            /////////////////////////////
            // Completion event handler
            /////////////////////////////

          }
          );

        }









        
        createGoodChart(){

          this.dataService.chart =this.AmCharts.makeChart("chartdiv", {
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
              "litres": this.dataService.good,
              "color": "#55aa67"
            }, {
              "country": "Alarm",
              "litres": this.dataService.alarm,
              "color":"#efed51"
            } 
            , {
              "country": "Danger",
              "litres": this.dataService.danger,
              "color":"#ef3823"
            }
            , {
              "country": "Warning",
              "litres": this.dataService.warning,
              "color":"#f7a522"
            },
            {
              "country": "Other",
              "litres": this.dataService.total-(this.dataService.good+this.dataService.warning+this.dataService.danger+this.dataService.alarm),
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


        createWarningChart(){
          this.dataService.chart1 = this.AmCharts.makeChart( "chartdiva", {
            "type": "pie",
            "theme": "light",
            "dataProvider": [ {
              "country": "Warning",
              "litres": this.dataService.good,
              "color": "#27ae60"
            }, {
              "country": "",
              "litres": this.dataService.total-this.dataService.good,
              "color":""
            } ],
            "valueField": "litres",
            "titleField": "country",
            "colorField": "color",
            "balloon":{
              "fixedPosition":true

            }
          } );  
        }
        createAlarmChart(){
          this.dataService.chart2 = this.AmCharts.makeChart( "chartdivb", {
            "type": "pie",
            "theme": "light",
            "dataProvider": [ {
              "country": "Alarm",
              "litres": this.dataService.alarm,
              "color": "#27ae60"
            }, {
              "country": "",
              "litres": this.dataService.total-this.dataService.alarm,
              "color":""
            } ],
            "valueField": "litres",
            "titleField": "country",
            "colorField": "color",
            "balloon":{
              "fixedPosition":true

            }
          } );  
        }

        createDangerChart(){
          this.dataService.chart3 = this.AmCharts.makeChart( "chartdivc", {
            "type": "pie",
            "theme": "light",
            "dataProvider": [ {
              "country": "Danger",
              "litres": this.dataService.danger,
              "color": "#27ae60"
            }, {
              "country": "",
              "litres": this.dataService.total-this.dataService.danger,
              "color":""
            } ],
            "valueField": "litres",
            "titleField": "country",
            "colorField": "color",
            "balloon":{
              "fixedPosition":true

            }
          } );  
        }




        createOverAllChart(){
          this.dataService.chart4 = this.AmCharts.makeChart( "chartdiv2", {
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
            "dataProvider": this.dataService.initials
          } );

        }

        createAssetsCriticalityChart(){
          var chart1 =AmCharts.makeChart("chartdiv1", {
            "type": "serial",
            "theme": "light",
            "color":"#FFFFFF",
            "fontSize":14,
            "dataProvider": this.dataService.assets,
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
          this.dataService.chart4 = this.AmCharts.makeChart( "chartdiv3", {
            "type": "serial",
            "theme": "light",
            "color":"#FFFFFF",
            "fontSize":14,
            "marginLeft": 55,
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
            "dataProvider": this.dataService.measurements
          } );

        }




        getAssetsCriticality(){

          var server=sessionStorage.getItem('server');
          var user=sessionStorage.getItem('user');
          var password=sessionStorage.getItem('password');
          var database=sessionStorage.getItem('database');

          return this.http.get('https://betavib.herokuapp.com/betavib/AssetsCrYear/'+server+'/'+user+'/'+password+'/'+database)
          .map(res => res.json());


        }

        getAssetsCriticalityYearByPlant(value){

          var server=sessionStorage.getItem('server');
          var user=sessionStorage.getItem('user');
          var password=sessionStorage.getItem('password');
          var database=sessionStorage.getItem('database');

          return this.http.get('https://betavib.herokuapp.com/betavib/AssetsCrYearByPlant/'+server+'/'+user+'/'+password+'/'+database+'/'+value)
          .map(res => res.json());


        }


        getAssetsCriticalityYearByDep(value){

          var server=sessionStorage.getItem('server');
          var user=sessionStorage.getItem('user');
          var password=sessionStorage.getItem('password');
          var database=sessionStorage.getItem('database');

          return this.http.get('https://betavib.herokuapp.com/betavib/AssetsCrYearByDep/'+server+'/'+user+'/'+password+'/'+database+'/'+value)
          .map(res => res.json());


        }



        getAssetsCriticalitye(){

          if(!localStorage.getItem("dbassetscr"))
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
                localStorage.setItem("dbassetscr",JSON.stringify(this.dataService.assets));
              }

              // BaMenu.mch=machiness;

            },
            (error)=>{},
            ()=>{
              //this.createOverAllChart();

              /////////////////////////////
              // Completion event handler
              /////////////////////////////
              let currentUrl = this._router.url; 
              
              if(currentUrl=="/pages/maindashboard"){
                this.getMeasurementse();
              }
              else{
                this.createAssetsCriticalityChart();
                this.createMeasurementChart();
                this.getFailureTypese();
              }
              this.createAssetsCriticalityChart();
            }
            
            );

        }
        getAssetsCriticalityeByPlant(value){


          this.getAssetsCriticalityYearByPlant(value).subscribe(assets => {
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

            /////////////////////////////
            // Completion event handler
            /////////////////////////////
            // this.getMeasurementse();
            this.getMeasurementse();
            this.createAssetsCriticalityChart();
          }
          );

        }
        getMeasurements(){

          var server=sessionStorage.getItem('server');
          var user=sessionStorage.getItem('user');
          var password=sessionStorage.getItem('password');
          var database=sessionStorage.getItem('database');

          return this.http.get('https://betavib.herokuapp.com/betavib/Measurements/'+server+'/'+user+'/'+password+'/'+database)
          .map(res => res.json());


        }

        getMeasurementse(){

          if(!localStorage.getItem("dbmesurments"))
            this.getMeasurements().subscribe(measurements => {
              this.dataService.measurements=[];
              for (var i=0;i< measurements.length;i++) {
                this.dataService.measurements.push({
                  value: measurements[i][""][0],
                  date:measurements[i][""][1]
                });
              }
              localStorage.setItem("dbmesurments",JSON.stringify(this.dataService.measurements));

              // BaMenu.mch=machiness;

            },
            (error)=>{},
            ()=>{
              //this.createOverAllChart();
              /////////////////////////////
              // Completion event handler
              /////////////////////////////
              this.createAssetsCriticalityChart();
              this.createMeasurementChart();
              this.getFailureTypese();
            }
            );
        }



        onoffFn(event){
          if(this.onOffP){
            if(this.onOff)
            { 
              this.getDepartmentsOnChange(this.plants[0])
              document.getElementById(event.target.id).style.color = "#2c3e50";
              document.getElementById(event.target.id).textContent="Off";
              var element =   <HTMLInputElement>document.getElementById("depttt")
              element.disabled = true;
              this.onOff=false;
              sessionStorage.removeItem("depchange");
              document.getElementById("monthasset").style.backgroundColor = "#1D9F93";
              
            document.getElementById("yearasset").style.backgroundColor ="#2c3e50"; 
                  var element2 = <HTMLInputElement>document.getElementById('depttt');
    element2.value = this.deptss[0];
            }
            else
            {
              this.getMachinesOnChangeDashByDep(this.deptss[0]);
              document.getElementById(event.target.id).style.color = "#27ae60"; 
              document.getElementById(event.target.id).textContent="On";
              this.onOff=true;
              var element =   <HTMLInputElement>document.getElementById("depttt")
              element.disabled = false;
              document.getElementById("depttt").style.backgroundColor=""
              sessionStorage.setItem("depchange",this.deptss[0]);
              document.getElementById("monthasset").style.backgroundColor = "#1D9F93";
              
            document.getElementById("yearasset").style.backgroundColor ="#2c3e50"; 
            }
          }
          
        }




        onoffFnP(event){
          if(this.onOffP)
          {
            
            document.getElementById(event.target.id).style.color = "#2c3e50";
            document.getElementById(event.target.id).textContent="Off";
            document.getElementById("onoff").textContent="Off";
            var element =   <HTMLInputElement>document.getElementById("planttts")
            element.disabled = true;
            this.onOffP=false;
            var element1 =   <HTMLInputElement>document.getElementById("depttt")
            element1.disabled = true;
            sessionStorage.removeItem("depchange");
            sessionStorage.removeItem("plantchange");
            document.getElementById("monthasset").style.backgroundColor = "#1D9F93"; 
            document.getElementById("yearasset").style.backgroundColor ="#2c3e50";
            //bech trod el value ta selected index fel 0
             var element2 = <HTMLInputElement>document.getElementById('planttts');
    element2.value = this.plants[0];
       var element3 = <HTMLInputElement>document.getElementById('depttt');
    element3.value = this.deptss[0];
 this.reloadDefaultMainDash();

          }
          else
          {
            this.getDepartmentsOnChange(this.plants[0])
            document.getElementById(event.target.id).style.color = "#2c3e50"; 
            document.getElementById(event.target.id).textContent="On";
            this.onOffP=true;
            var element =   <HTMLInputElement>document.getElementById("planttts")
            element.disabled = false;
            document.getElementById("depttt").style.backgroundColor=""
           
            sessionStorage.setItem("plantchange",this.plants[0]);
            document.getElementById("monthasset").style.backgroundColor = "#1D9F93"; 
            
            document.getElementById("yearasset").style.backgroundColor ="#2c3e50";
          }
          
        }




        private getFailureTypese(){
          if(!localStorage.getItem("dbfailures"))
            this.getFailureTypes().subscribe(failures => {
              this.dataService.failures=[];
              for (var i=0;i< failures.length;i++) {
                this.dataService.failures.push({
                  BrisType: failures[i]["BrisType"],
                  count:failures[i]["count"]
                });
                localStorage.setItem("dbfailures",JSON.stringify(this.dataService.failures));
              }

            },(error)=>{},
            ()=>{
              
              /////////////////////////////
              // Completion event handler
              /////////////////////////////
                this.getBigTablee();
              this.createFailureTypeChart()
              this.doughnutDataf = this.getDataf();
              this.dataService.doughnutDataf=this.getDataf();
              this.loadDoughnutChartsFailures(); 
            

            });
        }




        private getBigTablee(){
          
          this.getBigTable().subscribe(table => {
            this.dataService.table=[];
            this.dataService.table=table;
            localStorage.setItem("dbtable",JSON.stringify(this.dataService.table));
          },(error)=>{},
          ()=>{
            /////////////////////////////
            // Completion event handler
            /////////////////////////////
            this.dataService.isLoading=false;
            var elem  = document.body;

            elem.style.pointerEvents = 'auto';
                  

            //  var elem2  = document.getElementById("row12");

            // elem2.style.pointerEvents = 'auto'; 
          });
        }









        private getCriticalityStateGraphe(value){
          
          this.getCriticalityStateGraph(value).subscribe(table => {
            
            this.dataService.table=[];
            
            this.dataService.table=table;
            
          },(error)=>{},
          ()=>{
            /////////////////////////////
            // Completion event handler
            /////////////////////////////
            

          });
        }



















        createFailureTypeChart(){
          this.dataService.chart5 = this.AmCharts.makeChart("chartdiv33", {
            "type": "pie",
            "theme": "light",
            "dataProvider": this.dataService.failures,
            "valueField": "count",
            "titleField": "BrisType",
            "outlineAlpha": 0.4,
            "depth3D": 15,
            "balloonText": "[[title]]<br><span style='font-size:6px'><b>[[value]]</b> ([[percents]]%)</span>",
            "angle": 30
          });

        }



        getCriticalityStateGraph(value){

          var server=sessionStorage.getItem('server');
          var user=sessionStorage.getItem('user');
          var password=sessionStorage.getItem('password');
          var database=sessionStorage.getItem('database');

          return this.http.get('https://betavib.herokuapp.com/betavib/CriticalityGraph/'+server+'/'+user+'/'+password+'/TAFISA%20CANADA/'+value)
          .map(res => res.json());


        }




getData() {
    let dashboardColors = this._baConfig.get().colors.dashboard;
    return [
      {
        value: this.dataService.good,
        color: dashboardColors.green,
        highlight: colorHelper.shade(dashboardColors.green, 15),
        label: 'Good',
        percentage: ((this.dataService.good*100)/this.dataService.total).toFixed(2),
        order: 1,
      }, {
        value: this.dataService.alarm,
        color: dashboardColors.yellow,
        highlight: colorHelper.shade(dashboardColors.yellow, 15),
        label: 'Alarm',
        percentage: ((this.dataService.alarm*100)/this.dataService.total).toFixed(2),
        order: 2,
      }, 
{
        value: this.dataService.warning,
        color: dashboardColors.orange,
        highlight: colorHelper.shade(dashboardColors.orange, 15),
        label: 'Warning',
        percentage:  ((this.dataService.warning*100)/this.dataService.total).toFixed(2),
        order: 3,
      },
      {
        value: this.dataService.danger,
        color: dashboardColors.red,
        highlight: colorHelper.shade(dashboardColors.red, 15),
        label: 'Danger',
        percentage: ((this.dataService.danger*100)/this.dataService.total).toFixed(2),
        order: 4,
      }, 
    ];

  }








getDataf() {
    let dashboardColors = this._baConfig.get().colors.dashboard;
   var failuresData:any[]=[];
   
      var colors :any[]= ["Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"]
   var totalcount:any=0;
    for(var i=0;i<this.dataService.failures.length;i++){
      totalcount+=this.dataService.failures[i]["count"];
    }
    for(var i=0;i<this.dataService.failures.length;i++){
  
     failuresData.push({
        value:this.dataService.failures[i]["count"],
        color: colors[i],
        highlight: colorHelper.shade(colors[i], 15),
        label: this.dataService.failures[i]["BrisType"],
        percentage: ((this.dataService.failures[i]["count"]*100)/totalcount).toFixed(2),
        order: i,

     })

    }
       return failuresData;
  }








private loadDoughnutCharts() {
  this.currentUrl = this._router.url;
 if (this.currentUrl=="/pages/maindashboard"){
   this.dataService.chart6 =$('#chart-areaa').get(0) as HTMLCanvasElement;
    new Chart( this.dataService.chart6.getContext('2d')).Doughnut(this.doughnutData, {
      segmentShowStroke: false,
      percentageInnerCutout : 64,
      responsive: true
    });
 }
  }




private loadDoughnutChartsFailures() {
  this.currentUrl = this._router.url;
   if (this.currentUrl=="/pages/costanalysis"){
   this.dataService.chart7 =$('#chart-areaaf').get(0) as HTMLCanvasElement;
    new Chart( this.dataService.chart7.getContext('2d')).Doughnut(this.doughnutDataf, {
      segmentShowStroke: false,
      percentageInnerCutout : 64,
      responsive: true
    });
}
  }
  private reloadDefaultMainDash(){
     this.GoodRefresh();
        this.OverAllRefresh();
         this.AssetsCriticalityRefresh();
         this.MeasurementsRefresh();
    if(localStorage.getItem("dbmachines")){
      console.log("hihihihihi")

  this.dataService.isLoading=false
   var elem  = document.body;

elem.style.pointerEvents = 'auto'; 
    console.log("D5al db Machines")
        var machines=JSON.parse(localStorage.getItem("dbmachines"))
         this.dataService.good=0;
          this.dataService.warning=0;
          this.dataService.alarm=0;
          this.dataService.danger=0;
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
            if (this.dataService.serviceData[i].MachineState=="Green"){this.dataService.good++}
              else if (this.dataService.serviceData[i].MachineState=="Yellow"){this.dataService.warning++}
                else if (this.dataService.serviceData[i].MachineState=="Orange"){this.dataService.alarm++}
                  else if (this.dataService.serviceData[i].MachineState=="Red"){this.dataService.danger++}
                }
                console.log(this.dataService.good+"good")
    this.dataService.total=JSON.parse(localStorage.getItem("dbtotal"));
    this.createGoodChart();
    this.dataService.doughnutData = this.getData();
    // this.loadDoughnutCharts();
   
 

}


if(localStorage.getItem("dbinitialsoverall")){

 this.dataService.initials=JSON.parse(localStorage.getItem("dbinitialsoverall"))

            


this.createOverAllChart()



}


if(localStorage.getItem("dbassetscr")){

 this.dataService.assets=JSON.parse(localStorage.getItem("dbassetscr"))

            


this.createAssetsCriticalityChart()



}

if(localStorage.getItem("dbmesurments")){

 this.dataService.measurements=JSON.parse(localStorage.getItem("dbmesurments"))

            


this.createMeasurementChart()


  }
 this.GoodRefresh();
        this.OverAllRefresh();
         this.AssetsCriticalityRefresh();
         this.MeasurementsRefresh();

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



      }