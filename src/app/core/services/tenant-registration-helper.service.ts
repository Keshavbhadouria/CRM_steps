import { Injectable } from '@angular/core';
import { RegisterTenantOutput } from '../models/Admin/RegisterTenantOutput';

@Injectable({
  providedIn: 'root'
})
export class TenantRegistrationHelperService {

  registrationResult: RegisterTenantOutput;
}
