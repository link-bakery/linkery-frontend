import { Redirect } from '@linkery/shared';
import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './redirections.component.html',
  styleUrl: './redirections.component.scss',
  imports: [NzTableModule, NzIconModule, NzButtonModule, NzModalModule, NzInputModule, FormsModule],
})
export class WelcomeComponent {
  constructor() {}
  isVisible = false;
  redirections: Redirect[] = [
    {
      path: 'youtube',
      redirectTo: 'www.youtube.com/'
    },
    {
      path: 'github',
      redirectTo: 'www.github.com/'
    }
  ];
  path: string = '';
  redirectTo: string = '';
  modalTitle: string = 'Create a new redirection';

  showModal(i?: number): void {
    this.modalTitle = 'Create a new redirection';
    this.isVisible = true;
    if (i !== undefined) {
      this.modalTitle = 'Edit redirection';
      this.path = this.redirections[i].path;
      this.redirectTo = this.redirections[i].redirectTo;
    }
  }

  handleOk(): void {
    this.isVisible = false;
    this.path = '';
    this.redirectTo = '';
  }

  handleCancel(): void {
    this.isVisible = false;
    this.path = '';
    this.redirectTo = '';
  }

  getPathOrigin() {
    return location.origin;
  }
}
