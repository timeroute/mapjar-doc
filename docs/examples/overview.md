---
sidebar_position: 1
---

# 示例概览

这里提供了丰富的 Mapjar 使用示例，帮助你快速上手。

## 基础示例

### [基础地图](./basic)
创建一个简单的地图应用，包含瓦片图层和基本交互。

**涵盖内容：**
- 初始化地图引擎
- 添加瓦片图层
- 监听点击事件

### [瓦片图层](./tile-layer)
展示如何使用不同的瓦片源和配置选项。

**涵盖内容：**
- 多种瓦片源
- 瓦片缩放比例
- 切换底图

### [矢量图层](./vector-layer)
演示如何添加和渲染点、线、面要素。

**涵盖内容：**
- 添加点、线、面要素
- 设置样式
- 文字标注

## 数据可视化

### [GeoJSON 图层](./geojson-layer)
加载和渲染 GeoJSON 数据。

**涵盖内容：**
- 从 URL 加载 GeoJSON
- 数据驱动样式
- 空间查询

### [图像图层](./image-layer)
在地图上叠加单张图像。

**涵盖内容：**
- 历史地图叠加
- 图像配准
- 透明度控制

### [风场图层](./wind-layer)
渲染风场粒子动画。

**涵盖内容：**
- 加载风场数据
- 粒子系统配置
- 颜色映射

### [热力图层](./heatmap-layer)
渲染连续数值场（温度、降水等）。

**涵盖内容：**
- 加载数值数据
- 自定义颜色渐变
- 透明度通道

## 高级功能

### [覆盖层图层](./overlay-layer)
在地图上叠加 HTML 元素。

**涵盖内容：**
- 添加 HTML 标注
- 自定义样式
- 交互控制

### [综合示例](./combined)
结合多种图层和功能的完整示例。

**涵盖内容：**
- 多图层管理
- 图层切换
- 复杂交互
- 数据查询

## 🎮 在线演示

部分示例提供了在线演示，你可以直接在浏览器中查看效果：

### 覆盖层图层演示

<iframe 
  src="/examples/overlay-layer.html" 
  style={{width: '100%', height: '600px', border: '1px solid #e8e8e8', borderRadius: '8px', marginTop: '16px'}}
  title="Mapjar 覆盖层图层示例"
></iframe>

<a href="/examples/overlay-layer.html" target="_blank" rel="noopener noreferrer" style={{display: 'inline-block', marginTop: '12px', padding: '8px 16px', background: '#1890ff', color: 'white', borderRadius: '4px', textDecoration: 'none'}}>在新窗口打开 ↗</a>

**演示功能：**
- 点击地图任意位置显示弹窗
- 点击城市按钮查看标注和详细信息
- 平滑的 flyTo 动画
- 自定义样式的标注和弹窗

---

:::tip 提示
更多在线演示正在开发中，敬请期待！
:::

## 📥 下载示例

你可以从 GitHub 下载完整的示例代码：

```bash
git clone https://github.com/yourusername/mapjar-examples.git
cd mapjar-examples
npm install
npm run dev
```

## 🤝 贡献示例

欢迎提交你的示例！请访问 [GitHub](https://github.com/yourusername/mapjar) 提交 Pull Request。

### 贡献指南

1. Fork 项目仓库
2. 创建示例文件（HTML 或 Markdown）
3. 添加详细的代码注释
4. 提交 Pull Request

我们特别欢迎以下类型的示例：

- 🎨 **创意可视化**：独特的数据可视化效果
- 🛠️ **实用工具**：地图测量、绘制工具等
- 🎯 **业务场景**：物流、房产、旅游等行业应用
- 📱 **移动端适配**：响应式设计、触摸优化
- 🚀 **性能优化**：大数据量渲染、优化技巧
