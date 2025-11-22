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

## 方法

### loadFromURL()

从 URL 加载 GeoJSON 数据。

```typescript
loadFromURL(): Promise<void>
```

### setGeoJSON()

设置 GeoJSON 数据。

```typescript
setGeoJSON(data: GeoJSON.FeatureCollection | GeoJSON.Feature): void
```

查看 [GeoJSON 图层文档](../../layers/geojson-layer) 了解详细用法。
