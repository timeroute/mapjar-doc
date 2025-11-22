---
sidebar_position: 2
---

# MapEngine API

地图引擎主类，负责初始化和管理整个地图应用。

## 构造函数

```typescript
constructor(
  canvas: HTMLCanvasElement | string,
  options?: MapOptions
)
```

### 参数

- `canvas` - Canvas 元素或选择器字符串
- `options` - 配置选项（可选）

### MapOptions

```typescript
interface MapOptions {
  center?: [number, number];      // 中心点 [经度, 纬度]，默认 [0, 0]
  zoom?: number;                  // 缩放级别，默认 0
  rotation?: number;              // 旋转角度（弧度），默认 0
  enableRotation?: boolean;       // 启用右键旋转，默认 true
  devicePixelRatio?: number;      // 设备像素比，默认 window.devicePixelRatio
}
```

### 示例

```typescript
import { MapEngine } from 'mapjar';

// 使用选择器
const engine = new MapEngine('#map', {
  center: [116.4074, 39.9042],
  zoom: 10,
  rotation: 0,
  enableRotation: true,
});

// 使用 Canvas 元素
const canvas = document.getElementById('map') as HTMLCanvasElement;
const engine = new MapEngine(canvas, {
  center: [121.4737, 31.2304],
  zoom: 12,
});
```

## 渲染控制

### start()

启动渲染循环。

```typescript
start(): void
```

**示例：**

```typescript
engine.start();
```

### stop()

停止渲染循环。

```typescript
stop(): void
```

**示例：**

```typescript
engine.stop();
```

## 图层管理

### addLayer()

添加图层。

```typescript
addLayer(layer: Layer): void
```

**参数：**
- `layer` - 要添加的图层

**示例：**

```typescript
import { TileLayer } from 'mapjar';

const tileLayer = new TileLayer('osm', 'https://...');
engine.addLayer(tileLayer);
```

### removeLayer()

移除图层。

```typescript
removeLayer(layerId: string): void
```

**参数：**
- `layerId` - 图层 ID

**示例：**

```typescript
engine.removeLayer('osm');
```

### getLayer()

获取图层。

```typescript
getLayer(layerId: string): Layer | undefined
```

**参数：**
- `layerId` - 图层 ID

**返回值：**
- 图层对象，如果不存在则返回 `undefined`

**示例：**

```typescript
const layer = engine.getLayer('osm');
if (layer) {
  layer.setVisible(false);
}
```

## 相机控制

### getCamera()

获取相机对象。

```typescript
getCamera(): Camera
```

**返回值：**
- 相机对象

**示例：**

```typescript
const camera = engine.getCamera();
camera.setCenterLonLat(116.4074, 39.9042);
```

### setCenter()

设置地图中心点。

```typescript
setCenter(lon: number, lat: number): void
```

**参数：**
- `lon` - 经度
- `lat` - 纬度

**示例：**

```typescript
engine.setCenter(116.4074, 39.9042);
```

### setZoom()

设置缩放级别。

```typescript
setZoom(zoom: number): void
```

**参数：**
- `zoom` - 缩放级别（0-22）

**示例：**

```typescript
engine.setZoom(12);
```

### getZoom()

获取当前缩放级别。

```typescript
getZoom(): number
```

**返回值：**
- 当前缩放级别

**示例：**

```typescript
const zoom = engine.getZoom();
console.log(zoom); // 12
```

### setRotation()

设置旋转角度。

```typescript
setRotation(rotation: number): void
```

**参数：**
- `rotation` - 旋转角度（弧度）

**示例：**

```typescript
engine.setRotation(Math.PI / 4); // 45度
```

### getRotation()

获取当前旋转角度。

```typescript
getRotation(): number
```

**返回值：**
- 当前旋转角度（弧度）

**示例：**

```typescript
const rotation = engine.getRotation();
console.log(rotation * 180 / Math.PI); // 转换为度
```

### resetRotation()

重置旋转角度为 0。

```typescript
resetRotation(): void
```

**示例：**

```typescript
engine.resetRotation();
```

## 动画

### flyTo()

平滑飞行到指定位置和缩放级别。

```typescript
flyTo(
  lon: number,
  lat: number,
  zoom?: number,
  options?: FlyToAnimationOptions
): void
```

**参数：**
- `lon` - 目标经度
- `lat` - 目标纬度
- `zoom` - 目标缩放级别（可选，默认保持当前缩放）
- `options` - 动画选项（可选）

**FlyToAnimationOptions：**

```typescript
interface FlyToAnimationOptions {
  duration?: number;      // 动画时长（毫秒），默认自动计算
  maxDuration?: number;   // 最大时长（毫秒），默认 3000
  easing?: (t: number) => number; // 缓动函数
}
```

**示例：**

```typescript
// 飞到上海，缩放到 12 级
engine.flyTo(121.4737, 31.2304, 12);

// 自定义动画时长
engine.flyTo(121.4737, 31.2304, 12, {
  duration: 2000,
});

// 只改变位置，保持当前缩放
engine.flyTo(113.2644, 23.1291);
```

