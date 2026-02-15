# ShareBite Backend API

A community food sharing platform backend built with **Express.js**, **TypeScript**, **MongoDB**, and **JWT authentication**.

---

## Table of Contents
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Database Models](#database-models)

---

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (running locally or remote connection string)
- **npm** or **yarn** package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Setup environment variables:**

   Create a `.env` file in the backend root directory based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

   Configure your `.env` file:
   ```env
   PORT=4000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/sharebite
   ```

### Running the Backend

#### Development Mode (with auto-reload)
```bash
npm run dev
```
The server will start on `http://localhost:4000`

#### Production Mode
```bash
npm run build
npm start
```

#### Health Check
Verify the server is running:
```bash
curl http://localhost:4000/health
```

---

## Project Structure

```
src/
├── app.ts                    # Express app configuration & routes
├── index.ts                  # Module exports
├── server.ts                 # Server entry point & graceful shutdown
│
├── common/
│   ├── middleware/
│   │   ├── auth.middleware.ts        # JWT authentication middleware
│   │   ├── error.middleware.ts       # Global error handler
│   │   └── httpLogger.middleware.ts  # HTTP request logger (Morgan)
│   └── repositories/
│       └── base.repositories.ts      # Base repository pattern (future use)
│
├── config/
│   ├── db.ts                 # MongoDB connection setup
│   ├── env.ts                # Environment variable validation
│   └── logger.ts             # Winston logger configuration
│
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts        # Request handlers
│   │   ├── auth.route.ts             # Route definitions
│   │   ├── auth.schema.ts            # Zod validation schemas
│   │   └── auth.service.ts           # Business logic
│   ├── health/
│   │   ├── health.controller.ts      # Health check handler
│   │   ├── health.route.ts           # Health check route
│   │   └── health.service.ts         # Health check logic
│   ├── user/
│   │   └── user.model.ts             # User MongoDB schema
│   ├── listings/
│   │   └── listings.model.ts         # Food listing MongoDB schema
│   └── request/
│       └── request.model.ts          # Request MongoDB schema
│
└── types/
    └── express/
        └── index.d.ts        # Express type extensions (AuthRequest)
```

---

## API Documentation

### Base URL
```
http://localhost:4000/api
```

### Authentication Endpoints

#### 1. Register User
**Endpoint:** `POST /auth/register`

**Description:** Create a new user account

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "phone": "9876543210",
  "role": "INDIVIDUAL"
}
```

**Parameters:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| name | string | Yes | Minimum 2 characters |
| email | string | Yes | Valid email format |
| password | string | Yes | Minimum 6 characters |
| phone | string | No | Contact number |
| role | enum | No | `INDIVIDUAL`, `RESTAURANT`, or `NGO` (defaults to `INDIVIDUAL`) |

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "role": "INDIVIDUAL",
    "isVerified": false
  }
}
```

**Error Responses:**
- `400` - Validation error
- `409` - User already exists
- `500` - Server error

---

#### 2. Login User
**Endpoint:** `POST /auth/login`

**Description:** Authenticate user and receive JWT token

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Parameters:**
| Field | Type | Required |
|-------|------|----------|
| email | string | Yes |
| password | string | Yes |

**Success Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "INDIVIDUAL"
  }
}
```

**Error Responses:**
- `400` - Validation error
- `401` - Invalid credentials
- `500` - Server error

---

#### 3. Get Authenticated User Profile
**Endpoint:** `GET /auth/me`

**Description:** Retrieve current user profile (protected route)

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "message": "You are authenticated!",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "INDIVIDUAL"
  }
}
```

**Error Responses:**
- `401` - Unauthorized (missing/invalid token)
- `500` - Server error

---

### Health Check Endpoint

#### Server Health Check
**Endpoint:** `GET /health`

**Description:** Verify server and database connectivity

**Success Response (200):**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## Database Models

### User Model (`user.model.ts`)
The central entity for identity and trust management.

**Schema:**
```typescript
{
  _id: ObjectId,
  name: string,
  email: string (unique),
  password: string (hashed),
  phone: string (optional),
  role: enum ['INDIVIDUAL', 'RESTAURANT', 'NGO'],
  location: GeoJSON Point (for geospatial queries),
  isVerified: boolean (default: false),
  verificationDocuments: array (for KYC),
  createdAt: Date,
  updatedAt: Date
}
```

**Features:**
- Passwords are hashed using bcrypt
- Email is unique per user
- Geolocation support for "find nearby food" feature
- Verification system for KYC compliance

---

### Listing Model (`listings.model.ts`)
Represents food items being shared.

**Schema:**
```typescript
{
  _id: ObjectId,
  donor: ObjectId (reference to User),
  title: string,
  description: string,
  category: enum ['cooked', 'raw', 'packaged'],
  isNonVeg: boolean,
  quantity: number,
  expiresAt: Date (required),
  status: enum ['available', 'claimed', 'expired'],
  location: GeoJSON Point,
  images: array,
  createdAt: Date,
  updatedAt: Date
}
```

**Features:**
- Automatic expiration via MongoDB TTL Index
- Categorical food classification
- Location-based queries
- Status tracking

---

### Request Model (`request.model.ts`)
Records transactions between requesters and donors.

**Schema:**
```typescript
{
  _id: ObjectId,
  listing: ObjectId (reference to Listing),
  requester: ObjectId (reference to User),
  donor: ObjectId (reference to User),
  status: enum ['PENDING', 'APPROVED', 'COMPLETED', 'REJECTED', 'CANCELLED'],
  createdAt: Date,
  updatedAt: Date
}
```

**Features:**
- State machine workflow: PENDING → APPROVED → COMPLETED
- De-normalized requester & donor IDs for efficient queries
- Tracks all food sharing transactions

---

## Technologies Used

- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Validation:** Zod
- **Logging:** Winston + Morgan
- **Security:** bcryptjs for password hashing
- **Development:** ts-node-dev, TypeScript Compiler

---

## Contributing

Follow the project's coding standards and ensure all changes are tested before submitting.
