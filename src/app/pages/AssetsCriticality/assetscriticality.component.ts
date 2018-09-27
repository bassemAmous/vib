import { Component } from '@angular/core';
import { AmChartsService } from "amcharts3-angular2";
import { Machine } from '../../theme/components/baMenu/machine.interface';
import { InfoMachine } from '../AssetsOverview/infomachine.interface';
import { DataService } from '../data.service';
import { Http } from '@angular/http';
@Component({
  selector: 'assetscriticality',
  templateUrl: './assetscriticality.component.html',
  styleUrls:['./assetscriticality.component.css']
})

export class AssetsCriticalityComponent {
   p: number = 1;
    p1: number = 1;
    collection: any[];
	private chart10: any;
  private chart9: any;
  machines:Machine[]=[];
   MachineSelected:InfoMachine;
 constructor(private AmCharts: AmChartsService,public dataService: DataService,private http: Http) {
if(localStorage.getItem("dbmachines")){

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

  


  public ngOnInit(){
// if(this.dataService.isLoading){
//  var elem  = document.body;

// elem.style.pointerEvents = 'none'; 
 
// }




    if(!sessionStorage.getItem("selectedMachine"))
    {this.getSelectedMachineInfo(this.data[0].MachineName);
        sessionStorage.setItem("selectedMachine",JSON.stringify(this.data[0]))
    }
    else
    this.MachineSelected=JSON.parse(sessionStorage.getItem("selectedMachine"));

  this.chart10 = this.AmCharts.makeChart( "chartdiv66", {
  "type": "serial",
  "theme": "light",
  "autoMargins": false,
  "marginTop": 30,
  "marginLeft": 80,
  "marginBottom": 30,
  "marginRight": 50,
  "dataProvider": [ {
    "category": "Evaluation",
    "excelent": 20,
    "good": 20,
    "average": 20,
    "poor": 20,
    "bad": 20,
    "limit": 78,
    "full": 100,
    "bullet": 65
  } ],
  "valueAxes": [ {
    "maximum": 100,
    "stackType": "regular",
    "gridAlpha": 0
  } ],
  "startDuration": 1,
  "graphs": [ {
    "fillAlphas": 0.8,
    "lineColor": "#2ecc71",
    "showBalloon": false,
    "type": "column",
    "valueField": "excelent"
  }, {
    "fillAlphas": 0.8,
    "lineColor": "#2ecc71",
    "showBalloon": false,
    "type": "column",
    "valueField": "good"
  }, {
    "fillAlphas": 0.8,
    "lineColor": "#f1c40f",
    "showBalloon": false,
    "type": "column",
    "valueField": "average"
  }, {
    "fillAlphas": 0.8,
    "lineColor": "#e67e22",
    "showBalloon": false,
    "type": "column",
    "valueField": "poor"
  }, {
    "fillAlphas": 0.8,
    "lineColor": "#e74c3c",
    "showBalloon": false,
    "type": "column",
    "valueField": "bad"
  }, {
    "clustered": false,
    "columnWidth": 0.3,
    "fillAlphas": 1,
    "lineColor": "#2980b9",
    "stackable": false,
    "type": "column",
    "valueField": "bullet"
  }, {
    "columnWidth": 0.5,
    "lineColor": "#2980b9",
    "lineThickness": 3,
    "noStepRisers": true,
    "stackable": false,
    "type": "step",
    "valueField": "limit"
  } ],
  "rotate": false,
  "columnWidth": 1,
  "categoryField": "category",
  "categoryAxis": {
    "gridAlpha": 0,
    "position": "left"
  }
} );


this.chart9 = this.AmCharts.makeChart( "chartdiv55", {
  "type": "serial",
  "theme": "light",
  "addClassNames": true,
  "dataProvider": [ {
    "country": "USA",
    "visits": 2025
  }, {
    "country": "China",
    "visits": 1882
  }, {
    "country": "Japan",
    "visits": 1809
  }, {
    "country": "Germany",
    "visits": 1322
  }, {
    "country": "UK",
    "visits": 1122
  }, {
    "country": "France",
    "visits": 1114
  }, {
    "country": "India",
    "visits": 984
  }, {
    "country": "Spain",
    "visits": 711
  }, {
    "country": "Netherlands",
    "visits": 665
  }, {
    "country": "Russia",
    "visits": 580
  }, {
    "country": "South Korea",
    "visits": 443
  }, {
    "country": "Canada",
    "visits": 441
  }, {
    "country": "Brazil",
    "visits": 395
  } ],
  "valueAxes": [ {
    "gridColor": "#FFFFFF",
    "gridAlpha": 0.2,
    "dashLength": 0,
     "tickLength": 0,
    "axisAlpha": 0,
    "showFirstLabel": false,
    "showLastLabel": false,
    "guides": [{
      "value": 0,
      "tovalue":400,
      "fillColor": "#cc0000",
      "inside": true,
      "fillAlpha": 1,
      "lineAlpha": 0
    },
    {
      "value": 400,
      "tovalue":700,
      "fillColor": "#cc0000",
      "inside": true,
      "fillAlpha": 1,
      "lineAlpha": 0
    },
    {
      "value": 700,
      "tovalue":1000,
      "fillColor": "#cc0000",
      "inside": true,
      "fillAlpha": 1,
      "lineAlpha": 0
    },
    {
      "value": 1000,
      "tovalue":1200,
      "fillColor": "#cc0000",
      "inside": true,
      "fillAlpha": 1,
      "lineAlpha": 0
    }]
  } ],
  "gridAboveGraphs": true,
  "startDuration": 1,
  "graphs": [ {
    "balloonText": "[[category]]: <b>[[value]]</b>",
    "fillAlphas": 0.8,
    "lineAlpha": 0.2,
    "type": "column",
    "valueField": "visits"
  } ],
  "chartCursor": {
    "categoryBalloonEnabled": false,
    "cursorAlpha": 0,
    "zoomable": false
  },
  "categoryField": "country",
  "categoryAxis": {
    "gridPosition": "start",
    "gridAlpha": 0,
    "tickPosition": "start",
    "tickLength": 20
  },
  "export": {
    "enabled": true
  }


} );


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
              
         });
       
    }





get data():Machine[] { 
    return this.dataService.serviceData; 
  } 
  set data(value: Machine[]) { 
    this.dataService.serviceData = value; 
  } 
get isLoading():boolean{ 
            return this.dataService.isLoading; 
  } 
 set isLoading(value: boolean) { 
        this.dataService.isLoading = value; 
        }



machineClick(event,MachineName){
this.getSelectedMachineInfo(MachineName);

}

}
