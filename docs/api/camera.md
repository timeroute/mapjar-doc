---
sidebar_position: 3
---

# Camera API

相机系统控制地图的视图，包括中心点、缩放级别和旋转角度。

完整的 Camera API 文档请参考 [相机系统](../core-concepts/camera)。

## 主要方法

- `setCenterLonLat(lon, lat)` - 设置中心点
- `setZoom(zoom)` - 设置缩放级别
- `setRotation(rotation)` - 设置旋转角度
- `pan(dx, dy)` - 平移
- `zoomTo(delta, screenPos)` - 缩放到指定点
- `flyTo(lon, lat, zoom, options)` - 飞行动画
- `fitBounds(bounds, options)` - 适配边界
- `worldToScreen(worldPos)` - 世界坐标转屏幕坐标
- `screenToWorld(screenPos)` - 屏幕坐标转世界坐标

查看 [相机系统文档](../core-concepts/camera) 了解详细用法。
