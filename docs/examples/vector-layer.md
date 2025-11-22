---
sidebar_position: 4
---

# 矢量图层示例

演示如何添加和渲染点、线、面要素。

完整的矢量图层文档请参考 [矢量图层](../layers/vector-layer)。

## 添加要素

```typescript
const vectorLayer = new VectorLayer('vector', {
  fillColor: [0.2, 0.6, 1.0, 0.4],
  strokeColor: [0.0, 0.4, 0.8, 1.0],
  strokeWidth: 2.0,
  pointSize: 10.0,
  textField: 'name',
  textFont: '14px Arial',
});

// 添加点
vectorLayer.addFeature({
  type: 'point',
  coordinates: [116.4074, 39.9042],
  properties: { name: '北京' }
});

// 添加线
vectorLayer.addFeature({
  type: 'line',
  coordinates: [
    [116.4074, 39.9042],
    [121.4737, 31.2304]
  ],
  properties: { name: '路线' }
});

// 添加面
vectorLayer.addFeature({
  type: 'polygon',
  coordinates: [[
    [116.2, 39.8],
    [116.6, 39.8],
    [116.6, 40.0],
    [116.2, 40.0],
    [116.2, 39.8]
  ]],
  properties: { name: '区域' }
});
```

查看 [矢量图层文档](../layers/vector-layer) 了解更多。
