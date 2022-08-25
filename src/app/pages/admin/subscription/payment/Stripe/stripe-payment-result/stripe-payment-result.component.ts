import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { StripePaymentService } from 'src/app/core/services/stripe-payment.service';

@Component({
  selector: 'app-stripe-payment-result',
  templateUrl: './stripe-payment-result.component.html',
  styleUrls: ['./stripe-payment-result.component.scss']
})
export class StripePaymentResultComponent implements OnInit {

  constructor(
    private _stripePaymentService: StripePaymentService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _authService: AuthenticationService) {
  }
  sessionId: string;
  paymentId: number;

  controlTimeout = 1000 * 5;
  maxControlCount = 5;

  ngOnInit() {
    this.sessionId = this._activatedRoute.snapshot.queryParams['sessionId'];
    this._stripePaymentService.getPayment(this.sessionId)
      .subscribe((res : any) => {
        let payment = res.result;
        if (parseInt(this._authService.getTenantId()) !== payment.tenantId) {
          this._router.navigate(['']);
        }
        this.paymentId = payment.id;
        this.getPaymentResult();
      });
  }

  getPaymentResult(): void {
    this._stripePaymentService.getPaymentResult(this.paymentId).subscribe(
      (res : any) => {
        let paymentResult = res.result;
        if (paymentResult.paymentDone) {
          this._router.navigate(['admin/payment-completed']);
        } else {
          this.controlAgain();
        }
      },
      err => {
        this.controlAgain();
      }
    );
  }

  controlAgain() {
    if (this.maxControlCount === 0) {
      return;
    }

    setTimeout(() => {
            this.getPaymentResult();
        }, this.controlTimeout);
    this.controlTimeout *= 2;
    this.maxControlCount--;
  }
}
