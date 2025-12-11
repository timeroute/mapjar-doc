---
sidebar_position: 9
---

# ResourceManager API

资源管理工具类，用于管理和追踪各种资源的生命周期。

## 全局实例

Mapjar 提供了一个全局的 WebGLResourceManager 实例：

```typescript
import { resourceManager } from 'mapjar';
```

## ResourceManager 基类

### 构造函数

```typescript
constructor()
```

### 资源管理

#### addResource()

添加资源。

```typescript
addResource(id: string, resource: unknown): void
```

**参数：**
- `id` - 资源唯一标识符
- `resource` - 资源对象

**示例：**
```typescript
import { ResourceManager } from 'mapjar';

const manager = new ResourceManager();
manager.addResource('my-data', { name: 'test', value: 123 });
```

#### getResource()

获取资源。

```typescript
getResource<T = unknown>(id: string): T | undefined
```

**参数：**
- `id` - 资源标识符

**返回值：**
- 资源对象，如果不存在则返回 `undefined`

**示例：**
```typescript
const data = manager.getResource<{ name: string; value: number }>('my-data');
if (data) {
  console.log(data.name, data.value);
}
```

#### removeResource()

移除资源。

```typescript
removeResource(id: string): void
```

**参数：**
- `id` - 资源标识符

**示例：**
```typescript
manager.removeResource('my-data');
```

#### clear()

清空所有资源。

```typescript
clear(): void
```

**示例：**
```typescript
manager.clear();
```

## WebGLResourceManager

WebGL 专用的资源管理器，继承自 ResourceManager，提供 WebGL 资源的专门管理。

### WebGL 纹理管理

#### addTexture()

添加 WebGL 纹理。

```typescript
addTexture(id: string, texture: WebGLTexture): void
```

**参数：**
- `id` - 纹理标识符
- `texture` - WebGL 纹理对象

**示例：**
```typescript
import { resourceManager } from 'mapjar';

const texture = gl.createTexture();
resourceManager.addTexture('my-texture', texture);
```

#### getTexture()

获取 WebGL 纹理。

```typescript
getTexture(id: string): WebGLTexture | undefined
```

**参数：**
- `id` - 纹理标识符

**返回值：**
- WebGL 纹理对象，如果不存在则返回 `undefined`

**示例：**
```typescript
const texture = resourceManager.getTexture('my-texture');
if (texture) {
  gl.bindTexture(gl.TEXTURE_2D, texture);
}
```

### WebGL 缓冲区管理

#### addBuffer()

添加 WebGL 缓冲区。

```typescript
addBuffer(id: string, buffer: WebGLBuffer): void
```

**参数：**
- `id` - 缓冲区标识符
- `buffer` - WebGL 缓冲区对象

**示例：**
```typescript
const buffer = gl.createBuffer();
resourceManager.addBuffer('vertex-buffer', buffer);
```

#### getBuffer()

获取 WebGL 缓冲区。

```typescript
getBuffer(id: string): WebGLBuffer | undefined
```

**参数：**
- `id` - 缓冲区标识符

**返回值：**
- WebGL 缓冲区对象，如果不存在则返回 `undefined`

**示例：**
```typescript
const buffer = resourceManager.getBuffer('vertex-buffer');
if (buffer) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
}
```

### WebGL 程序管理

#### addProgram()

添加 WebGL 着色器程序。

```typescript
addProgram(id: string, program: WebGLProgram): void
```

**参数：**
- `id` - 程序标识符
- `program` - WebGL 程序对象

**示例：**
```typescript
const program = gl.createProgram();
// ... 链接着色器
resourceManager.addProgram('my-shader', program);
```

#### getProgram()

获取 WebGL 着色器程序。

```typescript
getProgram(id: string): WebGLProgram | undefined
```

**参数：**
- `id` - 程序标识符

**返回值：**
- WebGL 程序对象，如果不存在则返回 `undefined`

**示例：**
```typescript
const program = resourceManager.getProgram('my-shader');
if (program) {
  gl.useProgram(program);
}
```

### 资源销毁

#### destroy()

销毁所有 WebGL 资源。

```typescript
destroy(gl: WebGL2RenderingContext): void
```

**参数：**
- `gl` - WebGL2 上下文

**示例：**
```typescript
// 在应用关闭时清理所有 WebGL 资源
resourceManager.destroy(gl);
```

## 使用模式

### 图层中的资源管理

