---
sidebar_position: 9
---

# CanvasLayer API

Canvas 图层 API 文档。

完整的 CanvasLayer 使用指南请参考 [Canvas 图层](../../layers/canvas-layer)。

## 构造函数

```typescript
constructor(id: string, width?: number, height?: number)
```

## 方法

### getCanvas()

获取 Canvas 元素。

```typescript
getCanvas(): HTMLCanvasElement
```

### getContext()

获取 2D 上下文。

```typescript
getContext(): CanvasRenderingContext2D
```

### resize()

调整大小。

```typescript
resize(width: number, height: number): void
```

### clear()

清空 Canvas。

```typescript
clear(): void
```

查看 [Canvas 图层文档](../../layers/canvas-layer) 了解详细用法。
