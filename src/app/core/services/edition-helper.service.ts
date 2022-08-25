import { Injectable } from '@angular/core';
import { EditionSelectDto } from '../models/Admin/Subscription';

@Injectable({
  providedIn: 'root'
})
export class EditionHelperService {

  constructor() { }

  isEditionFree(edition: EditionSelectDto): boolean {

    return !edition.dailyPrice && !edition.weeklyPrice && !edition.monthlyPrice && !edition.annualPrice;
  }
}
