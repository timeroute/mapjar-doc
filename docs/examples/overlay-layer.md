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

[在新窗口打开](/examples/overlay-layer.html)

## 基本用法

```typescript
const overlayLayer = new OverlayLayer('overlays');
engine.addLayer(overlayLayer);

const element = document.createElement('div');
element.innerHTML = `
  <div style="
    background: white;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  ">
    <h3>北京</h3>
    <p>中国首都</p>
  </div>
`;

overlayLayer.addOverlay({
  id: 'beijing',
  element: element,
  position: {
    lon: 116.4074,
    lat: 39.9042,
    offset: [0, -20],
    anchor: [0.5, 1.0],
  },
});
```

查看 [覆盖层图层文档](../layers/overlay-layer) 了解更多。
