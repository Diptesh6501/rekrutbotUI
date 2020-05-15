import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() fileChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onFileChange(event) {
    this.fileChange.emit(event.target.files[0]);
  }

}
