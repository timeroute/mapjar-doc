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

## 数据管理

### setData()

设置热力图数据。

```typescript
setData(data: HeatmapData): void
```

**参数：**
- `data` - 热力图数据对象

**HeatmapData 接口：**
```typescript
interface HeatmapData {
  image?: ImageBitmap | HTMLImageElement;  // 图像数据（推荐）
  values?: Float32Array;                   // 数值数组（备选）
  width?: number;                          // 数据宽度
  height?: number;                         // 数据高度
  min?: number;                            // 最小值
  max?: number;                            // 最大值
  alpha?: Float32Array;                    // 透明度数据（可选）
  bounds: {                                // 地理边界（必需）
    minLon: number;
    minLat: number;
    maxLon: number;
    maxLat: number;
  };
}
```

**示例：**
```typescript
// 使用图像数据（推荐）
heatmapLayer.setData({
  image: bitmap,
  bounds: {
    minLon: -180,
    minLat: -90,
    maxLon: 180,
    maxLat: 90
  }
});

// 使用数值数组
heatmapLayer.setData({
  values: temperatureData,
  width: 360,
  height: 180,
  min: -10,
  max: 40,
  bounds: {
    minLon: -180,
    minLat: -90,
    maxLon: 180,
    maxLat: 90
  }
});
```

## 样式配置

### setColorRamp()

设置颜色映射。

```typescript
setColorRamp(colorRamp: string[] | ColorStop[]): void
```

**参数：**
- `colorRamp` - 颜色渐变数组

**ColorStop 接口：**
```typescript
interface ColorStop {
  value: number;    // 位置值 (0-1)
  color: string;    // 颜色值
}
```

**示例：**
```typescript
// 使用颜色字符串数组（均匀分布）
heatmapLayer.setColorRamp([
  '#0000FF',  // 蓝色
  '#00FF00',  // 绿色
  '#FF0000'   // 红色
]);

// 使用 ColorStop 数组（精确控制）
heatmapLayer.setColorRamp([
  { value: 0.0, color: '#0000FF' },
  { value: 0.3, color: '#00FF00' },
  { value: 1.0, color: '#FF0000' }
]);
```

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

查看 [热力图层文档](../../layers/heatmap-layer) 了解详细用法。
