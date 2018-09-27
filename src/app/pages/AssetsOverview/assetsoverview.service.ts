import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
@Injectable()
export class AssetsOverViewService {
 server:any;
  user:any;
  password:any;
  database:any;

 constructor(private http: Http) {
            this.server=sessionStorage.getItem('server');
            this.user=sessionStorage.getItem('user');
            this.password=sessionStorage.getItem('password');
            this.database=sessionStorage.getItem('database');}
           

          ngOnInit(){
            this.server=sessionStorage.getItem('server');
            this.user=sessionStorage.getItem('user');
            this.password=sessionStorage.getItem('password');
            this.database=sessionStorage.getItem('database');
            
          } 
  getInfoMachine() {
    return this.http.get('https://betavib.herokuapp.com/betavib/infomachine/'+this.server+'/'+this.user+'/'+this.password+'/'+this.database)
      .map(res => res.json());
  }



}
