import { GridOptions } from 'ag-grid-community';
import { autoinject } from 'aurelia-framework';
import { bindable } from 'aurelia-templating';
import { DialogController } from 'aurelia-dialog';
import { uniqBy } from 'lodash';
import { IAdresregisterAdres, IGemeente, ILand, IPostcode, IStraat } from '../models/public-models';
import { IAdresCrabConfig } from '../adres-crab/types/adres-crab-config';
import { autocompleteType } from '../autocomplete/models/autocomplete-type';
import { AdresregisterService } from '../services/adresregister.api-service';
import { Message } from '../utilities/message/message';

@autoinject
export class ActorWidget {
  @bindable public scope: any;
  @bindable public actorenApiService: any;
  @bindable public dialogController: DialogController;
  @bindable public getActorOnRowClick: boolean = false;

  public adresId: number;
  public showSpinner: boolean = true;
  public gridOptions: GridOptions;
  public zoekterm: string;
  public selectedActor: any;
  public showTable: boolean = true;
  public showActor: boolean = false;
  public showFilters: boolean = false;
  public isAdvancedSearch: boolean = false;
  public landen: ILand[] = [];
  public gemeenten: IGemeente[] = [];
  public postcodes: IPostcode[] = [];
  public straten: IStraat[] = [];
  public suggest: any = {};
  public adresCrabConfig: IAdresCrabConfig = {
    postcode: { required: true, autocompleteType: autocompleteType.Auto },
    straat: { required: true, autocompleteType: autocompleteType.Auto },
    huisnummer: { required: true, autocompleteType: autocompleteType.Suggest },
    busnummer: { required: false, autocompleteType: autocompleteType.Suggest }
  };

  private filters: any = {};
  private vrijAdres: boolean = false;
  private vlaamseProvinciesNiscodes = ['10000', '70000', '40000', '20001', '30000'];

  constructor(private adresregisterService: AdresregisterService ) {
    this.loadLanden();
    this.suggest.gemeenten = { suggest: (value) => this.loadGemeenten(value) };
    this.suggest.postcodes = { suggest: (value) => this.loadPostcodes(value) };
    this.suggest.straten = { suggest: (value) => this.loadStraten(value) };
    this.suggest.huisnummers = { suggest: (value) => this.loadHuisnrs(value) };
    this.suggest.busnummers = { suggest: (value) => this.loadBusnrs(value) };
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
    this.gridOptions.overlayNoRowsTemplate = '<span class="no-rows">Er zijn geen resultaten</span>';
    this.gridOptions.overlayLoadingTemplate = '<i class="fa fa-pulse fa-spinner"></i>';
    this.gridOptions.columnDefs = [
      { headerName: '#', field: 'id', sort: 'desc', width: 50 },
      { headerName: 'Naam', field: 'naam', width: 200 },
      { headerName: 'Voornaam', field: 'voornaam', width: 200 },
      { headerName: 'Type', field: 'type.naam', width: 200, sortable: false },
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
            gemeente: f.gemeente && f.gemeente !== null ? f.gemeente.naam : undefined,
            postcode: f.postcode && f.postcode !== null ? f.postcode.nummer : f.post_code || undefined,
            straat: f.straat && f.straat != null ? f.straat.id || f.straat.naam : undefined,
            huisnummer: f.adres && f.adres.huisnummer ? f.adres.huisnummer : undefined,
            busnummer: f.adres && f.adres.busnummer ? f.adres.busnummer : undefined,
            persid: f.persid ? f.persid : undefined,
            rrn: f.rrn ? f.rrn : undefined,
            kbo: f.kbo ? f.kbo : undefined,
            geldige_actor: true
          };
        } else {
          const query = params.context.zoekterm || null;
          let sort: string = '+';
          if (params.sortModel.length) {
            const sortModel = params.sortModel[0];
            sort = ((sortModel.sort === 'asc') ? '' : '-') + sortModel.colId;
          }
          paramsObj = {
            omschrijving: query || null,
            sort: sort,
            geldige_actor: true
          };
        }

