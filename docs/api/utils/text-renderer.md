---
sidebar_position: 7
---

# TextRenderer API

文字渲染工具类，用于在 WebGL 中渲染文字。

## 构造函数

```typescript
constructor(gl: WebGL2RenderingContext, devicePixelRatio?: number)
```

**参数：**
- `gl` - WebGL2 上下文
- `devicePixelRatio` - 设备像素比，默认 1.0

**示例：**
```typescript
import { TextRenderer } from 'mapjar';

const textRenderer = new TextRenderer(gl, window.devicePixelRatio);
```

## 设备像素比

### setDevicePixelRatio()

设置设备像素比。

```typescript
setDevicePixelRatio(dpr: number): void
```

## 纹理创建

### createTextTexture()

创建文字纹理。

```typescript
createTextTexture(
  text: string,
  options?: TextTextureOptions
): TextTextureInfo | null
```

**参数：**
- `text` - 文字内容
- `options` - 文字选项（可选）

**TextTextureOptions：**
```typescript
interface TextTextureOptions {
  font?: string;                              // 字体，默认 '16px Arial'
  textColor?: [number, number, number, number]; // 文字颜色 RGBA
  haloColor?: [number, number, number, number]; // 描边颜色 RGBA
  haloWidth?: number;                         // 描边宽度，默认 0
  maxWidth?: number;                          // 最大宽度，超过自动换行
  cacheKey?: string;                          // 缓存键
}
```

**返回值：**
- 文字纹理信息，失败时返回 `null`

**示例：**
```typescript
const textureInfo = textRenderer.createTextTexture('Hello World', {
  font: '18px Arial',
  textColor: [0, 0, 0, 1],
  haloColor: [1, 1, 1, 1],
  haloWidth: 2
});
```

## 文字渲染

### renderText()

渲染文字到屏幕。

```typescript
renderText(
  viewMatrix: Float32Array,
  texture: WebGLTexture,
  width: number,
  height: number,
  x: number,
  y: number,
  color: [number, number, number, number],
  opacity: number,
  offset?: [number, number]
): void
```

## 锚点计算

### getAnchorOffset()

计算锚点偏移。

```typescript
getAnchorOffset(
  anchor: string,
  width: number,
  height: number
): [number, number]
```

**锚点选项：**
- `'center'` - 中心
- `'left'` - 左对齐
- `'right'` - 右对齐
- `'top'` - 顶部对齐
- `'bottom'` - 底部对齐

## 资源销毁

### destroy()

销毁文字渲染器，释放资源。

```typescript
destroy(): void
```

查看完整的文字渲染使用指南。