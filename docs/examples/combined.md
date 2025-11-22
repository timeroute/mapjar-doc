---
sidebar_position: 10
---

# 综合示例

结合多种图层和功能的完整示例。

## 功能特性

- 多图层管理
- 图层切换
- 点击查询
- 数据驱动样式
- 覆盖层标注
- 平滑动画

## 完整代码

```typescript
import { 
  MapEngine, 
  TileLayer, 
  VectorLayer, 
  GeoJSONLayer,
  OverlayLayer,
  StyleFunction
} from 'mapjar';

// 创建地图引擎
const engine = new MapEngine('#map', {
  center: [116.4074, 39.9042],
  zoom: 10,
  enableRotation: true,
});

// 1. 底图图层
const baseLayer = new TileLayer(
  'base',
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
);
baseLayer.setZIndex(0);
engine.addLayer(baseLayer);

// 2. GeoJSON 图层
const geoJSONLayer = new GeoJSONLayer('districts', {
  url: 'https://example.com/districts.geojson',
  style: {
    fillColor: [0.2, 0.6, 1.0, 0.3],
    strokeColor: [0.0, 0.4, 0.8, 1.0],
    strokeWidth: 2.0,
  },
});
geoJSONLayer.setZIndex(10);
engine.addLayer(geoJSONLayer);

// 数据驱动样式
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

// 3. 矢量图层（POI）
const poiLayer = new VectorLayer('poi', {
  pointSize: 12.0,
  fillColor: [1.0, 0.0, 0.0, 1.0],
  textField: 'name',
  textFont: '14px Arial',
  textColor: [0, 0, 0, 1],
  textHaloColor: [1, 1, 1, 1],
  textHaloWidth: 2,
});
poiLayer.setZIndex(20);
engine.addLayer(poiLayer);

// 添加一些 POI
const cities = [
  { name: '北京', lon: 116.4074, lat: 39.9042 },
  { name: '天津', lon: 117.2008, lat: 39.0842 },
];

cities.forEach(city => {
  poiLayer.addFeature({
    type: 'point',
    coordinates: [city.lon, city.lat],
    properties: { name: city.name }
  });
});

// 4. 覆盖层
const overlayLayer = new OverlayLayer('overlays');
overlayLayer.setZIndex(30);
engine.addLayer(overlayLayer);

// 点击事件
engine.on('click', (event) => {
  // 查询 POI
  const tolerance = 10 * engine.getCamera().getResolution();
  const results = poiLayer.queryPoint(event.lon, event.lat, tolerance);
  
  if (results.length > 0) {
    const feature = results[0].feature;
    showPopup(feature, event.lon, event.lat);
  }
});

// 显示弹窗
function showPopup(feature, lon, lat) {
  const element = document.createElement('div');
  element.innerHTML = `
    <div style="
      background: white;
      padding: 10px 15px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    ">
      <h3 style="margin: 0 0 5px 0;">${feature.properties.name}</h3>
      <p style="margin: 0; color: #666;">
        ${lon.toFixed(4)}, ${lat.toFixed(4)}
      </p>
    </div>
  `;
  
  overlayLayer.addOverlay({
    id: 'popup',
    element: element,
    position: {
      lon: lon,
      lat: lat,
      offset: [0, -20],
      anchor: [0.5, 1.0],
    },
  });
}

// 图层切换
function toggleLayer(layerId) {
  const layer = engine.getLayer(layerId);
  if (layer) {
    layer.setVisible(!layer.isVisible());
  }
}

// 切换底图
function switchBaseMap(type) {
  engine.removeLayer('base');
  
  let url;
  if (type === 'osm') {
    url = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
  } else if (type === 'dark') {
    url = 'https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png';
  }
  
  const newLayer = new TileLayer('base', url);
  newLayer.setZIndex(0);
  engine.addLayer(newLayer);
}
```

## 下一步

- 查看更多 [示例](./overview)
- 阅读 [API 文档](../api/overview)
