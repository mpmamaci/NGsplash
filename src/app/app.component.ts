import { Component } from '@angular/core';
import { createApi } from 'unsplash-js';
import { environment } from '../environments/environment';
import { Random } from 'unsplash-js/dist/methods/photos/types';
import { LinkedImgComponent } from './linked-img/linked-img.component';

const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: environment.unsplashAccessKey,
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ng-splash';
  constructor() {}

  async handleClick(linkedImg: LinkedImgComponent) {
    const randomPic = await api.photos.getRandom({ count: 1 });
    const response = randomPic.response;
    let random: Random;
    if (Array.isArray(response) && response.length > 0) {
      random = response[0];
    } else if (response != undefined) {
      random = response as Random;
    } else {
      throw new Error('Invalid Response');
    }
    let picUrlSmall: string = random.urls?.small;
    let picUrlFull: string = random.urls?.full;

    if (picUrlSmall && picUrlFull) {
      linkedImg.changeValue(picUrlSmall, picUrlFull);
    } else {
      throw new Error('Invalid Response');
    }
  }
}
