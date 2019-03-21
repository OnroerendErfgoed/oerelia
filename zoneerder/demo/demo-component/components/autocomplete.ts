/*
original source: https://gist.github.com/jdanyow/abe2b8c1587f1853106079dc74701aeb
* */
import { bindingMode, observable } from 'aurelia-binding';
import { bindable, inject } from 'aurelia-framework';

let nextID: number = 0;

@inject(Element)
export class Autocomplete {
  @observable public inputValue: string  = '';
  @bindable public service: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public value: string;
  @bindable public placeholder: string = '';
  @bindable public delay: number = 300;
  @bindable public label: string = 'name';
  @bindable public disabled: boolean;
  @bindable public onEnter: any = null;
  public id: number;
  public expanded: boolean = false;
  public updatingInput: boolean = false;
  public suggestions: string[] = [];
  public index: number = -1;
  public suggestionsUL = null;
  public userInput: string = '';
  public element: Element = null;

  constructor(element: Element) {
    this.element = element;
    this.id = nextID++;
  }

  public display(name) {
    this.updatingInput = true;
    this.inputValue = name;
    this.updatingInput = false;
  }

  public getName(suggestion) {
    if (suggestion == null) {
      return '';
    }
    return suggestion[this.label];
  }

  public collapse() {
    this.expanded = false;
    this.index = -1;
  }

  public select(suggestion) {
    this.value = suggestion;
    const name = this.getName(this.value);
    this.userInput = name;
    this.display(name);
    this.collapse();
  }

  public valueChanged() {
    this.select(this.value);
  }

  public inputValueChanged(value) {
    if (this.updatingInput) {
      return;
    }
    this.userInput = value;
    if (value === '') {
      this.value = null;
      this.collapse();
      return;
    }
    this.service.suggest(value)
      .then(suggestions => {
        this.index = -1;
        this.suggestions.splice(0, this.suggestions.length, ...suggestions);
        if (suggestions.length === 1) {
          this.select(suggestions[0]);
        } else if (suggestions.length === 0) {
          this.collapse();
        } else {
          this.expanded = true;
        }
      });
  }

  public scroll() {
    const ul = this.suggestionsUL;
    const li = ul.children.item(this.index === -1 ? 0 : this.index);
    if (li.offsetTop + li.offsetHeight > ul.offsetHeight) {
      ul.scrollTop += li.offsetHeight;
    } else if (li.offsetTop < ul.scrollTop) {
      ul.scrollTop = li.offsetTop;
    }
  }

  public keydown(e) {
    const key = e.which;

    if (this.value && this.onEnter && key === 13) {
      e.preventDefault();
      this.onEnter();
    }
    if (!this.expanded) {
      return true;
    }

    // down
    if (key === 40) {
      if (this.index < this.suggestions.length - 1) {
        this.index++;
        this.display(this.getName(this.suggestions[this.index]));
      } else {
        this.index = -1;
        this.display(this.userInput);
      }
      this.scroll();
      return false;
    }

    // up
    if (key === 38) {
      if (this.index === -1) {
        this.index = this.suggestions.length - 1;
        this.display(this.getName(this.suggestions[this.index]));
      } else if (this.index > 0) {
        this.index--;
        this.display(this.getName(this.suggestions[this.index]));
      } else {
        this.index = -1;
        this.display(this.userInput);
      }
      this.scroll();
      return false;
    }

    // escape
    if (key === 27) {
      this.display(this.userInput);
      this.collapse();
      return false;
    }

    // enter
    if (key === 13) {
      if (this.index >= 0) {
        this.select(this.suggestions[this.index]);
      }
      return false;
    }

    return true;
  }

  public blur() {
    this.select(this.value);
    const event = new CustomEvent('blur');
    this.element.dispatchEvent(event);
  }

  public suggestionClicked(suggestion) {
    this.select(suggestion);
  }

  public focus() {
    (this.element.firstElementChild as HTMLElement).focus();
  }
}

// aria-activedescendant
// https://webaccessibility.withgoogle.com/unit?unit=6&lesson=13
// https://www.w3.org/TR/wai-aria/states_and_properties#aria-autocomplete
// https://www.w3.org/TR/wai-aria/roles#combobox
