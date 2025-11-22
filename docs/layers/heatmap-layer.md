---
sidebar_position: 6
---

# 热力图层 (HeatmapLayer)

热力图层用于渲染连续数值场，如温度、降水、海拔等。

## 基本用法

```typescript
import { HeatmapLayer } from 'mapjar';

const heatmapLayer = new HeatmapLayer('temperature', {
  colorRamp: [
    { value: 0.0, color: '#313695' },
    { value: 0.5, color: '#ffffbf' },
    { value: 1.0, color: '#a50026' },
  ],
});

engine.addLayer(heatmapLayer);
```

## 从图片加载（推荐）

```typescript
const img = new Image();
img.crossOrigin = 'anonymous';
img.onload = async () => {
  const bitmap = await createImageBitmap(img);
  heatmapLayer.setData({
    image: bitmap,
    bounds: {
      minLon: 55,
      minLat: 1,
      maxLon: 155,
      maxLat: 57,
    },
  });
};
img.src = 'temperature.png';
```

## 使用数值数组

```typescript
heatmapLayer.setData({
  values: new Float32Array([...]),
  width: 100,
  height: 50,
  min: -10,
  max: 40,
  alpha: new Float32Array([...]), // 可选
  bounds: {
    minLon: 55,
    minLat: 1,
    maxLon: 155,
    maxLat: 57,
  },
});
```

## 颜色映射

### 字符串数组（均匀分布）

```typescript
heatmapLayer.setColorRamp([
  '#0000FF',
  '#00FF00',
  '#FF0000'
]);
```

### ColorStop 数组（精确控制）

```typescript
heatmapLayer.setColorRamp([
  { value: 0.0, color: '#0000FF' },
  { value: 0.3, color: '#00FF00' },
  { value: 1.0, color: '#FF0000' },
]);
```

## 应用场景

- 温度场可视化
- 降水量分布
- 气压场显示
- 污染物浓度
- 海拔高度图

## 下一步

- [风场图层](./wind-layer) - 渲染风场动画
- [示例](../examples/heatmap-layer) - 查看完整示例
