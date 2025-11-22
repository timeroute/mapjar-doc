---
sidebar_position: 8
---

# OverlayLayer API

覆盖层图层 API 文档。

完整的 OverlayLayer 使用指南请参考 [覆盖层图层](../../layers/overlay-layer)。

## 构造函数

```typescript
constructor(id: string)
```

## 方法

### addOverlay()

添加覆盖层。

```typescript
addOverlay(overlay: Overlay): void
```

### removeOverlay()

移除覆盖层。

```typescript
removeOverlay(id: string): void
```

### updateOverlayPosition()

更新覆盖层位置。

```typescript
updateOverlayPosition(id: string, position: OverlayPosition): void
```

### setOverlayVisible()

设置覆盖层可见性。

```typescript
setOverlayVisible(id: string, visible: boolean): void
```

查看 [覆盖层图层文档](../../layers/overlay-layer) 了解详细用法。
