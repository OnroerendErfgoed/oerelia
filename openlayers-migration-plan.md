# Migration Plan: OpenLayers 4 → 10, proj4 2.4 → 2.20, jsts 2.0 → 2.12

## Overview

| Package | Current | Target | Notes |
|---|---|---|---|
| `openlayers` | 4.2.0 | removed | replaced by `ol` |
| `ol` | — | 10.8.0 | new package name |
| `@types/openlayers` | 4.6.18 | removed | types bundled in `ol` |
| `proj4` | 2.4.3 | 2.20.4 | API compatible |
| `@types/proj4` | 2.3.4 | 2.19.0 | update to match |
| `jsts` | 2.0.2 | 2.12.1 | API compatible |

---

## Step 1 — Update `package.json`

```diff
- "openlayers": "^4.2.0",
+ "ol": "^10.8.0",
  ...
- "proj4": "^2.4.3",
+ "proj4": "^2.20.4",
  ...
- "jsts": "2.0.2",
+ "jsts": "^2.12.1",
```

```diff
- "@types/openlayers": "^4.6.18",
  ...
- "@types/proj4": "^2.3.4",
+ "@types/proj4": "^2.19.0",
```

> **Note:** `ol` v5+ ships its own `.d.ts` files. The separate `@types/openlayers` package must be removed; keeping it causes conflicts.

---

## Step 2 — `tsconfig.json` – update `moduleResolution`

OL10 uses package `exports` maps. TypeScript's legacy `"node"` resolution ignores them. Update to `"bundler"` (TS 5+) so deep imports like `ol/Map`, `ol/layer/Tile`, etc. resolve correctly via the package's export map.

```diff
- "moduleResolution": "node",
+ "moduleResolution": "bundler",
```

> If `"bundler"` causes other issues with the Aurelia CLI / RequireJS build, use `"node16"` as an alternative. Both recognise the `exports` field while still resolving `.d.ts` declarations.

---

## Step 3 — Import pattern: namespace → deep imports

The biggest change is replacing the single namespace import with dedicated sub-path imports.

### Before (OL 4)
```ts
import * as ol from 'openlayers';   // map-util.ts, ol-geolocate.ts, etc.
import ol from 'openlayers';        // base-map.ts, ol-map.ts
```

### After (OL 10) — one import per class/function used
```ts
import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Geolocation from 'ol/Geolocation';

import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import LayerGroup from 'ol/layer/Group';
import BaseLayer from 'ol/layer/Base';

import VectorSource from 'ol/source/Vector';
import WMTSSource from 'ol/source/WMTS';
import TileWMSSource from 'ol/source/TileWMS';

import WMTSTileGrid from 'ol/tilegrid/WMTS';

import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import LinearRing from 'ol/geom/LinearRing';
import Polygon from 'ol/geom/Polygon';
import MultiPolygon from 'ol/geom/MultiPolygon';
import MultiPoint from 'ol/geom/MultiPoint';
import MultiLineString from 'ol/geom/MultiLineString';
import GeometryCollection from 'ol/geom/GeometryCollection';
import Circle from 'ol/geom/Circle';
import { fromCircle } from 'ol/geom/Polygon';

import GeoJSON from 'ol/format/GeoJSON';
import WKT from 'ol/format/WKT';

import Projection from 'ol/proj/Projection';
import { get as getProjection, transform } from 'ol/proj';
import { register } from 'ol/proj/proj4';       // replaces ol.proj.setProj4

import { getWidth, getTopLeft, getCenter } from 'ol/extent';
import type { Extent } from 'ol/extent';
import type { Coordinate } from 'ol/coordinate';

import { defaults as defaultControls } from 'ol/control';
import Control from 'ol/control/Control';
import ScaleLine from 'ol/control/ScaleLine';
import Attribution from 'ol/control/Attribution';
import Zoom from 'ol/control/Zoom';
import Rotate from 'ol/control/Rotate';
import ZoomToExtent from 'ol/control/ZoomToExtent';

import Draw from 'ol/interaction/Draw';
import type { Type as GeometryType } from 'ol/geom/Geometry';

import { Style, Fill, Stroke, Text } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
```

---

## Step 4 — Breaking API changes, file by file

### 4.1 `src/gis-utils/map-util.ts`

