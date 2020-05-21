import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  info;
  constructor(private http: HttpClient) { }
  title = 'rekruitBotUi';

  // onFileChange(event) {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   console.log('file is', file);

  //   const formData: FormData = new FormData();
  //   formData.append('file', file, file.name);
  //   this.http.post('http://localhost:8080/uploadFile', formData ).subscribe((res) => {
  //     console.log(JSON.parse(res['parsedResumeInformation']));
  //     this.info = JSON.parse(res['parsedResumeInformation']);
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }
}
