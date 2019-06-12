import {bindable, containerless} from 'aurelia-templating';

@containerless()
export class TabsPane {
  @bindable public model: any;
  @bindable public tab: any;
  @bindable public viewModel: any;
  @bindable public active?: boolean;
  @bindable public tabViewModel?: any;

  public activeChanged(value: boolean) {
    if (this.tabViewModel) {
      if (value && this.tabViewModel.currentViewModel.activate) {
        this.tabViewModel.currentViewModel.activate();
      } else if (!value && this.tabViewModel.currentViewModel.deactivate) {
        this.tabViewModel.currentViewModel.deactivate();
      }
    }
  }
}
