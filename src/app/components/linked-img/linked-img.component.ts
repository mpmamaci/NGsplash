import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-linked-img',
  templateUrl: './linked-img.component.html',
  styleUrls: ['./linked-img.component.css'],
})
export class LinkedImgComponent implements OnInit {
  @Input('imageUrl')
  imageUrl: string = '';

  @Input('href')
  href: string = '';

  @Input('imageId')
  imageId: string = '';

  ngOnInit(): void {
    if (this.href == '' && this.imageId != '') {
      this.href = `details/${this.imageId}`;
    }
  }
}
