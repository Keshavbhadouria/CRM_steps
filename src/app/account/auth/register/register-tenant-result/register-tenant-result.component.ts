import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterTenantOutput } from 'src/app/core/models/Admin/RegisterTenantOutput';
import { TenantRegistrationHelperService } from 'src/app/core/services/tenant-registration-helper.service';

@Component({
  selector: 'app-register-tenant-result',
  templateUrl: './register-tenant-result.component.html',
  styleUrls: ['./register-tenant-result.component.scss']
})
export class RegisterTenantResultComponent implements OnInit {

  model: RegisterTenantOutput = new RegisterTenantOutput();
  tenantUrl: string;

  saving = false;

  constructor(
      private _router: Router,
      private _tenantRegistrationHelper: TenantRegistrationHelperService
  ) {
  }

  ngOnInit() {
      if (!this._tenantRegistrationHelper.registrationResult) {
          this._router.navigate(['/account/login']);
          return;
      }
      this.model = this._tenantRegistrationHelper.registrationResult;
      this._router.navigate(['/account/login']);
  }
}
