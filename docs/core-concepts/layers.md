---
sidebar_position: 3
---

# 图层系统

图层（Layer）是 Mapjar 中组织和渲染地图内容的基本单位。每个图层负责渲染特定类型的数据。

## 图层类型

Mapjar 提供以下图层类型：

| 图层类型 | 用途 | 示例 |
|---------|------|------|
| **TileLayer** | 瓦片地图 | OSM、Google Maps |
| **VectorLayer** | 矢量要素 | 点、线、面 |
| **GeoJSONLayer** | GeoJSON 数据 | 行政区划、POI |
| **ImageLayer** | 单张图像 | 历史地图、卫星影像 |
| **WindLayer** | 风场动画 | 风速、洋流 |
| **HeatmapLayer** | 热力图 | 温度、降水 |
| **OverlayLayer** | HTML 覆盖层 | 标注、弹窗 |
| **CanvasLayer** | 自定义绘制 | 特殊效果 |

## 图层管理

### 添加图层

```typescript
import { TileLayer } from 'mapjar';

const tileLayer = new TileLayer(
  'osm', // 图层 ID（唯一）
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
);

engine.addLayer(tileLayer);
```

### 获取图层

```typescript
const layer = engine.getLayer('osm');
if (layer) {
  console.log('找到图层:', layer.getId());
}
```

### 移除图层

```typescript
engine.removeLayer('osm');
```

## 图层属性

所有图层都继承自 `Layer` 基类，支持以下属性：

### 可见性

```typescript
// 设置可见性
layer.setVisible(false); // 隐藏图层
layer.setVisible(true);  // 显示图层

// 获取可见性
const visible = layer.isVisible();
console.log(visible); // true 或 false
```

### 透明度

```typescript
// 设置透明度（0.0 - 1.0）
layer.setOpacity(0.5); // 半透明

// 获取透明度
const opacity = layer.getOpacity();
console.log(opacity); // 0.5
```

### 层级（Z-Index）

```typescript
// 设置层级（数值越大越靠上）
layer.setZIndex(10);

// 获取层级
const zIndex = layer.getZIndex();
console.log(zIndex); // 10
```

图层按 Z-Index 从小到大渲染，Z-Index 相同时按添加顺序渲染。

### 设备像素比

```typescript
// 设置设备像素比（用于高 DPI 屏幕）
layer.setDevicePixelRatio(2);

// 获取设备像素比
const dpr = layer.getDevicePixelRatio();
console.log(dpr); // 2
```

## 图层渲染顺序

图层的渲染顺序由 Z-Index 决定：

```typescript
const baseLayer = new TileLayer('base', 'https://...'); // Z-Index: 0 (默认)
const vectorLayer = new VectorLayer('vector'); // Z-Index: 0 (默认)
const overlayLayer = new OverlayLayer('overlay'); // Z-Index: 0 (默认)

// 设置渲染顺序
baseLayer.setZIndex(0);    // 底层
vectorLayer.setZIndex(10); // 中层
overlayLayer.setZIndex(20); // 顶层

engine.addLayer(baseLayer);
engine.addLayer(vectorLayer);
engine.addLayer(overlayLayer);
```

## 图层分类

### 栅格图层

栅格图层渲染基于像素的图像数据：

- **TileLayer**：瓦片地图
- **ImageLayer**：单张图像
- **HeatmapLayer**：热力图

```typescript
import { TileLayer, ImageLayer, HeatmapLayer } from 'mapjar';

// 瓦片图层
const tileLayer = new TileLayer('osm', 'https://...');

// 图像图层
const imageLayer = new ImageLayer('historical', {
  url: 'https://example.com/map.png',
  bounds: {
    minLon: 116.2,
    minLat: 39.8,
    maxLon: 116.6,
    maxLat: 40.1,
  },
});

// 热力图层
const heatmapLayer = new HeatmapLayer('temperature', {
  colorRamp: ['#0000FF', '#00FF00', '#FF0000'],
});
```

### 矢量图层

矢量图层渲染基于几何的要素数据：

- **VectorLayer**：点、线、面要素
- **GeoJSONLayer**：GeoJSON 格式数据

```typescript
import { VectorLayer, GeoJSONLayer } from 'mapjar';

// 矢量图层
const vectorLayer = new VectorLayer('vector', {
  fillColor: [0.2, 0.6, 1.0, 0.4],
  strokeColor: [0.0, 0.4, 0.8, 1.0],
  strokeWidth: 2.0,
});

// GeoJSON 图层
const geoJSONLayer = new GeoJSONLayer('geojson', {
  url: 'https://example.com/data.geojson',
});
```

### 特效图层

特效图层提供动态可视化效果：

- **WindLayer**：风场粒子动画
- **CanvasLayer**：自定义 Canvas 绘制

```typescript
import { WindLayer, CanvasLayer } from 'mapjar';

// 风场图层
const windLayer = new WindLayer('wind', {
  particleCount: 5000,
  speedFactor: 0.5,
});

// 自定义 Canvas 图层
class MyCanvasLayer extends CanvasLayer {
  render(gl, viewMatrix) {
    const ctx = this.getContext();
    ctx.fillStyle = 'red';
    ctx.fillRect(100, 100, 200, 200);
  }
}
```

### 覆盖层

覆盖层在地图上叠加 HTML 元素：

- **OverlayLayer**：HTML 元素覆盖层

```typescript
import { OverlayLayer } from 'mapjar';

const overlayLayer = new OverlayLayer('overlays');

const element = document.createElement('div');
element.innerHTML = '<h3>北京</h3>';

overlayLayer.addOverlay({
  id: 'beijing',
  element: element,
  position: {
    lon: 116.4074,
    lat: 39.9042,
  },
});
```

## 图层组合示例

```typescript
import { 
  MapEngine, 
  TileLayer, 
  VectorLayer, 
  GeoJSONLayer,
  OverlayLayer 
} from 'mapjar';

const engine = new MapEngine('#map', {
  center: [116.4074, 39.9042],
  zoom: 10,
});

// 1. 底图（Z-Index: 0）
const baseLayer = new TileLayer(
  'base',
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
);
baseLayer.setZIndex(0);
engine.addLayer(baseLayer);

// 2. GeoJSON 图层（Z-Index: 10）
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

// 3. 矢量图层（Z-Index: 20）
const vectorLayer = new VectorLayer('poi', {
  pointSize: 12.0,
  fillColor: [1.0, 0.0, 0.0, 1.0],
});
vectorLayer.setZIndex(20);
engine.addLayer(vectorLayer);

// 4. 覆盖层（Z-Index: 30）
const overlayLayer = new OverlayLayer('labels');
overlayLayer.setZIndex(30);
engine.addLayer(overlayLayer);
```

## 图层性能优化

### 1. 合理使用图层数量

- 避免创建过多图层（建议 < 20 个）
- 相同类型的数据尽量放在同一图层

### 2. 控制要素数量

- 矢量图层建议 < 10000 个要素
- 使用空间查询过滤不可见要素

### 3. 按需加载

- 使用 `setVisible(false)` 隐藏不需要的图层
- 动态添加/移除图层

### 4. 优化渲染

- 设置合适的 Z-Index，减少重绘
- 使用批量渲染（VectorLayer 自动支持）

## 下一步

- [瓦片图层](../layers/tile-layer) - 学习瓦片图层的使用
- [矢量图层](../layers/vector-layer) - 学习矢量图层的使用
- [事件系统](./events) - 了解如何监听图层事件
