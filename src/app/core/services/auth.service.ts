import { HttpClient } from '@angular/common/http';
import { effect, Injectable, OnInit, signal } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  token = signal('');

  constructor(private http: HttpClient) {}

  ngOnInit() {
    effect(() => {
      document.cookie = `access_token=${this.token()}`;
    });
  }

  login(password: string) {
    return this.http.post<{ access_token: string }>('auth/login', {
      password,
    }).pipe(
      map(({ access_token }) => {
        return this.token.set(access_token);
      }),
    );
  }

  changepw(oldpassword: string, newpassword: string) {
    return this.http.post<void>('auth/changepw', {
      oldpassword,
      newpassword,
    });
  }
}
