import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { CandidateService } from 'src/app/services/candidate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss']
})
export class CandidateFormComponent implements OnInit {
  candidateForm: FormGroup;
  file: File;
  state: any;
  splittedView: any;
  showLoader: Boolean;
  constructor(
    private http: HttpClient,
    private candidateService: CandidateService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.checkView();
    this.state = this.candidateService.getState();
    console.log('state in candidate form', this.state);
    if (this.state) {
      this.candidateForm = new FormGroup({
        fName: new FormControl(this.state.name),
        lName: new FormControl(''),
        email: new FormControl(this.state.email),
        phoneNo: new FormControl(this.state.phoneNumber),
        skills: new FormControl(this.state.skills),
        cCtc: new FormControl(''),
        eCtc: new FormControl('')
      });
      this.file = this.state.file;
      this.state = '';
      this.candidateService.storeState(this.state);
    } else {
      this.candidateForm = new FormGroup({
        fName: new FormControl(''),
        lName: new FormControl(''),
        email: new FormControl(''),
        phoneNo: new FormControl(''),
        skills: new FormControl([]),
        cCtc: new FormControl(''),
        eCtc: new FormControl('')
      });
    }
  }

  checkView() {
    if (Boolean(this.candidateService.getState())) {
      this.splittedView = true;
    } else if (Boolean(this.candidateService.getState())) {
      this.splittedView = false;
    }
  }

  onFileChange(event) {
    this.file = event.target.files[0];
  }

  uploadFileToAws() {
    this.candidateService.uploadtoAws(this.file).subscribe((res) => {
      console.log('res is after promise=>', res);
      this.showLoader = false;
      this.router.navigate(['']);
    });
  }

  onSubmit() {
    this.showLoader = true;
    const data = this.candidateForm.value;
    console.log('data is', data);
    this.candidateService.saveCandidateInfo(data).subscribe((res) => {
      this.uploadFileToAws();
      console.log('res is', res);
    });
  }

}
