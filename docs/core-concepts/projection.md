---
sidebar_position: 1
---

# 投影系统

Mapjar 使用 **EPSG:3857 (Web Mercator)** 投影系统，这是 Web 地图的标准投影。

## 什么是 Web Mercator？

Web Mercator 是一种圆柱投影，将地球表面投影到平面上。它的特点是：

- **保角投影**：保持角度不变，适合导航
- **不保面积**：高纬度地区会被放大（格陵兰岛看起来比实际大）
- **纬度限制**：有效范围为 ±85.05°（南北极附近不可用）

## 坐标系统

### 经纬度坐标 (WGS84)

- **经度 (Longitude)**：-180° 到 180°，东经为正，西经为负
- **纬度 (Latitude)**：-90° 到 90°，北纬为正，南纬为负

```typescript
// 北京的经纬度
const lon = 116.4074; // 东经 116.4074°
const lat = 39.9042;  // 北纬 39.9042°
```

### Web Mercator 坐标（米）

Web Mercator 将地球投影到一个正方形平面上，坐标单位为米：

- **X 轴**：-20037508.34 到 20037508.34 米（赤道周长的一半）
- **Y 轴**：-20037508.34 到 20037508.34 米

```typescript
import { WebMercatorProjection } from 'mapjar';

// 经纬度转 Web Mercator 坐标
const pos = WebMercatorProjection.lonLatToMeters(116.4074, 39.9042);
console.log(pos); // { x: 12958223.5, y: 4825473.6 }

// Web Mercator 坐标转经纬度
const lonLat = WebMercatorProjection.metersToLonLat(pos.x, pos.y);
console.log(lonLat); // { x: 116.4074, y: 39.9042 }
```

## 瓦片坐标系统

Web 地图使用瓦片金字塔结构，每个缩放级别将地图分割成不同数量的瓦片：

- **缩放级别 0**：1 个瓦片（256×256 像素）
- **缩放级别 1**：4 个瓦片（2×2）
- **缩放级别 2**：16 个瓦片（4×4）
- **缩放级别 z**：2^z × 2^z 个瓦片

### 瓦片坐标

每个瓦片由三个参数标识：

- **z**：缩放级别（0-22）
- **x**：列号（0 到 2^z - 1）
- **y**：行号（0 到 2^z - 1）

```typescript
import { WebMercatorProjection } from 'mapjar';

// 获取某个经纬度在指定缩放级别的瓦片坐标
const tile = WebMercatorProjection.getTileCoord(116.4074, 39.9042, 10);
console.log(tile); // { x: 843, y: 387, z: 10 }

// 获取瓦片的地理边界
const bounds = WebMercatorProjection.getTileBounds(843, 387, 10);
console.log(bounds);
// {
//   minLon: 116.3671875,
//   minLat: 39.909736,
//   maxLon: 116.71875,
//   maxLat: 40.178873
// }
```

## 分辨率和缩放级别

**分辨率**是指每像素代表的实际距离（米/像素）。

```typescript
import { WebMercatorProjection } from 'mapjar';

// 获取指定缩放级别的分辨率
const resolution = WebMercatorProjection.getResolution(10);
console.log(resolution); // 152.87 米/像素

// 从分辨率计算缩放级别
const zoom = WebMercatorProjection.getZoomFromResolution(152.87);
console.log(zoom); // 10
```

### 缩放级别对应关系

| 缩放级别 | 分辨率 (米/像素) | 比例尺 (1:x) | 覆盖范围 |
|---------|----------------|-------------|---------|
| 0 | 156543 | 1:591,657,528 | 全球 |
| 5 | 4892 | 1:18,489,298 | 大洲 |
| 10 | 153 | 1:577,791 | 城市 |
| 15 | 4.8 | 1:18,056 | 街道 |
| 20 | 0.15 | 1:564 | 建筑 |

## 纬度限制

Web Mercator 投影在南北极附近会产生极大的变形，因此 Mapjar 自动将纬度限制在 **±85.05°** 范围内：

```typescript
const camera = engine.getCamera();

// 尝试设置超出范围的纬度
camera.setCenterLonLat(0, 90); // 会被自动限制到 85.05°
```

## 跨世界渲染

Mapjar 支持水平跨世界渲染，地图可以无限向左或向右平移：

```typescript
const tileLayer = new TileLayer(
  'osm',
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    wrapX: true, // 启用跨世界渲染（默认 true）
  }
);
```

当 `wrapX` 为 `true` 时：
- 经度会自动归一化到 -180° 到 180° 范围
- 瓦片会在水平方向重复渲染
- 用户可以无限向左或向右平移

## 实用工具

### 距离计算

```typescript
import { Vec2 } from 'mapjar';

const beijing = new Vec2(116.4074, 39.9042);
const shanghai = new Vec2(121.4737, 31.2304);

// 计算两点之间的欧几里得距离（度）
const distance = beijing.distance(shanghai);
console.log(distance); // 约 10.7 度

// 注意：这不是实际的地理距离
// 如需计算实际距离，应先转换为 Web Mercator 坐标
const bjMeters = WebMercatorProjection.lonLatToMeters(116.4074, 39.9042);
const shMeters = WebMercatorProjection.lonLatToMeters(121.4737, 31.2304);
const distanceMeters = bjMeters.distance(shMeters);
console.log(distanceMeters); // 约 1,067,000 米 (1067 公里)
```

## 下一步

- [相机系统](./camera) - 了解如何控制地图视图
- [图层系统](./layers) - 学习如何添加和管理图层
