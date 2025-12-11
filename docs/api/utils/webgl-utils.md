---
sidebar_position: 6
---

# WebGLUtils API

WebGL 工具函数集合，提供常用的 WebGL 资源创建和管理功能。

## 着色器相关

### createShader()

创建着色器。

```typescript
createShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string
): WebGLShader | null
```

**参数：**
- `gl` - WebGL2 上下文
- `type` - 着色器类型（`gl.VERTEX_SHADER` 或 `gl.FRAGMENT_SHADER`）
- `source` - 着色器源代码

**返回值：**
- 着色器对象，失败时返回 `null`

**示例：**
```typescript
import { WebGLUtils } from 'mapjar';

const vertexShader = WebGLUtils.createShader(gl, gl.VERTEX_SHADER, vertexSource);
const fragmentShader = WebGLUtils.createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
```

### createProgram()

创建着色器程序。

```typescript
createProgram(
  gl: WebGL2RenderingContext,
  vertexShaderSource: string,
  fragmentShaderSource: string
): WebGLProgram | null
```

**参数：**
- `gl` - WebGL2 上下文
- `vertexShaderSource` - 顶点着色器源代码
- `fragmentShaderSource` - 片段着色器源代码

**返回值：**
- 着色器程序对象，失败时返回 `null`

**示例：**
```typescript
const program = WebGLUtils.createProgram(gl, vertexSource, fragmentSource);
```

## 纹理相关

### createTexture()

创建纹理。

```typescript
createTexture(
  gl: WebGL2RenderingContext,
  bitmap: ImageBitmap,
  options?: {
    useMipmap?: boolean;
    wrapS?: number;
    wrapT?: number;
    minFilter?: number;
    magFilter?: number;
  }
): WebGLTexture | null
```

**参数：**
- `gl` - WebGL2 上下文
- `bitmap` - 图像位图
- `options` - 纹理选项（可选）

**示例：**
```typescript
const texture = WebGLUtils.createTexture(gl, bitmap, {
  useMipmap: true,
  wrapS: gl.REPEAT,
  wrapT: gl.REPEAT
});
```

### createDataTexture()

创建数据纹理。

```typescript
createDataTexture(
  gl: WebGL2RenderingContext,
  options: DataTextureOptions
): WebGLTexture | null
```

## 缓冲区相关

### createBuffer()

创建缓冲区。

```typescript
createBuffer(
  gl: WebGL2RenderingContext,
  data?: Float32Array | Uint16Array | Uint32Array,
  usage?: number
): WebGLBuffer | null
```

### createVAO()

创建顶点数组对象。

```typescript
createVAO(gl: WebGL2RenderingContext): WebGLVertexArrayObject | null
```

## 属性设置

### setupAttribute()

设置顶点属性。

```typescript
setupAttribute(
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  name: string,
  buffer: WebGLBuffer,
  size: number,
  type?: number,
  normalized?: boolean,
  stride?: number,
  offset?: number
): void
```

### getUniformLocation()

获取 uniform 位置。

```typescript
getUniformLocation(
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  name: string
): WebGLUniformLocation | null
```

### getUniformLocations()

批量获取 uniform 位置。

```typescript
getUniformLocations(
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  names: string[]
): Record<string, WebGLUniformLocation | null>
```

查看完整的 WebGL 工具函数使用指南。