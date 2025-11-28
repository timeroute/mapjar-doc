---
sidebar_position: 3
---

# 瓦片图层示例

展示如何使用不同的瓦片源和配置选项。

完整的瓦片图层文档请参考 [瓦片图层](../layers/tile-layer)。

## 在线演示

<iframe 
  src="/examples/tile-layer.html" 
  style={{width: '100%', height: '500px', border: '1px solid #ddd', borderRadius: '4px'}}
  title="Mapjar 瓦片图层示例"
></iframe>

<a href="/examples/tile-layer.html" target="_blank" rel="noopener noreferrer">在新窗口打开 ↗</a>

## 多种瓦片源

```typescript
// OpenStreetMap
const osmLayer = new TileLayer(
  'osm',
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
);

// CartoDB Dark
const darkLayer = new TileLayer(
  'dark',
  'https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
);
```

## 切换底图

```typescript
function switchBaseMap(type) {
  engine.removeLayer('base');
  
  let url;
  if (type === 'osm') {
    url = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
  } else if (type === 'dark') {
    url = 'https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png';
  }
  
  const newLayer = new TileLayer('base', url);
  engine.addLayer(newLayer);
}
```

查看 [瓦片图层文档](../layers/tile-layer) 了解更多。
