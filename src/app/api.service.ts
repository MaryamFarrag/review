import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from './user';
import { Observable } from  'rxjs';
import {Review} from './review';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER = "https://reviewsbackend.000webhostapp.com";

  readUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.PHP_API_SERVER}/api/read.php`);
  }
  createUser(user: User):Observable<User>{
    return this.httpClient.post<User>(`${this.PHP_API_SERVER}/api/create.php`, user);
  }
  checkUser(user:User):Observable<User>{
    return this.httpClient.post<User>(`${this.PHP_API_SERVER}/api/checkUser.php`,user);
  }
  createReview(review: Review):Observable<Review>{
    return this.httpClient.post<Review>(`${this.PHP_API_SERVER}/api/createReview.php`, review);
  } 
  readReviews(): Observable<Review[]>{
    return this.httpClient.get<Review[]>(`${this.PHP_API_SERVER}/api/readReviews.php`);
  }
  getReview(review:Review): Observable<Review>{
    return this.httpClient.post<Review>(`${this.PHP_API_SERVER}/api/getReview.php`,review);
  } 
  checkLikes(likeData: Object){
    return this.httpClient.put<Review>(`${this.PHP_API_SERVER}/api/manageLikes.php`, likeData);   
  }
  readLikes(likeData:Object):Observable<Object>{
    return this.httpClient.post<Object>(`${this.PHP_API_SERVER}/api/manageLikes.php`,likeData);
  }
  search(target:Object):Observable<Object>{
    return this.httpClient.post<Object>(`${this.PHP_API_SERVER}/api/search.php`,target);
  }
/*  test(imgFile:any):Observable<any>{
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/api/test.php`,imgFile);
  }*/
  delete(id:any):Observable<any>{
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/api/delete.php`,id);
  }
  constructor(private httpClient: HttpClient) { }
}
