import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./zoneerder'),
    PLATFORM.moduleName('./components/referentielaag-autocorrectie'),
    PLATFORM.moduleName('./components/zone-vergelijking-dialog')
  ]);
}
