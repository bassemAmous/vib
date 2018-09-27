import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.services';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './user.interface';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})

export class Login {
@ViewChild('btn') btn; 
  dropshow = false;
  clickNum=0;
  databases: any = [];
  localUser = { server: '', user: '', password: '',database:'' };
  form: FormGroup;
  ipaddress: AbstractControl;
  user: AbstractControl;
  password: AbstractControl;
  database: AbstractControl;
  submitted: boolean = false;
  error = '';
  loading = false;
  ip:string="69.156.65.61";
  log:string="BetavibUser";
  pwd:string="beta"
  constructor(fb: FormBuilder, private loginservice: LoginService, private _router: Router) {
    this.form = fb.group({
      'ipaddress': ['',],
      'user': ['',],
      'password': ['',],
      'database':['',]
    });

    this.ipaddress = this.form.controls['ipaddress'];
    this.user = this.form.controls['user'];
    this.password = this.form.controls['password'];
    this.database = this.form.controls['database'];
 // let win = (window as any);
 //      if(win.location.search !== '?loaded' ) {
 //          win.location.search = '?loaded';
 //          win.location.reload();
 //      }
  }




  ngOnInit() {

    this.loginservice.logout();
 
    this.loginservice.getDatabases().subscribe(databases => {
      for (var i = 0; i < databases.length; i++)
        for (var name in databases[i]) {
          this.databases.push(databases[i][name]);
         // console.log(databases[i][name]);
        }

    });
  }




  onSubmit(values: User,element): void {

    if (this.form.valid) {
if(this.clickNum==0){
  // console.log("fiiiiirst time")
      this.loading = true;
      this.localUser.server = values.ipaddress;
      this.localUser.user = values.user;
      this.localUser.password = values.password;

      this.loginservice.login(this.localUser)
        .subscribe(result => {
          if (result) {
            // login successful
            //this.btn.nativeElement.textContent="Next";
            this.loading = false;
            this.dropshow = true;
            this.error = null;
            // console.log("connected")
            this.clickNum++;
             

          } else {
            // login failed
            this.error = 'Bad Credentials';
            this.loading = false;
            this.dropshow = false;
           this.clickNum=0;
            // console.log("pas ok")

          }
        });
       
      }
      else
      {
        if( values.database=="")
          values.database=this.databases[0];
   this.localUser.database = values.database;
this.loginservice.login(this.localUser)
        .subscribe(result => {
          if (result) {
            // login successful
            // console.log("sob db"+this.localUser.database)
            sessionStorage.setItem('server',this.localUser.server);
            sessionStorage.setItem('user',this.localUser.user);
            sessionStorage.setItem('password',this.localUser.password);
            sessionStorage.setItem('database',this.localUser.database);
              this._router.navigate(['/maindashboard']);

          } else {
            // login failed
            this.error = 'Error Connection';
   

          }
        });

      
      }
    }

  }


onKey(event:any) { // without type info
this.dropshow = false;
   this.clickNum=0;
   this.btn.nativeElement.textContent="Connect";
  }















}
