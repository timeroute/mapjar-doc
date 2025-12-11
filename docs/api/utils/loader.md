---
sidebar_position: 8
---

# Loader API

资源加载工具类，提供统一的资源加载接口。

## 全局实例

Mapjar 提供了一个全局的 Loader 实例：

```typescript
import { loader } from 'mapjar';
```

## 图像加载

### loadImage()

加载图像并转换为 ImageBitmap。

```typescript
loadImage(url: string, abortSignal?: AbortSignal): Promise<ImageBitmap>
```

**参数：**
- `url` - 图像 URL
- `abortSignal` - 取消信号（可选）

**返回值：**
- Promise，解析为 ImageBitmap 对象

**示例：**
```typescript
import { loader } from 'mapjar';

// 基本用法
try {
  const bitmap = await loader.loadImage('https://example.com/image.png');
  console.log('图像大小:', bitmap.width, 'x', bitmap.height);
} catch (error) {
  console.error('加载失败:', error);
}

// 支持取消
const controller = new AbortController();
const promise = loader.loadImage('https://example.com/large-image.png', controller.signal);

// 5 秒后取消加载
setTimeout(() => {
  controller.abort();
}, 5000);
```

## JSON 加载

### loadJSON()

加载 JSON 数据。

```typescript
loadJSON<T = unknown>(url: string, abortSignal?: AbortSignal): Promise<T>
```

**参数：**
- `url` - JSON 文件 URL
- `abortSignal` - 取消信号（可选）

**返回值：**
- Promise，解析为 JSON 对象

**示例：**
```typescript
// 基本用法
try {
  const data = await loader.loadJSON('https://example.com/data.json');
  console.log('数据:', data);
} catch (error) {
  console.error('加载失败:', error);
}

// 使用类型参数
interface CityData {
  name: string;
  coordinates: [number, number];
}

const cities = await loader.loadJSON<CityData[]>('https://example.com/cities.json');
```

## 错误处理

Loader 提供了统一的错误处理：

```typescript
try {
  const bitmap = await loader.loadImage('https://example.com/nonexistent.png');
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('加载被用户取消');
  } else if (error.message.includes('404')) {
    console.log('文件不存在');
  } else {
    console.log('其他错误:', error.message);
  }
}
```

## 缓存机制

Loader 内部实现了智能缓存：

```typescript
// 相同 URL 的资源会被缓存
const bitmap1 = await loader.loadImage('https://example.com/image.png');
const bitmap2 = await loader.loadImage('https://example.com/image.png');
// bitmap1 和 bitmap2 是同一个对象（从缓存返回）
```

查看完整的资源加载使用指南。