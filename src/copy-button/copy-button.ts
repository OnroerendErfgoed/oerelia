export class CopyButton {
  // var url = document.getElementById('clipboard-target');
  public showCheckIcon: boolean = false;
  
  public copy() {
    let text = 'hahahaha';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function () {
        this.showCheckIcon = true;
        // changeCopyToCheckIcon();
        setTimeout(function () {
          this.showCheckIcon = false;
          // changeCheckToCopyIcon();
        }, 2000);
      }, function (err) {
        console.error('Could not copy text: ', err);
      });
    } else {
      this.showCheckIcon = true;
      // changeCopyToCheckIcon();
      this.IEClipboardCopy(text);
      setTimeout(function () {
        this.showCheckIcon = false;
        // changeCheckToCopyIcon();
      }, 2000);
    }
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
