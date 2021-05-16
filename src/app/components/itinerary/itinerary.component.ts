import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss']
})
export class ItineraryComponent implements OnInit {
  itineraryList = [];
  recomendedItem;
  inboundTitle = "Inbound Air Info";
  outboundTitle = "Outbound Air Info";
  constructor(private helperService: HelperService, private cdr: ChangeDetectorRef) {
    this.helperService.isSearched.subscribe(value => {
      if (value) {
        this.recomendedItem = this.helperService.iternaryData[0];
        this.itineraryList = this.helperService.iternaryData.filter((item, index) => index > 0);
      }
    });
  }

  ngOnInit() {

  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      const position = Math.floor(Number(event.container.id.substr(event.container.id.lastIndexOf('-') + 1, event.container.id.length)) / 3);
      const tempArray = [];
      for (let iternaryInst of this.itineraryList[position].iternary) {
        let tempObj = {
          type: iternaryInst.type,
          item: iternaryInst.item
        };
        if (iternaryInst.type === event.previousContainer.data['type']) {
          tempObj.item = event.previousContainer.data['item'];
          
          this.itineraryList[position].deletedItems.push(iternaryInst);
        }
        tempArray.push(tempObj);
      }
      this.itineraryList[position].iternary = tempArray;

      const tempIteList = this.itineraryList;
      this.itineraryList = [];
      this.cdr.detectChanges();
      this.itineraryList = tempIteList;
      this.cdr.detectChanges();
    }
  }
  goToCheckout() {
    
  }
}