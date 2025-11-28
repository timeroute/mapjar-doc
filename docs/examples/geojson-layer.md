---
sidebar_position: 5
---

# GeoJSON 图层示例

加载和渲染 GeoJSON 数据。

完整的 GeoJSON 图层文档请参考 [GeoJSON 图层](../layers/geojson-layer)。

## 在线演示

<iframe 
  src="/examples/geojson-layer.html" 
  style={{width: '100%', height: '500px', border: '1px solid #ddd', borderRadius: '4px'}}
  title="Mapjar GeoJSON 图层示例"
></iframe>

[在新窗口打开](/examples/geojson-layer.html)

## 从 URL 加载

```typescript
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

查看 [GeoJSON 图层文档](../layers/geojson-layer) 了解更多。
