# 10. Backend Integration & API Contracts

This document specifies the complete RESTful API contract specifications, Data Transfer Objects (DTOs), Zod schemas, and JWT authentication flows required to integrate the ROFOOF frontend with a backend service.

---

## 1. Authentication & JWT Refresh Token Flow

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant React App
    participant Axios Interceptor
    participant Backend API
    
    User->>React App: Submit Login Credentials (email, password)
    React App->>Backend API: POST /api/v1/auth/login
    Backend API-->>React App: Return { accessToken, user } + Set httpOnly refreshToken Cookie
    React App->>React App: Store accessToken in Memory (Auth Context)
    
    Note over React App, Backend API: API Calls with Bearer Token
    React App->>Axios Interceptor: GET /api/v1/orders
    Axios Interceptor->>Backend API: Request Header: Authorization: Bearer <accessToken>
    Backend API-->>React App: 200 OK + Data
    
    Note over React App, Backend API: Token Expiration (401 Unauthorized)
    React App->>Axios Interceptor: GET /api/v1/products
    Axios Interceptor->>Backend API: Request with Expired Token
    Backend API-->>Axios Interceptor: 401 Unauthorized
    Axios Interceptor->>Backend API: POST /api/v1/auth/refresh (with httpOnly Cookie)
    Backend API-->>Axios Interceptor: 200 OK + New accessToken
    Axios Interceptor->>Backend API: Retry Failed Request with New Token
    Backend API-->>React App: 200 OK Data Returned Seamlessly
```

---

## 2. API Endpoints Catalog & DTO Specifications

### 2.1 Authentication Endpoints

#### `POST /api/v1/auth/login`
- **Request DTO (`LoginPayload`)**:
  ```typescript
  export interface LoginPayload {
    email: string;      // Valid email format
    password: string;   // Min 6 characters
    rememberMe?: boolean;
  }
  ```
- **Response DTO (`AuthResponse`)**:
  ```typescript
  export interface AuthResponse {
    accessToken: string;
    expiresIn: number; // Seconds
    user: {
      id: string;
      name: string;
      email: string;
      role: 'SUPER_ADMIN' | 'STORE_MANAGER' | 'DISPATCHER';
      avatarUrl?: string;
    };
  }
  ```

---

### 2.2 Orders Management Endpoints

#### `GET /api/v1/orders`
- **Query Parameters**: `page`, `limit`, `status` (`ALL` | `ACTIVE` | `PENDING` | `DELIVERED` | `CANCELLED`), `search`, `sortBy`.
- **Response DTO (`PaginatedOrdersResponse`)**:
  ```typescript
  export interface OrderItemDTO {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }

  export interface OrderDTO {
    id: string; // e.g. "ORD-9482"
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    totalAmount: number;
    paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED';
    orderStatus: 'PENDING' | 'PROCESSING' | 'DISPATCHED' | 'DELIVERED' | 'CANCELLED';
    createdAt: string; // ISO Timestamp
    items: OrderItemDTO[];
    driverId?: string;
    driverName?: string;
  }

  export interface PaginatedOrdersResponse {
    data: OrderDTO[];
    total: number;
    page: number;
    totalPages: number;
  }
  ```

#### `POST /api/v1/orders` (Create Order)
- **Request DTO (`CreateOrderPayload`)**:
  ```typescript
  export interface CreateOrderPayload {
    customerId: string;
    deliveryAddress: string;
    items: { productId: string; quantity: number }[];
    notes?: string;
    paymentMethod: 'CASH_ON_DELIVERY' | 'CREDIT_CARD' | 'B2B_CREDIT';
  }
  ```

#### `PATCH /api/v1/orders/:id/status` (Update Status)
- **Request DTO**: `{ status: OrderStatus; driverId?: string }`

---

### 2.3 Product Catalog Endpoints

#### `GET /api/v1/products`
- **Query Parameters**: `page`, `limit`, `categoryId`, `search`, `status` (`ACTIVE` | `INACTIVE` | `LOW_STOCK`).
- **Response DTO (`PaginatedProductsResponse`)**:
  ```typescript
  export interface ProductDTO {
    id: string;
    name: string;
    sku: string;
    description: string;
    categoryId: string;
    categoryName: string;
    brand: string;
    retailPrice: number;
    wholesalePrice: number;
    stockCount: number;
    minStockThreshold: number;
    images: string[];
    isVisible: boolean;
    createdAt: string;
  }
  ```

#### `POST /api/v1/products` (5-Step Product Creation Payload)
- **Request DTO (`CreateProductPayload`)**:
  ```typescript
  export interface CreateProductPayload {
    name: string;
    description?: string;
    categoryId: string;
    brand?: string;
    isVisible: boolean;
    images: string[];
    weight: number;
    unit: 'KG' | 'L' | 'PIECE' | 'PACK';
    stockCount: number;
    minStockAlert: number;
    retailPrice: number;
    wholesalePrice: number;
    b2bMinQuantity: number;
  }
  ```

---

### 2.4 Driver & Fleet Endpoints

#### `GET /api/v1/drivers`
- **Response DTO**: `DriverDTO[]`
  ```typescript
  export interface DriverDTO {
    id: string;
    name: string;
    phone: string;
    vehicleType: 'VAN' | 'MOTORCYCLE' | 'TRUCK';
    licensePlate: string;
    status: 'ONLINE' | 'BUSY' | 'OFFLINE';
    currentLocation?: { lat: number; lng: number };
    totalDeliveries: number;
    rating: number;
  }
  ```

#### `POST /api/v1/dispatch/assign`
- **Request DTO**: `{ orderId: string; driverId: string }`

---

## 3. UI State Lifecycle Machine

Every TanStack Query data request must implement five standardized UI states:

```mermaid
graph TD
    A[Initiate API Request] --> B{State Evaluation}
    B -->|Fetching Data| C[1. Loading Skeleton / Spinner State]
    B -->|Network / 500 Error| D[2. Error Alert + Retry Button State]
    B -->|200 OK + Empty Data| E[3. Empty State Graphic]
    B -->|200 OK + Valid Data| F[4. Success Data Render]
    B -->|Optimistic Update| G[5. Instant UI Update with Rollback on Error]
```
