import { Component, OnInit } from '@angular/core';
import { SocialMediaService } from 'src/app/core/services/social-media.service';


interface ISocialMedia {
  value: number,
  text: string
}

@Component({
  selector: 'app-social-media-data',
  templateUrl: './social-media-data.component.html',
  styleUrls: ['./social-media-data.component.scss']
})
export class SocialMediaDataComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  YoutubeData: any = [];
  FacebookData: any = [];
  InstagramData: any = [];
  isLoading = false;

  public socialmedias: Array<ISocialMedia> = [{ value: 1, text: 'YouTube' }, { value: 2, text: 'FaceBook' }, { value: 3, text: 'Instagram' }, { value: 4, text: 'LinkedIn' }];
  public SocialMediaId: number = 1;
  public SelectedSocialMediaId: number = 1;

  constructor(private _socialMediaService: SocialMediaService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'SocialMedia' }, { label: 'Stats', active: true }];
  }


  GetData() {
    this.SelectedSocialMediaId = this.SocialMediaId;
    if (this.SocialMediaId == 1)
      this.getYoutubeData();
    else if (this.SocialMediaId == 2)
      this.getFacebookData();
    else if (this.SocialMediaId == 3)
      this.getInstagramData();
  }

  getYoutubeData() {
    this.showLoader()
    this._socialMediaService.getYoutubeData().then(res => {
      this.YoutubeData = res.result;
    }).finally(() => {
      this.hideLoader()
    })
  }

  getFacebookData() {
    this.showLoader()
    this._socialMediaService.getFacebookData().then(res => {
      this.FacebookData = res.result.data;
    }).finally(() => {
      this.hideLoader()
    })
  }

  getInstagramData() {
    this.showLoader()
    this._socialMediaService.getInstagramData().then(res => {
      this.InstagramData = res.result.data;
    }).finally(() => {
      this.hideLoader()
    })
  }

  getLinkedInData() {
    this.showLoader()
    this._socialMediaService.getLinkedInData().then(res => {
    }).finally(() => {
      this.hideLoader()
    })
  }

  socialMedia(e) {
    console.log(e.target.value)
    this.SocialMediaId = e.target.value;
  }


  showLoader() {
    this.isLoading = true;
  }

  hideLoader() {
    this.isLoading = false;
  }


}