        params.context.actorenApiService.getActoren(params.startRow, params.endRow, paramsObj)
          .then(data => {
            if (data) {
              params.successCallback(data.content, data.lastRow);
              params.context.zoekterm = '';

              if (data.content.length <= 0) {
                params.context.gridOptions.api.showNoRowsOverlay();
                params.context.gridOptions.api.setInfiniteRowCount(0, false);
              } else {
                params.context.gridOptions.api.hideOverlay();
              }
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

  public async selectActor(params) {
    this.selectedActor = params.data;
    if (this.getActorOnRowClick) {
      this.showSpinner = true;
      const data = await this.actorenApiService.getActorById(params.data.id);
      this.showSpinner = false;
      if (data) {
        this.selectedActor = data;
        const primairAdres = data.adressen.filter(obj => {
          return obj.adrestype.id === 1;
        })[0];
        this.adresId = primairAdres ? primairAdres.id : null;
      }
    }
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
    this.dialogController.ok({ 'scope': this.scope, 'actor': this.selectedActor,
      ...(this.getActorOnRowClick ? { 'adresId': this.adresId } : {})});
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
      edit.href = `${params.context.actorenApiService.config.actorenUrl}/beheer/${params.data.id}`;
      edit.target = '_blank';
      container.appendChild(edit);

      return container;
    }
  }

  public landChanged() {
    this.filters.gemeente = undefined;
    this.gemeenteChanged();
  }

  public gemeenteChanged() {
    if (this.filters.gemeente &&
      this.filters.gemeente.provincie &&
      !this.isVlaamseProvincie(this.filters.gemeente.provincie)
    ) {
      this.adresCrabConfig.postcode.autocompleteType = autocompleteType.Suggest;
      this.adresCrabConfig.straat.autocompleteType = autocompleteType.Suggest;
    } else {
      this.adresCrabConfig.postcode.autocompleteType = autocompleteType.Auto;
      this.adresCrabConfig.straat.autocompleteType = autocompleteType.Auto;
    }
    this.filters.straat = undefined;
    this.filters.postcode = undefined;
    this.straatChanged();
  }

  public straatChanged() {
    this.filters.adres = undefined;
  }

  private async loadLanden() {
    try {
      const landen = await this.adresregisterService.getLanden();
      if (landen) {
        const firstOptions = [
          { code: 'BE', naam: 'België' },
          { code: 'DE', naam: 'Duitsland' },
          { code: 'FR', naam: 'Frankrijk' },
          { code: 'GB', naam: 'Groot-Brittanië' },
          { code: 'NL', naam: 'Nederland' },
          { code: 'LU', naam: 'Luxemburg' },
          { code: 'divider', naam: '─────────────────────────' }
        ];
        this.landen = firstOptions;
        landen.forEach(land => {
          const exists = this.landen.find(obj => obj.code === land.code);
          if (!exists) {
            this.landen.push(land);
          }
        });
      }
    } catch (error) {
      Message.error({
        title: 'Er liep iets mis bij het ophalen van landen',
        message: error.message
      });
    }
  }

  private async loadGemeenten(value: string) {
    try {
      const gemeenten = await this.adresregisterService.getGemeenten();
      const adresGemeenten = gemeenten.map((gemeente: IGemeente) => ({
        naam: gemeente.naam,
        niscode: gemeente.niscode,
        provincie: gemeente.provincie
      }));

      return this.suggestFilter(adresGemeenten, value);
    } catch (error) {
      Message.error({
        title: 'Er liep iets mis bij het ophalen van gemeenten',
        message: error.message
      });
    }
  }

  private async loadPostcodes(value: string) {
    const gemeente = this.filters.gemeente ? this.filters.gemeente.naam : undefined;

    if (gemeente) {
      try {
        const postcodes = await this.adresregisterService.getPostinfo(gemeente);
        const mappedPostcodes = postcodes.map((postcode) =>
          ({ nummer: postcode.postcode, uri: postcode.uri } as IPostcode));
        return this.filterPostcodes(mappedPostcodes, value);
      } catch (error) {
        this.filters.postcode = undefined;
        Message.error({
          title: 'Er liep iets mis bij het ophalen van postcodes',
          message: error.message
        });
      }
    } else {
      this.filters.post_code = value;
    }
  }

  private async loadStraten(value: string) {
    const gemeenteNiscode = this.filters.gemeente ? this.filters.gemeente.niscode : undefined;
    const postcodeUri = this.filters.postcode ? this.filters.postcode.uri : undefined;
    if (!gemeenteNiscode || !postcodeUri) {
      this.vrijAdres = true;
      return;
    }

    try {
      const straten = await this.adresregisterService.getStraten(gemeenteNiscode);
      return this.suggestFilter(straten, value);
    } catch (error) {
      Message.error({
        title: 'Er liep iets mis bij het ophalen van straten',
        message: error.message
      });
    }
  }

  private async loadHuisnrs(value: string) {
    const straatId = this.filters.straat ? this.filters.straat.id : undefined;
    if (
      this.vrijAdres ||
      (this.filters.gemeente.provincie && !this.isVlaamseProvincie(this.filters.gemeente.provincie)) ||
      !straatId) {
      this.vrijAdres = true;
      return;
    }
    this.vrijAdres = false;

    try {
      const huisnrs = await this.adresregisterService.getAdressen(straatId);
      return this.filterHuisnummers(huisnrs, value);
    } catch (error) {
      Message.error({
        title: 'Er liep iets mis bij het ophalen van huisnummers',
        message: error.message
      });
    }
  }

  private async loadBusnrs(value: string) {
    const straatId = this.filters.straat ? this.filters.straat.id : undefined;
    const huisnummer = this.filters.adres ? this.filters.adres.huisnummer : undefined;

    if (!this.filters.adres.id || !huisnummer || this.vrijAdres) { return; }

    try {
      const huisnrs = await this.adresregisterService.getAdressen(straatId, huisnummer);
      return this.filterBusnummers(huisnrs, value);
    } catch (error) {
      Message.error({
        title: 'Er liep iets mis bij het ophalen van busnummers',
        message: error.message
      });
    }
  }

  private suggestFilter(data: any, value: string) {
    return data.filter((obj) => {
      return obj.naam.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }

  private filterPostcodes(postcodes: IPostcode[], searchPostcode: string): IPostcode[] | [] {
    return postcodes.filter((postcode: IPostcode) => postcode.nummer.includes(searchPostcode));
  }

  private isVlaamseProvincie(provincie) {
    return this.vlaamseProvinciesNiscodes.includes(provincie.niscode);
  }

  private filterHuisnummers(adressen: IAdresregisterAdres[], searchHuisnummer: string):
    IAdresregisterAdres[] | [] {
    const adresList = uniqBy(adressen
      .filter((adres: IAdresregisterAdres) => adres.huisnummer
        .includes(searchHuisnummer)), 'huisnummer') as IAdresregisterAdres[];
    return adresList.sort((a, b) => a.huisnummer.localeCompare(b.huisnummer, 'en', { numeric: true }));
  }

  private filterBusnummers(adressen: IAdresregisterAdres[], searchBusnummer: string):
    IAdresregisterAdres[] | [] {
    return adressen.filter((adres: IAdresregisterAdres) => adres.busnummer
      .includes(searchBusnummer))
      .sort((a, b) => a.busnummer.localeCompare(b.busnummer, 'en', { numeric: true }));
  }
}
