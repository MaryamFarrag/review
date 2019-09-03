import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import {faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-show-result',
  templateUrl: './show-result.component.html',
  styleUrls: ['./show-result.component.scss']
})
export class ShowResultComponent implements OnInit {
  ids:any
  data:Object
  title:String
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  constructor(private route:ActivatedRoute, private apiService: ApiService,private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.ids = Object.values(params)
    });
   }

  ngOnInit() {
    this.apiService.search(this.ids).subscribe((data:any)=>{
      console.log("done,",data)
      this.data = data;
      this.title = data[0].tName
    })
  }
  check(id){
    this.router.navigate(['/check-review',id])
  }

}
