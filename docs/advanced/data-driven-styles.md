---
sidebar_position: 1
---

# 数据驱动样式

根据要素属性动态设置样式，实现丰富的数据可视化效果。

## 基本概念

数据驱动样式允许你根据要素的属性值动态设置样式，而不是使用固定的样式。

## 使用方法

```typescript
import { VectorLayer, StyleFunction } from 'mapjar';

const layer = new VectorLayer('vector');

layer.setDataDrivenStyle({
  fillColor: StyleFunction.createPropertyColorMap(
    'type',
    {
      'residential': [0.8, 0.8, 0.6, 0.5],
      'commercial': [1.0, 0.6, 0.6, 0.5],
      'park': [0.4, 0.8, 0.4, 0.5],
    },
    [0.5, 0.5, 0.5, 0.5] // 默认颜色
  )
});
```

## 样式函数

### createPropertyColorMap

基于分类属性的颜色映射。

```typescript
const colorMap = StyleFunction.createPropertyColorMap(
  'type',  // 属性名
  {
    'residential': [0.8, 0.8, 0.6, 0.5],
    'commercial': [1.0, 0.6, 0.6, 0.5],
    'park': [0.4, 0.8, 0.4, 0.5],
  },
  [0.5, 0.5, 0.5, 0.5]  // 默认颜色
);
```

### createNumericColorScale

基于数值范围的颜色插值。

```typescript
const colorScale = StyleFunction.createNumericColorScale(
  'population',
  [
    [0, [0.2, 0.4, 1.0, 0.5]],
    [5000, [0.4, 0.8, 0.8, 0.5]],
    [10000, [0.8, 0.8, 0.4, 0.5]],
    [20000, [1.0, 0.4, 0.2, 0.5]],
  ],
  [0.5, 0.5, 0.5, 0.5]
);
```

### 自定义函数

```typescript
layer.setDataDrivenStyle({
  fillColor: (properties) => {
    const value = properties.temperature as number;
    if (value < 0) return [0.2, 0.4, 1.0, 0.6];
    if (value < 20) return [0.4, 0.8, 0.4, 0.6];
    if (value < 30) return [1.0, 0.8, 0.2, 0.6];
    return [1.0, 0.2, 0.2, 0.6];
  },
  pointSize: (properties) => {
    const importance = properties.importance as number || 1;
    return importance * 2;
  }
});
```

## 应用场景

- 人口密度热力图
- 交通流量可视化
- POI 分类显示
- 建筑高度可视化
- 温度分布图

## 完整示例

查看 [GeoJSON 图层示例](../examples/geojson-layer) 了解更多。
