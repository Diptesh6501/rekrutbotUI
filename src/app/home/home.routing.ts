
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {CandidateFormComponent} from './candidate-form/candidate-form.component';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';



const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'candidateForm', component: CandidateFormComponent },
    { path: 'candidateDetails', component: CandidateDetailsComponent}

];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)]
})
export class HomeRoutingModule { }
