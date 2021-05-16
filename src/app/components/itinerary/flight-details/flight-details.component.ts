import { Component, OnInit, Input } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit {
  @Input() data;
  @Input () title;
  flightOutputData = {
    segmentDetails: [],
    price: ''
  };

  constructor(private helperService: HelperService) { }

  ngOnInit() {
    this.getOutFlightData();
    console.log(this.data);
    // this.getFlightData();
  }
  getOutFlightData() {
    const segobj = {
      seg: '',
      time: ''
    }
    for(const flight of this.data.flightSegment) {
      const segObject = JSON.parse(JSON.stringify(segobj));
      segObject.seg = flight.departure.iataCode + ' - ' + flight.arrival.iataCode;
      const arrivalDate = new Date(flight.arrival.at);
      const departuredate = new Date(flight.departure.at);
      segObject.time = departuredate.getHours() + ':' + departuredate.getMinutes() + '-' +
      arrivalDate.getHours() + ':' + arrivalDate.getMinutes();
      this.flightOutputData.segmentDetails.push(segObject);
    }
    this.flightOutputData.price = this.data.price;
  }
  // getFlightData() {
  //   const flightApiUrl = this.helperService.getFlightAPIUrl(this.flightInputData);
  //   this.helperService.callAPI(flightApiUrl).subscribe((response) => {
  //     const airFlightsList = this.getAirFLights(response);
  //   });
  // }
  // getAirFLights(response) {
  //   const airFlightsList = [];
  //   const airFlightObj = {
  //     segments: [],
  //     price: ''
  //   };
  //   const airData = response.data;
  //   for (const air of airData) {
  //     const offerItems = air.offerItems;
  //     for (const offerItem of offerItems) {
  //       const airFlightObject = JSON.parse(JSON.stringify(airFlightObj));
  //       const services = offerItem.services;
  //       for (const service of services) {
  //         const segments = service.segments;
  //         segments.forEach((segment, index) => {
  //           const departure = segment.flightSegment.departure.iataCode;
  //           const arrival = segment.flightSegment.arrival.iataCode;
  //           const segmentName = departure + '-' + arrival;
  //           airFlightObject.segments.push(segmentName);
  //         });
  //       }
  //       airFlightObject.price = offerItem.price.total;
  //       airFlightsList.push(airFlightObject);
  //     }
  //   }
  //   // console.log(airFlightsList);
  //   airFlightsList.sort(this.helperService.compareFlightsPrice);
  //   // console.log(airFlightsList);
  //   return airFlightsList;
  // }

}
