import { ComponentFactoryResolver, Directive, Injector, Input, OnChanges, SimpleChanges, ViewContainerRef } from '@angular/core';
import { NgxSpinnerService, NgxSpinnerComponent } from 'ngx-spinner';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[busyIf]'
})
export class BusyIfDirective implements OnChanges {

  constructor(
    private _viewContainer: ViewContainerRef,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _injector: Injector
  ) {
    this.ngxSpinnerService = _injector.get(NgxSpinnerService);
    this.loadComponent();
  }

  private static index = 0;
  @Input() busyIf: boolean = false;

  ngxSpinnerService: NgxSpinnerService;
  private spinnerName = '';

  isBusy = false;
  refreshState(): void {
    if (this.isBusy === undefined || this.spinnerName === '') {
      return;
    }

    setTimeout(() => {
      if (this.isBusy) {
        this.ngxSpinnerService.show(this.spinnerName);
      } else {
        this.ngxSpinnerService.hide(this.spinnerName);
      }
    }, 100);
  }

  loadComponent() {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(NgxSpinnerComponent);
    const componentRef = this._viewContainer.createComponent(componentFactory);
    this.spinnerName = 'busyIfSpinner-' + (BusyIfDirective.index++) + '-' + Math.floor(Math.random() * 10); // generate random name
    const component = (<NgxSpinnerComponent>componentRef.instance);
    component.name = this.spinnerName;
    component.fullScreen = false;

    // component.type = 'ball-clip-rotate';
    component.template = "<img width='200' height='150' src='../../../assets/CRMSteps/CRMLoader.gif' />";
    component.size = 'medium';
    component.color = '#5ba7ea';

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['busyIf']) {
      this.isBusy = changes['busyIf'].currentValue;
      this.refreshState();
    }
  }
}
