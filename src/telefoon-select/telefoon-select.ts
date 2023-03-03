import { bindable } from 'aurelia-framework';
import { Telefoon } from './models/telefoon';

export class TelefoonSelect {
  @bindable public telefoon: Telefoon;
  @bindable public disabled: boolean;
  private landcodeInput: HTMLInputElement;
  private index: number = -1;
  private expanded: boolean = false;
  private countryCodeList: any[] = [
    { value: '+32', desc: '(+32) België', class: 'be' },
    { value: '+49', desc: '(+49) Duitsland', class: 'de' },
    { value: '+33', desc: '(+33) Frankrijk', class: 'fr' },
    { value: '+44', desc: '(+44) Groot-Brittannië', class: 'gb' },
    { value: '+31', desc: '(+31) Nederland', class: 'nl' },
    { value: '+352', desc: '(+352) Luxemburg', class: 'lu' }
  ];
  private suggestions: any[] = [];

  public bind() {
    if (this.telefoon && !this.telefoon.landcode) {
      this.telefoon.landcode = '+32';
    }
  }

  public landcodeChanged(e: KeyboardEvent) {
    if (e.which !== 40 && e.which !== 38 && this.telefoon.landcode) {
      this.index = -1;
      this.suggestions = this.countryCodeList.filter(c => c.value.indexOf(this.telefoon.landcode) > -1);
      this.expanded = this.suggestions.length > 0;
    }
  }

  public suggestionClicked(suggestion: any) {
    this.telefoon.landcode = suggestion.value;
    this.collapse();
  }

  public toggleSuggestions() {
    if (this.disabled) {
      return;
    }

    this.suggestions = this.countryCodeList;
    this.expanded = true;
    this.landcodeInput.focus();
  }

  public collapse() {
    this.index = -1;
    this.expanded = false;
  }

  public blur() {
    this.collapse();
  }

  public keydown(e: KeyboardEvent) {
    const key = e.which;

    if (!this.expanded) {
      return true;
    }

    // down
    if (key === 40) {
      if (this.index < this.suggestions.length - 1) {
        this.index++;
      } else {
        this.index = 0;
      }
      this.telefoon.landcode = this.suggestions[this.index].value;
      return;
    }

    // up
    if (key === 38) {
      if (this.index === -1) {
        this.index = this.suggestions.length - 1;
      } else if (this.index > 0) {
        this.index--;
      } else {
        this.index = this.suggestions.length - 1;
      }
      this.telefoon.landcode = this.suggestions[this.index].value;
      return;
    }

    // escape && enter
    if (key === 27 || key === 13) {
      this.collapse();
      return;
    }

    return true;
  }
}
