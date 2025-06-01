import { NzButtonModule } from 'ng-zorro-antd/button';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AuthService } from '../../core/services/auth.service';
import { catchError, throwError } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [NzModalModule, NzInputModule, NzButtonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authService: AuthService = inject(AuthService);
  messageService: NzMessageService = inject(NzMessageService);
  router: Router = inject(Router);

  username: string = 'admin';
  password: string = '';

  login() {
    this.authService.login(this.password)
      .pipe(
        catchError(() => {
          const msg = 'Username or password is wrong!';
          this.messageService.error(msg);
          return throwError(() => new Error(msg));
        })
      )
      .subscribe(() => {
        this.messageService.success(`Logged in as ${this.username}`);
        this.router.navigate(['redirections']);
      });
  }
}
