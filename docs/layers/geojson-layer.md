---
sidebar_position: 3
---

# GeoJSON 图层 (GeoJSONLayer)

GeoJSON 图层用于加载和渲染 GeoJSON 格式的数据。

## 基本用法

```typescript
import { GeoJSONLayer } from 'mapjar';

const geoJSONLayer = new GeoJSONLayer('geojson', {
  url: 'https://example.com/data.geojson',
  style: {
    fillColor: [0.2, 0.6, 1.0, 0.4],
    strokeColor: [0.0, 0.4, 0.8, 1.0],
    strokeWidth: 2.0,
  }
});

engine.addLayer(geoJSONLayer);
await geoJSONLayer.loadFromURL();
```

## 从 URL 加载

```typescript
const geoJSONLayer = new GeoJSONLayer('geojson', {
  url: 'https://example.com/data.geojson',
});

await geoJSONLayer.loadFromURL();
```

## 直接加载数据

```typescript
const geoJSONLayer = new GeoJSONLayer('geojson', {
  data: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [116.4074, 39.9042]
        },
        properties: { name: '北京' }
      }
    ]
  }
});
```

## 数据驱动样式

```typescript
import { StyleFunction } from 'mapjar';

geoJSONLayer.setDataDrivenStyle({
  fillColor: StyleFunction.createPropertyColorMap(
    'type',
    {
      'residential': [0.8, 0.8, 0.6, 0.5],
      'commercial': [1.0, 0.6, 0.6, 0.5],
      'park': [0.4, 0.8, 0.4, 0.5],
    },
    [0.5, 0.5, 0.5, 0.5]
  )
});
```

## 支持的几何类型

- Point
- MultiPoint
- LineString
- MultiLineString
- Polygon
- MultiPolygon
- GeometryCollection

## 下一步

- [数据驱动样式](../advanced/data-driven-styles) - 学习更多样式技巧
- [空间查询](../advanced/spatial-query) - 查询 GeoJSON 要素
