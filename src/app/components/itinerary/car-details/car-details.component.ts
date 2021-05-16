import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  @Input() data;
  constructor() { }

  ngOnInit() {
    console.log(this.data);
  }

}
