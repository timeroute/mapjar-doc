# Mapjar 文档

这是 Mapjar 地图引擎的官方文档站点，基于 Docusaurus 构建。

## 关于 Mapjar

Mapjar 是一个基于 WebGL2 的高性能地图渲染引擎，支持 EPSG:3857 投影，提供丰富的图层类型和交互功能。

## 文档结构

### 📚 主要文档

- **介绍** (`docs/intro.md`) - Mapjar 概述和核心特性
- **安装** (`docs/installation.md`) - 安装指南
- **快速开始** (`docs/getting-started.md`) - 创建第一个地图应用

### 🎯 核心概念

- **投影系统** (`docs/core-concepts/projection.md`) - Web Mercator 投影
- **相机系统** (`docs/core-concepts/camera.md`) - 视图控制
- **图层系统** (`docs/core-concepts/layers.md`) - 图层管理
- **事件系统** (`docs/core-concepts/events.md`) - 事件处理

### 🗺️ 图层文档

- **瓦片图层** (`docs/layers/tile-layer.md`)
- **矢量图层** (`docs/layers/vector-layer.md`)
- **GeoJSON 图层** (`docs/layers/geojson-layer.md`)
- **图像图层** (`docs/layers/image-layer.md`)
- **风场图层** (`docs/layers/wind-layer.md`)
- **热力图层** (`docs/layers/heatmap-layer.md`)
- **覆盖层图层** (`docs/layers/overlay-layer.md`)
- **Canvas 图层** (`docs/layers/canvas-layer.md`)

### 🚀 高级功能

- **数据驱动样式** (`docs/advanced/data-driven-styles.md`)
- **空间查询** (`docs/advanced/spatial-query.md`)
- **动画系统** (`docs/advanced/animations.md`)
- **性能优化** (`docs/advanced/performance.md`)

### 📖 API 参考

- **API 概览** (`docs/api/overview.md`)
- **MapEngine API** (`docs/api/map-engine.md`)
- **Camera API** (`docs/api/camera.md`)
- **图层 API** (`docs/api/layers/`)
- **工具类 API** (`docs/api/utils/`)

### 💡 示例

- **基础示例** (`docs/examples/basic.md`)
- **瓦片图层示例** (`docs/examples/tile-layer.md`)
- **矢量图层示例** (`docs/examples/vector-layer.md`)
- **GeoJSON 图层示例** (`docs/examples/geojson-layer.md`)
- **图像图层示例** (`docs/examples/image-layer.md`)
- **风场图层示例** (`docs/examples/wind-layer.md`)
- **热力图层示例** (`docs/examples/heatmap-layer.md`)
- **覆盖层图层示例** (`docs/examples/overlay-layer.md`)
- **综合示例** (`docs/examples/combined.md`)

## 本地开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

文档站点将在 http://localhost:3000 启动。

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `build` 目录。

### 本地预览生产版本

```bash
npm run serve
```

## 自定义配置

### 修改站点配置

编辑 `docusaurus.config.js` 文件：

- `title` - 站点标题
- `tagline` - 站点标语
- `url` - 生产环境 URL
- `baseUrl` - 基础路径
- `organizationName` - GitHub 组织/用户名
- `projectName` - GitHub 仓库名

### 修改侧边栏

编辑 `sidebars.js` 文件来调整文档的侧边栏结构。

### 修改样式

编辑 `src/css/custom.css` 文件来自定义样式。

### 修改首页

- 编辑 `src/pages/index.js` - 首页布局
- 编辑 `src/components/HomepageFeatures/index.js` - 特性展示

## 部署

### GitHub Pages

1. 修改 `docusaurus.config.js` 中的配置：
   ```javascript
   url: 'https://yourusername.github.io',
   baseUrl: '/mapjar/',
   organizationName: 'yourusername',
   projectName: 'mapjar',
   ```

2. 部署：
   ```bash
   npm run deploy
   ```

### 其他平台

参考 [Docusaurus 部署文档](https://docusaurus.io/docs/deployment)。

## 贡献

欢迎贡献文档！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-docs`)
3. 提交更改 (`git commit -m 'Add amazing docs'`)
4. 推送到分支 (`git push origin feature/amazing-docs`)
5. 创建 Pull Request

## 文档编写指南

### Markdown 格式

文档使用 Markdown 格式，支持：

- 标题、列表、表格
- 代码块（支持语法高亮）
- 链接、图片
- 提示框（:::tip、:::warning、:::danger）

### Front Matter

每个文档文件顶部可以添加 Front Matter：

```markdown
---
sidebar_position: 1
title: 自定义标题
---
```

### 代码块

使用三个反引号创建代码块，并指定语言：

````markdown
```typescript
const engine = new MapEngine('#map');
```
````

### 内部链接

使用相对路径链接到其他文档：

```markdown
[相机系统](./core-concepts/camera)
```

## 许可证

MIT License

## 相关链接

- [Mapjar GitHub](https://github.com/yourusername/mapjar)
- [Mapjar NPM](https://www.npmjs.com/package/mapjar)
- [Docusaurus 文档](https://docusaurus.io/)
