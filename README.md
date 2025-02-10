(wim) Error: You must provide the URL of lib/mappings.wasm by calling SourceMapConsumer.initialize

```
export NODE_OPTIONS=--no-experimental-fetch
```

(End)

# Oerelia

Onroerend Erfgoed library of common Aurelia components

## Available components

### Tabs

```
<tabs-header></tabs-header>
<tabs-pane></tabs-pane>
<tabs-content></tabs-content>
```

### Autocomplete

```
<autocomplete service.bind="suggestService"
              value.bind="value"
              placeholder="Placeholder"
              label="labelProperty"
              disabled.bind="disabledBoolean">
  <template replace-part="suggestion">
    ${suggestion.property}
  </template>
</autocomplete>

suggestService = { suggest: (value) => this.service.someFunction(value) }
```

### Zoneerder

```
<zoneerder zone.bind="contour"
           adrespunten.bind="adrespunten"
           service-config.bind="serviceConfig"
           disabled.bind="disabledBoolean">
</zoneerder>

serviceConfig = {
  crabpyUrl: string,
  agivGrbUrl: string
}
```

### Spinner

```
<spinner active.bind="showSpinner"></spinner>
```

### Import all plugins at once or seperately

```
aurelia.use.plugin(PLATFORM.moduleName('oerelia'));
OR
aurelia.use.plugin(PLATFORM.moduleName('oerelia/tabs'));
```

---

# Link local build to applications

## Use yalc

`npm i yalc -g`

### In Oerelia cmd

`yalc publish --private` and run this command after every change in Oerelia you want to test

### In other application

`yalc add oerelia@0.0.0` with the correct version number
After publishing Oerelia run:
`yalc update`