| OL 4 | OL 10 | Notes |
|---|---|---|
| `new ol.Attribution({ html: '...' })` | `'...'` (plain string) | `ol.Attribution` class removed; attributions are now strings |
| `ol.control.defaults({ attributionOptions: { collapsible: false }, rotate: false, zoom: true })` | `defaultControls({ attribution: false, rotate: false, zoom: true })` + add `new Attribution({ collapsible: false })` to map controls | `attributionOptions` removed |
| `ol.extent.getWidth(...)` | `getWidth(...)` | direct import |
| `ol.extent.getTopLeft(...)` | `getTopLeft(...)` | direct import |
| `ol.extent.getCenter(...)` | `getCenter(...)` | direct import |
| `ol.tilegrid.WMTS` | `WMTSTileGrid` | deep import |
| `ol.source.WMTS` | `WMTSSource` | deep import |
| `ol.source.TileWMS` | `TileWMSSource` | deep import |
| `ol.source.Vector` | `VectorSource` | deep import |
| `ol.layer.Layer` | `TileLayer` / `VectorLayer` | use concrete type |
| `ol.layer.Tile` | `TileLayer` | deep import |
| `ol.layer.Vector` | `VectorLayer` | deep import |
| `new jsts.io.OL3Parser(null, ol)` | `new OL3Parser()` + `parser.inject(...)` | second constructor arg (OL namespace) removed |
| `ol.Map logo: false` | remove option | option no longer exists |
| `ol.control.Control.call(this, opts)` | remove — `super(opts)` is sufficient | OL4 workaround for class inheritance |

**Specific change — `bufferZone` in `map-util.ts`:**
```diff
- const parser = new jsts.io.OL3Parser(null, ol);
+ const parser = new jsts.io.OL3Parser();
+ parser.inject(Point, LineString, LinearRing, Polygon, MultiPoint, MultiLineString, MultiPolygon);
```

**Specific change — attributions in `createGrbLayer` / `createNgiLayer`:**
```diff
- attributions: [
-   new ol.Attribution({
-     html: '© <a href="...">Informatie Vlaanderen</a>'
-   })
- ]
+ attributions: '© <a href="...">Informatie Vlaanderen</a>'
```

---

### 4.2 `src/gis-utils/components/ol-geolocate.ts`

| OL 4 | OL 10 |
|---|---|
| `import * as ol from 'openlayers'` | named deep imports |
| `extends ol.control.Control` | `extends Control` |
| `ol.layer.Vector`, `ol.source.Vector` | `VectorLayer`, `VectorSource` |
| `ol.Feature`, `ol.geom.Point` | `Feature`, `Point` |
| `ol.style.Style/Fill/Stroke/Circle` | `Style`, `Fill`, `Stroke`, `CircleStyle` |
| `ol.proj.transform(...)` | `transform(...)` from `ol/proj` |
| `ol.control.Control.call(this, opts)` | remove — keep only `super(opts)` |

---

### 4.3 `src/gis-utils/components/ol-layerswitcher.ts`

| OL 4 | OL 10 |
|---|---|
| `extends ol.control.Control` | `extends Control` |
| `ol.control.Control.call(this, opts)` | remove |
| `setMap(map)` — `ol.control.Control.prototype.setMap.call(this, map)` | `super.setMap(map)` |

---

### 4.4 `src/zoneerder/components/base-map.ts`

| OL 4 | OL 10 |
|---|---|
| `import ol from 'openlayers'` | named deep imports |
| `import proj4 from 'proj4'` | unchanged |
| `ol.proj.setProj4(proj4)` | `register(proj4)` (import from `ol/proj/proj4`) |
| `new ol.format.GeoJSON({ defaultDataProjection: ..., featureProjection: ... })` | `new GeoJSON({ dataProjection: ..., featureProjection: ... })` — `defaultDataProjection` renamed to `dataProjection` |
| `ol.control.defaults({ attribution: false, rotate: false, zoom: false })` | `defaultControls({ attribution: false, rotate: false, zoom: false })` |
| `ol.Extent`, `ol.Coordinate` | `Extent` from `ol/extent`, `Coordinate` from `ol/coordinate` |
| `ol.proj.Projection` | `Projection` from `ol/proj/Projection` |
| `ol.layer.Layer` return type | `TileLayer` / `VectorLayer` / `BaseLayer` |
| `ol.layer.Group` | `LayerGroup` from `ol/layer/Group` |
| All other `ol.*` | corresponding named imports |

**Key change — projections setup:**
```diff
- ol.proj.setProj4(proj4);
- const projection: ol.proj.Projection = ol.proj.get('EPSG:31370');
+ register(proj4);
+ const projection = getProjection('EPSG:31370') as Projection;
```

