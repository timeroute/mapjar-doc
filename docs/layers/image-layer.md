---
sidebar_position: 4
---

# 图像图层 (ImageLayer)

图像图层用于在地图上渲染单张带地理坐标的图像，适合历史地图叠加、卫星影像等场景。

## 基本用法

```typescript
import { ImageLayer } from 'mapjar';

const imageLayer = new ImageLayer('historical-map', {
  url: 'https://example.com/historical-map.png',
  bounds: {
    minLon: 116.2,
    minLat: 39.8,
    maxLon: 116.6,
    maxLat: 40.1,
  },
  useMipmap: true,
});

engine.addLayer(imageLayer);
await imageLayer.loadFromURL();
```

## 从 URL 加载

```typescript
const imageLayer = new ImageLayer('overlay', {
  url: 'https://example.com/map.png',
  bounds: {
    minLon: 116.2,
    minLat: 39.8,
    maxLon: 116.6,
    maxLat: 40.1,
  },
});

await imageLayer.loadFromURL();
```

## 直接使用图像

```typescript
const img = new Image();
img.src = 'map.png';
img.onload = () => {
  const imageLayer = new ImageLayer('overlay', {
    image: img,
    bounds: {
      minLon: 116.2,
      minLat: 39.8,
      maxLon: 116.6,
      maxLat: 40.1,
    },
  });
  engine.addLayer(imageLayer);
};
```

## 配置选项

```typescript
const imageLayer = new ImageLayer('overlay', {
  url: 'https://example.com/map.png',
  bounds: {
    minLon: 116.2,  // 左下角经度
    minLat: 39.8,   // 左下角纬度
    maxLon: 116.6,  // 右上角经度
    maxLat: 40.1,   // 右上角纬度
  },
  useMipmap: true,  // 启用 Mipmap（默认 true）
});
```

## 透明度控制

```typescript
imageLayer.setOpacity(0.7); // 半透明叠加
```

## 应用场景

- 历史地图叠加
- 卫星影像
- 航拍照片
- 扫描地图
- 自定义底图

## 下一步

- [热力图层](./heatmap-layer) - 渲染连续数值场
- [风场图层](./wind-layer) - 渲染风场动画
