import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {User} from '../user'
import * as $ from 'jquery';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  users:  User[];
  selectedUser:  User  = { id :  null , name:null, mail:  null, password: null};

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.readUsers().subscribe((users: User[])=>{
      this.users = users;
      console.log(this.users);
    })

  }

  create(){
    let name = $("#name").val()
    let mail = $("#mail").val()
    let password = $("#password").val()
    let user = {id:null,name:name, mail:mail, password:password}
    console.log("tsst",name)
    this.apiService.createUser(user).subscribe((user: User)=>{
      console.log("Policy created, ", user);
    });
  }

}
