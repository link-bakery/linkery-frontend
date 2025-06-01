import { Redirect } from '@linkery/shared';
import { Component, inject, Injector, Signal } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { RedirectionsService } from './redirections.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './redirections.component.html',
  styleUrl: './redirections.component.scss',
  imports: [NzTableModule, NzIconModule, NzButtonModule, NzModalModule, NzInputModule, FormsModule],
})
export class RedirectionsComponent {
  redirectionsService = inject(RedirectionsService);
  private injector = inject(Injector);

  isVisible = false;
  path: string = '';
  redirectTo: string = '';
  modalTitle: string = 'Create a new redirection';
  redirections: Signal<Redirect[]> = toSignal(this.redirectionsService.getRedirections(), {
    initialValue: [],
  });

  showModal(i?: number): void {
    this.modalTitle = 'Create a new redirection';
    this.isVisible = true;
    if (i !== undefined) {
      this.modalTitle = 'Edit redirection';
      this.path = this.redirections()[i].path;
      this.redirectTo = this.redirections()[i].redirectTo;
    }
  }

  async handleOk() {
    this.isVisible = false;
    await firstValueFrom(this.redirectionsService.deleteRedirection(this.path));
    await firstValueFrom(this.redirectionsService.saveRedirection({
      path: this.path,
      redirectTo: this.redirectTo,
    }));
    this.updateRedirections();
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

  async delete(i: number) {
    const redirect = this.redirections()[i];
    await firstValueFrom(this.redirectionsService.deleteRedirection(redirect.path));
    this.updateRedirections();
  }

  updateRedirections() {
    this.redirections = toSignal(this.redirectionsService.getRedirections(), {
      initialValue: [],
      injector: this.injector,
    });
  }
}
