import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { createApi } from 'unsplash-js';
import { ApiResponse } from 'unsplash-js/dist/helpers/response';
import { Random, Full } from 'unsplash-js/dist/methods/photos/types';
import { Photos } from 'unsplash-js/dist/methods/search/types/response';
import demoImgResponseJson from '../../assets/demo-image-response.json';

@Injectable({
  providedIn: 'root',
})
export class UnsplashService {
  /**
   * Creates the unplash api.
   */
  private api = createApi({
    accessKey: environment.unsplashAccessKey,
  });

  /**
   * Boolean Value idicates that the application runs in demo mode.
   * Demo modes run without unsplash and return one static photo from a JSON file.
   */
  public demoMode: boolean;

  constructor() {
    this.demoMode = environment.unsplashAccessKey == '';
    if (this.demoMode) {
      // Unsafe Method - better safe your AccessKey in environments.ts file
      const unsplashAccessKey = sessionStorage.getItem('unsplashAccessKey');
      if (unsplashAccessKey != null) {
        this.exitDemoMode(unsplashAccessKey);
      }
    }
  }

  /**
   * Sends a query request with the given string to the unsplash server
   * @param searchString search phrase
   * @param quantity maximum number of images
   * @returns list of images matching the phrase
   */
  public async query(searchString: string, quantity: number): Promise<Image[]> {
    debugger;
    const demoImage = this.getDemoImage({ max: quantity }) as
      | Image[]
      | undefined;
    if (demoImage != undefined) {
      return demoImage;
    }

    const response: ApiResponse<Photos> = await this.api.search.getPhotos({
      query: searchString,
      page: 1,
      perPage: quantity,
      orderBy: 'relevant',
    });

    if (response.response?.results == undefined) {
      throw new Error('Invalid Response: cannot find id with the given id.');
    }
    return response.response?.results as Image[];
  }

  /**
   * Request a photo by unsplash id.
   * @param id photo id
   * @returns image
   */
  public async byPhotoId(id: string): Promise<Image> {
    const demoImage = this.getDemoImage({ id }) as Image | undefined;
    if (demoImage != undefined) {
      return demoImage;
    }

    const response: ApiResponse<Full> = await this.api.photos.get({
      photoId: id,
    });

    if (response.response == undefined) {
      throw new Error('Invalid Response: cannot find id with the given id.');
    }
    return response.response;
  }

  /**
   * Request a random image.
   * @returns random image
   */
  public async randomImage(): Promise<Image> {
    const demoImage = this.getDemoImage() as Image | undefined;
    if (demoImage != undefined) {
      return demoImage;
    }

    const apiResponse: ApiResponse<Random | Random[]> =
      await this.api.photos.getRandom({
        count: 1,
      });
    const response: Random | Random[] | undefined = apiResponse.response;

    let random: Random;
    if (Array.isArray(response) && response.length > 0) {
      random = response[0];
    } else if (response != undefined) {
      random = response as Random;
    } else {
      throw new Error(
        'Invalid Response: the unsplash server response without any image data.'
      );
    }

    return random;
  }

  private getDemoImage(options?: {
    max?: number;
    id?: string;
  }): Image[] | Image | undefined {
    if (this.demoMode) {
      console.info(
        'You are running in demo mode, so the same image is returned'
      );
      const response = demoImgResponseJson as any[];
      if (options?.max != undefined && options.max <= response.length) {
        return response.slice(0, options.max);
      }
      if (options?.id != undefined) {
        return response.find((r) => r.id == options?.id);
      }
      return response[0];
    }
    return;
  }

  public exitDemoMode(unsplashAccessKey: string) {
    debugger;
    this.api = createApi({
      accessKey: unsplashAccessKey,
    });
    this.demoMode = false;
    sessionStorage.setItem('unsplashAccessKey', unsplashAccessKey);
  }
}

export type Image = Full | Random;
