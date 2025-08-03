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
import { environment } from '../../../environments/environment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

@Component({
  selector: 'app-welcome',
  templateUrl: './redirections.component.html',
  styleUrl: './redirections.component.scss',
  imports: [NzTableModule, NzIconModule, NzButtonModule, NzModalModule, NzInputModule, FormsModule, NzPopoverModule],
})
export class RedirectionsComponent {
  redirectionsService = inject(RedirectionsService);
  private injector = inject(Injector);
  private messageService: NzMessageService = inject(NzMessageService);

  isVisible = false;
  id: Redirect['id'];
  path: Redirect['path'] = '';
  redirectTo: Redirect['redirectTo'] = '';
  isEditModal: boolean = false; // false: creates a new redirection, true: edits a new redirection
  redirections: Signal<Redirect[]> = toSignal(this.redirectionsService.getRedirections(), {
    initialValue: [],
  });

  showModal(i?: number): void {
    this.isEditModal = false;
    this.isVisible = true;
    if (i !== undefined) {
      this.isEditModal = true;
      this.id = this.redirections()[i].id;
      this.path = this.redirections()[i].path;
      this.redirectTo = this.redirections()[i].redirectTo;
    }
  }

  async handleOk() {
    this.isVisible = false;
    if (this.isEditModal) {
      await firstValueFrom(this.redirectionsService.editRedirection(this.id, {
        path: this.path,
        redirectTo: this.redirectTo,
      }));
    } else {
      await firstValueFrom(this.redirectionsService.saveRedirection({
        path: this.path,
        redirectTo: this.redirectTo,
      }));
    }
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
    return environment.backendHost || location.origin;
  }

  getFullRedirectLink(path: string) {
    return this.getPathOrigin() + '/' + path;
  }

  copy(text: string) {
    this.messageService.success('Copied redirection!');
    navigator.clipboard.writeText(text);
  }

  async delete(i: number) {
    const redirect = this.redirections()[i];
    if (redirect === undefined || redirect.id === undefined) {
      return;
    }
    await firstValueFrom(this.redirectionsService.deleteRedirection(redirect.id));
    this.updateRedirections();
  }

  updateRedirections() {
    this.redirections = toSignal(this.redirectionsService.getRedirections(), {
      initialValue: [],
      injector: this.injector,
    });
  }
}
