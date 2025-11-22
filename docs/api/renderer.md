---
sidebar_position: 4
---

# WebGL2Renderer API

WebGL2 渲染器负责图层的渲染。

## 获取渲染器

```typescript
const renderer = engine.getRenderer();
```

## 主要方法

### getContext()

获取 WebGL2 上下文。

```typescript
getContext(): WebGL2RenderingContext | null
```

### getCamera()

获取相机对象。

```typescript
getCamera(): Camera
```

### getLayers()

获取所有图层。

```typescript
getLayers(): Layer[]
```

## 注意事项

通常不需要直接操作渲染器，MapEngine 会自动管理渲染流程。
