import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService, SameSite } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { AuthUtils } from 'src/app/utils/auth.utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  constructor(private cookieService: CookieService, private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const origin = this.cookieService.get('x-auth-origin');
    const appName = this.cookieService.get('x-app-name');

    this.activatedRoute.fragment.subscribe(
      (fragment) => {

        if (fragment !== null) {

          const confirm_token = new URLSearchParams(fragment).get('confirm_token');

          if (confirm_token === null) {

            this.router.navigate(['/auth/login']);
            return;
          }

          this.authService.confirm(confirm_token).subscribe(response => {

            const access_token = response.token;
            const id_token = response.token;

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

            const cookieAccessToken = `access_token=${access_token};path=${cookiePath};domain=${cookieOrigin};max-age=${cookieExpires};samesite=${cookieSameSite}`;
            const cookieIdToken = `id_token=${id_token};path=${cookiePath};domain=${cookieOrigin};max-age=${cookieExpires};samesite=${cookieSameSite}`;

            document.cookie = cookieAccessToken;
            document.cookie = cookieIdToken;

            if (origin !== null && origin !== undefined && origin !== '') {

              window.location.replace(origin);
            } else {

              window.location.replace(environment.url.profile);
            }

          }, () => {
            this.router.navigate(['/auth/login']);
          });

        }
      });
  }

}
