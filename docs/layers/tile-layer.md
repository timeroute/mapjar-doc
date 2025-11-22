---
sidebar_position: 1
---

# 瓦片图层 (TileLayer)

瓦片图层用于渲染基于瓦片的地图服务，如 OpenStreetMap、Google Maps 等。

## 基本用法

```typescript
import { TileLayer } from 'mapjar';

const tileLayer = new TileLayer(
  'osm', // 图层 ID
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png' // 瓦片 URL 模板
);

engine.addLayer(tileLayer);
```

## URL 模板

URL 模板使用 `{z}`、`{x}`、`{y}` 占位符：

- `{z}` - 缩放级别（0-22）
- `{x}` - 瓦片列号
- `{y}` - 瓦片行号

### 常用瓦片源

```typescript
// OpenStreetMap
const osmLayer = new TileLayer(
  'osm',
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
);

// OpenStreetMap 德国
const osmDeLayer = new TileLayer(
  'osm-de',
  'https://tile.openstreetmap.de/{z}/{x}/{y}.png'
);

// Stamen Terrain
const terrainLayer = new TileLayer(
  'terrain',
  'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg'
);

// CartoDB Positron（浅色）
const positronLayer = new TileLayer(
  'positron',
  'https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
);

// CartoDB Dark Matter（深色）
const darkLayer = new TileLayer(
  'dark',
  'https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
);
```

## 配置选项

```typescript
const tileLayer = new TileLayer(
  'osm',
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxConcurrent: 6,      // 最大并发加载数（默认 6）
    tileScale: 1.0,        // 瓦片缩放比例（0.5 - 3.0，默认 1.0）
    wrapX: true,           // 启用水平跨世界渲染（默认 true）
    fadeInDuration: 200,   // 瓦片淡入动画时长（毫秒，默认 200）
  }
);
```

### maxConcurrent - 并发加载数

控制同时加载的瓦片数量：

```typescript
const tileLayer = new TileLayer('osm', url, {
  maxConcurrent: 6, // 同时加载 6 个瓦片
});
```

- 默认值：6
- 建议范围：4-8
- 过大可能导致浏览器限制，过小会降低加载速度

### tileScale - 瓦片缩放比例

调整瓦片的显示大小，用于提高清晰度或改善文字可读性：

```typescript
const tileLayer = new TileLayer('osm', url, {
  tileScale: 1.5, // 放大 50%
});

// 动态调整
tileLayer.setTileScale(2.0); // 放大 100%
```

- 默认值：1.0
- 范围：0.5 - 3.0
- `< 1.0`：缩小瓦片，显示更多内容
- `> 1.0`：放大瓦片，文字更清晰

**使用场景：**
- `1.0`：标准显示
- `1.5`：提高文字可读性
- `2.0`：高清显示（适合高 DPI 屏幕）

### wrapX - 跨世界渲染

启用水平无限循环：

```typescript
const tileLayer = new TileLayer('osm', url, {
  wrapX: true, // 启用跨世界渲染
});
```

- 默认值：true
- 启用后地图可以无限向左或向右平移
- 适合全球地图，区域地图可以禁用

### fadeInDuration - 淡入动画

瓦片加载完成后的淡入动画时长：

```typescript
const tileLayer = new TileLayer('osm', url, {
  fadeInDuration: 300, // 300ms 淡入
});
```

- 默认值：200（毫秒）
- 设置为 0 禁用动画
- 平滑的加载效果

## 动态调整

### 设置瓦片缩放比例

```typescript
// 获取当前缩放比例
const scale = tileLayer.getTileScale();
console.log(scale); // 1.0

// 设置新的缩放比例
tileLayer.setTileScale(1.5);
```

### 设置相机

```typescript
const camera = engine.getCamera();
tileLayer.setCamera(camera);
```

## 性能特性

### Web Worker 并发加载

瓦片图层自动使用 Web Worker 进行并发加载，不阻塞主线程：

- 自动启用，无需配置
- 支持多个瓦片同时加载
- 智能取消机制（视口外的瓦片自动取消）

### LRU 缓存

自动缓存已加载的瓦片：

- 最多缓存 500 个瓦片
- 使用 LRU（最近最少使用）策略
- 自动清理旧瓦片

### 智能取消

当瓦片移出视口时，自动取消加载：

- 减少不必要的网络请求
- 优先加载可见瓦片
- 提升加载速度

## 高级用法

### 多个瓦片图层

```typescript
// 底图
const baseLayer = new TileLayer(
  'base',
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
);
baseLayer.setZIndex(0);
engine.addLayer(baseLayer);

// 标注图层（半透明）
const labelLayer = new TileLayer(
  'labels',
  'https://stamen-tiles.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}.png'
);
labelLayer.setZIndex(10);
labelLayer.setOpacity(0.7);
engine.addLayer(labelLayer);
```

### 切换底图

```typescript
let currentBase = 'osm';

function switchBaseMap(type) {
  // 移除当前底图
  engine.removeLayer(currentBase);
  
  // 添加新底图
  let url;
  if (type === 'osm') {
    url = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
  } else if (type === 'dark') {
    url = 'https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png';
  }
  
  const newLayer = new TileLayer(type, url);
  newLayer.setZIndex(0);
  engine.addLayer(newLayer);
  
  currentBase = type;
}

// 切换到深色底图
switchBaseMap('dark');
```

### 自定义瓦片服务器

```typescript
// 使用自己的瓦片服务器
const customLayer = new TileLayer(
  'custom',
  'https://your-tile-server.com/tiles/{z}/{x}/{y}.png'
);

// 带 API Key
const apiKeyLayer = new TileLayer(
  'mapbox',
  'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=YOUR_API_KEY'
);

// 使用子域名（负载均衡）
const subdomainLayer = new TileLayer(
  'osm',
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
// 注意：需要在 URL 模板中手动处理 {s} 占位符
```

## 常见问题

### 瓦片加载失败

检查以下几点：

1. **URL 是否正确**：确保 URL 模板格式正确
2. **CORS 问题**：确保瓦片服务器支持跨域请求
3. **API Key**：某些服务需要 API Key
4. **网络连接**：检查网络是否正常

### 瓦片显示模糊

尝试调整 `tileScale`：

```typescript
tileLayer.setTileScale(1.5); // 或 2.0
```

### 瓦片加载慢

优化建议：

1. 使用 CDN 加速的瓦片源
2. 减少 `maxConcurrent` 值
3. 使用更快的瓦片服务器

## 下一步

- [矢量图层](./vector-layer) - 学习如何添加矢量要素
- [图像图层](./image-layer) - 了解如何叠加单张图像
