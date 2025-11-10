# Skeleton Preloader System

A reusable skeleton loading system with smooth shimmer animations for Next.js + Tailwind projects.

## Components

### Base Skeleton Component
```jsx
import { Skeleton } from '@/components/skeletons';

<Skeleton width="100%" height="300px" rounded="xl" />
<Skeleton width="200px" height="20px" rounded="md" className="mb-4" />
```

### Product Card Skeleton
```jsx
import { ProductCardSkeleton } from '@/components/skeletons';

// Single card
<ProductCardSkeleton />

// Multiple cards
<ProductCardSkeleton count={6} />
```

### Hero Skeleton
```jsx
import { HeroSkeleton } from '@/components/skeletons';

// Default hero
<HeroSkeleton />

// Slider variant
<HeroSkeleton variant="slider" />

// Grid variant (for multi-banner layouts)
<HeroSkeleton variant="grid" />
```

### Product Page Skeleton
```jsx
import { ProductPageSkeleton } from '@/components/skeletons';

<ProductPageSkeleton />
```

## Usage Example

```jsx
'use client';
import { useState, useEffect } from 'react';
import { ProductCardSkeleton } from '@/components/skeletons';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductsPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="skeleton"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <ProductCardSkeleton count={8} />
        </motion.div>
      ) : (
        <motion.div
          key="products"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {products.map(product => (
            <ProductCard key={product.id} data={product} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

## Props

### Skeleton Component
- `width` (string): Width (e.g., "100%", "300px", "w-full")
- `height` (string): Height (e.g., "200px", "h-64")
- `rounded` (string): Border radius ("sm", "md", "lg", "xl", "full", "t-lg", etc.)
- `className` (string): Additional Tailwind classes
- `animate` (boolean): Enable shimmer animation (default: true)

### ProductCardSkeleton
- `count` (number): Number of skeleton cards to render (default: 1)
- `className` (string): Additional classes for container

### HeroSkeleton
- `variant` (string): "default" | "slider" | "grid"

## Features

- ✅ Smooth shimmer animation (Facebook-style)
- ✅ Framer Motion fade in/out transitions
- ✅ Matches actual component dimensions
- ✅ Fully customizable with Tailwind classes
- ✅ Accessible (aria-labels)
- ✅ Responsive design support

