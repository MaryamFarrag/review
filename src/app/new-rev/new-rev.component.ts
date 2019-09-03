import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup } from  '@angular/forms';

import {Review} from '../review'
import * as $ from 'jquery'
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-rev',
  templateUrl: './new-rev.component.html',
  styleUrls: ['./new-rev.component.scss']
})
export class NewRevComponent implements OnInit {
  review : Review[];
  selectedReview :Review = {id:null, tName:null, country:null, tAddress:null, tDesc:null, tImg:null,tLink:null,userId:null, userName:null, userMail:null,personalRev:null, category:null,likes:null,dislikes:null}

 // tImg: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  imageSrc = String;
  form: FormGroup;
  uploadResponse;

  constructor(private apiService: ApiService,private formBuilder: FormBuilder, private router: Router,private http: HttpClient) { }
  userName:string
  userMail:string

  ngOnInit() {
    if(!localStorage.getItem("access_token")){
      $("#new-rev").css("display","none")
      window.alert("You have to be logged in to enter this page :)")
      this.router.navigate(['/sign-in'])
    }
    else{
      this.userName = localStorage.getItem("userMail").split('@')[0]
      this.userMail = localStorage.getItem("userMail")
    }
    this.form = this.formBuilder.group({
      avatar: ['']
    });
  }

  onFileSelect(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
  }
 
  makeReview(){
    let tName = $("#thing-name").val()
    let country = $("#country").val()
    let tAddress = $("#tAddress").val()
    let tLink = $("#tLink").val()
    let tDesc = $("#tDesc").val()
    let personalRev = $("#personal-rev").val()
    let category =$("#category").val()
    let userName = $("#userName").html();
    let userMail;
    let userID = localStorage.getItem('id');
    if(!$('input[type="checkbox"]').prop("checked")){//check if user wants to show the mail
      userMail = "";
    }
    else{
      userMail = $("#userMail").html();
    }
    let review = {id:null, tName:tName, country:country, tAddress:tAddress, tDesc:tDesc, tImg:null,tLink:tLink,userId:userID, userName:userName, userMail:userMail,personalRev:personalRev, category:category,likes:0,dislikes:0}
    console.log(this.imageSrc)
    if(this.imageSrc.length <= 1){//if user didnt choose an image put this image as a defult (no-img)
      review.tImg = "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzA2NyA3OS4xNTc3NDcsIDIwMTUvMDMvMzAtMjM6NDA6NDIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5NzU3NjZDRTNDQzAxMUU1QjUzOUIyNzFBQTE5MzcyNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5NzU3NjZDRjNDQzAxMUU1QjUzOUIyNzFBQTE5MzcyNiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk3NTc2NkNDM0NDMDExRTVCNTM5QjI3MUFBMTkzNzI2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjk3NTc2NkNEM0NDMDExRTVCNTM5QjI3MUFBMTkzNzI2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJ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"
    }
    else{
      review.tImg = this.imageSrc
    }
    /*this.apiService.test(review.tImg).subscribe((data: any)=>{
      console.log("review created, ", data); //efta7 b3den
    });*/
    this.apiService.createReview(review).subscribe((review: Review)=>{
      console.log("review created, ", review); //efta7 b3den
      this.router.navigate(['/reviews']);
    }); 
    $(".fill").val("")//to empty the input after reviewing
  }
}
