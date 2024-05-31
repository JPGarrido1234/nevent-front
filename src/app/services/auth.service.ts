import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserConfigured } from '../model/user-configured.interface';
import { RequestLogin } from '../model/request-login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  isUserConfigured(): Observable<UserConfigured> {

    const url = `${this.baseUrl}/public/user`;

    return this.http.get<UserConfigured>(url);
  }

  completeSignup(accessToken: string, idToken: string): Observable<void> {

    const url = `${this.baseUrl}/users/complete`;

    const headers = new HttpHeaders().set('Authorization', accessToken);

    const body = {
      idToken: idToken
    }

    return this.http.post<void>(url, body, { headers: headers });
  }

  requestLogin(body: any): Observable<RequestLogin> {

    const url = `${this.baseUrl}/auth/login`;

    return this.http.post<RequestLogin>(url, body);
  }

  reset(body: any): Observable<void> {

    const url = `${this.baseUrl}/auth/login`;

    return this.http.put<void>(url, body);
  }

  confirm(confirmationToken: string): Observable<any> {

    const url = `${this.baseUrl}/auth/login/confirm?confirmationToken=${confirmationToken}`;

    return this.http.get<void>(url);

  }

}
