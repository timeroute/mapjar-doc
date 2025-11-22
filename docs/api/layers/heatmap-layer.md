---
sidebar_position: 7
---

# HeatmapLayer API

热力图层 API 文档。

完整的 HeatmapLayer 使用指南请参考 [热力图层](../../layers/heatmap-layer)。

## 构造函数

```typescript
constructor(id: string, options?: HeatmapLayerOptions)
```

## 配置选项

```typescript
interface HeatmapLayerOptions {
  colorRamp?: string[] | ColorStop[];
  wrapX?: boolean;
}
```

## 方法

### setData()

设置热力图数据。

```typescript
setData(data: HeatmapData): void
```

### setColorRamp()

设置颜色映射。

```typescript
setColorRamp(colorRamp: string[] | ColorStop[]): void
```

查看 [热力图层文档](../../layers/heatmap-layer) 了解详细用法。
