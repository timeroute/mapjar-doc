---
sidebar_position: 4
---

# SpatialQuery API

空间查询工具。

完整的空间查询文档请参考 [空间查询](../../advanced/spatial-query)。

## 方法

### queryPoint()

点查询。

```typescript
queryPoint(
  features: Feature[],
  lon: number,
  lat: number,
  tolerance?: number
): QueryResult[]
```

### queryBBox()

范围查询。

```typescript
queryBBox(features: Feature[], bbox: BBox): QueryResult[]
```

### queryCircle()

圆形查询。

```typescript
queryCircle(
  features: Feature[],
  centerLon: number,
  centerLat: number,
  radius: number
): QueryResult[]
```

### queryNearest()

最近邻查询。

```typescript
queryNearest(
  features: Feature[],
  lon: number,
  lat: number,
  count?: number
): QueryResult[]
```

查看 [空间查询文档](../../advanced/spatial-query) 了解详细用法。