**Key change — GeoJSON constructor:**
```diff
- this.geoJsonFormatter = new ol.format.GeoJSON({
-   defaultDataProjection: this.mapProjection,
-   featureProjection: this.mapProjection
- });
+ this.geoJsonFormatter = new GeoJSON({
+   dataProjection: this.mapProjection,
+   featureProjection: this.mapProjection
+ });
```

---

### 4.5 `src/zoneerder/components/ol-map.ts`

| OL 4 | OL 10 |
|---|---|
| `import ol from 'openlayers'` | named deep imports |
| `ol.format.WKT` | `WKT` from `ol/format/WKT` |
| `ol.geom.GeometryType` (type) | `Type` from `ol/geom/Geometry` (or plain `string`) |
| `ol.geom.Polygon.fromCircle(circleGeometry)` | `fromCircle(circleGeometry)` (import `fromCircle` from `ol/geom/Polygon`) |
| `new ol.geom.MultiPolygon([], 'XY')` | `new MultiPolygon([], 'XY')` |
| `ol.layer.Layer` | `BaseLayer` from `ol/layer/Base` |
| `ol.Feature`, `ol.source.Vector`, `ol.geom.*` | named imports |
| `ol.Geolocation` | `Geolocation` from `ol/Geolocation` |
| `ol.interaction.Draw` | `Draw` from `ol/interaction/Draw` |
| `(map as any).removeEventListener('click')` | `map.un('click', handler)` — the OL event system never used `removeEventListener`; must store and unsubscribe the handler |

> **Important:** The existing `resetSelect()` uses `(this.map as any).removeEventListener('click')` which was already incorrect but silently ignored in OL4. In OL10 this must be refactored: store the click handler reference and call `this.map.un('click', handler)`.

**Refactor `resetSelect()` and all `map.on('click', ...)` usages:**
```ts
private clickHandler: ((evt: any) => void) | null = null;

private resetSelect() {
  this.selectPerceel = false;
  this.selectGebouw = false;
  this.selectKunstwerk = false;
  if (this.clickHandler) {
    this.map.un('click', this.clickHandler);
    this.clickHandler = null;
  }
}
```

Replace every `this.map.on('click', (evt: any) => { ... })` with:
```ts
this.clickHandler = (evt: any) => { ... };
this.map.on('click', this.clickHandler);
```

---

### 4.6 `src/zoneerder/components/oe-fullscreen.ts`

| OL 4 | OL 10 |
|---|---|
| `import * as ol from 'openlayers'` | `import Control from 'ol/control/Control'` |
| `import { olx } from 'openlayers'` | remove — `olx` namespace gone |
| `FullScreenOptions = olx.control.FullScreenOptions` | `import type { Options as FullScreenOptions } from 'ol/control/FullScreen'` |
| `extends ol.control.Control` | `extends Control` |
| `ol.control.Control.call(this, opts)` | remove |
| `ol.layer.Vector` | `VectorLayer` (field only used as type) |

**Replacement type:**
```diff
- import { olx } from 'openlayers';
- import FullScreenOptions = olx.control.FullScreenOptions;
+ import type { Options as FullScreenOptions } from 'ol/control/FullScreen';
```

---

### 4.7 `src/zoneerder/components/ol-layerswitcher.ts`

| OL 4 | OL 10 |
|---|---|
| `import * as ol from 'openlayers'` | `import Control from 'ol/control/Control'`, `import BaseLayer from 'ol/layer/Base'` |
| `extends ol.control.Control` | `extends Control` |
| `ol.control.Control.call(this, opts)` | remove |
| `ol.control.Control.prototype.setMap.call(this, map)` | `super.setMap(map)` |
| `ol.layer.Base` | `BaseLayer` from `ol/layer/Base` |

---

### 4.8 `src/zoneerder/components/referentielaag-map.ts`

| OL 4 | OL 10 |
|---|---|
| `import * as ol from 'openlayers'` | named imports (same as base-map pattern) |
| `ol.layer.Layer` | `BaseLayer` from `ol/layer/Base` |

Since `ReferentieLaagMap extends BaseMap`, many types are already covered by base-map changes.

---

## Step 5 — jsts `OL3Parser` with OL 10

jsts 2.12 ships the same `OL3Parser` API. The only difference is how you give it the OL geometry classes.

### All usages that need `inject()` added

