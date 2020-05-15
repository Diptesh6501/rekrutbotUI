import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/services/candidate.service';
import { Router, NavigationExtras } from '@angular/router';
import { standardizeConfig } from '@angular/router/src/config';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  candidates: any;
  searchResult: any;
  showSearch: Boolean;
  search: any;
  showLoader: Boolean;
  file: any;
  constructor(
    private candidateService: CandidateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCandidates();
  }

  getCandidates() {
    this.candidateService.getAllCandidate().subscribe((res) => {
      this.candidates = res['candidates'];
      this.showSearch = false;

    });
  }

  goBackToHome() {
    this.showSearch = false;
    this.search = '';
  }

  getSearch() {
    const query = { searchText: this.search };
    console.log(this.search);
    console.log(this.search.length);
    if (this.search.length >= 3) {
      this.candidateService.getSearchResults(query).subscribe((res) => {
        console.log('res of search', res);
        this.showSearch = true;
        this.searchResult = res['candidateDetail'];
      });
    }

  }

  async parseResume(file) {
    const state = {};
    this.showLoader = true;
    this.candidateService.parseResume(file).subscribe(async (res) => {
      this.showLoader = false;
      const data = JSON.parse(res['parsedResumeInformation']);
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

  async viewCandidateDetails(id) {
    await this.candidateService.setCandidateId(id);
    this.router.navigate(['/candidateDetails']);

  }
}
