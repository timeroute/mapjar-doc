---
sidebar_position: 3
---

# 动画系统

Mapjar 提供了流畅的动画系统，包括相机动画和自定义动画。

## 相机动画

### flyTo - 飞行动画

平滑飞行到指定位置和缩放级别。

```typescript
engine.flyTo(121.4737, 31.2304, 12, {
  duration: 2000,     // 动画时长（毫秒）
  maxDuration: 3000,  // 最大时长
});
```

### fitBounds - 适配边界

自动适配到指定边界。

```typescript
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

### animateZoomTo - 缩放动画

平滑缩放到指定级别。

```typescript
const camera = engine.getCamera();
camera.animateZoomTo(1, { x: 400, y: 300 }, {
  duration: 300,
});
```

## 缓动函数

Mapjar 提供了多种缓动函数：

```typescript
import { Easing } from 'mapjar';

// 线性
Easing.linear

// 二次方
Easing.easeInQuad
Easing.easeOutQuad
Easing.easeInOutQuad

// 三次方
Easing.easeInCubic
Easing.easeOutCubic
Easing.easeInOutCubic
```

### 使用自定义缓动

```typescript
engine.flyTo(121.4737, 31.2304, 12, {
  duration: 2000,
  easing: Easing.easeInOutCubic,
});
```

## 动画控制

### 停止动画

```typescript
const camera = engine.getCamera();
camera.stopAnimation();
```

### 检查动画状态

```typescript
const hasAnimation = camera.updateAnimation();
console.log(hasAnimation); // true 或 false
```

## 自定义动画

你可以创建自己的动画逻辑：

```typescript
let startTime = Date.now();
const duration = 2000;

function animate() {
  const elapsed = Date.now() - startTime;
  const progress = Math.min(elapsed / duration, 1);
  
  // 使用缓动函数
  const eased = Easing.easeOutQuad(progress);
  
  // 更新状态
  // ...
  
  if (progress < 1) {
    requestAnimationFrame(animate);
  }
}

animate();
```

## 下一步

- [性能优化](./performance) - 了解性能优化技巧
