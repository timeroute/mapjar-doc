---
sidebar_position: 1
---

# Layer API

所有图层的基类。

## 构造函数

```typescript
constructor(id: string)
```

## 方法

### getId()

获取图层 ID。

```typescript
getId(): string
```

### setVisible()

设置可见性。

```typescript
setVisible(visible: boolean): void
```

### isVisible()

获取可见性。

```typescript
isVisible(): boolean
```

### setOpacity()

设置透明度（0.0 - 1.0）。

```typescript
setOpacity(opacity: number): void
```

### getOpacity()

获取透明度。

```typescript
getOpacity(): number
```

### setZIndex()

设置层级。

```typescript
setZIndex(zIndex: number): void
```

### getZIndex()

获取层级。

```typescript
getZIndex(): number
```

### setDevicePixelRatio()

设置设备像素比。

```typescript
setDevicePixelRatio(dpr: number): void
```

### getDevicePixelRatio()

获取设备像素比。

```typescript
getDevicePixelRatio(): number
```

## 抽象方法

子类必须实现以下方法：

```typescript
abstract render(gl: WebGL2RenderingContext, viewMatrix: Float32Array): void;
abstract destroy(gl: WebGL2RenderingContext): void;
```

## 下一步

查看具体图层的 API 文档：

- [TileLayer](./tile-layer)
- [VectorLayer](./vector-layer)
- [GeoJSONLayer](./geojson-layer)
