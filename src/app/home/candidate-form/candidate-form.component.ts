import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { CandidateService } from 'src/app/services/candidate.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

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
  updatePdfUrl: any;
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
    this.state = this.candidateService.getState();
    if (this.state !== undefined && !Boolean(this.state['isUpdate']) && !Boolean(Object.keys(this.state).length === 0)) {
      this.splittedView = true;
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
      this.candidateService.storeState({});
    } else if (this.state !== undefined && Boolean(this.state['isUpdate']) && !Boolean(Object.keys(this.state).length === 0)) {
      this.updatePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(environment.apiUrl + 'viewFile/' + '?fileName='
        + this.state.filename);
      this.splittedView = true;
      this.candidateForm = new FormGroup({
        fName: new FormControl(this.state.fName),
        lName: new FormControl(this.state.lName),
        email: new FormControl(this.state.email),
        phoneNo: new FormControl(this.state.phoneNo),
        skills: new FormControl(this.state.skills),
        currentLocation: new FormControl(this.state.currentLocation),
        cCtc: new FormControl(this.state.cCtc),
        eCtc: new FormControl(this.state.eCtc)
      });
      this.candidateService.storeState({});
    } else if (this.state === undefined || Object.keys(this.state).length === 0) {
      this.splittedView = false;
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
      this.candidateService.storeState({});
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
    if (this.state === undefined || !this.state['isUpdate']) {
      const data = this.candidateForm.value;
      this.candidateService.saveCandidateInfo(data).subscribe((res) => {
        this.uploadFileToAws();
      });
    } else if (Boolean(this.state['isUpdate'])) {
      this.showLoader = false;
      this.candidateForm.addControl('candidateId', new FormControl(this.state.candidateId));
      this.candidateService.updateCandidate(this.candidateForm.value).subscribe((res) => {
        if (Boolean(res['updated'])) {
          this.router.navigate(['/']);
        } else {
           alert('something went wrong please contact administrator!!!');
        }
      });
    }
  }

}
