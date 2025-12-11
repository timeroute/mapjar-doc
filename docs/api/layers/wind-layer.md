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

## 数据管理

### setData()

设置风场数据。

```typescript
setData(data: WindData): void
```

**参数：**
- `data` - 风场数据对象

**WindData 接口：**
```typescript
interface WindData {
  uv: Float32Array;           // UV 分量数据
  width: number;              // 数据宽度
  height: number;             // 数据高度
  minU: number;               // U 分量最小值
  maxU: number;               // U 分量最大值
  minV: number;               // V 分量最小值
  maxV: number;               // V 分量最大值
  alpha?: Float32Array;       // 透明度数据（可选）
  bounds?: {                  // 地理边界（可选）
    minLon: number;
    minLat: number;
    maxLon: number;
    maxLat: number;
  };
}
```

**示例：**
```typescript
windLayer.setData({
  uv: uvData,
  width: 360,
  height: 180,
  minU: -21.32,
  maxU: 26.8,
  minV: -21.57,
  maxV: 21.42,
  bounds: {
    minLon: -180,
    minLat: -90,
    maxLon: 180,
    maxLat: 90
  }
});
```

### getData()

获取当前风场数据。

```typescript
getData(): WindData | null
```

**返回值：**
- 风场数据对象，如果没有数据则返回 `null`

## 配置方法

### setCamera()

设置相机引用（通常由 MapEngine 自动调用）。

```typescript
setCamera(camera: Camera): void
```

### setWrapX()

设置是否启用跨世界渲染。

```typescript
setWrapX(wrapX: boolean): void
```

**参数：**
- `wrapX` - 是否启用跨世界渲染

### getWrapX()

获取跨世界渲染设置。

```typescript
getWrapX(): boolean
```

**返回值：**
- 是否启用跨世界渲染

查看 [风场图层文档](../../layers/wind-layer) 了解详细用法。
