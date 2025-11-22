---
sidebar_position: 2
---

# 矢量图层 (VectorLayer)

矢量图层用于渲染点、线、面等矢量要素。

## 基本用法

```typescript
import { VectorLayer } from 'mapjar';

const vectorLayer = new VectorLayer('vector', {
  fillColor: [0.2, 0.6, 1.0, 0.4],
  strokeColor: [0.0, 0.4, 0.8, 1.0],
  strokeWidth: 2.0,
  pointSize: 10.0,
});

engine.addLayer(vectorLayer);
```

## 添加要素

### 点要素

```typescript
vectorLayer.addFeature({
  type: 'point',
  coordinates: [116.4074, 39.9042],
  properties: { name: '北京', population: 21540000 }
});
```

### 线要素

```typescript
vectorLayer.addFeature({
  type: 'line',
  coordinates: [
    [116.4074, 39.9042],
    [121.4737, 31.2304],
    [113.2644, 23.1291]
  ],
  properties: { name: '路线' }
});
```

### 面要素

```typescript
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
```

## 样式配置

```typescript
const vectorLayer = new VectorLayer('vector', {
  fillColor: [0.2, 0.6, 1.0, 0.4],      // 填充颜色 RGBA
  strokeColor: [0.0, 0.4, 0.8, 1.0],    // 描边颜色 RGBA
  strokeWidth: 2.0,                      // 描边宽度
  pointSize: 10.0,                       // 点大小
  textField: 'name',                     // 文字字段
  textFont: '14px Arial',                // 文字字体
  textColor: [0, 0, 0, 1],              // 文字颜色
  textHaloColor: [1, 1, 1, 1],          // 文字描边颜色
  textHaloWidth: 2,                      // 文字描边宽度
  textOffset: [0, -15],                  // 文字偏移
  textAnchor: 'center',                  // 文字锚点
});
```

## 空间查询

```typescript
// 点查询
const results = vectorLayer.queryPoint(116.4, 39.9, 1000); // 1km 容差

// 范围查询
const results = vectorLayer.queryBBox({
  minX: 116,
  minY: 39,
  maxX: 117,
  maxY: 40
});

// 最近邻查询
const results = vectorLayer.queryNearest(116.4, 39.9, 5); // 最近 5 个
```

## 下一步

- [GeoJSON 图层](./geojson-layer) - 加载 GeoJSON 数据
- [数据驱动样式](../advanced/data-driven-styles) - 动态设置样式
