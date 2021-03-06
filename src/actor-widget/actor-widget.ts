import { GridOptions } from 'ag-grid-community';
import { CrabService } from '../services/crab.api-service';
import { autoinject } from 'aurelia-framework';
import { bindable } from 'aurelia-templating';
import { DialogController } from 'aurelia-dialog';

@autoinject
export class ActorWidget {
  @bindable public scope: any;
  @bindable public actorenApiService: any;
  @bindable public dialogController: DialogController;

  public showSpinner: boolean = true;
  public gridOptions: GridOptions;
  public zoekterm: string;
  public selectedActor: any;
  public showTable: boolean = true;
  public showActor: boolean = false;
  public showFilters: boolean = false;
  public isAdvancedSearch: boolean = false;
  public landen: any[] = [];
  public gemeenten: any[] = [];
  public postcodes: any[] = [];
  public straten: any[] = [];
  public huisnrs: any[] = [];
  public suggest: any = {};

  private filters: any = {};

  constructor(private crabService: CrabService) {
    this.loadLanden();
    this.suggest.gemeenten = { suggest: value => this.loadGemeenten(value) };
    this.suggest.postcode = { suggest: value => this.loadPostcodes(value) };
    this.suggest.straten = { suggest: value => this.loadStraten(value) };
    this.suggest.huisnummer = { suggest: value => this.loadHuisnrs(value) };
  }

  public bind() {
    this.gridOptions = {} as GridOptions;
    this.gridOptions.context = this;
    this.gridOptions.suppressMovableColumns = true;
    this.gridOptions.suppressClickEdit = true;
    this.gridOptions.defaultColDef = {
      editable: false,
      sortable: true,
      resizable: true
    };
    this.gridOptions.headerHeight = 30;
    this.gridOptions.rowHeight = 25;
    this.gridOptions.rowModelType = 'infinite';
    this.gridOptions.rowData = null;
    this.gridOptions.infiniteInitialRowCount = 1;
    this.gridOptions.cacheBlockSize = 50;
    this.gridOptions.overlayLoadingTemplate = '<i class="fa fa-pulse fa-spinner"></i>';
    this.gridOptions.columnDefs = [
      { headerName: '#', field: 'id', sort: 'desc', width: 50 },
      { headerName: 'Naam', field: 'naam', width: 200 },
      { headerName: 'Voornaam', field: 'voornaam', width: 200 },
      { headerName: 'Type', field: 'type.naam', width: 200 },
      { headerName: 'Acties', width: 55, cellClass: 'acties-cell',
        cellRenderer: this.actiesCellRenderer, sortable: false
      }
    ];
  }

  public setRowData() {
    const dataSource = {
      rowCount: null,
      getRows: params => {
        params.context.showSpinner = true;

        let paramsObj = {};
        if (params.context.isAdvancedSearch) {
          const f = params.context.filters;
          paramsObj = {
            naam: f.naam ? f.naam : undefined,
            voornaam: f.voornaam ? f.voornaam : undefined,
            email: f.email ? f.email : undefined,
            telefoon: f.telefoon ? f.telefoon : undefined,
            type: f.type ? f.type : undefined,
            land: f.land ? f.land : undefined,
            gemeente: f.gemeente && f.gemeente !== null ? f.gemeente.id : undefined,
            postcode: f.postcode && f.postcode !== null ? f.postcode.id : f.post_code || undefined,
            straat: f.straat && f.straat != null ? f.straat.id : undefined,
            straat_naam: f.straat_naam ? f.straat_naam : undefined,
            huisnummer: f.huisnummer && f.huisnummer !== null ? f.huisnummer.id : undefined,
            huisnummer_label: f.huisnummer_label ? f.huisnummer_label : undefined,
            subadres: f.subadres ? f.subadres : undefined,
            persid: f.persid ? f.persid : undefined,
            rrn: f.rrn ? f.rrn : undefined,
            kbo: f.kbo ? f.kbo : undefined
          };
        } else {
          const query = params.context.zoekterm || null;
          let sort: string = '+';
          if (params.sortModel.length) {
            const sortModel = params.sortModel[0];
            sort = ((sortModel.sort === 'asc') ? '' : '-') + sortModel.colId;
          }
          paramsObj = {
            omschrijving: query ? query + '*' : null,
            sort: sort
          };
        }

        params.context.actorenApiService.getActoren(params.startRow, params.endRow, paramsObj)
          .then(data => {
            if (data) {
              params.successCallback(data.content, data.lastRow);
              params.context.zoekterm = '';
            }
            params.context.onGridSizeChanged();
            params.context.showSpinner = false;
          });
      }
    };
    this.gridOptions.api.setDatasource(dataSource);
  }

  public keydown(e) {
    const key = e.which;
    if (key === 13) {
      e.preventDefault();
      this.search();
    }
    return true;
  }

  public onGridReady() {
    this.setRowData();
  }

