---
sidebar_position: 5
---

# ImageLayer API

图像图层 API 文档。

完整的 ImageLayer 使用指南请参考 [图像图层](../../layers/image-layer)。

## 构造函数

```typescript
constructor(id: string, options: ImageLayerOptions)
```

## 配置选项

```typescript
interface ImageLayerOptions {
  url?: string;
  image?: HTMLImageElement | ImageBitmap;
  bounds: {
    minLon: number;
    minLat: number;
    maxLon: number;
    maxLat: number;
  };
  useMipmap?: boolean;
}
```

## 方法

### loadFromURL()

从 URL 加载图像。

```typescript
loadFromURL(): Promise<void>
```

### setImage()

设置图像。

```typescript
setImage(image: HTMLImageElement | ImageBitmap): void
```

查看 [图像图层文档](../../layers/image-layer) 了解详细用法。
