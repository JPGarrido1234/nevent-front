import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService, SameSite } from 'ngx-cookie-service';
import { UserConfigured } from 'src/app/model/user-configured.interface';
import { AuthService } from 'src/app/services/auth.service';
import { AuthUtils } from 'src/app/utils/auth.utils';
import { environment } from 'src/environments/environment';
import jwt_decode from "jwt-decode";
import * as Sentry from "@sentry/angular";

@Component({
    selector: 'app-success',
    templateUrl: './success.component.html',
    styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

    constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private cookieService: CookieService) {

    }

    ngOnInit(): void {

        const origin = this.cookieService.get('x-auth-origin');
        const appName = this.cookieService.get('x-app-name');

        this.activatedRoute.fragment.subscribe(
            (fragment) => {

                if (fragment !== null) {
                    const id_token = new URLSearchParams(fragment).get('id_token');
                    const access_token = new URLSearchParams(fragment).get('access_token');

                    const now: Date = new Date();

                    now.setDate(now.getDate() + 1);



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

                    if (access_token) {
                        const decodedJwt = jwt_decode(access_token) as any;

                        const tokenIss = decodedJwt['iss'];

                        if (tokenIss === environment.iss.admin) {

                            this.authService.isUserConfigured().subscribe((response: UserConfigured) => {
                                if (response.exists === false) {
                                    // Redirect to fill profile
                                    window.location.replace(environment.url.adminComplete);
                                } else {

                                    if (origin && origin !== '') {
                                        // Redirect to origin (admin or scan)
                                        window.location.replace(origin);
                                    } else {
                                        // Redirect to admin
                                        window.location.replace(environment.url.admin);
                                    }
                                }
                                // If error, redirect to admin
                            }, () => window.location.replace(environment.url.admin));

                        } else {

                            const idToken = id_token ? id_token : '';

                            this.authService.completeSignup(access_token, idToken).subscribe(() => {
                                // If origin exist, return to origin
                                // Default, return to profile 
                                if (origin !== null && origin !== undefined && origin !== '') {

                                    window.location.replace(origin);
                                } else {

                                    window.location.replace(environment.url.profile);
                                }
                            });

                        }
                    } else {
                        Sentry.captureMessage(`Access token is null for appName ${appName} and origin ${origin}`);
                        window.location.replace(origin);
                    }
                } else {
                    Sentry.captureMessage(`Fragment is null for appName ${appName} and origin ${origin}`);
                }
            });
    }
} 
