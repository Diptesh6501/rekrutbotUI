import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/services/candidate.service';
import * as AWS from 'aws-sdk';

declare var TextDecoder: any;
@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.scss']
})
export class CandidateDetailsComponent implements OnInit {
  candidateId: any;
  candidateDetails: any;
  pdfData: any;
  constructor(
    private candidateService: CandidateService
  ) { }

  ngOnInit() {
    this.init();
  }

  async init() {
    this.candidateId = await this.candidateService.getCandidateId();
    console.log('candidateId', this.candidateId);
    await this.candidateById();

  }

  async candidateById() {
    this.candidateService.getCandidateById(this.candidateId).subscribe(async (data) => {
      this.candidateDetails = data['candidates'][1];
      console.log('candidate detals', this.candidateDetails);
      // await this.getPdfFromAws();
    });
  }

  // async getPdfFromAws() {
  //   AWS.config.credentials = new AWS.Credentials({
  //     accessKeyId: 'AKIAJAHCMTAEUPCMNBLQ',
  //     secretAccessKey: '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'
  //   });

  //   const params = {
  //     Bucket: 'candidate-video-hr',
  //     Key: this.candidateDetails.url
  //   };

  //   const s3 = new AWS.S3();

  //   s3.getObject(params, function (err, data) {
  //     if (err) {
  //       console.error(err); // an error occurred
  //     } else {
  //       console.log('data is', data);
  //       // this.pdfData = new TextDecoder('utf-8').decode(data.Body);
  //       this.pdfData = data.Body.toString();
  //       // return data.Body;
  //       const strData = toReadableStream(this.pdfData).toString();
  //       console.log('strData', strData);
  //     }
  //   });
  // }

}

