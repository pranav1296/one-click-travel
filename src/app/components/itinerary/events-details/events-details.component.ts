import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-events-details',
  templateUrl: './events-details.component.html',
  styleUrls: ['./events-details.component.css']
})
export class EventsDetailsComponent implements OnInit {
  @Input() data;
  constructor() { }

  ngOnInit() {
    console.log(this.data);
  }

}
