import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from './../../../shared/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model = {
    email: '',
    password: ''
  }
  payload: any;


  serverErrorMessages = '';

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) { }

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  ngOnInit(): void {
    this.startFilter();

    if(this.userService.isLoggedIn() && this.payload == 'true'){
      this.router.navigateByUrl('dashboard');
    }else if(this.payload == 'false'){
      this.router.navigateByUrl('login');
    }
  }

  onSubmit(form : NgForm){
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.startFilter();
        this.checkLoginPermission(this.payload.toString());
      },
      err => {
        if (err.status === 422) {
          this.toastr.warning( this.serverErrorMessages = err.error.join('<br/>'), 'User Login Failed')
          }
          else
          this.toastr.error( this.serverErrorMessages = 'Something went wrong. Please contact Admin.', 'Error 422')
			  }
    );
  }

  startFilter(){
    var payLoad = this.userService.getUserPayload();
    if(payLoad)
      this.payload = payLoad.loginPermission;
    else
      return false 
  }

  checkLoginPermission(payload){
    if(payload == "false")
      this.toastr.warning( this.serverErrorMessages = 'Your account has been deactivated. Please contact Admin', 'User Account Disabled');
    else
      this.router.navigateByUrl('dashboard');
  }

}
