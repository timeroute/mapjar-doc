---
sidebar_position: 2
---

# Vec2 API

二维向量类。

## 构造函数

```typescript
constructor(x?: number, y?: number)
```

## 静态方法

### from()

创建向量。

```typescript
static from(x: number, y: number): Vec2
```

## 实例方法

### clone()

克隆向量。

```typescript
clone(): Vec2
```

### add()

向量加法。

```typescript
add(v: Vec2): Vec2
```

### sub()

向量减法。

```typescript
sub(v: Vec2): Vec2
```

### mul()

标量乘法。

```typescript
mul(scalar: number): Vec2
```

### div()

标量除法。

```typescript
div(scalar: number): Vec2
```

### length()

向量长度。

```typescript
length(): number
```

### normalize()

归一化。

```typescript
normalize(): Vec2
```

### dot()

点积。

```typescript
dot(v: Vec2): number
```

### distance()

距离。

```typescript
distance(v: Vec2): number
```

## 示例

```typescript
import { Vec2 } from 'mapjar';

const v1 = new Vec2(1, 2);
const v2 = new Vec2(3, 4);

const v3 = v1.add(v2);  // (4, 6)
const len = v1.length();  // 2.236
const dist = v1.distance(v2);  // 2.828
```