```typescript
import { resourceManager, WebGLUtils } from 'mapjar';

class MyLayer extends Layer {
  private textureId: string;
  private bufferId: string;
  private programId: string;

  constructor(id: string) {
    super(id);
    this.textureId = `${id}-texture`;
    this.bufferId = `${id}-buffer`;
    this.programId = `${id}-program`;
  }

  initWebGL(gl: WebGL2RenderingContext) {
    // 创建并注册纹理
    const texture = WebGLUtils.createTexture(gl, bitmap);
    if (texture) {
      resourceManager.addTexture(this.textureId, texture);
    }

    // 创建并注册缓冲区
    const buffer = WebGLUtils.createBuffer(gl, vertices);
    if (buffer) {
      resourceManager.addBuffer(this.bufferId, buffer);
    }

    // 创建并注册程序
    const program = WebGLUtils.createProgram(gl, vertexSource, fragmentSource);
    if (program) {
      resourceManager.addProgram(this.programId, program);
    }
  }

  render(gl: WebGL2RenderingContext, viewMatrix: Float32Array) {
    // 使用注册的资源
    const texture = resourceManager.getTexture(this.textureId);
    const buffer = resourceManager.getBuffer(this.bufferId);
    const program = resourceManager.getProgram(this.programId);

    if (texture && buffer && program) {
      gl.useProgram(program);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      // ... 渲染逻辑
    }
  }

  destroy(gl: WebGL2RenderingContext) {
    // 移除资源（实际的 WebGL 对象会在 resourceManager.destroy() 时清理）
    resourceManager.removeResource(this.textureId);
    resourceManager.removeResource(this.bufferId);
    resourceManager.removeResource(this.programId);
  }
}
```

### 纹理缓存

```typescript
import { resourceManager, loader } from 'mapjar';

class TextureCache {
  async getTexture(gl: WebGL2RenderingContext, url: string): Promise<WebGLTexture | null> {
    // 检查缓存
    let texture = resourceManager.getTexture(url);
    if (texture) {
      return texture;
    }

    try {
      // 加载图像
      const bitmap = await loader.loadImage(url);
      
      // 创建纹理
      texture = WebGLUtils.createTexture(gl, bitmap);
      if (texture) {
        // 缓存纹理
        resourceManager.addTexture(url, texture);
        return texture;
      }
    } catch (error) {
      console.error('纹理加载失败:', error);
    }

    return null;
  }
}
```

### 资源统计

```typescript
import { resourceManager } from 'mapjar';

// 自定义资源管理器，添加统计功能
class StatisticsResourceManager extends WebGLResourceManager {
  private stats = {
    textures: 0,
    buffers: 0,
    programs: 0
  };

  addTexture(id: string, texture: WebGLTexture): void {
    super.addTexture(id, texture);
    this.stats.textures++;
    console.log('纹理数量:', this.stats.textures);
  }

  addBuffer(id: string, buffer: WebGLBuffer): void {
    super.addBuffer(id, buffer);
    this.stats.buffers++;
    console.log('缓冲区数量:', this.stats.buffers);
  }

  addProgram(id: string, program: WebGLProgram): void {
    super.addProgram(id, program);
    this.stats.programs++;
    console.log('程序数量:', this.stats.programs);
  }

  getStats() {
    return { ...this.stats };
  }
}
```

## 最佳实践

### 1. 统一的资源标识符

使用一致的命名规则：

```typescript
// 好的做法
const textureId = `${layerId}-${textureType}-${index}`;
resourceManager.addTexture(textureId, texture);

// 避免
resourceManager.addTexture('tex1', texture); // 不够描述性
```

### 2. 及时清理资源

```typescript
class MyLayer extends Layer {
  destroy(gl: WebGL2RenderingContext) {
    // 移除所有相关资源
    resourceManager.removeResource(this.textureId);
    resourceManager.removeResource(this.bufferId);
    resourceManager.removeResource(this.programId);
  }
}
```

### 3. 错误处理

```typescript
const texture = resourceManager.getTexture('my-texture');
if (!texture) {
  console.warn('纹理不存在:', 'my-texture');
  return;
}
```

### 4. 资源复用

```typescript
// 检查是否已存在
let texture = resourceManager.getTexture(textureId);
if (!texture) {
  // 创建新纹理
  texture = WebGLUtils.createTexture(gl, bitmap);
  if (texture) {
    resourceManager.addTexture(textureId, texture);
  }
}
```

## 下一步

- [WebGLUtils API](./webgl-utils) - WebGL 工具函数
- [Loader API](./loader) - 资源加载工具
- [TextRenderer API](./text-renderer) - 文字渲染工具