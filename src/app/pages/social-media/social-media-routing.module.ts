import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocialMediaCredentialsComponent } from './social-media-credentials/social-media-credentials.component';
import { SocialMediaDataComponent } from './social-media-data/social-media-data.component';

const routes: Routes = [
  {
    path: 'stats',
    component: SocialMediaDataComponent
  },
  {
    path: 'smcredentials',
    component: SocialMediaCredentialsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialMediaRoutingModule { }
