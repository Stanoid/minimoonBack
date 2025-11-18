# 🚀 New Features & Endpoints Guide

## Overview

This guide covers all the new features added to the Minimoon backend:

1. **Analytics & Reports Dashboard**
2. **Inventory Management & Tracking**
3. **Hero Images Management**
4. **Support Messaging System**
5. **Enhanced Order Tracking**

---

## 1. Analytics & Reports Dashboard

### Endpoints

#### Get Dashboard Summary
```
GET /api/analytics/dashboard
Authorization: Bearer {admin_token}
```

**Response:**
```json
{
  "summary": {
    "totalOrders": 150,
    "processedOrders": 120,
    "pendingOrders": 30,
    "totalRevenue": 45000,
    "totalProducts": 200,
    "activeProducts": 180,
    "lowStockCount": 15,
    "openSupportMessages": 5
  },
  "lowStockProducts": [...],
  "dateRange": {
    "start": "2024-01-01",
    "end": "2024-01-31"
  }
}
```

#### Get Sales Report
```
GET /api/analytics/sales?startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer {admin_token}
```

**Response:**
```json
{
  "salesData": [
    {
      "date": "2024-01-01",
      "orders": 5,
      "revenue": 2500
    }
  ],
  "summary": {
    "totalOrders": 150,
    "totalRevenue": 45000,
    "averageOrderValue": 300
  }
}
```

#### Get Inventory Report
```
GET /api/analytics/inventory
Authorization: Bearer {admin_token}
```

**Response:**
```json
{
  "inventory": [
    {
      "productId": 1,
      "productName": "Product Name",
      "productCode": "PRD001",
      "varientId": 10,
      "color": "Red",
      "size": "M",
      "stock": 5,
      "price": 100,
      "status": "low_stock",
      "subcategory": "T-Shirts"
    }
  ],
  "summary": {
    "totalVariants": 500,
    "inStock": 450,
    "lowStock": 30,
    "outOfStock": 20,
    "totalValue": 125000
  }
}
```

#### Get Top Products
```
GET /api/analytics/top-products?limit=10
Authorization: Bearer {admin_token}
```

**Response:**
```json
[
  {
    "productId": 1,
    "totalQuantity": 150,
    "totalOrders": 45,
    "product": {
      "name_en": "Product Name",
      "code": "PRD001",
      "images": [...]
    }
  }
]
```

---

## 2. Hero Images Management

### Content Type: Hero Image

**Fields:**
- `title` (string, required) - English title
- `title_ar` (string) - Arabic title
- `subtitle` (string) - English subtitle
- `subtitle_ar` (string) - Arabic subtitle
- `image` (media, required) - Hero image
- `link` (string) - CTA link
- `button_text` (string) - English button text
- `button_text_ar` (string) - Arabic button text
- `order` (integer) - Display order
- `is_active` (boolean) - Active status

### Endpoints

#### Get Active Hero Images
```
GET /api/hero-images
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Summer Sale",
        "title_ar": "تخفيضات الصيف",
        "subtitle": "Up to 50% off",
        "image": {...},
        "link": "/products/sale",
        "button_text": "Shop Now",
        "order": 1,
        "is_active": true
      }
    }
  ]
}
```

#### Admin: Create/Update/Delete
Use standard Strapi REST API:
```
POST /api/hero-images
PUT /api/hero-images/:id
DELETE /api/hero-images/:id
Authorization: Bearer {admin_token}
```

---

## 3. Support Messaging System

### Content Type: Support Message

**Fields:**
- `user` (relation) - User who sent the message
- `order` (relation) - Related order (optional)
- `subject` (string, required) - Message subject
- `message` (text, required) - Message content
- `status` (enum) - open, in_progress, resolved, closed
- `priority` (enum) - low, medium, high, urgent
- `admin_reply` (text) - Admin's response
- `replied_at` (datetime) - Reply timestamp
- `replied_by` (relation) - Admin who replied

### Endpoints

#### Create Support Message (User)
```
POST /api/support-messages
Authorization: Bearer {user_token}

Body:
{
  "data": {
    "subject": "Order Issue",
    "message": "I have a problem with my order",
    "order": 123
  }
}
```

#### Get User's Messages
```
GET /api/support-messages
Authorization: Bearer {user_token}
```

#### Get All Messages (Admin)
```
GET /api/support-messages
Authorization: Bearer {admin_token}
```

#### Reply to Message (Admin)
```
PUT /api/support-messages/:id
Authorization: Bearer {admin_token}

Body:
{
  "data": {
    "admin_reply": "We're looking into this issue",
    "status": "in_progress"
  }
}
```

---

## 4. Enhanced Order Tracking

### Endpoints

#### Track Order (Public - No Auth Required)
```
GET /api/order-tracking/:orderId
```

**Response:**
```json
{
  "id": 123,
  "status": "processed",
  "payment_type": "online",
  "delivery_type": "delivery",
  "created_at": "2024-01-15T10:00:00Z",
  "updated_at": "2024-01-15T12:00:00Z",
  "address": "123 Main St",
  "phone": "+1234567890",
  "pickup": {...},
  "payment_status": "paid",
  "amount_total": 350,
  "currency": "dzd",
  "cart": [
    {
      "id": 10,
      "qty": 2,
      "product_name": "T-Shirt",
      "product_code": "TSH001",
      "image": {...},
      "color": {...},
      "size": {...},
      "price": 150
    }
  ],
  "timeline": [
    {
      "status": "initiated",
      "label": "Order Placed",
      "completed": true,
      "date": "2024-01-15T10:00:00Z"
    },
    {
      "status": "processed",
      "label": "Order Confirmed",
      "completed": true,
      "date": "2024-01-15T12:00:00Z"
    },
    {
      "status": "shipped",
      "label": "Shipped",
      "completed": false,
      "date": null
    },
    {
      "status": "delivered",
      "label": "Delivered",
      "completed": false,
      "date": null
    }
  ]
}
```

