import { Component, OnInit } from '@angular/core';
import { HelperService } from './services/helper.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isSearched = false;

  searchFormGroup = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    origin: new FormControl(''),
    destination: new FormControl(''),
    numbOfPassenger: new FormControl('')
  });

  constructor(private helperService: HelperService) {

  }

  ngOnInit() {
  }

  searchItinerary() {
    this.isSearched = true;
    this.helperService.getIternaryData(this.searchFormGroup.getRawValue());
  }
}
