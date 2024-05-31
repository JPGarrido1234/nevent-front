import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthUtils } from 'src/app/utils/auth.utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(response => {

      const origin = response.get('origin');
      const appName = response.get('appName') || '';

      if (origin) {

        this.cookieService.set('x-auth-origin', origin);
        this.cookieService.set('x-app-name', appName);

        // Identify the environment

        if (AuthUtils.isProduction(origin)) {

          if (AuthUtils.isAdmin(appName)) {
            window.location.replace(environment.prod.admins.auth);
          } else {
            this.router.navigate(['/auth/login']);
          }

        } else {

          if (AuthUtils.isAdmin(appName)) {
            window.location.replace(environment.test.admins.auth);
          } else {
            this.router.navigate(['/auth/login']);
          }
        }

      }
    });
  }

}
