import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, ReplaySubject, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  iternaryData = [];
  isSearched = new ReplaySubject(1);
  private airDataURL = 'https://localhost/api/oneclick/flightsearch?';
  private hotelDataUrl = 'https://localhost/api/oneclick/hotelsearch?';
  private eventsDataUrl = 'https://localhost/api/oneclick/events?';
  private cabsDataUrl = 'https://localhost/api/oneclick/cabs?';

  constructor(private http: HttpClient) { }

  getIternaryData(searchedData: any) {
    const startAirDataReq = this.getAirData(searchedData, true);
    const endAirDataReq = this.getAirData(searchedData);
    const hotelDataReq = this.getHotelData(searchedData);
    const eventsdataReq = this.getEventsData(searchedData);
    const cabsDataReq = this.getCabsData(searchedData);
    forkJoin([startAirDataReq, endAirDataReq, hotelDataReq, eventsdataReq, cabsDataReq]).subscribe(completeReseult => {
      console.log(completeReseult);
      const hotelData = completeReseult[2]
      let hotelDataWithPrice = this.getHotelDataWithPrice(completeReseult[2]);
      hotelDataWithPrice.sort(this.compareHOtelPrices);
      const tempResult = completeReseult[2];
      // tempResult.data = hotelDataWithPrice;
      this.iternaryData = this.converToIternaryFormat(completeReseult);
      this.isSearched.next(true);
    });
    // this.getAirData(searchedData).subscribe(data => console.log(data));
  }

  getHotelDataWithPrice(data) {
    const updatedHoteldata = [];
    for(const ele of data.data) {
      ele.price = Math.floor(this.randomNum(80, 100));
      updatedHoteldata.push(ele);
    }
    return updatedHoteldata;
  }
  randomNum(a,b) {
    return a + (b - a + 1) * crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32 | 0;

  }
  compareHOtelPrices(a,b) {
    const genreA = a.price.toUpperCase();
    const genreB = b.price.toUpperCase();
    let comparison = 0;
    if (genreA - genreB > 0) {
      comparison = 1;
    } else if (genreA - genreB < 0) {
      comparison = -1;
    }
    return comparison;
  }
  getAirData(searchedData, isForStart = false) {
    let url = this.airDataURL;
    if (isForStart) {
      // url = './assets/json/outAir.json';
      url += `origin=${searchedData.origin}&destination=${searchedData.destination}&departureDate=${searchedData.startDate}&max=10&adults=${searchedData.numbOfPassenger}`;
    } else {
      // url = './assets/json/inAir.json';
      url += `origin=${searchedData.destination}&destination=${searchedData.origin}&departureDate=${searchedData.endDate}&max=10&adults=${searchedData.numbOfPassenger}`;
    }
    return this.http.get(url);
  }
  getEventsData(searchedData) {
    let url = this.eventsDataUrl;
    url += `departure=${searchedData.startDate}&destination=${searchedData.destination.toLowerCase()}`;
    return this.http.get(url);
  }
  getCabsData(searchedData){
    let url = this.cabsDataUrl;
    url+= `source=${searchedData.origin.toLowerCase()}&destination=${searchedData.destination.toLowerCase()}`;
    return this.http.get(url);

  }
  getHotelData(searchedData) {
    let url = this.hotelDataUrl;
    url += `cityCode=${searchedData.destination}`;
    // return this.http.get('./assets/json/hotel.json');
    return this.http.get(url);
  }

  converToIternaryFormat(completeData) {
    const modifiedData = [];
    const startAirData = this.normalize(completeData[0].data);
    const endAirData = completeData[1] ? completeData[1].data : [];
    const hotelData = completeData[2] ? completeData[2].data : [];
    const eventsData = completeData[3] ? completeData[3]: [];
    const cabsData = completeData[4] ? completeData[4]: [];
    
    const test = [];
    startAirData.forEach(airData => {
      const modifiedDataObject = {};
      modifiedDataObject['id'] = Math.random() * 99999 * 9999;
      const offerItems = this.normalize(airData.offerItems);
      offerItems.forEach(offer => {
        const testObj = {};
        const price = offer.price.total;
        testObj['price'] = price;
        const services = this.normalize(offer.services);
        services.forEach(service => {
          const segments = this.normalize(service.segments);
          const flightSegment = [];
          segments.forEach(segment => {
            flightSegment.push(segment.flightSegment);
          });
          testObj['flightSegment'] = flightSegment;
        });
        modifiedDataObject['outAir'] = testObj;
      });
      modifiedData.push(modifiedDataObject);
    });
    endAirData.forEach((airData, index) => {
      const offerItems = this.normalize(airData.offerItems);
      offerItems.forEach(offer => {
        const testObj = {};
        const price = offer.price.total;
        testObj['price'] = price;
        const services = this.normalize(offer.services);
        services.forEach(service => {
          const segments = this.normalize(service.segments);
          const flightSegment = [];
          segments.forEach(segment => {
            flightSegment.push(segment.flightSegment);
          });
          testObj['flightSegment'] = flightSegment;
        });
        modifiedData[index]['inAir'] = testObj;
      });
    });
    let count = 0;
    modifiedData.forEach((data, index) => {
      if (count < hotelData.length) {
        data['hotel'] = hotelData[count];
        count++;
      } else {
        count = 0;
        data['hotel'] = hotelData[count];
        count++;
      }
    });
    let eventsCount = 0;
    modifiedData.forEach((data, index) => {
      if (eventsCount < eventsData.length) {
        data['events'] = eventsData[eventsCount];
        eventsCount++;
      } else {
        eventsCount = 0;
        data['events'] = eventsData[eventsCount];
        eventsCount++;
      }
    })
    let cabCount = 0;
    modifiedData.forEach((data, index) => {
      if (cabCount < cabsData.length) {
        data['cabs'] = cabsData[cabCount];
        cabCount++;
      } else {
        cabCount = 0;
        data['cabs'] = cabsData[cabCount];
        cabCount++;
      }
    })
    const finalArray = [];
    modifiedData.forEach(data => {
      const finalObj = {
        id: data.id
      }
      const iternaryArray = [];
      if (data.cabs) {
        const iternaryObj = {};
        iternaryObj['type'] = 'cabs';
        iternaryObj['item'] = data.cabs;
        iternaryArray.push(iternaryObj);
      }
      if (data.outAir) {
        const iternaryObj = {};
        iternaryObj['type'] = 'outAir';
        iternaryObj['item'] = data.outAir;
        iternaryArray.push(iternaryObj);
      }
      if (data.inAir) {
        const iternaryObj = {};
        iternaryObj['type'] = 'inAir';
        iternaryObj['item'] = data.inAir;
        iternaryArray.push(iternaryObj);
      }
      if (data.hotel) {
        const iternaryObj = {};
        iternaryObj['type'] = 'hotel';
        iternaryObj['item'] = data.hotel;
        iternaryArray.push(iternaryObj);
      }
      if(data.events) {
        const iternaryObj = {};
        iternaryObj['type'] = 'events';
        iternaryObj['item'] = data.events;
        iternaryArray.push(iternaryObj);
      }

      finalObj['iternary'] = iternaryArray;
      finalObj['deletedItems'] = [];
      finalArray.push(finalObj);
    });

    return finalArray;
  }

  private normalize(value): any {
    return Array.isArray(value) ? value : [value];
  }

}
