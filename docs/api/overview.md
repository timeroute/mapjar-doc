---
sidebar_position: 1
---

# API 概览

Mapjar 提供了完整的 TypeScript API，所有类和接口都有详细的类型定义。

## 核心类

### MapEngine
地图引擎主类，负责初始化和管理整个地图应用。

```typescript
import { MapEngine } from 'mapjar';

const engine = new MapEngine('#map', {
  center: [116.4074, 39.9042],
  zoom: 10,
});
```

[查看详细文档 →](./map-engine)

### Camera
相机系统，控制地图的视图（中心点、缩放、旋转）。

```typescript
const camera = engine.getCamera();
camera.setCenterLonLat(121.4737, 31.2304);
camera.setZoom(12);
```

[查看详细文档 →](./camera)

### WebGL2Renderer
WebGL2 渲染器，负责图层的渲染。

```typescript
const renderer = engine.getRenderer();
```

[查看详细文档 →](./renderer)

## 图层类

### Layer (基类)
所有图层的基类。

```typescript
abstract class Layer {
  setVisible(visible: boolean): void;
  setOpacity(opacity: number): void;
  setZIndex(zIndex: number): void;
}
```

[查看详细文档 →](./layers/layer)

### TileLayer
瓦片图层，用于渲染瓦片地图。

```typescript
import { TileLayer } from 'mapjar';

const tileLayer = new TileLayer(
  'osm',
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
);
```

[查看详细文档 →](./layers/tile-layer)

### VectorLayer
矢量图层，用于渲染点、线、面要素。

```typescript
import { VectorLayer } from 'mapjar';

const vectorLayer = new VectorLayer('vector', {
  fillColor: [0.2, 0.6, 1.0, 0.4],
  strokeColor: [0.0, 0.4, 0.8, 1.0],
});
```

[查看详细文档 →](./layers/vector-layer)

### GeoJSONLayer
GeoJSON 图层，用于加载和渲染 GeoJSON 数据。

```typescript
import { GeoJSONLayer } from 'mapjar';

const geoJSONLayer = new GeoJSONLayer('geojson', {
  url: 'https://example.com/data.geojson',
});
```

[查看详细文档 →](./layers/geojson-layer)

### ImageLayer
图像图层，用于渲染单张带地理坐标的图像。

```typescript
import { ImageLayer } from 'mapjar';

const imageLayer = new ImageLayer('image', {
  url: 'https://example.com/map.png',
  bounds: {
    minLon: 116.2,
    minLat: 39.8,
    maxLon: 116.6,
    maxLat: 40.1,
  },
});
```

[查看详细文档 →](./layers/image-layer)

### WindLayer
风场图层，用于渲染风场粒子动画。

```typescript
import { WindLayer } from 'mapjar';

const windLayer = new WindLayer('wind', {
  particleCount: 5000,
  speedFactor: 0.5,
});
```

[查看详细文档 →](./layers/wind-layer)

### HeatmapLayer
热力图层，用于渲染连续数值场。

```typescript
import { HeatmapLayer } from 'mapjar';

const heatmapLayer = new HeatmapLayer('heatmap', {
  colorRamp: ['#0000FF', '#00FF00', '#FF0000'],
});
```

[查看详细文档 →](./layers/heatmap-layer)

### OverlayLayer
覆盖层图层，用于在地图上叠加 HTML 元素。

```typescript
import { OverlayLayer } from 'mapjar';

const overlayLayer = new OverlayLayer('overlays');
```

[查看详细文档 →](./layers/overlay-layer)

### CanvasLayer
Canvas 图层，用于自定义 2D 绘制。

```typescript
import { CanvasLayer } from 'mapjar';

class MyCanvasLayer extends CanvasLayer {
  render(gl, viewMatrix) {
    const ctx = this.getContext();
    // 自定义绘制
  }
}
```

[查看详细文档 →](./layers/canvas-layer)

## 工具类

### WebMercatorProjection
Web Mercator 投影工具。

