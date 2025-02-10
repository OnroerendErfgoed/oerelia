import { DialogController, DialogService } from 'aurelia-dialog';
import { autoinject, LogManager, bindable } from 'aurelia-framework';
import { ColDef, GridOptions, IGetRowsParams } from 'ag-grid-community';
import { IAuteur, IAuteurRelatie, IErkenning, IErkenningNew, IRangeHeader, IResponse, IUser, ParamsType } from 'models/public-models';

const log = LogManager.getLogger('auteur-widget');

@autoinject
export class AuteurWidget {
  @bindable auteurType: string;
  @bindable service: unknown;
  @bindable auteursUrl: string;
  @bindable isEigenaarVermogensrecht = false;
  @bindable isBeheerder = false;
  @bindable auteurRelaties?: IAuteurRelatie[];

  public zoekterm: string;
  public collegas: boolean = false;
  mailLink: string;

  private gridOptions = {} as GridOptions;
  private buttonActief = false;
  constructor(public dialogService: DialogService, public controller: DialogController) {}

  public bind() {
    const mailSubject = 'Nieuwe auteur toevoegen';
    const mailBody = `Beste,\n\n` +
    `Gelieve een auteur toe te voegen aan de auteursdatabank met volgende gegevens:\n\n` +
    `Indien de auteur een natuurlijk persoon is:\n` +
    `Naam (verplicht):\n` +
    `Voornaam (verplicht):\n` +
    `e-mail:\n` +
    `Mag het e-mailadres publiek zichtbaar zijn in de toepassing?:\n` +
    `Orcid:\n` +
    `Bedrijf waarvoor auteur werkt:\n\n` +
    `Indien de auteur een organisatie is:\n` +
    `Naam (verplicht):\n` +
    `KBO (verplicht):\n` +
    `e-mail:\n` +
    `Mag het e-mailadres publiek zichtbaar zijn in de toepassing?:`;
    
    this.mailLink = `mailto:ict@onroerenderfgoed.be?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
    this.gridOptions.context = this;
    this.gridOptions.suppressMovableColumns = true;
    this.gridOptions.defaultColDef = {
      resizable: true,
      sortable: true,
    };
    this.gridOptions.headerHeight = 45;
    this.gridOptions.rowHeight = 40;
    this.gridOptions.rowModelType = 'infinite';
    this.gridOptions.rowData = null;
    this.gridOptions.infiniteInitialRowCount = 1;
    this.gridOptions.cacheBlockSize = 50;
    this.gridOptions.domLayout = 'autoHeight';
    this.gridOptions.overlayNoRowsTemplate = '<span class="no-rows">Er zijn geen resultaten</span>';
    this.gridOptions.overlayLoadingTemplate = '<i class="fa fa-pulse fa-spinner"></i>';
    this.gridOptions.enableBrowserTooltips = true;
    this.gridOptions.columnDefs = this.getColumnDefinitions();
    this.gridOptions.rowSelection = 'multiple';
    this.gridOptions.onRowSelected = () => this.buttonActief = this.isAnyRowSelected();
  }

  public async setRowData() {
    const dataSource = {
      rowCount: null,
      getRows: async (params) => {
        const sortParameters = this.setParameters(params);
        params.context.gridOptions.api.showLoadingOverlay();
        const data 
          = await params.context.service.getAll(sortParameters, { start: params.startRow, end: params.endRow } as IRangeHeader)
                                        .catch((e) => log.error(e));

        if (data) {
          params.successCallback(data.content, data.lastRow);
          if (data.content.length <= 0) {
            params.context.gridOptions.api.showNoRowsOverlay();
            params.context.gridOptions.api.setInfiniteRowCount(0, false);
          } else {
            params.context.gridOptions.api.hideOverlay();
          }
        } else {
          params.context.gridOptions.api.showNoRowsOverlay();
        }
        params.context.resize();
      }
    };
    this.gridOptions.api.setDatasource(dataSource);
  }

  public onGridReady() {
    this.setRowData();
  }

  public resize() {
    this.gridOptions.api.sizeColumnsToFit();
    this.gridOptions.api.resetRowHeights();
    this.gridOptions.api.sizeColumnsToFit();
  }

  public refresh() {
    this.gridOptions.api.refreshInfiniteCache();
  }

  public search() {
    this.gridOptions.api.purgeInfiniteCache();
  }

  public addAuteur() {
    if (!this.buttonActief) {
      return;
    }

    const selectedAuteurs = this.gridOptions.api.getSelectedRows() as IAuteur[];
    this.controller.ok(selectedAuteurs);
  }

  private getColumnDefinitions(): ColDef[] {
    return [
      {
        headerName: '',
        field: 'select',
        checkboxSelection: true,
        headerCheckboxSelection: true,
        width: 10,
      },
      { headerName: 'ID', field: 'id', sort: 'desc', width: 50 },
      { headerName: 'Naam', colId: 'naam', field: 'omschrijving', width: 200 },
      { headerName: 'Identificatie', colId: 'identificatie', field: 'identificatie', width: 200 },
      { headerName: 'Huidige relaties', field: 'relaties', sortable: false,
      cellRenderer: this.huidigeRelatiesCellRenderer, width: 150 },
      { headerName: '', cellClass: 'acties-cell', sortable: false,
      cellRenderer: this.actiesCellRenderer, minWidth: 75, maxWidth: 75 }
    ];
  }

  private actiesCellRenderer(params) {
    if (params.data) {
      const container = document.createElement('span');
      const openLink = document.createElement('a');
      openLink.setAttribute('target', '_blank');
      openLink.setAttribute('href', params.data.uri);
      openLink.setAttribute('title', 'Bekijk deze auteur in de auteursdatabank');
      openLink.setAttribute('style', 'display: inline-flex');

      const openElement = document.createElement('i');
      openElement.className = 'fa fa-eye';
      openLink.appendChild(openElement);
      container.appendChild(openLink);
      return container;
    }
  }

  private huidigeRelatiesCellRenderer(params) {
    if (params.value && params.value.length > 0) {
      const ul = document.createElement('ul');
      const title = params.value.map((item) => '- ' + item.naar_omschrijving).join('\n');
      ul.setAttribute('title', title);

      if (params.value.length < 3) {
        params.value.forEach((item) => {
          const li = document.createElement('li');
          li.innerText = item.naar_omschrijving;
          ul.appendChild(li);
        });
      } else {
        const li1 = document.createElement('li');
        li1.innerText = params.value[0].naar_omschrijving;
        const li2 = document.createElement('li');
        li2.innerText = `... en nog ${params.value.length - 1} andere`;
        ul.append(li1, li2);
      }
      return ul;
    }
    return '';
  }

  private setParameters(params: IGetRowsParams) {
    const paramsObj = {
      tekst: this.zoekterm ? this.zoekterm + '*' : null,
      sort: null,
      type: this.auteurType
    };

    if (this.collegas) {
      console.log(this.collegas);
      const isDeelVanRelaties = this.filterValidRelaties(this.auteurRelaties);
      const omschrijvingen = isDeelVanRelaties?.map((isDeelVanRelatie) => isDeelVanRelatie.naar_uri);
      paramsObj['relatie'] = '[' + omschrijvingen.join(',') + ']';
    }

    if (params.sortModel.length) {
      const sortModel = params.sortModel[0];
      paramsObj.sort = ((sortModel.sort === 'asc') ? '' : '-') + sortModel.colId;
    }

    return paramsObj;
  }

  isAnyRowSelected() {
    return this.gridOptions.api && this.gridOptions.api.getSelectedRows().length > 0;
  }

  private filterValidRelaties(relaties: IAuteurRelatie[]): IAuteurRelatie[] {
    const today = new Date();

    return relaties.filter(rel =>
      rel.type.id === 1 &&
      (rel.startdatum === null || new Date(rel.startdatum) <= today) &&
      (rel.einddatum === null || new Date(rel.einddatum) >= today)
    );
  }
}
