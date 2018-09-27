import { Component } from '@angular/core';
import { AmChartsService } from "amcharts3-angular2";
import { AssetsOverViewService } from "./assetsoverview.service";
import { BaMenu } from "../../theme/components/baMenu/baMenu.component";
import { DataService } from '../data.service';
import { Machine } from '../../theme/components/baMenu/machine.interface';
import { Http } from '@angular/http';
import { InfoMachine } from './infomachine.interface';
import { Point } from './point.interface';
import { PointDetails} from './pointdetails.interface';
import { Event } from '@angular/router';
@Component({
  selector: 'assetsover',
  providers : [BaMenu],
  templateUrl: './assetsoverview.component.html',
  styleUrls:['./assetsoverview.component.scss']
})

export class AssetsOverviewComponent {
  p: number = 1;
  p1: number = 1;
  collection: any[];
  public chart: any;
  machines:Machine[]=[];
  MachineSelected:InfoMachine;
  points:Point;
  lst:any[];
  lstf:any[];
  npoints:any[];
  pointsdet:PointDetails[]=[];
  dataProvider = [];
  rms=[];
  rmss=[];
  peak=[];
  ovelo=[];
  cf=[];
  b1=[];
  b2=[];
  b3=[];
  b4=[];
  b5=[];
  b6=[];
  speed=[];
  datatable:any=[];
  alarmes:any=[];
  public ngOnInit(){
    var a=5.4132323232;

    if(this.dataService.isLoading){
      var elem  = document.body;

      elem.style.pointerEvents = 'none'; 
      
    }




    //fassa5 el bd
    this.dataService.good=0;

    if(!sessionStorage.getItem("selectedMachine"))
    {
      this.getSelectedMachineInfo(this.data[0].MachineName);
      sessionStorage.setItem("selectedMachine",JSON.stringify(this.data[0]))
    }
    else
      this.MachineSelected=JSON.parse(sessionStorage.getItem("selectedMachine"));

    this.chart= this.AmCharts.makeChart("charttable", {
      "type": "serial",
      "theme": "light",
      "marginRight": 70,
      "dataProvider": [{
        "country": "USA",
        "visits": 3025,
        "color": "#FF0F00"
      }, {
        "country": "China",
        "visits": 1882,
        "color": "#FF6600"
      }, {
        "country": "Japan",
        "visits": 1809,
        "color": "#FF9E01"
      }, {
        "country": "Germany",
        "visits": 1322,
        "color": "#FCD202"
      }, {
        "country": "UK",
        "visits": 1122,
        "color": "#F8FF01"
      }, {
        "country": "France",
        "visits": 1114,
        "color": "#B0DE09"
      }, {
        "country": "India",
        "visits": 984,
        "color": "#04D215"
      }, {
        "country": "Spain",
        "visits": 711,
        "color": "#0D8ECF"
      }, {
        "country": "Netherlands",
        "visits": 665,
        "color": "#0D52D1"
      }, {
        "country": "Russia",
        "visits": 580,
        "color": "#2A0CD0"
      }, {
        "country": "South Korea",
        "visits": 443,
        "color": "#8A0CCF"
      }, {
        "country": "Canada",
        "visits": 441,
        "color": "#CD0D74"
      }],
      "valueAxes": [{
        "axisAlpha": 0,
        "position": "left",
        "title": "Visitors from country"
      }],
      "startDuration": 1,
      "graphs": [{
        "balloonText": "<b>[[category]]: [[value]]</b>",
        "fillColorsField": "color",
        "fillAlphas": 0.9,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "visits"
      }],
      "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
      },
      "categoryField": "country",
      "categoryAxis": {
        "gridPosition": "start",
        "labelRotation": 45
      },
      "export": {
        "enabled": true
      }

    });

