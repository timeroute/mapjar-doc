---
sidebar_position: 2
---

# 相机系统

相机（Camera）控制地图的视图，包括中心点、缩放级别和旋转角度。

## 获取相机

```typescript
const camera = engine.getCamera();
```

## 中心点

### 设置中心点

```typescript
// 使用经纬度
camera.setCenterLonLat(116.4074, 39.9042);

// 使用 Web Mercator 坐标（米）
import { Vec2, WebMercatorProjection } from 'mapjar';
const pos = WebMercatorProjection.lonLatToMeters(116.4074, 39.9042);
camera.setCenter(pos);
```

### 获取中心点

```typescript
// 获取经纬度
const lonLat = camera.getCenterLonLat();
console.log(lonLat); // { x: 116.4074, y: 39.9042 }

// 获取 Web Mercator 坐标
const center = camera.getCenter();
console.log(center); // { x: 12958223.5, y: 4825473.6 }
```

## 缩放级别

### 设置缩放级别

```typescript
// 缩放级别范围：0-22
camera.setZoom(10);
```

### 获取缩放级别

```typescript
const zoom = camera.getZoom();
console.log(zoom); // 10
```

### 缩放到指定点

```typescript
// 以屏幕坐标 (400, 300) 为中心放大 1 级
camera.zoomTo(1, { x: 400, y: 300 });

// 以屏幕中心放大 1 级
camera.zoomTo(1);
```

### 带动画的缩放

```typescript
// 平滑缩放到指定点
camera.animateZoomTo(1, { x: 400, y: 300 }, {
  duration: 300,  // 动画时长（毫秒）
  easing: (t) => t * t, // 缓动函数
});
```

## 旋转

### 设置旋转角度

```typescript
// 旋转角度（弧度）
camera.setRotation(Math.PI / 4); // 45度

// 重置旋转
engine.resetRotation();
```

### 获取旋转角度

```typescript
const rotation = camera.getRotation();
console.log(rotation); // 0.785 (弧度)
console.log(rotation * 180 / Math.PI); // 45 (度)
```

### 启用/禁用旋转

```typescript
// 在创建地图时配置
const engine = new MapEngine('#map', {
  center: [116.4074, 39.9042],
  zoom: 10,
  enableRotation: true, // 启用右键旋转（默认 true）
});
```

## 平移

```typescript
// 平移指定像素距离
camera.pan(100, 100); // 向右 100px，向下 100px
```

## 分辨率

```typescript
// 获取当前分辨率（米/像素）
const resolution = camera.getResolution();
console.log(resolution); // 152.87 米/像素
```

## 视口尺寸

```typescript
// 获取视口宽度和高度（像素）
const width = camera.getWidth();
const height = camera.getHeight();
console.log(`视口尺寸: ${width}x${height}`);

// 设置视口尺寸（通常由引擎自动管理）
camera.setSize(1920, 1080);
```

## 坐标转换

### 世界坐标转屏幕坐标

```typescript
import { WebMercatorProjection } from 'mapjar';

// 将经纬度转换为屏幕坐标
const worldPos = WebMercatorProjection.lonLatToMeters(116.4074, 39.9042);
const screenPos = camera.worldToScreen(worldPos);
console.log(screenPos); // { x: 960, y: 540 }
```

### 屏幕坐标转世界坐标

```typescript
// 将屏幕坐标转换为世界坐标
const worldPos = camera.screenToWorld({ x: 960, y: 540 });
const lonLat = WebMercatorProjection.metersToLonLat(worldPos.x, worldPos.y);
console.log(lonLat); // { x: 116.4074, y: 39.9042 }
```

## 可见边界

```typescript
// 获取当前可见的地理边界
const bounds = camera.getVisibleBounds();
console.log(bounds);
// {
//   minX: 12900000,  // 最小 X（米）
//   minY: 4800000,   // 最小 Y（米）
//   maxX: 13000000,  // 最大 X（米）
//   maxY: 4900000    // 最大 Y（米）
// }
```

## 平滑动画

### flyTo - 飞行到指定位置

```typescript
// 飞行到上海，缩放到 12 级
camera.flyTo(121.4737, 31.2304, 12, {
  duration: 2000,     // 动画时长（毫秒），默认自动计算
  maxDuration: 3000,  // 最大时长（毫秒），默认 3000
});

// 只改变位置，保持当前缩放
camera.flyTo(121.4737, 31.2304);

// 使用 MapEngine 的快捷方法
engine.flyTo(121.4737, 31.2304, 12, { duration: 2000 });
```

### fitBounds - 适配边界

```typescript
// 适配中国边界
camera.fitBounds({
  minLon: 73.5,
  minLat: 18.2,
  maxLon: 135.0,
  maxLat: 53.5
}, {
  duration: 2000,  // 动画时长
  padding: 50,     // 边界填充（像素）
});

// 使用 MapEngine 的快捷方法
engine.fitBounds({
  minLon: 73.5,
  minLat: 18.2,
  maxLon: 135.0,
  maxLat: 53.5
}, {
  duration: 2000,
  padding: 50,
});
```

## 动画控制

```typescript
// 停止当前动画
camera.stopAnimation();

// 检查是否有动画正在运行
const hasAnimation = camera.updateAnimation();
console.log(hasAnimation); // true 或 false
```

## 高 DPI 支持

Mapjar 自动适配高分辨率屏幕（Retina 等）：

```typescript
// 获取设备像素比
const dpr = camera.getDevicePixelRatio();
console.log(dpr); // 1, 2, 或 3

// 手动设置设备像素比（通常不需要）
camera.setDevicePixelRatio(2);

// 在 MapEngine 中设置
const engine = new MapEngine('#map', {
  center: [116.4074, 39.9042],
  zoom: 10,
  devicePixelRatio: 2, // 手动指定
});

// 或使用引擎方法
engine.setDevicePixelRatio(2);
```

## 视图矩阵

```typescript
// 获取视图矩阵（用于 WebGL 渲染）
const viewMatrix = camera.getViewMatrix();
console.log(viewMatrix); // Float32Array(16)
```

## 实用示例

### 点击地图获取经纬度

```typescript
engine.on('click', (event) => {
  console.log(`点击位置: ${event.lon.toFixed(4)}, ${event.lat.toFixed(4)}`);
});
```

### 鼠标位置实时显示

```typescript
const coordDisplay = document.getElementById('coords');

engine.on('mousemove', (event) => {
  coordDisplay.textContent = 
    `经度: ${event.lon.toFixed(4)}, 纬度: ${event.lat.toFixed(4)}`;
});
```

### 限制地图范围

```typescript
const camera = engine.getCamera();

// 在每次相机更新后检查边界
function constrainView() {
  const center = camera.getCenterLonLat();
  
  // 限制在中国范围内
  const minLon = 73.5, maxLon = 135.0;
  const minLat = 18.2, maxLat = 53.5;
  
  let newLon = center.x;
  let newLat = center.y;
  
  if (newLon < minLon) newLon = minLon;
  if (newLon > maxLon) newLon = maxLon;
  if (newLat < minLat) newLat = minLat;
  if (newLat > maxLat) newLat = maxLat;
  
  if (newLon !== center.x || newLat !== center.y) {
    camera.setCenterLonLat(newLon, newLat);
  }
}

// 在渲染循环中调用
// constrainView();
```

## 下一步

- [图层系统](./layers) - 了解如何添加和管理图层
- [事件系统](./events) - 学习如何监听和处理事件
