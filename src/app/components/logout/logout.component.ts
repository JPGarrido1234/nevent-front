import { Component, OnInit } from '@angular/core';
import { CookieService, SameSite } from 'ngx-cookie-service';
import { AuthUtils } from 'src/app/utils/auth.utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {

    const origin = this.cookieService.get('x-auth-origin');
    const appName = this.cookieService.get('x-app-name');

    let cookiePath, cookieOrigin, cookieSecure, cookieSameSite, cookieExpires;

    if (AuthUtils.isProduction(origin)) {

      cookiePath = environment.prod.cookie.path;
      cookieOrigin = environment.prod.cookie.origin;
      cookieSecure = environment.prod.cookie.secure;
      cookieExpires = environment.prod.cookie.maxAge;
      cookieSameSite = environment.prod.cookie.sameSite as SameSite;
    } else {

      cookiePath = environment.test.cookie.path;
      cookieOrigin = environment.test.cookie.origin;
      cookieSecure = environment.test.cookie.secure;
      cookieExpires = environment.test.cookie.maxAge;
      cookieSameSite = environment.test.cookie.sameSite as SameSite;
    }
    const cookieAccessToken = `access_token='';path=${cookiePath};domain=${cookieOrigin};max-age=0;samesite=${cookieSameSite}`;
    const cookieIdToken = `id_token='';path=${cookiePath};domain=${cookieOrigin};max-age=0;samesite=${cookieSameSite}`;

    document.cookie = cookieAccessToken;
    document.cookie = cookieIdToken;

    if (AuthUtils.isProduction(origin)) {

      if (AuthUtils.isAdmin(appName)) {

        window.open(environment.prod.admins.auth, '_self');
      } else {

        window.open(environment.prod.users.auth, '_self');
      }
    } else {
      if (AuthUtils.isAdmin(appName)) {

        window.open(environment.test.admins.auth, '_self');
      } else {

        window.open(environment.test.users.auth, '_self');
      }
    }
  }

}