  public onGridSizeChanged() {
    console.debug('actor-widget::onGridSizeChanged');
    if (this.gridOptions.api) {
      this.gridOptions.api.sizeColumnsToFit();
    }
  }

  public search() {
    this.gridOptions.api.purgeInfiniteCache();
  }

  public refresh() {
    this.gridOptions.api.clearFocusedCell();
    this.selectedActor = undefined;
    this.isAdvancedSearch = false;
    this.setRowData();
  }

  public advancedSearch() {
    this.isAdvancedSearch = true;
    this.showFilters = false;
    this.showTable = true;
  }

  public clearFilters() {
    this.filters = {};
    this.refresh();
  }

  public toggleFilters(activate: boolean) {
    this.showTable = !activate;
    this.showActor = false;
    this.showFilters = activate;
  }

  public selectActor(params) {
    this.selectedActor = params.data;
  }

  public toggleActorDetail(activate: boolean, params) {
    if (activate) {
      this.showSpinner = true;
      this.actorenApiService.getActorById(params.data.id)
        .then(data => {
          this.showSpinner = false;
          if (data) {
            this.selectedActor = data;
            this.showTable = !activate;
            this.showActor = activate;
          }
        });
    } else {
      this.showTable = !activate;
      this.showActor = activate;
    }
  }

  public toevoegen() {
    this.dialogController.ok({ 'scope': this.scope, 'actor': this.selectedActor })
  }

  public annuleren() {
    this.dialogController.cancel();
  }

  private actiesCellRenderer(params) {
    if (params.data) {
      const container = document.createElement('div');
      // open icon
      const open = document.createElement('i');
      open.className = 'fa fa-eye';
      open.title = 'Details van de actor bekijken';
      open.addEventListener('click', () => params.context.toggleActorDetail(true, params));
      container.appendChild(open);

      // edit icon
      const edit = document.createElement('a');
      edit.className = 'fa fa-pencil';
      edit.setAttribute('title', 'Actor editeren');
      edit.href = `${params.context.actorenApiService.config.actorenUrl}/beheer#/actoren/${params.data.id}`;
      edit.target = '_blank';
      container.appendChild(edit);

      return container;
    }
  }

  private loadLanden() {
    this.crabService.getLanden().then(landen => {
      if (landen) {
        const firstOptions = [
          { id: 'BE', naam: 'België' },
          { id: 'DE', naam: 'Duitsland' },
          { id: 'FR', naam: 'Frankrijk' },
          { id: 'GB', naam: 'Groot-Brittanië' },
          { id: 'NL', naam: 'Nederland' },
          { id: 'LU', naam: 'Luxemburg' },
          { naam: '─────────────────────────', disabled: true }
        ];
        this.landen = firstOptions;
        landen.forEach(land => {
          const exists = this.landen.find(obj => obj.id === land.id);
          if (!exists) {
            this.landen.push(land);
          }
        });
      }
    }).catch(error => {
      console.debug(error);
    });
  }

  private loadGemeenten(value: string) {
    return new Promise(resolve => {
      this.crabService.getGemeenten().then(gemeenten => {
        if (gemeenten) {
          const result = gemeenten.filter(obj => obj.naam.toLowerCase().indexOf(value.toLowerCase()) !== -1);
          resolve(result);
        }
      });
    });
  }

  private loadPostcodes(value: string) {
    const gemeente = this.filters.gemeente ? this.filters.gemeente.id : undefined;
    return new Promise((resolve) => {
      if (gemeente) {
        this.crabService.getPostcodes(gemeente).then(postcodes => {
          postcodes.forEach(postcode => {
            postcode.naam = String(postcode.id);
          });
          const result = postcodes.filter(obj => obj.naam.toLowerCase().indexOf(value.toLowerCase()) !== -1);
          resolve(result);
        });
      } else {
        this.filters.post_code = value;
      }
    });
  }

  private loadStraten(value: string) {
    const gemeente = this.filters.gemeente ? this.filters.gemeente.id : undefined;
    return new Promise((resolve) => {
      if (gemeente) {
        this.crabService.getStraten(gemeente).then(straten => {
          const result = straten.filter(obj => obj.naam.toLowerCase().indexOf(value.toLowerCase()) !== -1);
          this.filters.straat_naam = undefined;
          resolve(result);
        });
      } else {
        this.filters.straat_naam = value;
      }
    });
  }

  private loadHuisnrs(value: string) {
    const straat = this.filters.straat ? this.filters.straat.id : undefined;
    return new Promise((resolve) => {
      if (straat) {
        this.crabService.getHuisnrs(straat).then(huisnrs => {
          const result = huisnrs.filter(obj => obj.naam.toLowerCase().indexOf(value.toLowerCase()) !== -1);
          this.filters.huisnummer_label = undefined;
          resolve(result);
        });
      } else {
        this.filters.huisnummer_label = value;
      }
    });
  }
}
