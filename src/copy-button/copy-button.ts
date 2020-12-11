export class CopyButton {
  // var url = document.getElementById('clipboard-target');
  public showCheckIcon: boolean = false;
  
  public copy() {
    let text = 'gekopieerde tekst';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function () {
        this.showCheckIcon = true;
        this.hideCheckIcon();
      }.bind(this));
    } else {
      this.showCheckIcon = true;
      this.IEClipboardCopy(text);
      this.hideCheckIcon();
    }
  }

  private hideCheckIcon() {
    setTimeout(function () {
      this.showCheckIcon = false;
    }.bind(this), 20000);
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
