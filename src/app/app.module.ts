import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItineraryComponent } from './components/itinerary/itinerary.component';
import { HttpClientModule } from '@angular/common/http';
import { FlightDetailsComponent } from './components/itinerary/flight-details/flight-details.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { HotelDetailsComponent } from './components/itinerary/hotel-details/hotel-details.component';
import { CarDetailsComponent } from './components/itinerary/car-details/car-details.component';
import { HelperService } from './services/helper.service';
import { TestCardComponent } from './components/itinerary/test-card/test-card.component';
import { EventsDetailsComponent } from './components/itinerary/events-details/events-details.component';


@NgModule({
  declarations: [
    AppComponent,
    ItineraryComponent,
    FlightDetailsComponent,
    HotelDetailsComponent,
    CarDetailsComponent,
    TestCardComponent,
    EventsDetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [HelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