```typescript
import { WebMercatorProjection } from 'mapjar';

const pos = WebMercatorProjection.lonLatToMeters(116.4074, 39.9042);
const lonLat = WebMercatorProjection.metersToLonLat(pos.x, pos.y);
```

[查看详细文档 →](./utils/projection)

### Vec2
二维向量类。

```typescript
import { Vec2 } from 'mapjar';

const v1 = new Vec2(1, 2);
const v2 = new Vec2(3, 4);
const v3 = v1.add(v2);
```

[查看详细文档 →](./utils/vec2)

### StyleFunction
数据驱动样式工具。

```typescript
import { StyleFunction } from 'mapjar';

const colorMap = StyleFunction.createPropertyColorMap(
  'type',
  {
    'residential': [0.8, 0.8, 0.6, 0.5],
    'commercial': [1.0, 0.6, 0.6, 0.5],
  },
  [0.5, 0.5, 0.5, 0.5]
);
```

[查看详细文档 →](./utils/style-function)

### SpatialQuery
空间查询工具。

```typescript
import { SpatialQuery } from 'mapjar';

const results = SpatialQuery.queryPoint(features, lon, lat, tolerance);
```

[查看详细文档 →](./utils/spatial-query)

### EventEmitter
事件发射器。

```typescript
import { EventEmitter } from 'mapjar';

const emitter = new EventEmitter();
emitter.on('event', (data) => console.log(data));
emitter.emit('event', { message: 'Hello' });
```

[查看详细文档 →](./utils/event-emitter)

### WebGLUtils
WebGL 工具函数集合。

```typescript
import { WebGLUtils } from 'mapjar';

const program = WebGLUtils.createProgram(gl, vertexSource, fragmentSource);
const texture = WebGLUtils.createTexture(gl, bitmap);
```

[查看详细文档 →](./utils/webgl-utils)

### TextRenderer
文字渲染工具。

```typescript
import { TextRenderer } from 'mapjar';

const textRenderer = new TextRenderer(gl);
const textureInfo = textRenderer.createTextTexture('Hello World');
```

[查看详细文档 →](./utils/text-renderer)

### Loader
资源加载工具。

```typescript
import { loader } from 'mapjar';

const bitmap = await loader.loadImage('https://example.com/image.png');
const data = await loader.loadJSON('https://example.com/data.json');
```

[查看详细文档 →](./utils/loader)

### ResourceManager
资源管理工具。

```typescript
import { resourceManager } from 'mapjar';

resourceManager.addTexture('my-texture', texture);
const texture = resourceManager.getTexture('my-texture');
```

[查看详细文档 →](./utils/resource-manager)

### BatchRenderer
批量渲染工具。

```typescript
import { BatchRenderer } from 'mapjar';

const batchRenderer = new BatchRenderer();
batchRenderer.addToBatch(feature, style, index);
```

### FrustumCulling
视锥剔除工具。

```typescript
import { FrustumCulling } from 'mapjar';

const visibleFeatures = FrustumCulling.cullFeatures(features, camera);
```

## 类型定义

### MapOptions
地图引擎配置选项。

```typescript
interface MapOptions {
  center?: [number, number];
  zoom?: number;
  rotation?: number;
  enableRotation?: boolean;
  devicePixelRatio?: number;
}
```

### Feature
矢量要素。

```typescript
type Feature = PointFeature | LineFeature | PolygonFeature;

interface PointFeature {
  type: 'point';
  coordinates: [number, number];
  properties?: Record<string, unknown>;
}
```

### VectorStyle
矢量样式。

```typescript
interface VectorStyle {
  fillColor?: [number, number, number, number];
  strokeColor?: [number, number, number, number];
  strokeWidth?: number;
  pointSize?: number;
  textField?: string;
  textFont?: string;
  textColor?: [number, number, number, number];
}
```

## 下一步

- [MapEngine API](./map-engine) - 查看地图引擎的完整 API
- [Camera API](./camera) - 查看相机系统的完整 API
- [图层 API](./layers/layer) - 查看图层系统的完整 API
- [工具类 API](./utils/webgl-utils) - 查看工具函数的完整 API
