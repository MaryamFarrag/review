import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { NewRevComponent } from './new-rev/new-rev.component';
import { CheckReviewComponent } from './check-review/check-review.component';
import { ShowResultComponent } from './show-result/show-result.component';



const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:"sign-up",component:SignUpComponent},
  {path:"sign-in",component:SignInComponent},
  {path:"reviews",component:ReviewsComponent},
  {path:"new-rev",component:NewRevComponent},
  {path:"check-review/:id",component:CheckReviewComponent},
  {path:"show-result",component:ShowResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
