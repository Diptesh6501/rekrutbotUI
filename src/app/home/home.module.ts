import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home.routing';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadersComponent } from './loaders/loaders.component';


@NgModule({
  declarations: [HomeComponent, LoadersComponent,
    NavbarComponent, CandidateFormComponent, CandidateDetailsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
