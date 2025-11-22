---
sidebar_position: 4
---

# 事件系统

Mapjar 提供了统一的事件系统，用于监听和处理用户交互。

## 事件类型

### click - 点击事件

当用户点击地图时触发。

```typescript
engine.on('click', (event) => {
  console.log('点击位置:', event.lon, event.lat);
  console.log('屏幕坐标:', event.screenX, event.screenY);
  console.log('Canvas 坐标:', event.canvasX, event.canvasY);
  console.log('原始事件:', event.originalEvent);
});
```

**事件对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `lon` | number | 经度 |
| `lat` | number | 纬度 |
| `screenX` | number | 屏幕 X 坐标 |
| `screenY` | number | 屏幕 Y 坐标 |
| `canvasX` | number | Canvas X 坐标 |
| `canvasY` | number | Canvas Y 坐标 |
| `originalEvent` | MouseEvent \| TouchEvent | 原始浏览器事件 |

### mousemove - 鼠标移动事件

当鼠标在地图上移动时触发。

```typescript
engine.on('mousemove', (event) => {
  console.log('鼠标位置:', event.lon, event.lat);
});
```

**事件对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `lon` | number | 经度 |
| `lat` | number | 纬度 |
| `screenX` | number | 屏幕 X 坐标 |
| `screenY` | number | 屏幕 Y 坐标 |
| `canvasX` | number | Canvas X 坐标 |
| `canvasY` | number | Canvas Y 坐标 |
| `originalEvent` | MouseEvent | 原始鼠标事件 |

## 事件监听

### on - 添加事件监听器

```typescript
const handler = (event) => {
  console.log('点击:', event.lon, event.lat);
};

// 添加监听器
engine.on('click', handler);

// 返回移除函数
const removeListener = engine.on('click', (event) => {
  console.log('点击:', event.lon, event.lat);
});

// 调用返回的函数移除监听器
removeListener();
```

### once - 添加一次性监听器

```typescript
// 只触发一次
engine.once('click', (event) => {
  console.log('第一次点击:', event.lon, event.lat);
});
```

### off - 移除事件监听器

```typescript
const handler = (event) => {
  console.log('点击:', event.lon, event.lat);
};

// 添加监听器
engine.on('click', handler);

// 移除监听器
engine.off('click', handler);
```

### removeAllListeners - 移除所有监听器

```typescript
// 移除指定事件的所有监听器
engine.removeAllListeners('click');

// 移除所有事件的所有监听器
engine.removeAllListeners();
```

## 实用示例

### 显示点击位置

```typescript
engine.on('click', (event) => {
  alert(`点击位置: ${event.lon.toFixed(4)}, ${event.lat.toFixed(4)}`);
});
```

### 实时显示鼠标坐标

```typescript
const coordDisplay = document.getElementById('coords');

engine.on('mousemove', (event) => {
  coordDisplay.textContent = 
    `经度: ${event.lon.toFixed(4)}, 纬度: ${event.lat.toFixed(4)}`;
});
```

### 点击添加标记

```typescript
import { VectorLayer } from 'mapjar';

const markerLayer = new VectorLayer('markers', {
  pointSize: 12.0,
  fillColor: [1.0, 0.0, 0.0, 1.0],
});
engine.addLayer(markerLayer);

engine.on('click', (event) => {
  markerLayer.addFeature({
    type: 'point',
    coordinates: [event.lon, event.lat],
    properties: { name: '标记' }
  });
});
```

### 点击查询要素

```typescript
import { VectorLayer } from 'mapjar';

const vectorLayer = new VectorLayer('poi');
// ... 添加要素 ...

engine.on('click', (event) => {
  // 查询点击位置附近的要素（容差 10 像素）
  const tolerance = 10 * engine.getCamera().getResolution();
  const results = vectorLayer.queryPoint(event.lon, event.lat, tolerance);
  
  if (results.length > 0) {
    const feature = results[0].feature;
    console.log('点击了要素:', feature.properties);
  }
});
```

### 鼠标悬停高亮

```typescript
let hoveredFeature = null;

engine.on('mousemove', (event) => {
  const tolerance = 10 * engine.getCamera().getResolution();
  const results = vectorLayer.queryPoint(event.lon, event.lat, tolerance);
  
  if (results.length > 0) {
    const feature = results[0].feature;
    if (hoveredFeature !== feature) {
      hoveredFeature = feature;
      console.log('悬停在要素上:', feature.properties);
      // 可以在这里改变样式或显示提示
    }
  } else {
    if (hoveredFeature) {
      hoveredFeature = null;
      console.log('离开要素');
    }
  }
});
```

### 右键菜单

```typescript
engine.on('click', (event) => {
  if (event.originalEvent instanceof MouseEvent && 
      event.originalEvent.button === 2) {
    // 右键点击
    event.originalEvent.preventDefault();
    showContextMenu(event.screenX, event.screenY);
  }
});

function showContextMenu(x, y) {
  const menu = document.getElementById('context-menu');
  menu.style.left = x + 'px';
  menu.style.top = y + 'px';
  menu.style.display = 'block';
}
```

### 双击放大

Mapjar 默认支持双击放大，但你也可以自定义行为：

```typescript
let lastClickTime = 0;

engine.on('click', (event) => {
  const now = Date.now();
  const timeDiff = now - lastClickTime;
  
  if (timeDiff < 300) {
    // 双击
    engine.flyTo(event.lon, event.lat, engine.getZoom() + 1, {
      duration: 300
    });
  }
  
  lastClickTime = now;
});
```

### 测量距离

```typescript
import { WebMercatorProjection } from 'mapjar';

let measurePoints = [];

engine.on('click', (event) => {
  measurePoints.push([event.lon, event.lat]);
  
  if (measurePoints.length === 2) {
    const p1 = WebMercatorProjection.lonLatToMeters(
      measurePoints[0][0], 
      measurePoints[0][1]
    );
    const p2 = WebMercatorProjection.lonLatToMeters(
      measurePoints[1][0], 
      measurePoints[1][1]
    );
    
    const distance = p1.distance(p2);
    console.log(`距离: ${(distance / 1000).toFixed(2)} 公里`);
    
    measurePoints = [];
  }
});
```

## 事件性能优化

### 节流（Throttle）

对于高频事件（如 `mousemove`），使用节流减少处理次数：

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
  console.log('鼠标位置:', event.lon, event.lat);
}, 100); // 每 100ms 最多触发一次

engine.on('mousemove', throttledHandler);
```

### 防抖（Debounce）

延迟处理，只在事件停止后执行：

```typescript
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const debouncedHandler = debounce((event) => {
  console.log('鼠标停止移动:', event.lon, event.lat);
}, 300); // 停止移动 300ms 后触发

engine.on('mousemove', debouncedHandler);
```

## TypeScript 类型支持

```typescript
import type { MapClickEvent, MapMouseMoveEvent } from 'mapjar';

// 类型安全的事件处理
engine.on('click', (event: MapClickEvent) => {
  console.log(event.lon, event.lat);
});

engine.on('mousemove', (event: MapMouseMoveEvent) => {
  console.log(event.lon, event.lat);
});
```

## 下一步

- [数据驱动样式](../advanced/data-driven-styles) - 学习如何根据数据动态设置样式
- [空间查询](../advanced/spatial-query) - 了解如何查询地图要素
