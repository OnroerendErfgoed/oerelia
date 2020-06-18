export class ActorWidget {
  public showActor: boolean = false;
  public showFilters: boolean = false;
  public showTable: boolean = true;

  public toggleFilters(activate: boolean) {
    this.showTable = !activate;
    this.showActor = false;
    this.showFilters = activate;
  }

 }