    var i, tabcontent;
    tabcontent = document.getElementsByClassName("hid");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "block";
    }

  }

  constructor(private service:AssetsOverViewService,private AmCharts: AmChartsService,private bamenu:BaMenu,public dataService: DataService,private http: Http) {
    if(localStorage.getItem("dbmachines")){
      this.dataService.isLoading=false
      var elem  = document.body;

      elem.style.pointerEvents = 'auto';
      this.data=JSON.parse(localStorage.getItem("dbmachines"))



    }

    if(!sessionStorage.getItem("selectedMachine"))
      {this.getSelectedMachineInfo(this.data[0].MachineName);
        sessionStorage.setItem("selectedMachine",JSON.stringify(this.data[0]))
      }
      else
        this.MachineSelected=JSON.parse(sessionStorage.getItem("selectedMachine"));
      // this.getSelectedMachineInfo(this.data[0].MachineName)


    }


    public openCity(evt, cityName,id) {

      if(cityName=="London")
      {

        document.getElementById("tabbtnn").style.backgroundColor = "#ecf0f1";

        document.getElementById("chartbtnn").style.backgroundColor = "#1abc9c"; }
        else
        { 

          document.getElementById("chartbtnn").style.backgroundColor = "#ecf0f1";
          document.getElementById("tabbtnn").style.backgroundColor = "#1abc9c";
        }
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
      }





      get data():Machine[] { 
        return this.dataService.serviceData; 
      } 
      set data(value: Machine[]) { 
        this.dataService.serviceData = value; 
      } 
      machineClick(event,MachineName){
        this.getSelectedMachineInfo(MachineName);
        
        
      }

      pointClick(event,PointNumber,Dir,MachineId,PoinDirName){
        this.getPonintsSelectedd(MachineId,PointNumber,Dir,PoinDirName);
        console.log(MachineId,PointNumber,Dir,PoinDirName)
        this.dataService.isLoading=true;
      }



      getMachineSelected(value) {
        var server=sessionStorage.getItem('server');
        var user=sessionStorage.getItem('user');
        var password=sessionStorage.getItem('password');
        var database=sessionStorage.getItem('database');


        return this.http.get('https://betavib.herokuapp.com/betavib/infomachine/'+server+'/'+user+'/'+password+'/'+database+'/'+value)
        .map(res => res.json());
      }


      private getSelectedMachineInfo(value){

        this.getMachineSelected(value).subscribe(machines => {

          this.MachineSelected=machines[0];

          // BaMenu.mch=machiness;

        }
        ,(error)=>{},
        ()=>{



          /////////////////////////////
          // Completion event handler
          /////////////////////////////
          this.getPonintsSelectedMachinee(this.MachineSelected.MachineName);

        }

        );

      }




      getPointsSelectedMachine(value) {
        var server=sessionStorage.getItem('server');
        var user=sessionStorage.getItem('user');
        var password=sessionStorage.getItem('password');
        var database=sessionStorage.getItem('database');


        return this.http.get('https://betavib.herokuapp.com/betavib/selectmachine/'+server+'/'+user+'/'+password+'/'+database+'/'+value)
        .map(res => res.json());
      }
      getLastTen(value) {
        var server=sessionStorage.getItem('server');
        var user=sessionStorage.getItem('user');
        var password=sessionStorage.getItem('password');
        var database=sessionStorage.getItem('database');


        return this.http.get('https://betavib.herokuapp.com/betavib/LastTenRecords/'+server+'/'+user+'/'+password+'/'+database+'/'+value)
        .map(res => res.json());
      }
      getLastFive(value) {
        var server=sessionStorage.getItem('server');
        var user=sessionStorage.getItem('user');
        var password=sessionStorage.getItem('password');
        var database=sessionStorage.getItem('database');


        return this.http.get('https://betavib.herokuapp.com/betavib/LastFiveAnnotations/'+server+'/'+user+'/'+password+'/'+database+'/'+value)
        .map(res => res.json());
      }


      private getPonintsSelectedMachinee(value){

        this.getPointsSelectedMachine(value).subscribe(points => {

          this.points=points;



          // BaMenu.mch=machiness;

        }
        ,(error)=>{},
        ()=>{



          /////////////////////////////
          // Completion event handler
          /////////////////////////////

          this.getLastTene(this.MachineSelected.MachineName)
          //this.getLastFivee(this.MachineSelected[0].MachineName)

        }
        );

      }

      private getLastTene(value){
        this.getLastTen(value).subscribe(lst => {

          this.lst=lst;



          // BaMenu.mch=machiness;

        }
        ,(error)=>{},
        ()=>{
          /////////////////////////////
          // Completion event handler
          /////////////////////////////

          //   this.getLastTene(this.MachineSelected[0].MachineName)
          this.getLastFivee(this.MachineSelected.MachineName)

        }
        );

      }
      private getLastFivee(value){

        this.getLastFive(value).subscribe(lstf => {

          this.lstf=lstf;



          // BaMenu.mch=machiness;

        }
        ,(error)=>{},
        ()=>{
          /////////////////////////////
          // Completion event handler
          /////////////////////////////

          //   this.getLastTene(this.MachineSelected[0].MachineName)
          this.getNumberOfPointse(this.MachineSelected.MachineName)

        });

      }



      getPointsSelected(value,value1,value2) {
        var server=sessionStorage.getItem('server');
        var user=sessionStorage.getItem('user');
        var password=sessionStorage.getItem('password');
        var database=sessionStorage.getItem('database');


        return this.http.get('https://betavib.herokuapp.com/betavib/selectpoint/'+server+'/'+user+'/'+password+'/'+database+'/'+value+'/'+value1+'/'+value2)
        .map(res => res.json());
      }


      getNumberOfPoints(value) {
        var server=sessionStorage.getItem('server');
        var user=sessionStorage.getItem('user');
        var password=sessionStorage.getItem('password');
        var database=sessionStorage.getItem('database');


        return this.http.get('https://betavib.herokuapp.com/betavib/NumberPoints/'+server+'/'+user+'/'+password+'/'+database+'/'+value)
        .map(res => res.json());
      }

      private getNumberOfPointse(value){

        this.getNumberOfPoints(value).subscribe(npoints => {

          this.npoints=npoints;
          console.log(npoints[0][""])



          // BaMenu.mch=machiness;

        });

      }





      //**************************************************************************************


















































      //**************************************STAT STAT******************************************




      private getPonintsSelectedd(value,value1,value2,value3){

        this.getPointsSelected(value,value1,value2).subscribe(pointsd => {
          this.pointsdet=[];
          for (var i=0; i<pointsd.length; i++)
          {
            this.pointsdet.push(pointsd[i]);

          }

        },(error)=>{},
        ()=>{



          /////////////////////////////
          // Completion event handler
          /////////////////////////////
          //this.getTable(value,value1,value2,value3,this.MachineSelected.MachineName)
          this.getAlarmese(value,value1,value2)
          this.dataService.isLoading=false;
        }

        );

      }



      makeDataRms(){

        this.rmss=[];
        this.dataProvider=[];
        for (var i=0;i< this.pointsdet.length;i++) {
          this.dataProvider.push({
            date: this.pointsdet[i].MeasDate,
            value:this.pointsdet[i].RMS.toFixed(3)
          });
          this.rmss.push(this.dataProvider[i]);
          // console.log(this.pointsdet[i].MeasDate.substring(0, 10))

        }

      }
      makeDataPeak(){
        this.peak=[];
        this.dataProvider=[];
        for (var i=0;i< this.pointsdet.length;i++) {
          this.dataProvider.push({
            date: this.pointsdet[i].MeasDate,
            value:this.pointsdet[i].PEAK.toFixed(3)
          });
          this.peak.push(this.dataProvider[i]);
        }

      }
      makeDataCF(){
        this.cf=[];
        this.dataProvider=[];
        for (var i=0;i< this.pointsdet.length;i++) {
          this.dataProvider.push({
            date: this.pointsdet[i].MeasDate,
            value:this.pointsdet[i].CF.toFixed(3)
          });
          this.cf.push(this.dataProvider[i]);
        }

      }
      makeDataOvelo(){
        this.ovelo=[];
        this.dataProvider=[];

        for (var i=0;i< this.pointsdet.length;i++) {
          this.dataProvider.push({
            date: this.pointsdet[i].MeasDate,
            value:this.pointsdet[i].OVELO.toFixed(3)
          });
          this.ovelo.push(this.dataProvider[i]);
        }

      }
      makeDatab1(){
        this.b1=[];
        this.dataProvider=[];
        for (var i=0;i< this.pointsdet.length;i++) {
          this.dataProvider.push({
            date: this.pointsdet[i].MeasDate,
            value:this.pointsdet[i].B1.toFixed(3)
          });
          this.b1.push(this.dataProvider[i]);
        }

      }
      makeDatab2(){
        this.b2=[];
        this.dataProvider=[];
        for (var i=0;i< this.pointsdet.length;i++) {
          this.dataProvider.push({
            date: this.pointsdet[i].MeasDate,
            value:this.pointsdet[i].B2.toFixed(3)
          });
          this.b2.push(this.dataProvider[i]);
        }

      }
      makeDatab3(){
        this.b3=[];
        this.dataProvider=[];
        for (var i=0;i< this.pointsdet.length;i++) {
          this.dataProvider.push({
            date: this.pointsdet[i].MeasDate,
            value:this.pointsdet[i].B3.toFixed(3)
          });
          this.b3.push(this.dataProvider[i]);
        }

      }
      makeDatab4(){
        this.b4=[];
        this.dataProvider=[];
        for (var i=0;i< this.pointsdet.length;i++) {
          this.dataProvider.push({
            date: this.pointsdet[i].MeasDate,
            value:this.pointsdet[i].B4.toFixed(3)
          });
          this.b4.push(this.dataProvider[i]);
        }

      }
      makeDatab5(){
        this.b5=[];
        this.dataProvider=[];
        for (var i=0;i< this.pointsdet.length;i++) {
          this.dataProvider.push({
            date: this.pointsdet[i].MeasDate,
            value:this.pointsdet[i].B5.toFixed(3)
          });
          this.b5.push(this.dataProvider[i]);
        }

      }
      makeDatab6(){
        this.b6=[];
        this.dataProvider=[];
        for (var i=0;i< this.pointsdet.length;i++) {
          this.dataProvider.push({
            date: this.pointsdet[i].MeasDate,
            value:this.pointsdet[i].B6.toFixed(3)
          });
          this.b6.push(this.dataProvider[i]);
        }

      }
      makeDataspeed(){
        this.speed=[];
        this.dataProvider=[];
        for (var i=0;i< this.pointsdet.length;i++) {
          this.dataProvider.push({
            date: this.pointsdet[i].MeasDate,
            value:this.pointsdet[i].Speed

          });
          this.speed.push(this.dataProvider[i]);
        }
        this.start();
      }







      handleRenderRMS(event){
        try
        {
          console.log("rendered")
          var chart = event.chart;   
          if (chart.minMaxMarked)
            return;

          var max=0;
          var min=0
          // find data points with highest and biggest values
          for(var i = 0; i < chart.dataProvider.length; i++) {

            if(chart.dataProvider[i].value>max)
              max=chart.dataProvider[i].value;
            if(chart.dataProvider[i].value<min)
              min=chart.dataProvider[i].value;


          }
          chart.zoomToIndexes(min, max);
          console.log(max+"maximum")

          console.log(JSON.parse(sessionStorage.getItem("alaaaameeees")));
          var dgrms=JSON.parse(sessionStorage.getItem("alaaaameeees")["DgRMS"])
          if(max>dgrms){
            chart.valueAxes.minimum =0;
            chart.valueAxes.maximum =(max+(0.2*max)).toFixed(0)+1

          }
          else{

            chart.valueAxes.minimum =0;
            chart.valueAxes.maximum =(dgrms+(0.2*dgrms)).toFixed(0)+1



          }





          // take in updated data
          chart.minMaxMarked = true;
          chart.validateData();

        } catch (Error)
        {
          console.log("value not defined1 ")
        }

      }


      handleRenderPEAK(event){
        try
        {
          console.log("rendered")
          var chart = event.chart;   
          if (chart.minMaxMarked)
            return;

          var max=0;
          var min=0
          // find data points with highest and biggest values
          for(var i = 0; i < chart.dataProvider.length; i++) {

            if(chart.dataProvider[i].value>max)
              max=chart.dataProvider[i].value;
            if(chart.dataProvider[i].value<min)
              min=chart.dataProvider[i].value;


          }
          chart.zoomToIndexes(min, max);

          console.log(max+"maximum")

          console.log(JSON.parse(sessionStorage.getItem("alaaaameeees")));
          var dgpeak=JSON.parse(sessionStorage.getItem("alaaaameeees")["DgPEAK"])
          if(max>dgpeak){
            chart.valueAxes.minimum =0;
            chart.valueAxes.maximum =(max+(0.2*max)).toFixed(0)+1

          }
          else{

            chart.valueAxes.minimum =0;
            chart.valueAxes.maximum =(dgpeak+(0.2*dgpeak)).toFixed(0)+1
            console.log(chart.valueAxes.maximum =(dgpeak+(0.2*dgpeak)).toFixed(0))


          }

          // take in updated data
          chart.minMaxMarked = true;
          chart.validateData();

        } catch (Error)
        {
          console.log("value not defined1 ")
        }

      }
      handleRenderOVELO(event){
        try
        {
          console.log("rendered")
          var chart = event.chart;   
          if (chart.minMaxMarked)
            return;

          var max=0;
          var min=0
          // find data points with highest and biggest values
          for(var i = 0; i < chart.dataProvider.length; i++) {

            if(chart.dataProvider[i].value>max)
              max=chart.dataProvider[i].value;
            if(chart.dataProvider[i].value<min)
              min=chart.dataProvider[i].value;


          }
          chart.zoomToIndexes(min, max);

          console.log(max+"maximum")

          console.log(JSON.parse(sessionStorage.getItem("alaaaameeees")));
          var dgovelo=JSON.parse(sessionStorage.getItem("alaaaameeees")["DgOVELO"])
          if(max>dgovelo){
            chart.valueAxes.minimum =0;
            chart.valueAxes.maximum =(max+(0.2*max)).toFixed(0)+1

          }
          else{

            chart.valueAxes.minimum =0;
            chart.valueAxes.maximum =(dgovelo+(0.2*dgovelo)).toFixed(0)+1
            console.log( chart.valueAxes.maximum =(dgovelo+(0.2*dgovelo)).toFixed(0))


          }
          // take in updated data
          chart.minMaxMarked = true;
          chart.validateData();

        } catch (Error)
        {
          console.log("value not defined1 ")
        }

      }


      handleRenderCF(event){
        try
        {
          console.log("rendered")
          var chart = event.chart;   
          if (chart.minMaxMarked)
            return;

          var max=0;
          var min=0
          // find data points with highest and biggest values
          for(var i = 0; i < chart.dataProvider.length; i++) {

            if(chart.dataProvider[i].value>max)
              max=chart.dataProvider[i].value;
            if(chart.dataProvider[i].value<min)
              min=chart.dataProvider[i].value;


          }
          chart.zoomToIndexes(min, max);
          console.log(max+"maximum")

          console.log(JSON.parse(sessionStorage.getItem("alaaaameeees")));
          var dgcf=JSON.parse(sessionStorage.getItem("alaaaameeees")["DgCF"])
          if(max>dgcf){
            chart.valueAxes.minimum =0;
            chart.valueAxes.maximum =(max+(0.2*max)).toFixed(0)+1

          }
          else{

            chart.valueAxes.minimum =0;
            chart.valueAxes.maximum =(dgcf+(0.2*dgcf)).toFixed(0)+1
            console.log( chart.valueAxes.maximum =(dgcf+(0.2*dgcf)).toFixed(0))


          }
          // take in updated data
          chart.minMaxMarked = true;
          chart.validateData();

        } catch (Error)
        {
          console.log("value not defined1 ")
        }

      }


      handleRenderKU(event){
        try
        {
          console.log("rendered")
          var chart = event.chart;   
          if (chart.minMaxMarked)
            return;

          var max=0;
          var min=0
          // find data points with highest and biggest values
          for(var i = 0; i < chart.dataProvider.length; i++) {

            if(chart.dataProvider[i].value>max)
              max=chart.dataProvider[i].value;
            if(chart.dataProvider[i].value<min)
              min=chart.dataProvider[i].value;


          }
          chart.zoomToIndexes(min, max);
          console.log(max+"maximum")

          console.log(JSON.parse(sessionStorage.getItem("alaaaameeees")));
          var dgku=JSON.parse(sessionStorage.getItem("alaaaameeees")["DgKU"])
          if(max>dgku){
            chart.valueAxes.minimum =0;
            chart.valueAxes.maximum =(max+(0.2*max)).toFixed(0)+1
            console.log()

          }
          else{

            chart.valueAxes.minimum =0;
            chart.valueAxes.maximum =(dgku+(0.2*dgku)).toFixed(0)+1



          }
          // take in updated data
          chart.minMaxMarked = true;
          chart.validateData();

        } catch (Error)
        {
          console.log("value not defined1 ")
        }

      }
      handleRenderB1(event){
        try
        {
          console.log("rendered")
          var chart = event.chart;   
          if (chart.minMaxMarked)
            return;

          var max=0;
          var min=0
          // find data points with highest and biggest values
          for(var i = 0; i < chart.dataProvider.length; i++) {

            if(chart.dataProvider[i].value>max)
              max=chart.dataProvider[i].value;
            if(chart.dataProvider[i].value<min)
              min=chart.dataProvider[i].value;


          }
          chart.zoomToIndexes(min, max);

          console.log(max+"maximum")

          console.log(JSON.parse(sessionStorage.getItem("alaaaameeees")));
          var dgb1=JSON.parse(sessionStorage.getItem("alaaaameeees")["DgB1"])
          if(max>dgb1){
            chart.valueAxes.minimum =0;
            chart.valueAxes.maximum =(max+(0.2*max)).toFixed(0)+1

          }
          else{

            chart.valueAxes.minimum =0;
            chart.valueAxes.maximum =(dgb1+(0.2*dgb1)).toFixed(0)+1



          }
          // take in updated data
          chart.minMaxMarked = true;
          chart.validateData();

        } catch (Error)
        {
          console.log("value not defined1 ")
        }

      }
      handleRenderB2(event){
        try
        {
          console.log("rendered")
          var chart = event.chart;   
          if (chart.minMaxMarked)
            return;

          var max=0;
          var min=0
          // find data points with highest and biggest values
          for(var i = 0; i < chart.dataProvider.length; i++) {

            if(chart.dataProvider[i].value>max)
              max=chart.dataProvider[i].value;
            if(chart.dataProvider[i].value<min)
              min=chart.dataProvider[i].value;


          }
          chart.zoomToIndexes(min, max);
          console.log(max+"maximum")

          console.log(JSON.parse(sessionStorage.getItem("alaaaameeees")));
          var dgb2=JSON.parse(sessionStorage.getItem("alaaaameeees")["DgB2"])
          if(max>dgb2){
            chart.valueAxes.minimum =0;
            chart.valueAxes.maximum =(max+(0.2*max)).toFixed(0)+1

          }
          else{

            chart.valueAxes.minimum =0;
            chart.valueAxes.maximum =(dgb2+(0.2*dgb2)).toFixed(0)+1



          }
          // take in updated data
          chart.minMaxMarked = true;
          chart.validateData();

        } catch (Error)
        {
          console.log("value not defined1 ")
        }

      }
      handleRenderB3(event){
        try
        {
          console.log("rendered")
          var chart = event.chart;   
          if (chart.minMaxMarked)
            return;
          var max=0;
          var min=0
          // find data points with highest and biggest values
          for(var i = 0; i < chart.dataProvider.length; i++) {

            if(chart.dataProvider[i].value>max)
              max=chart.dataProvider[i].value;
            if(chart.dataProvider[i].value<min)
              min=chart.dataProvider[i].value;


          }
          chart.zoomToIndexes(min, max);

          console.log(max+"maximum")

          console.log(JSON.parse(sessionStorage.getItem("alaaaameeees")));
          var dgb3=JSON.parse(sessionStorage.getItem("alaaaameeees")["DgB3"])
          if(max>dgb3){
            chart.valueAxes.minimum =0;
            chart.valueAxes.maximum =(max+(0.2*max)).toFixed(0)+1

          }
          else{

            chart.valueAxes.minimum =0;
            chart.valueAxes.maximum =(dgb3+(0.2*dgb3)).toFixed(0)+1



          }
          // take in updated data
          chart.minMaxMarked = true;
          chart.validateData();

        } catch (Error)
        {
          console.log("value not defined1 ")
        }

      }
      handleRenderB4(event){
        try
        {
          console.log("rendered")
          var chart = event.chart;   
          if (chart.minMaxMarked)
            return;

          var max=0;
          var min=0
          // find data points with highest and biggest values
          for(var i = 0; i < chart.dataProvider.length; i++) {

            if(chart.dataProvider[i].value>max)
              max=chart.dataProvider[i].value;
            if(chart.dataProvider[i].value<min)
              min=chart.dataProvider[i].value;


          }
          chart.zoomToIndexes(min, max);
          console.log(max+"maximum")

          console.log(JSON.parse(sessionStorage.getItem("alaaaameeees")));
          var dgb4=JSON.parse(sessionStorage.getItem("alaaaameeees")["DgB4"])
          if(max>dgb4){
            chart.valueAxes.minimum =0;
            chart.valueAxes.maximum =(max+(0.2*max)).toFixed(0)+1

          }
          else{

            chart.valueAxes.minimum =0;
            chart.valueAxes.maximum =(dgb4+(0.2*dgb4)).toFixed(0)+1



          }
          // take in updated data
          chart.minMaxMarked = true;
          chart.validateData();

        } catch (Error)
        {
          console.log("value not defined1 ")
        }

      }
      handleRenderB5(event){
        try
        {
          console.log("rendered")
          var chart = event.chart;   
          if (chart.minMaxMarked)
            return;

          var max=0;
          var min=0
          // find data points with highest and biggest values
          for(var i = 0; i < chart.dataProvider.length; i++) {

            if(chart.dataProvider[i].value>max)
              max=chart.dataProvider[i].value;
            if(chart.dataProvider[i].value<min)
              min=chart.dataProvider[i].value;


          }
          chart.zoomToIndexes(min, max);


          console.log(max+"maximum")

          console.log(JSON.parse(sessionStorage.getItem("alaaaameeees")));
          var dgb5=JSON.parse(sessionStorage.getItem("alaaaameeees")["DgB5"])
          if(max>dgb5){
            chart.valueAxes.minimum =0;
            chart.valueAxes.maximum =(max+(0.2*max)).toFixed(0)+1

          }
          else{

            chart.valueAxes.minimum =0;
            chart.valueAxes.maximum =(dgb5+(0.2*dgb5)).toFixed(0)+1



          }
          // take in updated data
          chart.minMaxMarked = true;
          chart.validateData();

        } catch (Error)
        {
          console.log("value not defined1 ")
        }

      }
      handleRenderB6(event){
        try
        {
          console.log("rendered")
          var chart = event.chart;   
          if (chart.minMaxMarked)
            return;

          var max=0;
          var min=0
          // find data points with highest and biggest values
          for(var i = 0; i < chart.dataProvider.length; i++) {

            if(chart.dataProvider[i].value>max)
              max=chart.dataProvider[i].value;
            if(chart.dataProvider[i].value<min)
              min=chart.dataProvider[i].value;


          }
          chart.zoomToIndexes(min, max);

          console.log(max+"maximum")

          console.log(JSON.parse(sessionStorage.getItem("alaaaameeees")));
          var dgb6=JSON.parse(sessionStorage.getItem("alaaaameeees")["DgB6"])
          if(max>dgb6){
            chart.ValueAxes.minimum =0;
            chart.ValueAxes.maximum =(max+(0.2*max)).toFixed(0)+1

          }
          else{

            chart.ValueAxes.minimum =0;
            chart.ValueAxes.maximum =(dgb6+(0.2*dgb6)).toFixed(0)+1



          }
          // take in updated data
          chart.minMaxMarked = true;
          chart.validateData();

        } catch (Error)
        {
          console.log("value not defined1 ")
        }

      }
      //**************************************** START ****************************************************

      start(){
        sessionStorage.setItem("alaaaameeees",JSON.stringify(this.alarmes[0]));

        //console.log(this.alarmes[0])

        try
        {
          console.log("enter start");

          this.chart = this.AmCharts.makeChart("chartrmss", {
            "type": "serial",
            "theme": "light",
            "titles": [{
            "text": "RMS",
            "bold": true,
            "color":"#95a5a6",
            "size":20
               }],
            "marginLeft": 20,
            "listeners": [{
              "event": "rendered",
              "method": this.handleRenderRMS
            }]   
            ,
            "dataProvider": this.rmss,
            "valueAxes": [{
              "axisAlpha": 0,
              "dashLength": 4,
              "position": "left",
              "autoGridCount":true,
              "title": "Visitors from country",
              "guides": [{
                "value": this.alarmes[0]["RefRMS"],
                "fillColor": "#55aa67",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0

              },
              {
                "value": this.alarmes[0]["PrAlRMS"],
                "fillColor": "#efed51",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["AlRMS"],
                "fillColor": "#f7a522",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["DgRMS"],
                "fillColor": "#ef3823",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              }

              ],
            }],
            "graphs": [{
              "bulletSize": 7,
              "customBullet": "https://www.amcharts.com/lib/3/images/star.png?x",
              "customBulletField": "customBullet",
              "valueField": "value",
              "balloonText":"<div style='margin:10px; text-align:left;'><span style='font-size:13px'>[[category]]</span><br><span style='font-size:18px'>Value:[[value]]</span>",
            }],

            "chartCursor": {
              "graphBulletSize": 1.5,
              "zoomable":false,
              "valueZoomable":false,
              "cursorAlpha":0,
              "valueLineEnabled":true,
              "valueLineBalloonEnabled":true,
              "valueLineAlpha":0.2
            },
            "autoMargins": false,
            "dataDateFormat": "YYYY-MM-DD",
            "categoryField": "date",

            "categoryAxis": {
              "parseDates": true,
              "axisAlpha": 0,
              "gridAlpha": 0,
              "inside": true,
              "tickLength": 0
            },
            "export": {
              "enabled": true
            },
          });



          this.chart = this.AmCharts.makeChart("chartpeak", {
            "type": "serial",
            "theme": "light",
            "titles": [{
            "text": "PEAK",
            "bold": true,
            "color":"#95a5a6",
            "size":20
               }],
            "listeners": [{
              "event": "rendered",
              "method": this.handleRenderPEAK
            }],
            "dataProvider": this.peak,
            "valueAxes": [{
              "axisAlpha": 0,
              "dashLength": 4,
              "position": "left",
              "autoGridCount":true,
              "title": "Visitors from country",
              "guides": [{
                "value": this.alarmes[0]["RefPEAK"],
                "fillColor": "#55aa67",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["PrAlPEAK"],
                "fillColor": "#efed51",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["AlPEAK"],
                "fillColor": "#f7a522",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["DgPEAK"],
                "fillColor": "#ef3823",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              }

              ],
            }],
            "graphs": [{
              "bulletSize": 7,
              "customBullet": "https://www.amcharts.com/lib/3/images/star.png?x",
              "customBulletField": "customBullet",
              "valueField": "value",
              "balloonText":"<div style='margin:10px; text-align:left;'><span style='font-size:13px'>[[category]]</span><br><span style='font-size:18px'>Value:[[value]]</span>",
            }],

            "chartCursor": {
              "graphBulletSize": 1.5,
              "zoomable":true,
              "valueZoomable":true,
              "cursorAlpha":0,
              "valueLineEnabled":true,
              "valueLineBalloonEnabled":true,
              "valueLineAlpha":0.2
            },
            "autoMargins": false,
            "dataDateFormat": "YYYY-MM-DD",
            "categoryField": "date",

            "categoryAxis": {
              "parseDates": true,
              "axisAlpha": 0,
              "gridAlpha": 0,
              "inside": true,
              "tickLength": 0
            },
            "export": {
              "enabled": true
            }
          });
          this.chart = this.AmCharts.makeChart("chartcf", {
            "type": "serial",
            "theme": "light",
            "titles": [{
            "text": "CF",
            "bold": true,
            "color":"#95a5a6",
            "size":20
               }],
            "listeners": [{
              "event": "rendered",
              "method": this.handleRenderCF
            }],

            "dataProvider": this.cf,
            "valueAxes": [{
              "axisAlpha": 0,
              "dashLength": 4,
              "position": "left",
              "autoGridCount":true,
              "guides": [{
                "value": this.alarmes[0]["RefCF"],
                "fillColor": "#55aa67",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["PrAlCF"],
                "fillColor": "#efed51",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["AlCF"],
                "fillColor": "#f7a522",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["DgCF"],
                "fillColor": "#ef3823",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              }

              ],
            }],
            "graphs": [{
              "bulletSize": 7,
              "customBullet": "https://www.amcharts.com/lib/3/images/star.png?x",
              "customBulletField": "customBullet",
              "valueField": "value",
              "balloonText":"<div style='margin:10px; text-align:left;'><span style='font-size:13px'>[[category]]</span><br><span style='font-size:18px'>Value:[[value]]</span>",
            }],

            "chartCursor": {
              "graphBulletSize": 1.5,
              "zoomable":true,
              "valueZoomable":true,
              "cursorAlpha":0,
              "valueLineEnabled":true,
              "valueLineBalloonEnabled":true,
              "valueLineAlpha":0.2
            },
            "autoMargins": false,
            "dataDateFormat": "YYYY-MM-DD",
            "categoryField": "date",

            "categoryAxis": {
              "parseDates": true,
              "axisAlpha": 0,
              "gridAlpha": 0,
              "inside": true,
              "tickLength": 0
            },
            "export": {
              "enabled": true
            }
          });
          this.chart = this.AmCharts.makeChart("chartovelo", {
            "type": "serial",
            "theme": "light",
            "titles": [{
            "text": "OVELO",
            "bold": true,
            "color":"#95a5a6",
            "size":20
               }],
            "listeners": [{
              "event": "rendered",
              "method": this.handleRenderOVELO
            }],

            "dataProvider": this.ovelo,
            "valueAxes": [{
              "axisAlpha": 0,
              "dashLength": 4,
              "position": "left",
              "autoGridCount":true,
              "guides": [{
                "value": this.alarmes[0]["RefOVELO"],
                "fillColor": "#55aa67",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["PrAlOVELO"],
                "fillColor": "#efed51",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["AlOVELO"],
                "fillColor": "#f7a522",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["DgOVELO"],
                "fillColor": "#ef3823",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              }

              ],
            }],
            "graphs": [{
              "bulletSize": 7,
              "customBullet": "https://www.amcharts.com/lib/3/images/star.png?x",
              "customBulletField": "customBullet",
              "valueField": "value",
              "balloonText":"<div style='margin:10px; text-align:left;'><span style='font-size:13px'>[[category]]</span><br><span style='font-size:18px'>Value:[[value]]</span>",
            }],

            "chartCursor": {
              "graphBulletSize": 1.5,
              "zoomable":true,
              "valueZoomable":true,
              "cursorAlpha":0,
              "valueLineEnabled":true,
              "valueLineBalloonEnabled":true,
              "valueLineAlpha":0.2
            },
            "autoMargins": false,
            "dataDateFormat": "YYYY-MM-DD",
            "categoryField": "date",

            "categoryAxis": {
              "parseDates": true,
              "axisAlpha": 0,
              "gridAlpha": 0,
              "inside": true,
              "tickLength": 0
            },
            "export": {
              "enabled": true
            }
          });
          this.chart = this.AmCharts.makeChart("chartb1", {
            "type": "serial",
            "theme": "light",
           "titles": [{
            "text": "B1",
            "bold": true,
            "color":"#95a5a6",
            "size":20
               }],
            "listeners": [{
              "event": "rendered",
              "method": this.handleRenderB1
            }],
            "dataProvider": this.b1,
            "valueAxes": [{
              "axisAlpha": 0,
              "dashLength": 4,
              "position": "left",
              "autoGridCount":true,           
              "guides": [{
                "value": this.alarmes[0]["RefB1"],
                "fillColor": "#55aa67",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["PrAlB1"],
                "fillColor": "#efed51",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["AlB1"],
                "fillColor": "#f7a522",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["DgB1"],
                "fillColor": "#ef3823",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              }

              ],
            }],
            "graphs": [{
              "bulletSize": 7,
              "customBullet": "https://www.amcharts.com/lib/3/images/star.png?x",
              "customBulletField": "customBullet",
              "valueField": "value",
              "balloonText":"<div style='margin:10px; text-align:left;'><span style='font-size:13px'>[[category]]</span><br><span style='font-size:18px'>Value:[[value]]</span>",
            }],

            "chartCursor": {
              "graphBulletSize": 1.5,
              "zoomable":true,
              "valueZoomable":true,
              "cursorAlpha":0,
              "valueLineEnabled":true,
              "valueLineBalloonEnabled":true,
              "valueLineAlpha":0.2
            },
            "autoMargins": false,
            "dataDateFormat": "YYYY-MM-DD",
            "categoryField": "date",

            "categoryAxis": {
              "parseDates": true,
              "axisAlpha": 0,
              "gridAlpha": 0,
              "inside": true,
              "tickLength": 0
            },
            "export": {
              "enabled": true
            }
          });
          this.chart = this.AmCharts.makeChart("chartb2", {
            "type": "serial",
            "theme": "light",
            "titles": [{
            "text": "B2",
            "bold": true,
            "color":"#95a5a6",
            "size":20
               }],
            "listeners": [{
              "event": "rendered",
              "method": this.handleRenderB2
            }],
            "dataProvider": this.b2,
            "valueAxes": [{
              "axisAlpha": 0,
              "dashLength": 4,
              "position": "left",
              "autoGridCount":true,
              "guides": [{
                "value": this.alarmes[0]["RefB2"],
                "fillColor": "#55aa67",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["PrAlB2"],
                "fillColor": "#efed51",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["AlB2"],
                "fillColor": "#f7a522",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["AlB2"],
                "fillColor": "#ef3823",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              }

              ],
            }],
            "graphs": [{
              "bulletSize": 7,
              "customBullet": "https://www.amcharts.com/lib/3/images/star.png?x",
              "customBulletField": "customBullet",
              "valueField": "value",
              "balloonText":"<div style='margin:10px; text-align:left;'><span style='font-size:13px'>[[category]]</span><br><span style='font-size:18px'>Value:[[value]]</span>",
            }],

            "chartCursor": {
              "graphBulletSize": 1.5,
              "zoomable":true,
              "valueZoomable":true,
              "cursorAlpha":0,
              "valueLineEnabled":true,
              "valueLineBalloonEnabled":true,
              "valueLineAlpha":0.2
            },
            "autoMargins": false,
            "dataDateFormat": "YYYY-MM-DD",
            "categoryField": "date",

            "categoryAxis": {
              "parseDates": true,
              "axisAlpha": 0,
              "gridAlpha": 0,
              "inside": true,
              "tickLength": 0
            },
            "export": {
              "enabled": true
            }
          });  
          this.chart = this.AmCharts.makeChart("chartb3", {
            "type": "serial",
            "theme": "light",
            "titles": [{
            "text": "B3",
            "bold": true,
            "color":"#95a5a6",
            "size":20
               }],
            "listeners": [{
              "event": "rendered",
              "method": this.handleRenderB3
            }],
            "dataProvider": this.b3,
            "valueAxes": [{
              "axisAlpha": 0,
              "dashLength": 4,
              "position": "left",
              "autoGridCount":true,
              "guides": [{
                "value": this.alarmes[0]["RefB3"],
                "fillColor": "#55aa67",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["PrAlB3"],
                "fillColor": "#efed51",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["AlB3"],
                "fillColor": "#f7a522",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["DgB3"],
                "fillColor": "#ef3823",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              }

              ],
            }],
            "graphs": [{
              "bulletSize": 7,
              "customBullet": "https://www.amcharts.com/lib/3/images/star.png?x",
              "customBulletField": "customBullet",
              "valueField": "value",
              "balloonText":"<div style='margin:10px; text-align:left;'><span style='font-size:13px'>[[category]]</span><br><span style='font-size:18px'>Value:[[value]]</span>",
            }],

            "chartCursor": {
              "graphBulletSize": 1.5,
              "zoomable":true,
              "valueZoomable":true,
              "cursorAlpha":0,
              "valueLineEnabled":true,
              "valueLineBalloonEnabled":true,
              "valueLineAlpha":0.2
            },
            "autoMargins": false,
            "dataDateFormat": "YYYY-MM-DD",
            "categoryField": "date",

            "categoryAxis": {
              "parseDates": true,
              "axisAlpha": 0,
              "gridAlpha": 0,
              "inside": true,
              "tickLength": 0
            },
            "export": {
              "enabled": true
            }
          });  this.chart = this.AmCharts.makeChart("chartb4", {
            "type": "serial",
            "theme": "light",
            "titles": [{
            "text": "B4",
            "bold": true,
            "color":"#95a5a6",
            "size":20
               }],
            "listeners": [{
              "event": "rendered",
              "method": this.handleRenderB4
            }],
            "dataProvider": this.b4,
            "valueAxes": [{
              "axisAlpha": 0,
              "dashLength": 4,
              "position": "left",
              "autoGridCount":true,
              "guides": [{
                "value": this.alarmes[0]["RefB4"],
                "fillColor": "#55aa67",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["PrAlB4"],
                "fillColor": "#efed51",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["AlB4"],
                "fillColor": "#f7a522",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["DgB4"],
                "fillColor": "#ef3823",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              }

              ],
            }],
            "graphs": [{
              "bulletSize": 7,
              "customBullet": "https://www.amcharts.com/lib/3/images/star.png?x",
              "customBulletField": "customBullet",
              "valueField": "value",
              "balloonText":"<div style='margin:10px; text-align:left;'><span style='font-size:13px'>[[category]]</span><br><span style='font-size:18px'>Value:[[value]]</span>",
            }],

            "chartCursor": {
              "graphBulletSize": 1.5,
              "zoomable":true,
              "valueZoomable":true,
              "cursorAlpha":0,
              "valueLineEnabled":true,
              "valueLineBalloonEnabled":true,
              "valueLineAlpha":0.2
            },
            "autoMargins": false,
            "dataDateFormat": "YYYY-MM-DD",
            "categoryField": "date",

            "categoryAxis": {
              "parseDates": true,
              "axisAlpha": 0,
              "gridAlpha": 0,
              "inside": true,
              "tickLength": 0
            },
            "export": {
              "enabled": true
            }
          });  
          this.chart = this.AmCharts.makeChart("chartb5", {
            "type": "serial",
            "theme": "light",
            "titles": [{
            "text": "B5",
            "bold": true,
            "color":"#95a5a6",
            "size":20
               }],
            "listeners": [{
              "event": "rendered",
              "method": this.handleRenderB5
            }],
            "dataProvider": this.b5,
            "valueAxes": [{
              "axisAlpha": 0,
              "dashLength": 4,
              "position": "left",
              "autoGridCount":true,
              "guides": [{
                "value": this.alarmes[0]["RefB5"],
                "fillColor": "#55aa67",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["PrAlB5"],
                "fillColor": "#efed51",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["AlB5"],
                "fillColor": "#f7a522",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["DgB5"],
                "fillColor": "#ef3823",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              }

              ],
            }],
            "graphs": [{
              "bulletSize": 7,
              "customBullet": "https://www.amcharts.com/lib/3/images/star.png?x",
              "customBulletField": "customBullet",
              "valueField": "value",
              "balloonText":"<div style='margin:10px; text-align:left;'><span style='font-size:13px'>[[category]]</span><br><span style='font-size:18px'>Value:[[value]]</span>",
            }],

            "chartCursor": {
              "graphBulletSize": 1.5,
              "zoomable":true,
              "valueZoomable":true,
              "cursorAlpha":0,
              "valueLineEnabled":true,
              "valueLineBalloonEnabled":true,
              "valueLineAlpha":0.2
            },
            "autoMargins": false,
            "dataDateFormat": "YYYY-MM-DD",
            "categoryField": "date",

            "categoryAxis": {
              "parseDates": true,
              "axisAlpha": 0,
              "gridAlpha": 0,
              "inside": true,
              "tickLength": 0
            },
            "export": {
              "enabled": true
            }
          });  this.chart = this.AmCharts.makeChart("chartb6", {
            "type": "serial",
            "theme": "light",
            "titles": [{
            "text": "B6",
            "bold": true,
            "color":"#95a5a6",
            "size":20
               }],
            "listeners": [{
              "event": "rendered",
              "method": this.handleRenderB6
            }],
            "dataProvider": this.b6,
            "valueAxes": [{
              "axisAlpha": 0,
              "dashLength": 4,
              "position": "left",
              "autoGridCount":true,
              "guides": [{
                "value": this.alarmes[0]["RefB6"],
                "fillColor": "#55aa67",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["PrAlB6"],
                "fillColor": "#cc0000",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["AlB6"],
                "fillColor": "#f7a522",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["DgB6"],
                "fillColor": "#ef3823",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              }

              ],
            }],
            "graphs": [{
              "bulletSize": 7,
              "customBullet": "https://www.amcharts.com/lib/3/images/star.png?x",
              "customBulletField": "customBullet",
              "valueField": "value",
              "balloonText":"<div style='margin:10px; text-align:left;'><span style='font-size:13px'>[[category]]</span><br><span style='font-size:18px'>Value:[[value]]</span>",
            }],

            "chartCursor": {
              "graphBulletSize": 1.5,
              "zoomable":true,
              "valueZoomable":true,
              "cursorAlpha":0,
              "valueLineEnabled":true,
              "valueLineBalloonEnabled":true,
              "valueLineAlpha":0.2
            },
            "autoMargins": false,
            "dataDateFormat": "YYYY-MM-DD",
            "categoryField": "date",

            "categoryAxis": {
              "parseDates": true,
              "axisAlpha": 0,
              "gridAlpha": 0,
              "inside": true,
              "tickLength": 0
            },
            "export": {
              "enabled": true
            }
          });  this.chart = this.AmCharts.makeChart("chartspeed", {
            "type": "serial",
            "theme": "light",
            "titles": [{
            "text": "SPEED",
            "bold": true,
            "color":"#95a5a6",
            "size":20
               }],
            "dataProvider": this.speed,
            "valueAxes": [{
              "axisAlpha": 0,
              "dashLength": 4,
              "position": "left",
              "autoGridCount":false,
              "gridCount":50,
              "guides": [{
                "value": this.alarmes[0]["RefRMS"],
                "fillColor": "#55aa67",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["PrAlRMS"],
                "fillColor": "#efed51",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["AlRMS"],
                "fillColor": "#f7a522",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              },
              {
                "value": this.alarmes[0]["DgRMS"],
                "fillColor": "#cc0000",
                "inside": true,
                "fillAlpha": 1,
                "lineAlpha": 0
              }

              ],
            }],
            "graphs": [{
              "bulletSize": 7,
              "customBullet": "https://www.amcharts.com/lib/3/images/star.png?x",
              "customBulletField": "customBullet",
              "valueField": "value",
              "balloonText":"<div style='margin:10px; text-align:left;'><span style='font-size:13px'>[[category]]</span><br><span style='font-size:18px'>Value:[[value]]</span>",
            }],

            "chartCursor": {
              "graphBulletSize": 1.5,
              "zoomable":true,
              "valueZoomable":true,
              "cursorAlpha":0,
              "valueLineEnabled":true,
              "valueLineBalloonEnabled":true,
              "valueLineAlpha":0.2
            },
            "autoMargins": false,
            "dataDateFormat": "YYYY-MM-DD",
            "categoryField": "date",

            "categoryAxis": {
              "parseDates": true,
              "axisAlpha": 0,
              "gridAlpha": 0,
              "inside": true,
              "tickLength": 0
            },
            "export": {
              "enabled": true
            }
          });


        } catch (Error)
        {
          console.log("value not defined ")
        }

      }





      // this.chart.addListener( "rendered", function( event ) {
        //   // get chart and value axis
        //   var chart = event.chart;
        //   var axis = chart.valueAxes[0];

        //   // create max guide
        //   var guide = new this.AmCharts.Guide();
        //   guide.value = guide.label = axis.maxReal;
        //   guide.lineAlpha = 0.2;
        //   guide.lineThickness = 2;
        //   guide.lineColor = guide.color = "#00cc00";
        //   axis.addGuide( guide );

        //   // create min guide
        //   // var guide = new this.AmCharts.Guide();
        //   // guide.value = guide.label = axis.minReal;
        //   // guide.lineAlpha = 0.2;
        //   // guide.lineThickness = 2;
        //   // guide.lineColor = guide.color = "#cc0000";
        //   // axis.addGuide( guide );

        //   chart.zoomOut();
        // } );












        getTableService(value1,value2,value3,value4,value5) {
          console.log("value5"+value5)
          console.log("value5"+value1)
          console.log("value5"+value2)
          console.log("value5"+value3)
          console.log("value5"+value4)
          var server=sessionStorage.getItem('server');
          var user=sessionStorage.getItem('user');
          var password=sessionStorage.getItem('password');
          var database=sessionStorage.getItem('database');


          return this.http.get('https://betavib.herokuapp.com/betavib/TableAssetsOverView/'+server+'/'+user+'/'+password+'/'+database+'/'+value1+'/'+value2+'/'+value3+'/'+value4+'/'+value5)
          .map(res => res.json());
        }





        private getTable(value1,value2,value3,value4,value5){

          this.getTableService(value1,value2,value3,value4,value5).subscribe(datatable => {
            this.pointsdet=[];
            console.log(datatable.length+"mach")
            for (var i=0; i<datatable.length; i++)
            {
              this.datatable.push(datatable[i]);

            }
            console.log(this.datatable)
            
          });

        }





        getAlarmes(value1,value2,value3) {
          var server=sessionStorage.getItem('server');
          var user=sessionStorage.getItem('user');
          var password=sessionStorage.getItem('password');
          var database=sessionStorage.getItem('database');


          return this.http.get('https://betavib.herokuapp.com/betavib/alarmes/'+server+'/'+user+'/'+password+'/'+database+'/'+value1+'/'+value2+'/'+value3)
          .map(res => res.json());
        }






        private getAlarmese(value1,value2,value3){

          this.getAlarmes(value1,value2,value3).subscribe(alarmes => {
            this.alarmes=[];
            console.log("salut")
            console.log(this.alarmes)
            console.log(alarmes.length+"mach")
            for (var i=0; i<alarmes.length; i++)
            {
              this.alarmes.push(alarmes[i]);
              console.log(this.alarmes[i]["RefRMS"].toFixed(0))
            }
            console.log(this.alarmes)

          }
          ,(error)=>{},
          ()=>{


            this.makeDataRms();
            this.makeDataPeak();
            this.makeDataCF();
            this.makeDataOvelo();
            this.makeDatab1();
            this.makeDatab2();
            this.makeDatab3();
            this.makeDatab4();
            this.makeDatab5();
            this.makeDatab6();
            this.makeDataspeed();
            /////////////////////////////
            // Completion event handler
            /////////////////////////////

          }



          );

        }













        get isLoading():boolean{ 
          return this.dataService.isLoading; 
        } 
        set isLoading(value: boolean) { 
          this.dataService.isLoading = value; 
        }















      }