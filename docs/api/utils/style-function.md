---
sidebar_position: 3
---

# StyleFunction API

数据驱动样式工具。

完整的数据驱动样式文档请参考 [数据驱动样式](../../advanced/data-driven-styles)。

## 方法

### createPropertyColorMap()

基于属性的颜色映射。

```typescript
createPropertyColorMap(
  propertyName: string,
  colorMap: Record<string, [number, number, number, number]>,
  defaultColor: [number, number, number, number]
): StyleFunction<[number, number, number, number]>
```

### createNumericColorScale()

基于数值的颜色插值。

```typescript
createNumericColorScale(
  propertyName: string,
  stops: Array<[number, [number, number, number, number]]>,
  defaultColor: [number, number, number, number]
): StyleFunction<[number, number, number, number]>
```

查看 [数据驱动样式文档](../../advanced/data-driven-styles) 了解详细用法。
