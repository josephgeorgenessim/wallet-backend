# Wallet Backend API

A robust and scalable backend service for a digital wallet application, built with Node.js, Express, and PostgreSQL with Neon. This service provides secure transaction management with rate limiting and comprehensive error handling.

## Features

- **Transaction Management**: Create, read, delete, and summarize transactions
- **User-specific Data**: All transactions are scoped to user IDs for multi-user support
- **Financial Summary**: Calculate balance, total income, and total expenses
- **Rate Limiting**: Built-in protection against abuse using Upstash Redis
- **RESTful API**: Clean and intuitive endpoints with proper HTTP status codes
- **PostgreSQL Database**: Reliable data storage with Neon serverless database
- **CORS Support**: Configured for cross-origin requests
- **Request Logging**: Morgan HTTP request logger for development
- **Environment-based Configuration**: Easy setup with environment variables

## Tech Stack

- **Runtime**: Node.js with ES modules
- **Framework**: Express.js
- **Database**: PostgreSQL (hosted on Neon serverless)
- **Rate Limiting**: Upstash Redis with sliding window algorithm
- **Logging**: Morgan HTTP request logger
- **Environment Management**: dotenv
- **CORS**: cors middleware for cross-origin requests

## Project Structure

```
src/
├── config/               # Configuration files
│   ├── db.js           # Database configuration and initialization
│   └── upstash.js      # Rate limiting configuration
├── middleware/         # Custom middleware
│   └── rateLimiter.js  # Rate limiting middleware
├── routes/             # Route definitions
│   ├── index.js        # Route mounting configuration
│   └── transactionRoute.js # Transaction API endpoints
├── services/           # Business logic layer
│   └── transactionService.js # Transaction operations and database queries
└── server.js           # Application entry point and server setup
```

## API Endpoints

### Base URL: `/api/transactions`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Create a new transaction |
| GET | `/:user_id` | Get all transactions for a specific user |
| DELETE | `/:transaction_id` | Delete a transaction by ID |
| GET | `/summary/:user_id` | Get financial summary (balance, income, expenses) for a user |

### Transaction Data Structure

```json
{
  "user_id": "string",
  "title": "string",
  "amount": "number",
  "category": "string"
}
```

**Note**: Amount can be positive (income) or negative (expense) for proper balance calculations.

### Example API Usage

#### Create Transaction
```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user123",
    "title": "Coffee Purchase",
    "amount": -5.50,
    "category": "Food & Dining"
  }'
```

#### Get User Transactions
```bash
curl http://localhost:3000/api/transactions/user123
```

#### Get Financial Summary
```bash
curl http://localhost:3000/api/transactions/summary/user123
```

#### Delete Transaction
```bash
curl -X DELETE http://localhost:3000/api/transactions/1
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000

# Database Configuration
DATABASE_URL=your_neon_database_connection_string

# Rate Limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- Neon PostgreSQL database account
- Upstash Redis account (for rate limiting)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd wallet-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env` file with your actual credentials
   - Ensure your Neon database is set up and the connection string is correct
   - Configure Upstash Redis credentials for rate limiting

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **For production:**
   ```bash
   npm start
   ```

The server will be available at:
- Local: http://localhost:3000
- Network: http://192.168.1.4:3000 (if running on a local network)

## Rate Limiting

The API implements rate limiting using Upstash Redis with a sliding window algorithm:
- **Limit**: 100 requests per 60 seconds
- **Strategy**: Sliding window for smooth rate limiting
- **Response**: 429 status code with retry information when limit exceeded

## Database Schema

The application automatically creates the following table structure:

```sql
CREATE TABLE Transactions (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
);
```

## Error Handling

The API includes comprehensive error handling:
- **400 Bad Request**: Missing required fields or invalid data
- **404 Not Found**: No transactions found or user doesn't exist
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Database or server errors

## Development

### Available Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Key Features for Development
- **Hot Reloading**: Nodemon automatically restarts server on file changes
- **Request Logging**: Morgan logs all HTTP requests in development
- **CORS Enabled**: Configured for frontend integration
- **Database Auto-initialization**: Tables are created automatically on startup

## Security Considerations

- **Rate Limiting**: Protects against abuse and DoS attacks
- **Input Validation**: Basic validation for required fields
- **CORS Configuration**: Restricts cross-origin requests to specified methods and headers
- **Environment Variables**: Sensitive configuration kept separate from code

