---
sidebar_position: 7
---

# 风场图层示例

渲染风场粒子动画。

完整的风场图层文档请参考 [风场图层](../layers/wind-layer)。

## 在线演示

<iframe 
  src="/examples/wind-layer.html" 
  style={{width: '100%', height: '500px', border: '1px solid #ddd', borderRadius: '4px'}}
  title="Mapjar 风场图层示例"
></iframe>

[在新窗口打开](/examples/wind-layer.html)

## 基本用法

```typescript
const windLayer = new WindLayer('wind', {
  particleCount: 5000,
  speedFactor: 0.5,
  colorRamp: [
    '#3288bd',
    '#66c2a5',
    '#abdda4',
    '#e6f598',
    '#fee08b',
    '#fdae61',
    '#f46d43',
    '#d53e4f',
  ],
});

windLayer.setData({
  uv: new Float32Array([...]),
  width: 100,
  height: 50,
  minU: -10,
  maxU: 10,
  minV: -10,
  maxV: 10,
  bounds: {
    minLon: 73.5,
    minLat: 18.0,
    maxLon: 135.0,
    maxLat: 53.5,
  },
});

engine.addLayer(windLayer);
```

查看 [风场图层文档](../layers/wind-layer) 了解更多。
