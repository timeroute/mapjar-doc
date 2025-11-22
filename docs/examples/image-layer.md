---
sidebar_position: 6
---

# 图像图层示例

在地图上叠加单张图像。

完整的图像图层文档请参考 [图像图层](../layers/image-layer)。

## 基本用法

```typescript
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

imageLayer.setOpacity(0.7);
engine.addLayer(imageLayer);
await imageLayer.loadFromURL();
```

查看 [图像图层文档](../layers/image-layer) 了解更多。
