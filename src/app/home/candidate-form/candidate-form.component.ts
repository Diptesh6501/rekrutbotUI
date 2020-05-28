import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { CandidateService } from 'src/app/services/candidate.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {environment} from '../../../environments/environment';

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
  pdfUrl = environment.apiUrl + 'pdf';
  safePdfUrl: any;
  constructor(
    private http: HttpClient,
    private candidateService: CandidateService,
    private router: Router,
    public sanitizer: DomSanitizer
  ) {
    this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl);

  }

  ngOnInit() {
    this.checkView();
    this.state = this.candidateService.getState();
    if (this.state) {
      this.candidateForm = new FormGroup({
        fName: new FormControl(this.state.name),
        lName: new FormControl(''),
        email: new FormControl(this.state.email),
        phoneNo: new FormControl(this.state.phoneNumber),
        skills: new FormControl(this.state.skills),
        currentLocation: new FormControl(''),
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
        currentLocation: new FormControl(''),
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
      this.showLoader = false;
      this.router.navigate(['']);
    });
  }

  onSubmit() {
    this.showLoader = true;
    const data = this.candidateForm.value;
    this.candidateService.saveCandidateInfo(data).subscribe((res) => {
      this.uploadFileToAws();
    });
  }

}
