---
sidebar_position: 2
---

# 空间查询

Mapjar 提供了强大的空间查询功能，用于查找和过滤地图要素。

## 查询方法

### 点查询

查询指定点附近的要素。

```typescript
const results = vectorLayer.queryPoint(
  116.4074,  // 经度
  39.9042,   // 纬度
  1000       // 容差（米）
);

results.forEach(result => {
  console.log(result.feature.properties);
  console.log('距离:', result.distance);
});
```

### 范围查询

查询指定矩形范围内的要素。

```typescript
const results = vectorLayer.queryBBox({
  minX: 116,
  minY: 39,
  maxX: 117,
  maxY: 40
});
```

### 圆形查询

查询指定圆形范围内的要素。

```typescript
const results = vectorLayer.queryCircle(
  116.4074,  // 中心经度
  39.9042,   // 中心纬度
  10000      // 半径（米）
);
```

### 多边形查询

查询指定多边形范围内的要素。

```typescript
const results = vectorLayer.queryPolygon([
  [116.2, 39.8],
  [116.6, 39.8],
  [116.6, 40.0],
  [116.2, 40.0],
  [116.2, 39.8]
]);
```

### 最近邻查询

查询距离指定点最近的 N 个要素。

```typescript
const results = vectorLayer.queryNearest(
  116.4074,  // 经度
  39.9042,   // 纬度
  5          // 数量
);
```

## 查询结果

```typescript
interface QueryResult {
  feature: Feature;
  index: number;
  distance?: number;
}
```

## 实用示例

### 点击查询要素

```typescript
engine.on('click', (event) => {
  const tolerance = 10 * engine.getCamera().getResolution();
  const results = vectorLayer.queryPoint(event.lon, event.lat, tolerance);
  
  if (results.length > 0) {
    const feature = results[0].feature;
    console.log('点击了要素:', feature.properties);
  }
});
```

### 查找附近的 POI

```typescript
function findNearbyPOI(lon, lat, radius) {
  const results = vectorLayer.queryCircle(lon, lat, radius);
  return results.map(r => r.feature.properties);
}

const nearby = findNearbyPOI(116.4074, 39.9042, 5000);
console.log('附近的 POI:', nearby);
```

## 性能优化

- 使用合适的容差值
- 避免频繁查询
- 使用节流/防抖
- 限制查询结果数量

## 下一步

- [动画](./animations) - 学习动画系统
- [性能优化](./performance) - 了解性能优化技巧
