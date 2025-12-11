---
sidebar_position: 4
---

# GeoJSONLayer API

GeoJSON 图层 API 文档。

完整的 GeoJSONLayer 使用指南请参考 [GeoJSON 图层](../../layers/geojson-layer)。

## 构造函数

```typescript
constructor(id: string, options?: GeoJSONLayerOptions)
```

## 配置选项

```typescript
interface GeoJSONLayerOptions {
  url?: string;
  data?: GeoJSON.FeatureCollection | GeoJSON.Feature;
  style?: VectorStyle;
}
```

## 数据加载

### loadFromURL()

从 URL 加载 GeoJSON 数据。

```typescript
loadFromURL(): Promise<void>
```

**说明：**
- 使用构造函数中提供的 `url` 选项加载数据
- 返回 Promise，加载完成后自动渲染

**示例：**
```typescript
const geoLayer = new GeoJSONLayer('districts', {
  url: 'https://example.com/districts.geojson',
  style: {
    fillColor: [0.2, 0.6, 1.0, 0.4],
    strokeColor: [0.0, 0.4, 0.8, 1.0]
  }
});

try {
  await geoLayer.loadFromURL();
  console.log('GeoJSON 数据加载完成');
} catch (error) {
  console.error('加载失败:', error);
}
```

### setGeoJSON()

直接设置 GeoJSON 数据。

```typescript
setGeoJSON(data: GeoJSON.FeatureCollection | GeoJSON.Feature): void
```

**参数：**
- `data` - GeoJSON 数据对象

**支持的 GeoJSON 类型：**
- `FeatureCollection` - 要素集合
- `Feature` - 单个要素

**示例：**
```typescript
const geojsonData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [116.4074, 39.9042]
      },
      properties: {
        name: '北京',
        population: 21540000
      }
    }
  ]
};

geoLayer.setGeoJSON(geojsonData);
```

## 继承的方法

GeoJSONLayer 继承自 VectorLayer，拥有所有 VectorLayer 的方法：

### 要素管理
- `addFeature(feature)` - 添加要素
- `addFeatures(features)` - 批量添加要素
- `clearFeatures()` - 清空要素
- `getFeatureCount()` - 获取要素数量
- `getFeatures()` - 获取所有要素

### 样式设置
- `setStyle(style)` - 设置基础样式
- `setDataDrivenStyle(style)` - 设置数据驱动样式

### 空间查询
- `queryPoint(lon, lat, tolerance)` - 点查询
- `queryBBox(bbox)` - 边界框查询
- `queryCircle(centerLon, centerLat, radius)` - 圆形查询
- `queryPolygon(polygon)` - 多边形查询
- `queryNearest(lon, lat, count)` - 最近邻查询

查看 [GeoJSON 图层文档](../../layers/geojson-layer) 了解详细用法。
