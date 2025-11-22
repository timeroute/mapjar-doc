---
sidebar_position: 2
---

# 安装

## 使用包管理器安装

### npm

```bash
npm install mapjar
```

### yarn

```bash
yarn add mapjar
```

### pnpm

```bash
pnpm add mapjar
```

### bun

```bash
bun add mapjar
```

## CDN 引入

你也可以通过 CDN 直接在浏览器中使用：

```html
<script type="module">
  import { MapEngine, TileLayer } from 'https://cdn.jsdelivr.net/npm/mapjar/+esm';
  
  const engine = new MapEngine('#map', {
    center: [116.4074, 39.9042],
    zoom: 10,
  });
  
  const tileLayer = new TileLayer(
    'osm',
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
  );
  engine.addLayer(tileLayer);
</script>
```

## TypeScript 支持

Mapjar 使用 TypeScript 编写，自带完整的类型定义。无需额外安装 `@types` 包。

```typescript
import { MapEngine, TileLayer, VectorLayer } from 'mapjar';
import type { MapOptions, Feature, VectorStyle } from 'mapjar';

const options: MapOptions = {
  center: [116.4074, 39.9042],
  zoom: 10,
  rotation: 0,
  enableRotation: true,
};

const engine = new MapEngine('#map', options);
```

## 系统要求

### 浏览器要求

Mapjar 需要浏览器支持 **WebGL2**：

- Chrome 56+
- Firefox 51+
- Safari 15+
- Edge 79+

### 检测 WebGL2 支持

你可以在创建地图前检测浏览器是否支持 WebGL2：

```typescript
function supportsWebGL2(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!canvas.getContext('webgl2');
  } catch (e) {
    return false;
  }
}

if (!supportsWebGL2()) {
  alert('您的浏览器不支持 WebGL2，请升级浏览器');
} else {
  const engine = new MapEngine('#map', {
    center: [116.4074, 39.9042],
    zoom: 10,
  });
}
```

## HTML 模板

创建一个基本的 HTML 文件：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mapjar 示例</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
    #map {
      width: 100vw;
      height: 100vh;
    }
  </style>
</head>
<body>
  <canvas id="map"></canvas>
  
  <script type="module">
    import { MapEngine, TileLayer } from 'mapjar';
    
    const engine = new MapEngine('#map', {
      center: [116.4074, 39.9042],
      zoom: 10,
    });
    
    const tileLayer = new TileLayer(
      'osm',
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
    );
    engine.addLayer(tileLayer);
  </script>
</body>
</html>
```

## 下一步

- [快速开始](./getting-started) - 创建你的第一个地图应用
- [核心概念](./core-concepts/projection) - 了解 Mapjar 的核心概念
