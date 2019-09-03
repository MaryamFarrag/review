import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import {Review} from '../review'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';


@Component({
  selector: 'app-check-review',
  templateUrl: './check-review.component.html',
  styleUrls: ['./check-review.component.scss']
})
export class CheckReviewComponent implements OnInit {
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;

  likeClickCount = 0
  dislikeClickCount = 0
  review : Review;
  id: any;
  likes:number;
  dislikes:number;
  user_id:Number;
  show_del_btn:boolean;
  likeData = {user_id: null, review_id: null, likedOrDisliked:null};
  constructor(private apiService: ApiService, private route:ActivatedRoute,private router: Router) { 
    this.id = this.route.snapshot.paramMap
    this.id = this.id.params.id
  }
  ngOnInit() {
    var review = {id:this.id,tName:null, country:null, tAddress:null, tDesc:null,userId:null, tImg:null,tLink:null, userName:null, userMail:null,personalRev:null, category:null,likes:null,dislikes:null}
    this.apiService.getReview(review).subscribe((review: Review)=>{
      console.log("done",this.id,review[0].userId) 
      this.review = review
      if(this.user_id == review[0].userId){ //show the delete button
        this.show_del_btn = true
      }
      else{
        this.show_del_btn = false
      }
    })  
    if(this.isLoggedIn()){
      console.log("test2=>",this.user_id)
      this.likeData.user_id = this.user_id
      this.likeData.review_id = this.id
      this.apiService.readLikes(this.likeData).subscribe((likeData:Object)=>{ //check if the post is liked by that user
        console.log("liked or diskliked oninit=>",likeData[0].likedOrDisliked)
        this.likeData.likedOrDisliked = likeData[0].likedOrDisliked
        //if liked(1) then make the color different 
        if(this.likeData.likedOrDisliked == 1){
          $(".likes").css("color","rgb(226, 84, 84)");
        }
        else if(this.likeData.likedOrDisliked == -1){
          $(".dislikes").css("color","rgb(266,84,84)");
        }
        else{
          $(".likes").css("color","rgb(255,255,255)");
          $(".dislikes").css("color","rgb(255,255,255)");
        }
      })   
    }
   
  }
  isLoggedIn(){
    if(!localStorage.getItem("access_token")){
      return false ;
    }
    else{
      return this.user_id = parseInt(localStorage.getItem('id'));
    }
  }

  like(){
    if(!this.isLoggedIn()){//if logged in returns false, promty the user to log in
      window.alert('Login first to like a review!')
      this.router.navigate(['/sign-in']);
    }
    else{//else go ahead :)
    this.likeClickCount++
    let likedOrDisliked = this.likeData.likedOrDisliked;
    console.log("start liking, this is click number", this.likeClickCount,"this liked or disliked =>",likedOrDisliked);
    console.log("likeData=>",this.likeData)

    if(this.likeClickCount%2 != 0){
      if(this.likeClickCount == 1){
        console.log("first click this visit!")
        if(likedOrDisliked != undefined && likedOrDisliked == 1){
          console.log("This button was clicked before! so let's unclick it.")
          this.likeClickCount =1
          this.like()
        }
        else{
          console.log("Let's click it! It wasn't clicked before.")
          this.likeData.likedOrDisliked = 1
          console.log("likedData again=>",this.likeData)
          this.apiService.checkLikes(this.likeData).subscribe((likeData: Object)=>{
            this.review[0].likes++
            console.log(this.likeData,"added the like")
            this.apiService.checkLikes(this.review[0]).subscribe((review: Review)=>{
              console.log(this.review[0],"likes=>",this.review[0].likes)
            });  
            $(".likes").css("color","rgb(226, 84, 84)");
          }); 
        }
      }
      else{
        console.log("not visit no.0")
        this.likeData.likedOrDisliked = 1
        console.log("likedData again=>",this.likeData)
        this.apiService.checkLikes(this.likeData).subscribe((likeData: Object)=>{
          this.review[0].likes++
          console.log(this.likeData,"added the like")
          this.apiService.checkLikes(this.review[0]).subscribe((review: Review)=>{
            console.log(this.review[0],"likes=>",this.review[0].likes)
          });  
          $(".likes").css("color","rgb(226, 84, 84)");
        }); 
      }
    }
    else{//unclick
      console.log("not user's first click!, user removing the like (unclick)")
      this.likeData.likedOrDisliked = 2
      this.apiService.checkLikes(this.likeData).subscribe((likeData: Object)=>{
        this.review[0].likes--
        console.log("removed the like",likedOrDisliked,this.likeData)
        this.apiService.checkLikes(this.review[0]).subscribe((review: Review)=>{
          console.log(this.review[0],"likes=>",this.review[0].likes)
        });  
      }); 
      $(".likes").css("color","rgb(255, 255, 255)");
    }
  }
  }
  disLike(){
    if(!this.isLoggedIn()){//check if not logged in
      window.alert('Login first to dislike a review!')
      this.router.navigate(['/sign-in']);
    }
    else{
      this.dislikeClickCount++
      let likedOrDisliked = this.likeData.likedOrDisliked
   
      if(this.dislikeClickCount%2 != 0){
        if(this.dislikeClickCount == 1){//if it's first click
          if(likedOrDisliked != undefined && likedOrDisliked == -1){//check if it's been liked before
            this.dislikeClickCount = 1
            this.disLike()
          }
          else{
            this.likeData.likedOrDisliked = -1

            this.apiService.checkLikes(this.likeData).subscribe((likeData: Object)=>{//add the dislike
              this.review[0].dislikes++
              console.log(this.likeData,"added the like")
              this.apiService.checkLikes(this.review[0]).subscribe((review: Review)=>{ //increase the post's number pf dislikes
              });  
              $(".dislikes").css("color","rgb(226, 84, 84)");
            });
          }
        }
        else{//it's been disliked before
          console.log("Not visit no.0")
          this.likeData.likedOrDisliked = -1
          console.log("likedData again=>",this.likeData)
          this.apiService.checkLikes(this.likeData).subscribe((likedData:Object)=>{
            this.review[0].dislikes++
            console.log(this.likeData,"Added the disliked!")
            this.apiService.checkLikes(this.review[0]).subscribe((review:Review)=>{
              console.log(this.review[0],"Dislikes=>",this.review[0].dislikes)
            })
            $(".dislikes").css("color","rgb(226, 84, 84)");
          })
        }
      }
      else{//unclick (remove the dislike) //it's been clicked before clicks%2 == 0
        console.log("Not user's first click! let's unclick ")
        this.likeData.likedOrDisliked = 2
        this.apiService.checkLikes(this.likeData).subscribe((likeData:Object)=>{
          this.review[0].dislikes--
          console.log("removed the dislike",likedOrDisliked,this.likeData)
          this.apiService.checkLikes(this.review[0]).subscribe((review: Review)=>{
            console.log(this.review[0],"dislikes=>",this.review[0].dislikes)
          }); 
          $(".dislikes").css("color","rgb(255, 255, 255)");
        })
      }
    }
  }
  
  delete(){
    this.apiService.delete(this.review[0].id).subscribe((data: any)=>{
      this.router.navigate(['/reviews'])
    });
  }
}
/*
so to explain all of this weird not so clean code, here is what it does:
1- the like and dislike functions
*/