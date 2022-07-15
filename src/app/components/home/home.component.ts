import { Component } from '@angular/core';
import { Image, UnsplashService } from 'src/app/services/unsplash.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  images: Image[] = [];

  constructor(private readonly unsplashService: UnsplashService) {}

  async handleSearchClick(
    searchInput: HTMLInputElement,
    quantity: HTMLInputElement
  ) {
    this.images = [];
    const inputValue = searchInput.value;
    const quantityValue: number = Number.parseInt(quantity.value);
    let image: Image;
    if (inputValue.toUpperCase() === 'RANDOM') {
      image = await this.unsplashService.randomImage();
      this.images.push(image);
    } else {
      this.images = await this.unsplashService.query(inputValue, quantityValue);
    }
  }

  isDemoMode(): boolean {
    return this.unsplashService.demoMode;
  }

  exitDemoMode(unsplashAccessKey: string): void {
    this.unsplashService.exitDemoMode(unsplashAccessKey);
  }
}
