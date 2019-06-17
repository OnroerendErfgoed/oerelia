import { ViewEngineHooks, View } from 'aurelia-framework';
// import { viewEngineHooks } from 'aurelia-binding';
import {autocompleteType} from './autocomplete-type';

// By convention, Aurelia will look for any classes of the form
// {name}ViewEngineHooks and load them as a ViewEngineHooks resource. We can
// use the @viewEngineHooks decorator instead if we want to give the class a
// different name.
export class AutocompleteTypeViewEngineHooks implements ViewEngineHooks {

  // The `beforeBind` method is called before the ViewModel is bound to
  // the view. We want to expose the enum to the binding context so that
  // when Aurelia binds the data it will find our autocompleteType enum.
  public beforeBind(view: View) {

    // We add the enum to the override context. This will expose the enum
    // to the view without interfering with any properties on the
    // bindingContext itself.
    let key = 'autocompleteType';
    view.overrideContext[key] = autocompleteType;
  }
}
