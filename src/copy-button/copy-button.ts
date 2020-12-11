import { bindable } from 'aurelia-framework';

export class CopyButton {
  @bindable public targetId: string;
  public showCheckIcon: boolean = false;
  
  public copy() {
    var url = document.getElementById(this.targetId);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url.innerText).then(function () {
        this.showCheckIcon = true;
        this.hideCheckIcon();
      }.bind(this));
    } else {
      this.showCheckIcon = true;
      this.IEClipboardCopy(url.innerText);
      this.hideCheckIcon();
    }
  }

  private hideCheckIcon() {
    setTimeout(function () {
      this.showCheckIcon = false;
    }.bind(this), 2000);
  }

  private IEClipboardCopy(text) {
    var input = document.createElement('input');
    input.setAttribute('value', text);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }
}
