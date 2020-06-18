export class ActorWidget {
  public showActor: boolean = false;
  public showFilters: boolean = false;
  public showTable: boolean = true;
  public selectedActor: any;
  public isAdvancedSearch: boolean = false;
  
  public toggleFilters(activate: boolean) {
    this.showTable = !activate;
    this.showActor = false;
    this.showFilters = activate;
  }

  public advancedSearch() {
    this.isAdvancedSearch = true;
    this.showFilters = false;
    this.showTable = true;
  }
 }
