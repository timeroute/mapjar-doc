---
sidebar_position: 2
---

# TileLayer API

瓦片图层 API 文档。

完整的 TileLayer 使用指南请参考 [瓦片图层](../../layers/tile-layer)。

## 构造函数

```typescript
constructor(
  id: string,
  urlTemplate: string,
  options?: TileLayerOptions
)
```

## 配置选项

```typescript
interface TileLayerOptions {
  maxConcurrent?: number;
  tileScale?: number;
  wrapX?: boolean;
  fadeInDuration?: number;
}
```

## 方法

### setTileScale()

设置瓦片缩放比例。

```typescript
setTileScale(scale: number): void
```

### getTileScale()

获取瓦片缩放比例。

```typescript
getTileScale(): number
```

查看 [瓦片图层文档](../../layers/tile-layer) 了解详细用法。
