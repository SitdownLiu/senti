import { DialogService } from 'ng-devui';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToolService {
  constructor(private dialogService: DialogService) {}

  //`TODO:` 提示弹框
  public openModal({ type, title, content }) {
    const dialog = this.dialogService.open({
      dialogtype: type,
      title: ` ${title}`,
      content: `系统提示:  ${content}`,
      width: '400px',
      maxHeight: '600px',
      buttons: [{ cssClass: 'primary', text: '我知道了', handler: ($event: Event) => dialog.modalInstance.hide() }],
    });
  }
}