### fitBounds()

自动适配到指定边界。

```typescript
fitBounds(
  bounds: {
    minLon: number;
    minLat: number;
    maxLon: number;
    maxLat: number;
  },
  options?: FlyToAnimationOptions & { padding?: number }
): void
```

**参数：**
- `bounds` - 边界对象
- `options` - 动画选项（可选）
  - `padding` - 边界填充（像素），默认 50

**示例：**

```typescript
// 适配中国边界
engine.fitBounds({
  minLon: 73.5,
  minLat: 18.2,
  maxLon: 135.0,
  maxLat: 53.5
});

// 自定义填充和动画时长
engine.fitBounds(
  {
    minLon: 110,
    minLat: 30,
    maxLon: 120,
    maxLat: 40
  },
  {
    padding: 100,
    duration: 1500,
  }
);
```

## 设备像素比

### getDevicePixelRatio()

获取设备像素比。

```typescript
getDevicePixelRatio(): number
```

**返回值：**
- 设备像素比

**示例：**

```typescript
const dpr = engine.getDevicePixelRatio();
console.log(dpr); // 1, 2, 或 3
```

### setDevicePixelRatio()

设置设备像素比。

```typescript
setDevicePixelRatio(dpr: number): void
```

**参数：**
- `dpr` - 设备像素比

**示例：**

```typescript
engine.setDevicePixelRatio(2);
```

## 事件系统

### on()

添加事件监听器。

```typescript
on<K extends keyof MapEventMap>(
  eventName: K,
  listener: (event: MapEventMap[K]) => void
): () => void
```

**参数：**
- `eventName` - 事件名称（'click' 或 'mousemove'）
- `listener` - 事件处理函数

**返回值：**
- 移除监听器的函数

**示例：**

```typescript
// 添加监听器
engine.on('click', (event) => {
  console.log('点击:', event.lon, event.lat);
});

// 使用返回的函数移除监听器
const removeListener = engine.on('click', (event) => {
  console.log('点击:', event.lon, event.lat);
});
removeListener();
```

### once()

添加一次性事件监听器。

```typescript
once<K extends keyof MapEventMap>(
  eventName: K,
  listener: (event: MapEventMap[K]) => void
): () => void
```

**参数：**
- `eventName` - 事件名称
- `listener` - 事件处理函数

**返回值：**
- 移除监听器的函数

**示例：**

```typescript
engine.once('click', (event) => {
  console.log('第一次点击:', event.lon, event.lat);
});
```

### off()

移除事件监听器。

```typescript
off<K extends keyof MapEventMap>(
  eventName: K,
  listener: (event: MapEventMap[K]) => void
): void
```

**参数：**
- `eventName` - 事件名称
- `listener` - 要移除的事件处理函数

**示例：**

```typescript
const handler = (event) => {
  console.log('点击:', event.lon, event.lat);
};

engine.on('click', handler);
engine.off('click', handler);
```

### removeAllListeners()

移除所有事件监听器。

```typescript
removeAllListeners<K extends keyof MapEventMap>(eventName?: K): void
```

**参数：**
- `eventName` - 事件名称（可选）

**示例：**

```typescript
// 移除指定事件的所有监听器
engine.removeAllListeners('click');

// 移除所有事件的所有监听器
engine.removeAllListeners();
```

## 销毁

### destroy()

销毁地图引擎，释放资源。

```typescript
destroy(): void
```

**示例：**

```typescript
engine.destroy();
```

## 完整示例

```typescript
import { MapEngine, TileLayer, VectorLayer } from 'mapjar';

// 创建地图引擎
const engine = new MapEngine('#map', {
  center: [116.4074, 39.9042],
  zoom: 10,
  enableRotation: true,
});

// 添加瓦片图层
const tileLayer = new TileLayer(
  'osm',
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
);
engine.addLayer(tileLayer);

// 添加矢量图层
const vectorLayer = new VectorLayer('vector', {
  fillColor: [0.2, 0.6, 1.0, 0.4],
  strokeColor: [0.0, 0.4, 0.8, 1.0],
});
engine.addLayer(vectorLayer);

// 监听点击事件
engine.on('click', (event) => {
  console.log(`点击位置: ${event.lon.toFixed(4)}, ${event.lat.toFixed(4)}`);
  
  // 添加标记
  vectorLayer.addFeature({
    type: 'point',
    coordinates: [event.lon, event.lat],
    properties: { name: '标记' }
  });
});

// 飞到上海
setTimeout(() => {
  engine.flyTo(121.4737, 31.2304, 12, { duration: 2000 });
}, 2000);

// 清理
// engine.destroy();
```

## 下一步

- [Camera API](./camera) - 查看相机系统的完整 API
- [图层 API](./layers/layer) - 查看图层系统的完整 API
