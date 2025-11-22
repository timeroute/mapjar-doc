---
sidebar_position: 1
---

# 介绍

欢迎使用 **Mapjar** - 基于 WebGL2 的高性能地图渲染引擎！

## 什么是 Mapjar？

Mapjar 是一个现代化的 Web 地图引擎，专为高性能地图可视化而设计。它使用 WebGL2 进行 GPU 加速渲染，支持 EPSG:3857 (Web Mercator) 投影，提供丰富的图层类型和交互功能。

## ✨ 核心特性

### 🚀 高性能渲染
- **WebGL2 GPU 加速**：充分利用现代浏览器的图形能力
- **高 DPR 支持**：完美适配 Retina 和高分辨率屏幕
- **Web Worker 并发加载**：瓦片加载不阻塞主线程
- **智能缓存**：LRU 缓存策略，优化内存使用

### 🗺️ 丰富的图层类型
- **瓦片图层**：支持任意瓦片源（OSM、Google、自定义等）
- **矢量图层**：点、线、面要素渲染，支持文字标注
- **GeoJSON 图层**：完整支持 GeoJSON 格式
- **图像图层**：历史地图叠加、卫星影像等
- **风场图层**：粒子系统实时动画
- **热力图层**：温度、降水等连续数值场可视化
- **覆盖层图层**：HTML 元素叠加
- **Canvas 图层**：自定义 2D 绘制

### 🎯 强大的交互
- **流畅的相机控制**：平移、缩放、旋转
- **平滑动画**：flyTo、fitBounds 带缓动效果
- **事件系统**：点击、鼠标移动等事件监听
- **跨世界渲染**：水平无限循环，无缝拼接

### 🎨 灵活的样式
- **数据驱动样式**：根据要素属性动态设置样式
- **文字渲染**：支持自定义字体、颜色、描边
- **透明度和层级**：精细控制图层显示

## 🌐 浏览器兼容性

Mapjar 基于 WebGL2，支持以下浏览器：

- ✅ Chrome 56+
- ✅ Firefox 51+
- ✅ Safari 15+
- ✅ Edge 79+

覆盖 97%+ 的现代浏览器。

## 📦 快速开始

```bash
# 使用 npm
npm install mapjar

# 使用 bun
bun add mapjar
```

```typescript
import { MapEngine, TileLayer } from 'mapjar';

// 创建地图引擎
const engine = new MapEngine('#map', {
  center: [116.4074, 39.9042], // 北京
  zoom: 10,
});

// 添加瓦片图层
const tileLayer = new TileLayer(
  'osm',
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
);
engine.addLayer(tileLayer);
```

## 📚 下一步

- [安装指南](./installation) - 详细的安装和配置说明
- [快速开始](./getting-started) - 创建你的第一个地图应用
- [核心概念](./core-concepts/projection) - 了解 Mapjar 的核心概念
- [API 参考](./api/map-engine) - 完整的 API 文档
- [示例](./examples/basic) - 丰富的示例代码

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License
