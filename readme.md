# Merge objects

Deep merge two objects

```typescript
import { merge } from '@fingerartur/ts-merge-objects'

const obj1 = { a: 1, b: { name: 'Tom' }}
const obj2 = { b: { name: 'Jerry' }, c: 4 }
const result = merge(obj1, obj2)

// result:
// { a: 1, b: { name: 'Jerry' }, c: 4 }
```

Notes:
- arrays get overwritten just like any other attribute
