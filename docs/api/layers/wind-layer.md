---
sidebar_position: 6
---

# WindLayer API

风场图层 API 文档。

完整的 WindLayer 使用指南请参考 [风场图层](../../layers/wind-layer)。

## 构造函数

```typescript
constructor(id: string, options?: WindLayerOptions)
```

## 配置选项

```typescript
interface WindLayerOptions {
  particleCount?: number;
  particleAge?: number;
  speedFactor?: number;
  lineWidth?: number;
  fadeOpacity?: number;
  colorRamp?: string[];
  wrapX?: boolean;
}
```

## 方法

### setData()

设置风场数据。

```typescript
setData(data: WindData): void
```

查看 [风场图层文档](../../layers/wind-layer) 了解详细用法。
