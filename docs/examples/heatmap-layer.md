---
sidebar_position: 8
---

# 热力图层示例

渲染连续数值场（温度、降水等）。

完整的热力图层文档请参考 [热力图层](../layers/heatmap-layer)。

## 在线演示

<iframe 
  src="/examples/heatmap-layer.html" 
  style={{width: '100%', height: '500px', border: '1px solid #ddd', borderRadius: '4px'}}
  title="Mapjar 热力图层示例"
></iframe>

<a href="/examples/heatmap-layer.html" target="_blank" rel="noopener noreferrer">在新窗口打开 ↗</a>

## 基本用法

```typescript
const heatmapLayer = new HeatmapLayer('temperature', {
  colorRamp: [
    { value: 0.0, color: '#313695' },
    { value: 0.5, color: '#ffffbf' },
    { value: 1.0, color: '#a50026' },
  ],
});

heatmapLayer.setData({
  values: new Float32Array([...]),
  width: 100,
  height: 50,
  min: -10,
  max: 40,
  bounds: {
    minLon: 55,
    minLat: 1,
    maxLon: 155,
    maxLat: 57,
  },
});

engine.addLayer(heatmapLayer);
```

查看 [热力图层文档](../layers/heatmap-layer) 了解更多。
