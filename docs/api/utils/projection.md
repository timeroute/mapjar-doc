---
sidebar_position: 1
---

# WebMercatorProjection API

Web Mercator 投影工具。

完整的投影系统文档请参考 [投影系统](../../core-concepts/projection)。

## 方法

### lonLatToMeters()

经纬度转 Web Mercator 坐标。

```typescript
lonLatToMeters(lon: number, lat: number): Vec2
```

### metersToLonLat()

Web Mercator 坐标转经纬度。

```typescript
metersToLonLat(x: number, y: number): Vec2
```

### getTileCoord()

获取瓦片坐标。

```typescript
getTileCoord(lon: number, lat: number, zoom: number): { x: number; y: number; z: number }
```

### getTileBounds()

获取瓦片边界。

```typescript
getTileBounds(x: number, y: number, z: number): {
  minLon: number;
  minLat: number;
  maxLon: number;
  maxLat: number;
}
```

查看 [投影系统文档](../../core-concepts/projection) 了解详细用法。