**`mergePolygons`, `intersectPolygons`, `subtractPolygons` in `map-util.ts`:**
```diff
- const parser = new jsts.io.OL3Parser();
- parser.inject(ol.geom.Point, ol.geom.LineString, ol.geom.LinearRing, ol.geom.Polygon,
-   ol.geom.MultiPoint, ol.geom.MultiLineString, ol.geom.MultiPolygon);
+ const parser = new jsts.io.OL3Parser();
+ parser.inject(Point, LineString, LinearRing, Polygon,
+   MultiPoint, MultiLineString, MultiPolygon);
```

**`bufferZone` in `map-util.ts`:**
```diff
- const parser = new jsts.io.OL3Parser(null, ol);
+ const parser = new jsts.io.OL3Parser();
+ parser.inject(Point, LineString, LinearRing, Polygon,
+   MultiPoint, MultiLineString, MultiPolygon);
```

**`intersectPolygons` already uses `inject` but passes `ol.geom.*` — update to named imports.**

---

## Step 6 — proj4 changes

proj4 2.20.4 has a backward-compatible API. No code changes are needed other than:

- The import `import proj4 from 'proj4'` in `base-map.ts` continues to work.
- `proj4.defs(...)` API unchanged.
- **The only change is at the OL integration point:**  
  Replace `ol.proj.setProj4(proj4)` with `register(proj4)` as described in §4.4.

---

## Step 7 — Execution order

1. `yarn remove openlayers @types/openlayers`
2. `yarn add ol@10.8.0 proj4@2.20.4 jsts@2.12.1`
3. `yarn add --dev @types/proj4@2.19.0`
4. Update `tsconfig.json` `moduleResolution` to `"bundler"`
5. Update files in this order (each depends on the previous):
   1. `src/gis-utils/projection-util.ts` — no OL imports, no changes needed
   2. `src/gis-utils/components/ol-geolocate.ts`
   3. `src/gis-utils/components/ol-layerswitcher.ts` (gis-utils version)
   4. `src/gis-utils/map-util.ts`
   5. `src/zoneerder/components/oe-fullscreen.ts`
   6. `src/zoneerder/components/ol-layerswitcher.ts` (zoneerder version)
   7. `src/zoneerder/components/base-map.ts`
   8. `src/zoneerder/components/referentielaag-map.ts`
   9. `src/zoneerder/components/ol-map.ts`
6. Run `npm run build` (plugin build) and fix TypeScript errors
7. Run `npm start` (dev-app with RequireJS) and verify map rendering

---

## Step 8 — Known risks and additional notes

### RequireJS / Aurelia CLI dev-app bundler
The dev-app (`aurelia_project/aurelia.json`) uses RequireJS. OL10 ships as ES modules. There are two options:
- **Option A (recommended):** Rely on the fact that TypeScript compiles OL10 imports to AMD `define([...])` calls — the compiled output of each `ol/Map`, `ol/layer/Tile`, etc. will reference CommonJS/AMD-compatible paths. This typically works with the Aurelia CLI gulp build.
- **Option B (fallback):** If the RequireJS bundler fails, switch the dev-app to Vite or Webpack, which natively handle ES module deep imports. The **plugin build itself is unaffected** as it uses gulp-typescript directly.

### `(map as any).removeEventListener('click')` in `ol-map.ts`
This was already a bug in OL4 (OL's event system is not the DOM's EventTarget). Refactor `resetSelect()` to store click-handler references as shown in §4.5.

### `drawZone.removeEventListener('drawend')` in `ol-map.ts`
Same issue — `drawZone` is an OL `Draw` interaction, not a DOM element. Store and unsubscribe the `drawend` handler via `interaction.un('drawend', handler)`.

### `ol.Geolocation` deprecated in OL 8+
`Geolocation` from `ol/Geolocation` still exists in OL10 but is deprecated. The `geoLocationClick()` method in `ol-map.ts` still works. No immediate action required, but consider migrating to the browser's native `navigator.geolocation` API in a follow-up.

### `ol.control.defaults` — attribution handling
In OL10, if you pass `attribution: false` to `defaultControls()` and then manually add `new Attribution({ collapsible: false })`, make sure the attribution control isn't duplicated. The current `base-map.ts` already adds `Attribution` manually after calling `ol.control.defaults({ attribution: false })` — this pattern stays the same, just with the new import names.

### Type strictness
OL10 types are stricter than `@types/openlayers`. Expect some `any` casts to become errors. In particular:
- `ol.layer.Layer` was used loosely; OL10 types distinguish `BaseLayer`, `Layer<Source>`, `TileLayer<TileSource>`, etc.
- `ol.geom.GeometryType` is gone; string union types are used instead.
- `ol.Coordinate` / `ol.Extent` are now `import type` from sub-paths.