#### Get User's Orders
```
GET /api/order-tracking/user/orders
Authorization: Bearer {user_token}
```

**Response:**
```json
[
  {
    "id": 123,
    "status": "processed",
    "payment_type": "online",
    "delivery_type": "delivery",
    "created_at": "2024-01-15T10:00:00Z",
    "address": "123 Main St",
    "phone": "+1234567890",
    "pickup": {...},
    "payment_status": "paid",
    "amount_total": 350,
    "items_count": 3
  }
]
```

#### Update Order Status (Admin)
```
PUT /api/order-tracking/:orderId/status
Authorization: Bearer {admin_token}

Body:
{
  "status": "shipped",
  "notes": "Shipped via DHL, tracking: ABC123"
}
```

**Valid Statuses:**
- `initiated` - Order placed
- `processed` - Order confirmed
- `shipped` - Order shipped
- `delivered` - Order delivered
- `cancelled` - Order cancelled

---

## 5. Admin Panel Customization

### Dashboard Widgets

To add these to your Strapi admin panel, create custom widgets:

**File: `src/admin/app.js`**

```javascript
export default {
  config: {
    locales: ['en', 'ar'],
  },
  bootstrap(app) {
    console.log(app);
  },
};
```

### Custom Admin Views

Create custom pages for:
1. **Sales Dashboard** - `/admin/plugins/sales-dashboard`
2. **Inventory Management** - `/admin/plugins/inventory`
3. **Support Messages** - `/admin/plugins/support`

---

## Frontend Integration Examples

### 1. Display Hero Images

```javascript
// Fetch hero images
const response = await fetch(`${API_URL}hero-images`);
const { data } = await response.json();

// Display in carousel
<Carousel>
  {data.map(hero => (
    <div key={hero.id}>
      <img src={hero.attributes.image.data.attributes.url} />
      <h2>{hero.attributes.title}</h2>
      <p>{hero.attributes.subtitle}</p>
      <a href={hero.attributes.link}>
        {hero.attributes.button_text}
      </a>
    </div>
  ))}
</Carousel>
```

### 2. Track Order

```javascript
// Track order page
const orderId = router.query.orderId;
const response = await fetch(`${API_URL}order-tracking/${orderId}`);
const orderDetails = await response.json();

// Display timeline
<Timeline>
  {orderDetails.timeline.map(step => (
    <TimelineItem 
      key={step.status}
      completed={step.completed}
      label={step.label}
      date={step.date}
    />
  ))}
</Timeline>
```

### 3. Support Messages

```javascript
// Send support message
const sendMessage = async (subject, message, orderId) => {
  const response = await fetch(`${API_URL}support-messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      data: { subject, message, order: orderId }
    }),
  });
  return response.json();
};

// Get user's messages
const getMessages = async () => {
  const response = await fetch(`${API_URL}support-messages`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};
```

### 4. Admin Dashboard

```javascript
// Fetch dashboard data
const response = await fetch(`${API_URL}analytics/dashboard`, {
  headers: {
    'Authorization': `Bearer ${adminToken}`,
  },
});
const dashboard = await response.json();

// Display metrics
<DashboardGrid>
  <MetricCard 
    title="Total Orders" 
    value={dashboard.summary.totalOrders} 
  />
  <MetricCard 
    title="Revenue" 
    value={`${dashboard.summary.totalRevenue} DZD`} 
  />
  <MetricCard 
    title="Low Stock Items" 
    value={dashboard.summary.lowStockCount}
    alert={dashboard.summary.lowStockCount > 0}
  />
</DashboardGrid>
```

---

## Database Schema Updates

After adding these features, you'll need to:

1. **Start Strapi** - It will auto-create the new tables
2. **Set Permissions** - Configure API permissions in Strapi admin
3. **Test Endpoints** - Verify all endpoints work correctly

### Permissions Setup

**Public Access:**
- `hero-images` - find
- `order-tracking` - trackOrder

**Authenticated Users:**
- `support-messages` - create, find (own)
- `order-tracking` - getUserOrders

**Admin Only:**
- `analytics` - all endpoints
- `support-messages` - update, delete
- `order-tracking` - updateStatus
- `hero-images` - create, update, delete

---

## Testing

### Test Analytics Dashboard
```bash
curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  http://localhost:1337/api/analytics/dashboard
```

### Test Order Tracking
```bash
curl http://localhost:1337/api/order-tracking/123
```

### Test Support Message
```bash
curl -X POST http://localhost:1337/api/support-messages \
  -H "Authorization: Bearer YOUR_USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"data":{"subject":"Test","message":"Test message"}}'
```

---

## Next Steps

1. ✅ Features created in `minimoonBack/src/api/`
2. ⏳ Start local backend to create database tables
3. ⏳ Configure permissions in Strapi admin
4. ⏳ Test all endpoints
5. ⏳ Integrate with frontend
6. ⏳ Deploy to production

---

## Support

For issues or questions about these features, check:
- Strapi logs: `npm run develop` output
- API responses for error messages
- Database for data integrity

**All features are ready to use once you start the backend!** 🚀
