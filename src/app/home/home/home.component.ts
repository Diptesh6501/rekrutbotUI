import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/services/candidate.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  candidates: any;
  searchResult: any;
  candidatesAvailable = true;
  showSearch: Boolean;
  search: any;
  quickViewUrl = environment.apiUrl;
  safeQuickViewUrl: any;
  showLoader: Boolean;
  file: any;
  constructor(
    private candidateService: CandidateService,
    private router: Router,
    public sanitizer: DomSanitizer
  ) {
    this.getCandidates();
  }

  ngOnInit() {
    this.candidateService.storeState({});
    this.safeQuickViewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.quickViewUrl);
  }

  getCandidates() {
    this.showLoader = true;
    this.candidateService.getAllCandidate().subscribe((res) => {
      this.candidates = res['candidates'];
      if (this.candidates && this.candidates.length) {
        this.showSearch = false;
        this.candidatesAvailable = true;
        this.showLoader = false;
      } else {
        this.candidatesAvailable = false;
        this.showLoader = false;
        this.showSearch = false;
      }
    });
  }

  goBackToHome() {
    this.showSearch = false;
    this.search = '';
  }

  viewResume(filename) {
    console.log(filename);
    const url = `${this.quickViewUrl}viewFile?fileName=${filename}`;
    console.log('url is', url);
    window.open(url, '_blank');
  }

  getSearch() {
    const query = { searchText: this.search };
    if (this.search.length >= 3) {
      this.candidateService.getSearchResults(query).subscribe((res) => {
        this.showSearch = true;
        this.searchResult = res['candidateDetail'];
      });
    }

  }

  async updateCandidate(candidate) {
    console.log('candidate is', candidate);
    this.showLoader = true;
    const state = {};
    state['isUpdate'] = true;
    state['candidateId'] = candidate.candidateId;
    state['fName'] = candidate.fName;
    state['lName'] = candidate.lName;
    state['email'] = candidate.email;
    state['phoneNo'] = candidate.phoneNo;
    state['skills'] = candidate.skills;
    state['currentLocation'] = candidate.currentLocation;
    state['filename'] = candidate.filename;
    state['cCtc'] = candidate.cCtc;
    state['eCtc'] = candidate.eCtc;
    await this.candidateService.storeState(state);
    this.showLoader = false;
    await this.router.navigate(['candidateForm']);
  }

  async parseResume(file) {
    const state = {};
    this.showLoader = true;
    this.candidateService.parseResume(file).subscribe(async (res) => {
      this.showLoader = false;
      const data = JSON.parse(res['parsedResumeInformation']);
      state['isUpdate'] = false;
      state['name'] = data.name;
      state['email'] = data.email;
      state['phoneNumber'] = data.phoneNumber;
      state['skills'] = data.skills;
      state['file'] = file;
      await this.candidateService.storeState(state);
      this.showLoader = false;
      await this.router.navigate(['candidateForm']);
    });

  }

  getFiles(event) {
    this.file = event;
    this.parseResume(this.file);
    this.file = '';
  }

  downloadFile(file) {
    this.candidateService.downloadFile(file).subscribe((res) => {
      saveAs(res, file);
    });
  }

  deleteCandidate(candidateId, filename) {
    this.showLoader = true;
    const data = {
      candidateId: candidateId,
      filename: filename
    };
    this.candidateService.deleteCandidate(data).subscribe((res) => {
      if (res['deleted'] === 'sucessfully') {
        this.candidates.forEach((item, index) => {
          if (item.candidateId === candidateId) {
            this.candidates.splice(index, 1);
            this.showLoader = false;
          }
        });
      } else {
        this.showLoader = false;
        alert('Some problem occoured , please contact administrator');
      }
    });
  }

  async viewCandidateDetails(id) {
    await this.candidateService.setCandidateId(id);
    this.router.navigate(['/candidateDetails']);

  }
}
