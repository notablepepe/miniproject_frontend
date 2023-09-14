/// <reference types="@types/google.maps" />
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @ViewChild('map') mapElement: any;
  map!: google.maps.Map

  ngAfterViewInit(): void {
    const mapProperties = {
      center: new google.maps.LatLng(1.292321038097562, 103.7765463514608),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);

    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(1.2923210380975625, 103.7765463514608),
      map: this.map,
    });
  }

}
