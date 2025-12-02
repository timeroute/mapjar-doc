---
sidebar_position: 7
---

# 覆盖层图层 (OverlayLayer)

覆盖层图层用于在地图上叠加单个 HTML 元素，适合标注、弹窗等场景。

:::info
每个 OverlayLayer 只能显示一个覆盖层。如果需要多个覆盖层，请创建多个 OverlayLayer 实例。
:::

## 基本用法

```typescript
import { OverlayLayer } from 'mapjar';

// 创建覆盖层图层
const overlayLayer = new OverlayLayer('popup');
engine.addLayer(overlayLayer);

// 创建 HTML 元素
const element = document.createElement('div');
element.innerHTML = `
  <div style="
    background: white;
    padding: 10px 15px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  ">
    <h3 style="margin: 0 0 5px 0;">北京</h3>
    <p style="margin: 0; color: #666;">中国首都</p>
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
  visible: true,
});
```

## 接口定义

### Overlay

```typescript
interface Overlay {
  element: HTMLElement;           // HTML 元素
  position: OverlayPosition;      // 位置配置
  visible?: boolean;              // 是否可见（默认 true）
  properties?: Record<string, unknown>; // 自定义属性
}
```

### OverlayPosition

```typescript
interface OverlayPosition {
  lon: number;                    // 经度
  lat: number;                    // 纬度
  offset?: [number, number];      // 偏移 [x, y]（默认 [0, 0]）
  anchor?: [number, number];      // 锚点 [x, y]（默认 [0.5, 0.5]）
}
```

## 锚点说明

锚点决定 HTML 元素相对于地理位置的对齐方式：

```typescript
// 锚点坐标系：
// [0, 0]     - 左上角
// [0.5, 0]   - 顶部中心
// [1, 0]     - 右上角
// [0, 0.5]   - 左侧中心
// [0.5, 0.5] - 中心（默认）
// [1, 0.5]   - 右侧中心
// [0, 1]     - 左下角
// [0.5, 1]   - 底部中心（适合标注）
// [1, 1]     - 右下角
```

### 常用锚点示例

```typescript
// 标注（Marker）- 底部中心
overlayLayer.setOverlay({
  element: markerElement,
  position: {
    lon: 116.4074,
    lat: 39.9042,
    anchor: [0.5, 1.0],  // 底部中心
    offset: [0, -10],    // 向上偏移 10px
  },
});

// 弹窗（Popup）- 底部中心
overlayLayer.setOverlay({
  element: popupElement,
  position: {
    lon: 116.4074,
    lat: 39.9042,
    anchor: [0.5, 1.0],  // 底部中心
    offset: [0, -20],    // 向上偏移 20px
  },
});

// 图标（Icon）- 中心
overlayLayer.setOverlay({
  element: iconElement,
  position: {
    lon: 116.4074,
    lat: 39.9042,
    anchor: [0.5, 0.5],  // 中心
  },
});
```

## 管理覆盖层

### 更新覆盖层

```typescript
// 更新部分属性
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

// 更新元素内容
const newElement = document.createElement('div');
newElement.innerHTML = '<h3>更新后的内容</h3>';
overlayLayer.updateOverlay({
  element: newElement,
});
```

### 获取覆盖层

```typescript
const overlay = overlayLayer.getOverlay();
if (overlay) {
  console.log('当前位置:', overlay.position);
  console.log('是否可见:', overlay.visible);
}
```

### 清除覆盖层

```typescript
overlayLayer.clearOverlay();
```

## 多个覆盖层

如果需要显示多个覆盖层，创建多个 OverlayLayer 实例：

```typescript
// 标注图层
const markerLayer = new OverlayLayer('marker');
markerLayer.setZIndex(20);
engine.addLayer(markerLayer);

// 弹窗图层
const popupLayer = new OverlayLayer('popup');
popupLayer.setZIndex(30);
engine.addLayer(popupLayer);

// 设置标注
markerLayer.setOverlay({
  element: markerElement,
  position: { lon: 116.4074, lat: 39.9042 },
});

// 设置弹窗
popupLayer.setOverlay({
  element: popupElement,
  position: { lon: 116.4074, lat: 39.9042, offset: [0, -40] },
});
```

## 完整示例

### 点击显示弹窗

```typescript
import { MapEngine, TileLayer, OverlayLayer } from 'mapjar';

const engine = new MapEngine('#map', {
  center: [116.4074, 39.9042],
  zoom: 10,
});

// 添加底图
const tileLayer = new TileLayer(
  'osm',
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
);
engine.addLayer(tileLayer);

// 创建弹窗图层
const popupLayer = new OverlayLayer('popup');
popupLayer.setZIndex(100);
engine.addLayer(popupLayer);

// 监听点击事件
engine.on('click', (event) => {
  // 创建弹窗元素
  const element = document.createElement('div');
  element.innerHTML = `
    <div style="
      background: white;
      padding: 12px 16px;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.3);
      min-width: 200px;
    ">
      <h3 style="margin: 0 0 8px 0; font-size: 16px;">点击位置</h3>
      <p style="margin: 0; color: #666; font-size: 14px;">
        经度: ${event.lon.toFixed(4)}<br>
        纬度: ${event.lat.toFixed(4)}
      </p>
      <button id="close-popup" style="
        margin-top: 8px;
        padding: 4px 12px;
        border: none;
        background: #1890ff;
        color: white;
        border-radius: 4px;
        cursor: pointer;
      ">关闭</button>
    </div>
  `;
  
  // 关闭按钮事件
  element.querySelector('#close-popup').addEventListener('click', () => {
    popupLayer.clearOverlay();
  });
  
  // 显示弹窗
  popupLayer.setOverlay({
    element: element,
    position: {
      lon: event.lon,
      lat: event.lat,
      offset: [0, -20],
      anchor: [0.5, 1.0],
    },
  });
});
```

### 自定义标注

```typescript
// 创建标注元素
function createMarker(text, color = '#ff0000') {
  const marker = document.createElement('div');
  marker.innerHTML = `
    <div style="
      position: relative;
      text-align: center;
    ">
      <div style="
        background: ${color};
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        white-space: nowrap;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      ">${text}</div>
      <div style="
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 8px solid ${color};
        margin: 0 auto;
      "></div>
    </div>
  `;
  return marker;
}

// 使用标注
const markerLayer = new OverlayLayer('marker');
engine.addLayer(markerLayer);

markerLayer.setOverlay({
  element: createMarker('北京', '#1890ff'),
  position: {
    lon: 116.4074,
    lat: 39.9042,
    anchor: [0.5, 1.0],
  },
  properties: { name: '北京' },
});
```

## 应用场景

- 🏷️ **地图标注（Marker）**：显示位置标记
- 💬 **信息弹窗（Popup）**：显示详细信息
- 🎯 **工具提示（Tooltip）**：鼠标悬停提示
- 🎨 **自定义控件**：地图控制按钮
- 📊 **数据展示**：图表、统计信息
- 🖼️ **媒体内容**：图片、视频预览

## 注意事项

1. **单个覆盖层**：每个 OverlayLayer 只能显示一个覆盖层
2. **多个覆盖层**：需要创建多个 OverlayLayer 实例
3. **层级控制**：使用 `setZIndex()` 控制显示顺序
4. **性能考虑**：避免创建过多的 OverlayLayer 实例
5. **事件处理**：HTML 元素的事件需要自行管理
6. **内存管理**：不需要时及时调用 `clearOverlay()`

## 下一步

- [Canvas 图层](./canvas-layer) - 自定义 2D 绘制
- [示例](../examples/overlay-layer) - 查看完整示例
