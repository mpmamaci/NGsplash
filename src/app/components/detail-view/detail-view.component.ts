import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnsplashService } from 'src/app/services/unsplash.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css'],
})
export class DetailViewComponent implements OnInit {
  imageHref: string = '';
  imageUrl: string = '';
  infos: Info[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly unsplashService: UnsplashService
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id') as string;

    const image = await this.unsplashService.byPhotoId(id);
    console.log(image);
    if (image?.urls.full != undefined) {
      this.imageHref = image?.urls.full;
    }
    if (image?.urls.small != undefined) {
      this.imageUrl = image?.urls.small;
    }

    this.infos.push({
      name: 'ID',
      information: image?.id.toString()!,
      isUrl: false,
    });

    if (image.description != null) {
      this.infos.push({
        name: 'Description',
        information: image.description,
        isUrl: false,
      });
    }

    this.infos.push({
      name: 'Username',
      information: image.user.username,
      isUrl: false,
    });
    if (image.user.portfolio_url != null) {
      this.infos.push({
        name: 'Portfolio',
        information: image.user.portfolio_url,
        isUrl: true,
      });
    }

    this.infos.push({
      name: 'Likes',
      information: image.likes.toString()!,
      isUrl: false,
    });

    if (image.promoted_at != null) {
      this.infos.push({
        name: 'Promoted At',
        information: image.promoted_at.toString()!,
        isUrl: false,
      });
    }
  }

  isDemoMode(): boolean {
    return this.unsplashService.demoMode;
  }
}

export interface Info {
  name: string;
  information: string;
  isUrl: boolean;
}
