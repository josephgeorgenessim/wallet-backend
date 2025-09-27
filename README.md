# Wallet Backend API

A robust and scalable backend service for a digital wallet application, built with Node.js, Express, and PostgreSQL with Neon. This service provides secure transaction management with rate limiting and basic error handling.

## Features

- **Transaction Management**: Create, read, and delete transactions
- **User-specific Data**: All transactions are scoped to user IDs
- **Rate Limiting**: Built-in protection against abuse
- **RESTful API**: Clean and intuitive endpoints
- **PostgreSQL Database**: Reliable data storage with Neon
- **Environment-based Configuration**: Easy setup with environment variables

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (hosted on Neon)
- **Rate Limiting**: Upstash Redis
- **Logging**: Morgan HTTP request logger
- **Environment Management**: dotenv

## Project Structure

```
src/
├── config/               # Configuration files
│   ├── db.js           # Database configuration
│   └── upstash.js      # Rate limiting configuration
├── controllers/        # Request handlers
│   └── transactionController.js
├── middleware/         # Custom middleware
│   ├── rateLimiter.js
│   ├── errorHandler.js
│   └── validator.js
├── models/             # Database models
│   └── transactionModel.js
├── routes/             # Route definitions
│   ├── index.js
│   └── transactionRoutes.js
├── services/           # Business logic
│   └── transactionService.js
├── utils/              # Utility functions
│   └── logger.js
└── server.js           # Application entry point
```

## API Endpoints

### Transactions

- `POST /api/transactions` - Create a new transaction
- `GET /api/transactions/:user_id` - Get all transactions for a user
- `DELETE /api/transactions/:transaction_id` - Delete a transaction
- `GET /api/transactions/summary/:user_id` - Get transaction summary for a user

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
DATABASE_URL=your_neon_database_url
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd wallet-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (see .env.example)

4. Start the development server:
   ```bash
   npm run dev
   ```

5. For production:
   ```bash
   npm start
   ```

## Development

- **Linting**: `npm run lint`
- **Formatting**: `npm run format`
- **Testing**: `npm test`


