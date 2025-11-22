---
sidebar_position: 5
---

# 风场图层 (WindLayer)

风场图层使用粒子系统渲染风场动画，适合风速、洋流等矢量场可视化。

## 基本用法

```typescript
import { WindLayer } from 'mapjar';

const windLayer = new WindLayer('wind', {
  particleCount: 5000,
  particleAge: 100,
  speedFactor: 0.5,
  lineWidth: 1.0,
  fadeOpacity: 0.97,
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

engine.addLayer(windLayer);
```

## 设置数据

```typescript
windLayer.setData({
  uv: new Float32Array([...]),  // UV 数据 [u0, v0, u1, v1, ...]
  width: 100,
  height: 50,
  minU: -10,
  maxU: 10,
  minV: -10,
  maxV: 10,
  alpha: new Float32Array([...]), // 可选：透明度
  bounds: {
    minLon: 73.5,
    minLat: 18.0,
    maxLon: 135.0,
    maxLat: 53.5,
  },
});
```

## 配置选项

```typescript
const windLayer = new WindLayer('wind', {
  particleCount: 5000,      // 粒子数量
  particleAge: 100,         // 粒子生命周期（帧数）
  speedFactor: 0.5,         // 速度因子
  lineWidth: 1.0,           // 线宽
  fadeOpacity: 0.97,        // 拖尾透明度
  wrapX: true,              // 跨世界渲染
  colorRamp: [...],         // 颜色渐变
});
```

## 颜色映射

```typescript
windLayer.setColorRamp([
  '#0000FF',  // 低速 - 蓝色
  '#00FF00',  // 中速 - 绿色
  '#FF0000',  // 高速 - 红色
]);
```

## 应用场景

- 风速可视化
- 洋流动画
- 气流模拟
- 矢量场展示

## 下一步

- [热力图层](./heatmap-layer) - 渲染连续数值场
- [示例](../examples/wind-layer) - 查看完整示例
