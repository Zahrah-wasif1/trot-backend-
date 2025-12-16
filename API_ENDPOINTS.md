# API Endpoints Documentation

Base URL: `https://your-vercel-url.vercel.app/api`

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## Health Check

### GET `/api/health`
Check if the server is running.

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

---

## Authentication Endpoints

### POST `/api/users/register`
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "customer",
    "status": "active"
  }
}
```

---

### POST `/api/users/login`
Login user and get JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  },
  "isAdmin": false
}
```

---

## Car Endpoints

### GET `/api/cars`
Get all cars (Public).

**Response (200):**
```json
[
  {
    "_id": "car_id",
    "name": "Toyota Camry",
    "type": "Sedan",
    "seats": 5,
    "price": 50,
    "image": "https://example.com/car.jpg",
    "description": "Comfortable sedan",
    "features": ["GPS", "Bluetooth"],
    "available": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### GET `/api/cars/:id`
Get a single car by ID (Public).

**Response (200):**
```json
{
  "_id": "car_id",
  "name": "Toyota Camry",
  "type": "Sedan",
  "seats": 5,
  "price": 50,
  "image": "https://example.com/car.jpg",
  "description": "Comfortable sedan",
  "features": ["GPS", "Bluetooth"],
  "available": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Response (404):**
```json
{
  "message": "Car not found"
}
```

---

### POST `/api/cars`
Create a new car (Admin only - requires authentication).

**Headers:**
```
Authorization: Bearer <admin-jwt-token>
```

**Request Body:**
```json
{
  "name": "Honda Accord",
  "type": "Sedan",
  "seats": 5,
  "price": 60,
  "image": "https://example.com/honda.jpg",
  "description": "Reliable sedan",
  "features": ["GPS", "Bluetooth", "Sunroof"],
  "available": true
}
```

**Response (201):**
```json
{
  "_id": "car_id",
  "name": "Honda Accord",
  "type": "Sedan",
  "seats": 5,
  "price": 60,
  "image": "https://example.com/honda.jpg",
  "description": "Reliable sedan",
  "features": ["GPS", "Bluetooth", "Sunroof"],
  "available": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Response (403):**
```json
{
  "message": "Only admins can add cars"
}
```

---

### PUT `/api/cars/:id`
Update a car (Admin only - requires authentication).

**Headers:**
```
Authorization: Bearer <admin-jwt-token>
```

**Request Body:**
```json
{
  "price": 65,
  "available": false
}
```

**Response (200):**
```json
{
  "_id": "car_id",
  "name": "Honda Accord",
  "price": 65,
  "available": false,
  ...
}
```

---

### DELETE `/api/cars/:id`
Delete a car (Admin only - requires authentication).

**Headers:**
```
Authorization: Bearer <admin-jwt-token>
```

**Response (200):**
```json
{
  "message": "Car deleted successfully"
}
```

---

## Booking Endpoints

All booking endpoints require authentication.

### POST `/api/bookings`
Create a new booking.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "carId": "car_id",
  "startDate": "2024-02-01T00:00:00.000Z",
  "endDate": "2024-02-05T00:00:00.000Z",
  "amount": 200,
  "phone": "+1234567890",
  "email": "john@example.com"
}
```

**Response (201):**
```json
{
  "_id": "booking_id",
  "userId": "user_id",
  "carId": "car_id",
  "startDate": "2024-02-01T00:00:00.000Z",
  "endDate": "2024-02-05T00:00:00.000Z",
  "status": "pending",
  "amount": 200,
  "phone": "+1234567890",
  "email": "john@example.com",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

### GET `/api/bookings`
Get all bookings for the logged-in user.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200):**
```json
[
  {
    "_id": "booking_id",
    "userId": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "carId": {
      "_id": "car_id",
      "name": "Toyota Camry",
      "type": "Sedan"
    },
    "startDate": "2024-02-01T00:00:00.000Z",
    "endDate": "2024-02-05T00:00:00.000Z",
    "status": "pending",
    "amount": 200,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### GET `/api/bookings/:id`
Get a single booking by ID (only if user owns the booking).

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200):**
```json
{
  "_id": "booking_id",
  "userId": {
    "_id": "user_id",
    "name": "John Doe"
  },
  "carId": {
    "_id": "car_id",
    "name": "Toyota Camry"
  },
  "startDate": "2024-02-01T00:00:00.000Z",
  "endDate": "2024-02-05T00:00:00.000Z",
  "status": "pending",
  "amount": 200
}
```

**Response (403):**
```json
{
  "message": "Forbidden"
}
```

---

### PUT `/api/bookings/:id/status`
Update booking status (only if user owns the booking).

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "status": "active"
}
```

**Valid statuses:** `pending`, `active`, `completed`, `cancelled`

**Response (200):**
```json
{
  "_id": "booking_id",
  "status": "active",
  ...
}
```

---

### DELETE `/api/bookings/:id`
Delete a booking (only if user owns the booking).

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200):**
```json
{
  "message": "Booking deleted successfully"
}
```

---

## Contact Form Endpoints

### POST `/api/contact`
Submit a contact form (Public).

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "subject": "Inquiry about car rental",
  "message": "I would like to know more about your car rental services."
}
```

**Response (201):**
```json
{
  "message": "Contact form submitted successfully",
  "contact": {
    "id": "contact_id",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "subject": "Inquiry about car rental",
    "status": "new"
  }
}
```

**Validation Errors (400):**
```json
{
  "message": "Please fill in all required fields"
}
```

```json
{
  "message": "Please provide a valid email address"
}
```

---

### GET `/api/contact`
Get all contact submissions (Admin only - requires authentication).

**Headers:**
```
Authorization: Bearer <admin-jwt-token>
```

**Response (200):**
```json
[
  {
    "_id": "contact_id",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "subject": "Inquiry about car rental",
    "message": "I would like to know more...",
    "status": "new",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### GET `/api/contact/:id`
Get a single contact submission by ID (Admin only - requires authentication).

**Headers:**
```
Authorization: Bearer <admin-jwt-token>
```

**Response (200):**
```json
{
  "_id": "contact_id",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "subject": "Inquiry about car rental",
  "message": "I would like to know more...",
  "status": "new",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Error message here"
}
```

### 401 Unauthorized
```json
{
  "message": "Unauthorized: No token"
}
```
or
```json
{
  "message": "Invalid token"
}
```

### 403 Forbidden
```json
{
  "message": "Only admins can add cars"
}
```
or
```json
{
  "message": "Forbidden"
}
```

### 404 Not Found
```json
{
  "message": "Car not found"
}
```

### 500 Server Error
```json
{
  "message": "Server error",
  "error": "Error details"
}
```

---

## Car Types

Valid car types: `Sedan`, `SUV`, `Luxury`, `Sports`

## Booking Statuses

Valid booking statuses: `pending`, `active`, `completed`, `cancelled`

## Contact Statuses

Valid contact statuses: `new`, `read`, `replied`

---

## Example Usage

### Register and Login Flow:
1. `POST /api/users/register` - Register a new user
2. `POST /api/users/login` - Login and get JWT token
3. Use the token in subsequent requests: `Authorization: Bearer <token>`

### Booking Flow:
1. `GET /api/cars` - Browse available cars
2. `GET /api/cars/:id` - View car details
3. `POST /api/bookings` - Create a booking (requires auth)
4. `GET /api/bookings` - View your bookings
5. `PUT /api/bookings/:id/status` - Update booking status

### Contact Form:
1. `POST /api/contact` - Submit contact form (no auth required)

