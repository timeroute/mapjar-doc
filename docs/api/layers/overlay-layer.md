---
sidebar_position: 8
---

# OverlayLayer API

覆盖层图层 API 文档。

完整的 OverlayLayer 使用指南请参考 [覆盖层图层](../../layers/overlay-layer)。

## 构造函数

```typescript
constructor(id: string)
```

**参数：**
- `id` - 图层 ID

## 类型定义

### Overlay

```typescript
interface Overlay {
  element: HTMLElement;
  position: OverlayPosition;
  visible?: boolean;
  properties?: Record<string, unknown>;
}
```

### OverlayPosition

```typescript
interface OverlayPosition {
  lon: number;
  lat: number;
  offset?: [number, number];
  anchor?: [number, number];
}
```

## 方法

### initContainer()

初始化容器（通常由引擎自动调用）。

```typescript
initContainer(container: HTMLElement): void
```

### setCamera()

设置相机（通常由引擎自动调用）。

```typescript
setCamera(camera: Camera): void
```

### setDevicePixelRatio()

设置设备像素比。

```typescript
setDevicePixelRatio(dpr: number): void
```

### setOverlay()

设置覆盖层。

```typescript
setOverlay(overlay: Overlay): void
```

**参数：**
- `overlay` - 覆盖层对象

**示例：**

```typescript
overlayLayer.setOverlay({
  element: document.createElement('div'),
  position: {
    lon: 116.4074,
    lat: 39.9042,
    offset: [0, -20],
    anchor: [0.5, 1.0],
  },
  visible: true,
});
```

### updateOverlay()

更新覆盖层的部分属性。

```typescript
updateOverlay(updates: Partial<Overlay>): void
```

**参数：**
- `updates` - 要更新的属性

**示例：**

```typescript
// 更新位置
overlayLayer.updateOverlay({
  position: {
    lon: 116.5,
    lat: 40.0,
  },
});

// 更新可见性
overlayLayer.updateOverlay({
  visible: false,
});
```

### getOverlay()

获取当前覆盖层。

```typescript
getOverlay(): Overlay | null
```

**返回值：**
- 覆盖层对象，如果没有则返回 `null`

**示例：**

```typescript
const overlay = overlayLayer.getOverlay();
if (overlay) {
  console.log('位置:', overlay.position);
  console.log('可见:', overlay.visible);
}
```

### clearOverlay()

清除覆盖层。

```typescript
clearOverlay(): void
```

**示例：**

```typescript
overlayLayer.clearOverlay();
```

## 完整示例

```typescript
import { MapEngine, OverlayLayer } from 'mapjar';

const engine = new MapEngine('#map', {
  center: [116.4074, 39.9042],
  zoom: 10,
});

// 创建覆盖层图层
const overlayLayer = new OverlayLayer('popup');
overlayLayer.setZIndex(100);
engine.addLayer(overlayLayer);

// 创建 HTML 元素
const element = document.createElement('div');
element.innerHTML = `
  <div style="background: white; padding: 10px; border-radius: 8px;">
    <h3>北京</h3>
    <p>中国首都</p>
  </div>
`;

// 设置覆盖层
overlayLayer.setOverlay({
  element: element,
  position: {
    lon: 116.4074,
    lat: 39.9042,
    offset: [0, -20],
    anchor: [0.5, 1.0],
  },
});

// 2秒后更新位置
setTimeout(() => {
  overlayLayer.updateOverlay({
    position: {
      lon: 121.4737,
      lat: 31.2304,
    },
  });
}, 2000);

// 5秒后清除
setTimeout(() => {
  overlayLayer.clearOverlay();
}, 5000);
```

## 注意事项

- 每个 OverlayLayer 只能显示一个覆盖层
- 如需多个覆盖层，请创建多个 OverlayLayer 实例
- 使用 `setZIndex()` 控制显示顺序
- 不需要时及时调用 `clearOverlay()` 释放资源

查看 [覆盖层图层文档](../../layers/overlay-layer) 了解详细用法。
