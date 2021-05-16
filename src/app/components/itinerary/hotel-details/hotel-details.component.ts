import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit {
  @Input() data;
  hotelData = {
    distance: '',
    distanceUnit: '',
    hotelName: '',
    cityName: '',
    addressLines: '',
    postalCode: '',
    price: '',
    hotelDistance: ''
  };
  constructor() { }

  ngOnInit() {
    console.log(this.data);
    this.getHotelData();
  }
  getHotelData() {
    const hotelDistance = this.data.hotel.hotelDistance;
    this.hotelData.distance = hotelDistance.distance;
    this.hotelData.distanceUnit = hotelDistance.distanceUnit;
    this.hotelData.cityName = this.data.hotel.address.cityName;
    this.hotelData.hotelName = this.data.hotel.name;
    this.hotelData.addressLines = this.getFullAddress(this.data.hotel.address.lines);
    if (this.data.hotel.address.postalCode) {
      this.hotelData.postalCode = this.data.hotel.address.postalCode;
    }
    // this.hotelData.price = Math.floor(this.randomNum(80, 100)) + '€';
    this.hotelData.price = this.data.price;
    this.hotelData.hotelDistance = this.hotelData.distance + ' ' + this.hotelData.distanceUnit;
  }
  getFullAddress(addressLines) {
    let fullAddress = '';
    for (const addressLine of addressLines) {
      fullAddress += addressLine + '';
    }
    return fullAddress;
  }
  getRandomInt(max) {
    const price = Math.floor(Math.random() * Math.floor(max)) < 80 ? 80 : Math.floor(Math.random() * Math.floor(max));
    return price;
  }
  // randomNum((a, b) => {a + (b - a + 1) * crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32 | 0});
  randomNum(a,b) {
    return a + (b - a + 1) * crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32 | 0;

  }
}
