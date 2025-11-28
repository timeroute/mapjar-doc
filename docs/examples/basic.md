---
sidebar_position: 2
---

# 基础地图示例

创建一个简单的地图应用，包含瓦片图层和基本交互。

## 在线演示

<iframe 
  src="/examples/basic.html" 
  style={{width: '100%', height: '500px', border: '1px solid #ddd', borderRadius: '4px'}}
  title="Mapjar 基础示例"
></iframe>

<a href="/examples/basic.html" target="_blank" rel="noopener noreferrer">在新窗口打开 ↗</a>

## 完整代码

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mapjar 基础示例</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      overflow: hidden;
      font-family: Arial, sans-serif;
    }
    #map {
      width: 100vw;
      height: 100vh;
    }
    #info {
      position: absolute;
      top: 10px;
      left: 10px;
      background: white;
      padding: 10px 15px;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      font-size: 14px;
      z-index: 1000;
    }
    #coords {
      margin-top: 5px;
      color: #666;
    }
  </style>
</head>
<body>
  <canvas id="map"></canvas>
  <div id="info">
    <div>点击地图查看坐标</div>
    <div id="coords">-</div>
  </div>
  
  <script type="module">
    import { MapEngine, TileLayer } from 'mapjar';
    
    // 创建地图引擎
    const engine = new MapEngine('#map', {
      center: [116.4074, 39.9042], // 北京
      zoom: 10,
      enableRotation: true,
    });
    
    // 添加 OpenStreetMap 瓦片图层
    const tileLayer = new TileLayer(
      'osm',
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        tileScale: 1.0,
        wrapX: true,
        fadeInDuration: 200,
      }
    );
    engine.addLayer(tileLayer);
    
    // 监听点击事件
    const coordsDisplay = document.getElementById('coords');
    
    engine.on('click', (event) => {
      const lon = event.lon.toFixed(4);
      const lat = event.lat.toFixed(4);
      coordsDisplay.textContent = `经度: ${lon}, 纬度: ${lat}`;
      
      console.log('点击位置:', event);
    });
    
    // 监听鼠标移动事件（可选）
    engine.on('mousemove', (event) => {
      // 实时显示鼠标位置
      // coordsDisplay.textContent = 
      //   `经度: ${event.lon.toFixed(4)}, 纬度: ${event.lat.toFixed(4)}`;
    });
    
    // 2秒后飞到上海
    setTimeout(() => {
      engine.flyTo(121.4737, 31.2304, 12, {
        duration: 2000,
      });
    }, 2000);
  </script>
</body>
</html>
```

## 代码说明

### 1. HTML 结构

```html
<canvas id="map"></canvas>
<div id="info">
  <div>点击地图查看坐标</div>
  <div id="coords">-</div>
</div>
```

- `<canvas>` 元素作为地图容器
- `<div>` 元素显示坐标信息

### 2. 创建地图引擎

```javascript
const engine = new MapEngine('#map', {
  center: [116.4074, 39.9042], // 北京
  zoom: 10,
  enableRotation: true,
});
```

- 使用选择器 `#map` 指定 Canvas 元素
- 设置初始中心点为北京
- 设置初始缩放级别为 10
- 启用右键旋转功能

### 3. 添加瓦片图层

```javascript
const tileLayer = new TileLayer(
  'osm',
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    tileScale: 1.0,
    wrapX: true,
    fadeInDuration: 200,
  }
);
engine.addLayer(tileLayer);
```

- 使用 OpenStreetMap 作为底图
- 启用跨世界渲染（`wrapX: true`）
- 设置瓦片淡入动画时长为 200ms

### 4. 监听点击事件

```javascript
engine.on('click', (event) => {
  const lon = event.lon.toFixed(4);
  const lat = event.lat.toFixed(4);
  coordsDisplay.textContent = `经度: ${lon}, 纬度: ${lat}`;
});
```

- 监听地图点击事件
- 获取点击位置的经纬度
- 更新页面显示

### 5. 平滑动画

```javascript
setTimeout(() => {
  engine.flyTo(121.4737, 31.2304, 12, {
    duration: 2000,
  });
}, 2000);
```

- 2秒后自动飞到上海
- 动画时长为 2000ms

## 交互操作

### 鼠标操作
- **拖拽**：按住鼠标左键拖动地图
- **滚轮**：滚动鼠标滚轮缩放地图
- **双击**：双击鼠标左键放大
- **右键拖拽**：按住鼠标右键旋转地图（需启用 `enableRotation`）

### 触摸操作
- **单指拖拽**：单指按住拖动地图
- **双指轻触**：快速连续轻触两次放大

## 扩展功能

### 添加缩放控件

```javascript
// 创建缩放控件
const zoomIn = document.createElement('button');
zoomIn.textContent = '+';
zoomIn.style.cssText = `
  position: absolute;
  top: 60px;
  right: 10px;
  width: 30px;
  height: 30px;
  z-index: 1000;
`;
zoomIn.onclick = () => {
  engine.setZoom(engine.getZoom() + 1);
};
document.body.appendChild(zoomIn);

const zoomOut = document.createElement('button');
zoomOut.textContent = '-';
zoomOut.style.cssText = `
  position: absolute;
  top: 95px;
  right: 10px;
  width: 30px;
  height: 30px;
  z-index: 1000;
`;
zoomOut.onclick = () => {
  engine.setZoom(engine.getZoom() - 1);
};
document.body.appendChild(zoomOut);
```

### 添加位置搜索

```javascript
const searchInput = document.createElement('input');
searchInput.placeholder = '搜索城市...';
searchInput.style.cssText = `
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  z-index: 1000;
`;

const cities = {
  '北京': [116.4074, 39.9042],
  '上海': [121.4737, 31.2304],
  '广州': [113.2644, 23.1291],
  '深圳': [114.0579, 22.5431],
};

searchInput.onchange = (e) => {
  const city = e.target.value;
  const coords = cities[city];
  if (coords) {
    engine.flyTo(coords[0], coords[1], 12, { duration: 2000 });
  }
};

document.body.appendChild(searchInput);
```

## 下一步

- [瓦片图层示例](./tile-layer) - 学习更多瓦片图层的用法
- [矢量图层示例](./vector-layer) - 添加点、线、面要素
- [GeoJSON 图层示例](./geojson-layer) - 加载 GeoJSON 数据
