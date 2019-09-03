import { Component, OnInit } from '@angular/core';
import { faPlusCircle, faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../api.service';
import {Review} from '../review'
import * as $ from 'jquery'
import { Router } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  review : Review[];
  selectedReview :Review = {id:null, tName:null, country:null, tAddress:null, tDesc:null, tImg:null,tLink:null,userId:null, userName:null, userMail:null,personalRev:null, category:null,likes:null,dislikes:null}

  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;

  faPlusCircle = faPlusCircle;
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.apiService.readReviews().subscribe((review: Review[])=>{
      this.review = review;
      console.log("rev=>",this.review);
    })

    if(localStorage.getItem('access_token')){
      $(".panner").css("display","block")
    }
  }
  check(id){
    this.router.navigate(['/check-review',id])
  }

}
