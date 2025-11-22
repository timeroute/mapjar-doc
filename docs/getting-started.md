---
sidebar_position: 3
---

# 快速开始

本指南将帮助你快速创建第一个 Mapjar 地图应用。

## 创建地图容器

首先，在 HTML 中创建一个 canvas 元素作为地图容器：

```html
<canvas id="map" style="width: 100%; height: 600px;"></canvas>
```

## 初始化地图引擎

```typescript
import { MapEngine } from 'mapjar';

const engine = new MapEngine('#map', {
  center: [116.4074, 39.9042], // [经度, 纬度] - 北京
  zoom: 10,                     // 缩放级别 (0-22)
  rotation: 0,                  // 旋转角度（弧度）
  enableRotation: true,         // 启用右键旋转
});
```

## 添加瓦片图层

```typescript
import { TileLayer } from 'mapjar';

// OpenStreetMap 瓦片
const osmLayer = new TileLayer(
  'osm',
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
);
engine.addLayer(osmLayer);
```

## 添加矢量要素

```typescript
import { VectorLayer } from 'mapjar';

// 创建矢量图层
const vectorLayer = new VectorLayer('vector', {
  fillColor: [0.2, 0.6, 1.0, 0.4],
  strokeColor: [0.0, 0.4, 0.8, 1.0],
  strokeWidth: 2.0,
  pointSize: 10.0,
});

// 添加点要素
vectorLayer.addFeature({
  type: 'point',
  coordinates: [116.4074, 39.9042],
  properties: { name: '北京' }
});

// 添加线要素
vectorLayer.addFeature({
  type: 'line',
  coordinates: [
    [116.4074, 39.9042],
    [121.4737, 31.2304]
  ],
  properties: { name: '北京-上海' }
});

// 添加面要素
vectorLayer.addFeature({
  type: 'polygon',
  coordinates: [[
    [116.2, 39.8],
    [116.6, 39.8],
    [116.6, 40.0],
    [116.2, 40.0],
    [116.2, 39.8]
  ]],
  properties: { name: '区域' }
});

engine.addLayer(vectorLayer);
```

## 监听事件

```typescript
// 监听点击事件
engine.on('click', (event) => {
  console.log('点击位置:', event.lon, event.lat);
  console.log('屏幕坐标:', event.screenX, event.screenY);
});

// 监听鼠标移动事件
engine.on('mousemove', (event) => {
  console.log('鼠标位置:', event.lon, event.lat);
});
```

## 相机控制

```typescript
const camera = engine.getCamera();

// 设置中心点
camera.setCenterLonLat(121.4737, 31.2304); // 上海

// 设置缩放级别
camera.setZoom(12);

// 设置旋转角度
camera.setRotation(Math.PI / 4); // 45度

// 平移（像素）
camera.pan(100, 100);

// 缩放到指定点
camera.zoomTo(1, { x: 400, y: 300 });
```

## 平滑动画

```typescript
// 飞行到指定位置
engine.flyTo(121.4737, 31.2304, 12, {
  duration: 2000 // 2秒
});

// 适配到边界
engine.fitBounds({
  minLon: 73.5,
  minLat: 18.2,
  maxLon: 135.0,
  maxLat: 53.5
}, {
  duration: 2000,
  padding: 50
});
```

## 完整示例

```typescript
import { MapEngine, TileLayer, VectorLayer } from 'mapjar';

// 创建地图引擎
const engine = new MapEngine('#map', {
  center: [116.4074, 39.9042],
  zoom: 10,
  enableRotation: true,
});

// 添加瓦片图层
const tileLayer = new TileLayer(
  'osm',
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    tileScale: 1.0,
    wrapX: true,
    fadeInDuration: 200,
  }
);
engine.addLayer(tileLayer);

// 添加矢量图层
const vectorLayer = new VectorLayer('vector', {
  fillColor: [0.2, 0.6, 1.0, 0.4],
  strokeColor: [0.0, 0.4, 0.8, 1.0],
  strokeWidth: 2.0,
  pointSize: 10.0,
  textField: 'name',
  textFont: '14px Arial',
  textColor: [0, 0, 0, 1],
  textHaloColor: [1, 1, 1, 1],
  textHaloWidth: 2,
});

// 添加一些城市
const cities = [
  { name: '北京', lon: 116.4074, lat: 39.9042 },
  { name: '上海', lon: 121.4737, lat: 31.2304 },
  { name: '广州', lon: 113.2644, lat: 23.1291 },
  { name: '深圳', lon: 114.0579, lat: 22.5431 },
];

cities.forEach(city => {
  vectorLayer.addFeature({
    type: 'point',
    coordinates: [city.lon, city.lat],
    properties: { name: city.name }
  });
});

engine.addLayer(vectorLayer);

// 监听点击事件
engine.on('click', (event) => {
  console.log(`点击位置: ${event.lon.toFixed(4)}, ${event.lat.toFixed(4)}`);
});

// 2秒后飞到上海
setTimeout(() => {
  engine.flyTo(121.4737, 31.2304, 12, { duration: 2000 });
}, 2000);
```

## 下一步

- [核心概念](./core-concepts/projection) - 深入了解投影、相机、图层等核心概念
- [图层系统](./layers/tile-layer) - 学习各种图层类型的使用
- [API 参考](./api/map-engine) - 查看完整的 API 文档
- [示例](./examples/basic) - 浏览更多示例代码
