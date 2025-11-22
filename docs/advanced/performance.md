---
sidebar_position: 4
---

# 性能优化

本文介绍 Mapjar 的性能优化技巧和最佳实践。

## 瓦片图层优化

### 使用 CDN

```typescript
const tileLayer = new TileLayer(
  'osm',
  'https://cdn.example.com/tiles/{z}/{x}/{y}.png'
);
```

### 调整并发数

```typescript
const tileLayer = new TileLayer('osm', url, {
  maxConcurrent: 6,  // 默认 6，可根据网络情况调整
});
```

### 调整瓦片缩放

```typescript
tileLayer.setTileScale(1.5);  // 平衡清晰度和性能
```

## 矢量图层优化

### 控制要素数量

- 建议 < 10000 个要素
- 使用空间查询过滤不可见要素
- 分批加载数据

### 使用视锥剔除

Mapjar 自动启用视锥剔除，只渲染可见要素。

### 批量渲染

Mapjar 自动批量渲染相同样式的要素，减少 GPU 状态切换。

## 图层管理

### 合理设置 Z-Index

```typescript
baseLayer.setZIndex(0);
vectorLayer.setZIndex(10);
overlayLayer.setZIndex(20);
```

### 隐藏不需要的图层

```typescript
layer.setVisible(false);
```

### 动态添加/移除图层

```typescript
// 只在需要时添加图层
if (needLayer) {
  engine.addLayer(layer);
} else {
  engine.removeLayer(layer.getId());
}
```

## 渲染控制

### 停止渲染

```typescript
// 不需要时停止渲染
engine.stop();

// 需要时恢复
engine.start();
```

## 事件优化

### 使用节流

```typescript
function throttle(fn, delay) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}

const throttledHandler = throttle((event) => {
  console.log(event.lon, event.lat);
}, 100);

engine.on('mousemove', throttledHandler);
```

## 性能监控

### 使用浏览器开发工具

- Performance 面板：分析渲染性能
- Memory 面板：检查内存使用
- Network 面板：监控瓦片加载

### FPS 监控

```typescript
let lastTime = performance.now();
let frames = 0;

function measureFPS() {
  frames++;
  const now = performance.now();
  if (now >= lastTime + 1000) {
    const fps = Math.round((frames * 1000) / (now - lastTime));
    console.log('FPS:', fps);
    frames = 0;
    lastTime = now;
  }
  requestAnimationFrame(measureFPS);
}

measureFPS();
```

## 性能指标

### Web Worker 瓦片加载

| 指标 | 主线程 | Worker | 提升 |
|------|--------|--------|------|
| 首屏加载 | 2.5s | 1.8s | 28% ↓ |
| 主线程阻塞 | 150ms | 20ms | 87% ↓ |
| 帧率下降 | 15 fps | 3 fps | 80% ↓ |

### 瓦片清晰度优化

| 指标 | 优化前 | 优化后 | 提升 |
|------|--------|--------|------|
| 纹理上传次数 | 每帧 | 仅一次 | 99% ↓ |
| 渲染时间 | 8ms | 3ms | 62% ↓ |

## 最佳实践

1. **瓦片图层**：使用 CDN，启用 Worker
2. **矢量图层**：控制要素数量 < 10000
3. **图层管理**：合理设置 Z-Index
4. **渲染控制**：不需要时停止渲染
5. **事件处理**：使用节流/防抖
6. **内存管理**：及时清理不需要的资源

## 下一步

- [示例](../examples/combined) - 查看综合示例
