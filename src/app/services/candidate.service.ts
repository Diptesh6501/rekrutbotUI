import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  baseUrl = environment.apiUrl;
  candidateId: any;
  state: any;
  constructor(
    private http: HttpClient
  ) { }
  saveCandidateInfo(data) {
    return this.http.post(`${this.baseUrl}saveCandidateInfo`, data);
  }

  uploadtoAws(file) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.baseUrl}uploadAws`, formData);
  }

  getAllCandidate() {
    return this.http.get(`${this.baseUrl}getAllCandidates`);
  }

  getCandidateById(id) {
    return this.http.get(`${this.baseUrl}getAllCandidates?id=${id}`);
  }

  downloadFile(file) {
    return this.http.get(`${this.baseUrl}download/${file}`, {responseType: 'blob'});
  }

  updateCandidate(candidate) {
   return this.http.put(`${this.baseUrl}updateCandidate`, candidate);
  }

  deleteCandidate(candidate) {
     return this.http.delete(`${this.baseUrl}deleteCandidate/${candidate.candidateId}/${candidate.filename}`, candidate);
  }

  async setCandidateId(id) {
    this.candidateId = id;
  }
  async getCandidateId() {
    return this.candidateId;
  }

  async storeState(state) {
    this.state = state;
  }

  getState() {
    return this.state;
  }

  isEmptyObject(obj) {
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      } else {
        return true;
      }
    }
  }

  parseResume(file) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.baseUrl}parseResume`, formData);
  }

  getSearchResults(search) {
    console.log('search in service', search);
    return this.http.post(`${this.baseUrl}searchCandidates`, search);
  }
}
