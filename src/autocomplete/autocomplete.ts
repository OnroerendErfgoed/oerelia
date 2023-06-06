/*
original source: https://gist.github.com/jdanyow/abe2b8c1587f1853106079dc74701aeb
* */
import {bindingMode, observable} from 'aurelia-binding';
import {bindable} from 'aurelia-templating';
import {inject} from 'aurelia-dependency-injection';
import {autocompleteType} from './models/autocomplete-type';

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
  @bindable public labelParser: Function;
  @bindable public onEnter: Function;
  @bindable public minlength: number = 2;
  @bindable public type: autocompleteType = autocompleteType.Auto;
  @bindable public parser;
  public id: number;
  public expanded: boolean = false;
  public updatingInput: boolean = false;
  public suggestions: string[] = [];
  public index: number = -1;
  public suggestionsUL = null;
  public userInput: string = '';
  public element: Element = null;

  private loaded: boolean = false;

  constructor(element: Element) {
    this.element = element;
    this.id = nextID++;
  }

  public attached() {
    // all bindable properties are loaded
    this.loaded = true;
    if (this.value) {
      this.valueChanged();
    }
  }

  public display(name) {
    this.updatingInput = true;
    this.inputValue = name;
    this.updatingInput = false;
  }

  public getName(suggestion) {
    if (suggestion == null) {
      return '';
    } else if (this.labelParser) {
      return this.labelParser(suggestion);
    } else {
      return suggestion[this.label];
    }
  }

  public collapse() {
    this.expanded = false;
    this.index = -1;
  }

  public select(suggestion) {
    this.value = suggestion;
    const name = this.getName(this.value);
    this.display(name);
    this.collapse();
  }

  public valueChanged() {
    if (this.loaded) {
      this.select(this.value);
    }
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
    if (value.length >= this.minlength) {
      this.service.suggest(value)
        .then(suggestions => {
          this.index = -1;
          this.suggestions.splice(0, this.suggestions.length, ...suggestions);
          if (suggestions.length === 1 && this.type !== autocompleteType.Suggest) {
            this.select(suggestions[0]);
          } else if (suggestions.length === 0) {
            this.collapse();
          } else {
            this.expanded = true;
          }
        });
    }
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
    let key = e.which;

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
      return;
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
      return;
    }

    // escape
    if (key === 27) {
      this.display(this.userInput);
      this.collapse();
      return;
    }

    // enter
    if (key === 13) {
      if (this.index >= 0) {
        this.select(this.suggestions[this.index]);
      }
      return;
    }

    return true;
  }

  public blur() {
    if ((this.getName(this.value) === this.inputValue) || (this.type !== autocompleteType.Suggest)) {
      this.select(this.value);
      let event = new CustomEvent('blur');
      this.element.dispatchEvent(event);
    } else {
      const customValue = this.parser ? this.parser(this.inputValue) : this.defaultParser(this.inputValue);
      this.select(customValue);
    }
  }

  public suggestionClicked(suggestion) {
    this.select(suggestion);
  }

  public focus() {
    (<HTMLElement> this.element.firstElementChild).focus();
  }

  public resetUserInput() {
    this.userInput = '';
  }

  private defaultParser(value) {
    return value.trim();
  }
}

// aria-activedescendant
// https://webaccessibility.withgoogle.com/unit?unit=6&lesson=13
// https://www.w3.org/TR/wai-aria/states_and_properties#aria-autocomplete
// https://www.w3.org/TR/wai-aria/roles#combobox
