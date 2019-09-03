import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {User} from '../user'
import { Router } from '@angular/router'; 

import * as $ from 'jquery';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  users:  User[];
  selectedUser:  User  = { id :  null , name:null, mail:  null, password: null};


  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('access_token')){
      localStorage.removeItem('access_token')
      localStorage.removeItem('userMail');
      localStorage.removeItem('id');
    }   
  }
  checkUser(){
    let mail = $("#mail").val()
    let password = $("#password").val()
    let user = {id:null,name:null, mail:mail, password:password}
    this.apiService.checkUser(user).subscribe((user: User)=>{
      localStorage.setItem('access_token', user[0].token);
      localStorage.setItem('userMail', user[0].userMail);
      localStorage.setItem('id', user[0].userId);

     // this.router.navigate(['/'])
      location.href = '/' //because i want it to rload so that the navbar would reload and change the buttons lol      
    });
  }
}
