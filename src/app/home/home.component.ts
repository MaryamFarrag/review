import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
import { NgwWowService } from 'ngx-wow';
import { ApiService } from '../api.service';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
faTimes = faTimes;


  constructor(private wowService: NgwWowService, private apiService:ApiService,private router:Router) {
    this.wowService.init(); 
   }

  ngOnInit() {
    if(localStorage.getItem('access_token')){//remove the login box
      $(".prompt-user").css("display","none")
    }   
  }
  close(){
    $(".prompt-user").css("display","none")
  }
  search(){
    const target = $("#search").val()
    console.log("searrcchh",target)
    this.apiService.search(target).subscribe((target: Object)=>{
      console.log("done",target) //go to new component to show all results
      const ids= []
      for(let n in target){
        ids.push(target[n].id)
      }
      console.log("test",ids)
      let navigationExtras: NavigationExtras = {
        queryParams: ids
    };
      this.router.navigate(['/show-result'],navigationExtras)
    })   
  }
}