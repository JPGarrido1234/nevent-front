import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService, SameSite } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { RequestLogin } from 'src/app/model/request-login.interface';
import { AuthService } from 'src/app/services/auth.service';
import { AuthUtils } from 'src/app/utils/auth.utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  updateLoading: boolean = false;
  delayResend: boolean = true;
  emailSent: boolean = false;
  showPassword: boolean = false;
  showPasswordError: boolean = false;
  showOtp: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
    otp: new FormControl('')
  });

  constructor(private authService: AuthService, private cookieService: CookieService, private messageService: MessageService) { }

  ngOnInit(): void {

  }

  requestLogin() {

    const origin = this.cookieService.get('x-auth-origin');

    this.updateLoading = true;

    this.authService.requestLogin(this.loginForm.value).subscribe((response: RequestLogin) => {

      if (response.loggedIn === true) {
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
      } else {
        if (response.method === 'password') {
          this.updateLoading = false;
          this.showPassword = true;

          if (response.status === 'failed') {
            this.showPasswordError = true;
          }

        } else {
          this.updateLoading = false;
          this.showOtp = true;
          setTimeout(() => {
            this.delayResend = false;
          }, 5000);
        }
      }
    }, error => {
      this.updateLoading = false;
    });

  }

  resetPassword() {

    this.authService.reset(this.loginForm.value).subscribe(() => {

      this.messageService.add({ severity: 'success', summary: 'Password restablecida' });

      this.updateLoading = false;
      this.showPassword = false;
      this.showPasswordError = false;
      this.emailSent = false;
    }, error => {
      this.updateLoading = false;
      this.emailSent = false;
    });
  }

}
