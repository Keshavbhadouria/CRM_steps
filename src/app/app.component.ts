import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from './core/services/auth.service';
import { filter } from 'rxjs/operators';
import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  /**
   *
   */
  constructor(private _authService: AuthenticationService, private _router: Router , private languageService: LanguageService) {
    this.languageService.setLanguage('en');
  }
  ngOnInit() {
    // document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe((event: any) => {
        if (this._authService.isUserLoggedIn()) {
          if (event.url.toString() == "/") {
            this._router.navigate(['/dashboard']);
          }
        }
        else if (event.url.toString() == '/account/signup'){
          this._router.navigate(['/account/signup']);
        }        
        else if (event.url.toString() == '/account/login'){
          this._router.navigate(['/account/login']);
        }  
        // else if (event.url.toString() == '/account/login-2'){
        //   this._router.navigate(['/account/login-2']);
        // }  
        else {
          this._router.navigate(['/account/home']);
        }
        // else {
        //   this._router.navigate(['/account/login-2']);
        // }

        
        
      });
  }
}
