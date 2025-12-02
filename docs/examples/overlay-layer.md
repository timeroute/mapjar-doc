---
sidebar_position: 9
---

# 覆盖层图层示例

在地图上叠加 HTML 元素。

完整的覆盖层图层文档请参考 [覆盖层图层](../layers/overlay-layer)。

## 在线演示

<iframe 
  src="/examples/overlay-layer.html" 
  style={{width: '100%', height: '500px', border: '1px solid #ddd', borderRadius: '4px'}}
  title="Mapjar 覆盖层图层示例"
></iframe>

<a href="/examples/overlay-layer.html" target="_blank" rel="noopener noreferrer">在新窗口打开 ↗</a>

## 基本示例

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

// 创建覆盖层图层
const overlayLayer = new OverlayLayer('popup');
overlayLayer.setZIndex(100);
engine.addLayer(overlayLayer);

// 创建 HTML 元素
const element = document.createElement('div');
element.innerHTML = `
  <div style="
    background: white;
    padding: 12px 16px;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.3);
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
});
```

## 点击显示弹窗

```typescript
import { MapEngine, TileLayer, OverlayLayer } from 'mapjar';

const engine = new MapEngine('#map', {
  center: [116.4074, 39.9042],
  zoom: 10,
});

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

## 自定义标注

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
markerLayer.setZIndex(50);
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

## 多个覆盖层

```typescript
// 创建多个图层实例
const markerLayer = new OverlayLayer('marker');
markerLayer.setZIndex(50);
engine.addLayer(markerLayer);

const popupLayer = new OverlayLayer('popup');
popupLayer.setZIndex(100);
engine.addLayer(popupLayer);

// 设置标注
markerLayer.setOverlay({
  element: createMarker('北京', '#1890ff'),
  position: {
    lon: 116.4074,
    lat: 39.9042,
    anchor: [0.5, 1.0],
  },
});

// 设置弹窗
const popupElement = document.createElement('div');
popupElement.innerHTML = `
  <div style="background: white; padding: 10px; border-radius: 8px;">
    <h3>详细信息</h3>
    <p>这是一个弹窗</p>
  </div>
`;

popupLayer.setOverlay({
  element: popupElement,
  position: {
    lon: 116.4074,
    lat: 39.9042,
    offset: [0, -40],
    anchor: [0.5, 1.0],
  },
});
```

## 动态更新

```typescript
const overlayLayer = new OverlayLayer('dynamic');
engine.addLayer(overlayLayer);

// 初始设置
overlayLayer.setOverlay({
  element: createMarker('起点', '#00ff00'),
  position: {
    lon: 116.4074,
    lat: 39.9042,
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

// 4秒后更新元素
setTimeout(() => {
  overlayLayer.updateOverlay({
    element: createMarker('终点', '#ff0000'),
  });
}, 4000);
```

## 完整 HTML 示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>覆盖层示例</title>
  <style>
    body { margin: 0; padding: 0; }
    #map { width: 100vw; height: 100vh; }
  </style>
</head>
<body>
  <canvas id="map"></canvas>
  
  <script type="module">
    import { MapEngine, TileLayer, OverlayLayer } from 'mapjar';
    
    const engine = new MapEngine('#map', {
      center: [116.4074, 39.9042],
      zoom: 10,
    });
    
    const tileLayer = new TileLayer(
      'osm',
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
    );
    engine.addLayer(tileLayer);
    
    const popupLayer = new OverlayLayer('popup');
    popupLayer.setZIndex(100);
    engine.addLayer(popupLayer);
    
    engine.on('click', (event) => {
      const element = document.createElement('div');
      element.innerHTML = `
        <div style="
          background: white;
          padding: 12px 16px;
          border-radius: 8px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.3);
        ">
          <h3 style="margin: 0 0 8px 0;">点击位置</h3>
          <p style="margin: 0; color: #666;">
            经度: ${event.lon.toFixed(4)}<br>
            纬度: ${event.lat.toFixed(4)}
          </p>
          <button id="close" style="
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
      
      element.querySelector('#close').onclick = () => {
        popupLayer.clearOverlay();
      };
      
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
  </script>
</body>
</html>
```

查看 [覆盖层图层文档](../layers/overlay-layer) 了解更多。
