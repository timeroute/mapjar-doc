---
sidebar_position: 5
---

# EventEmitter API

事件发射器。

## 构造函数

```typescript
constructor<T extends Record<string, unknown>>()
```

## 方法

### on()

添加事件监听器。

```typescript
on<K extends keyof T>(
  eventName: K,
  listener: (event: T[K]) => void
): () => void
```

### once()

添加一次性监听器。

```typescript
once<K extends keyof T>(
  eventName: K,
  listener: (event: T[K]) => void
): () => void
```

### off()

移除事件监听器。

```typescript
off<K extends keyof T>(
  eventName: K,
  listener: (event: T[K]) => void
): void
```

### emit()

触发事件。

```typescript
emit<K extends keyof T>(eventName: K, event: T[K]): void
```

### removeAllListeners()

移除所有监听器。

```typescript
removeAllListeners<K extends keyof T>(eventName?: K): void
```

## 示例

```typescript
import { EventEmitter } from 'mapjar';

interface MyEvents {
  click: { x: number; y: number };
  move: { x: number; y: number };
}

const emitter = new EventEmitter<MyEvents>();

emitter.on('click', (event) => {
  console.log(event.x, event.y);
});

emitter.emit('click', { x: 100, y: 200 });
```
