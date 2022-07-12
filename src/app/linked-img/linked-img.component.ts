import { Component } from '@angular/core';

@Component({
  selector: 'app-linked-img',
  templateUrl: './linked-img.component.html',
  styleUrls: ['./linked-img.component.css'],
})
export class LinkedImgComponent {
  imageUrl: string = '';
  imageUrlSmall: string = '';

  changeValue(urlSmall: string, url: string) {
    this.imageUrl = url;
    this.imageUrlSmall = urlSmall;
  }
}
