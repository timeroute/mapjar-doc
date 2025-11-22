---
sidebar_position: 8
---

# Canvas 图层 (CanvasLayer)

Canvas 图层提供纯 Canvas 2D 绘制能力，适合自定义渲染逻辑。

## 基本用法

```typescript
import { CanvasLayer } from 'mapjar';

class MyCanvasLayer extends CanvasLayer {
  constructor(id: string) {
    super(id, 512, 512); // 指定 Canvas 尺寸
  }

  render(gl: WebGL2RenderingContext, viewMatrix: Float32Array): void {
    if (!this.visible) return;

    const ctx = this.getContext();
    
    // 清空 Canvas
    this.clear();
    
    // 使用 Canvas 2D API 绘制
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.fillRect(100, 100, 200, 200);
    
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 3;
    ctx.strokeRect(150, 150, 100, 100);
  }
}

const canvasLayer = new MyCanvasLayer('custom');
engine.addLayer(canvasLayer);
```

## Canvas API

```typescript
// 获取 Canvas 元素
const canvas = canvasLayer.getCanvas();

// 获取 2D 上下文
const ctx = canvasLayer.getContext();

// 调整大小
canvasLayer.resize(1024, 1024);

// 清空 Canvas
canvasLayer.clear();
```

## 应用场景

- 自定义绘制逻辑
- 特殊效果
- 动态图形
- 数据可视化

## 下一步

- [示例](../examples/combined) - 查看综合示例
