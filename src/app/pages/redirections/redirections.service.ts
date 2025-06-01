import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Redirect } from '@linkery/shared';

@Injectable({
  providedIn: 'root',
})
export class RedirectionsService {

  constructor(private http: HttpClient) { }

  getRedirections() {
    return this.http.get<Redirect[]>('admin/redirects');
  }

  saveRedirection(redirect: Redirect) {
    return this.http.post<Redirect>('admin/redirect', redirect);
  }

  deleteRedirection(path: string) {
    return this.http.delete<void>('admin/redirect', {
      body: {
        path,
      }
    });
  }
}
