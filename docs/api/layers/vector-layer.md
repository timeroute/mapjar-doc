---
sidebar_position: 3
---

# VectorLayer API

矢量图层 API 文档。

完整的 VectorLayer 使用指南请参考 [矢量图层](../../layers/vector-layer)。

## 构造函数

```typescript
constructor(id: string, style?: VectorStyle)
```

## 方法

### addFeature()

添加要素。

```typescript
addFeature(feature: Feature): void
```

### addFeatures()

批量添加要素。

```typescript
addFeatures(features: Feature[]): void
```

### clearFeatures()

清空所有要素。

```typescript
clearFeatures(): void
```

### setDataDrivenStyle()

设置数据驱动样式。

```typescript
setDataDrivenStyle(style: DataDrivenStyle): void
```

### queryPoint()

点查询。

```typescript
queryPoint(lon: number, lat: number, tolerance?: number): QueryResult[]
```

查看 [矢量图层文档](../../layers/vector-layer) 了解详细用法。
