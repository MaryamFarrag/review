import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if(localStorage.getItem('access_token')){//remove the log-in and sign up buttons, use log-out instead
      $(".sign").css("display","none")
      $('a.sign-up').replaceWith('<a class="nav-link log-out" (click)="logOut()">Log Out</a>');
      }
    $(".log-out").css("cursor","pointer")

    $(".log-out").click(function(){//the log out function to remove the token from localstorage
      localStorage.removeItem('access_token')
      localStorage.removeItem('userMail')
      localStorage.removeItem('id')


      location.reload()
    })
  }
  
  

}
