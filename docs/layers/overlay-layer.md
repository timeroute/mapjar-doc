---
sidebar_position: 7
---

# 覆盖层图层 (OverlayLayer)

覆盖层图层用于在地图上叠加 HTML 元素，适合标注、弹窗等场景。

## 基本用法

```typescript
import { OverlayLayer } from 'mapjar';

const overlayLayer = new OverlayLayer('overlays');
engine.addLayer(overlayLayer);

const element = document.createElement('div');
element.innerHTML = `
  <div style="background: white; padding: 10px; border-radius: 8px;">
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

## 位置配置

```typescript
interface OverlayPosition {
  lon: number;           // 经度
  lat: number;           // 纬度
  offset?: [number, number];  // 偏移 [x, y]
  anchor?: [number, number];  // 锚点 [x, y]
}
```

### 锚点示例

```typescript
// 底部中心（适合标注）
anchor: [0.5, 1.0]

// 中心（适合图标）
anchor: [0.5, 0.5]

// 左上角
anchor: [0, 0]
```

## 管理覆盖层

```typescript
// 更新位置
overlayLayer.updateOverlayPosition('beijing', {
  lon: 116.5,
  lat: 40.0,
});

// 设置可见性
overlayLayer.setOverlayVisible('beijing', false);

// 移除覆盖层
overlayLayer.removeOverlay('beijing');

// 清空所有
overlayLayer.clearOverlays();
```

## 应用场景

- 地图标注（Marker）
- 信息弹窗（Popup）
- 自定义控件
- 富文本内容
- 图片、视频展示

## 下一步

- [Canvas 图层](./canvas-layer) - 自定义 2D 绘制
- [示例](../examples/overlay-layer) - 查看完整示例
