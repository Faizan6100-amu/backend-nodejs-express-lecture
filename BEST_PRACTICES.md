# Backend Development Best Practices

## Table of Contents
1. [Code Organization](#code-organization)
2. [Error Handling](#error-handling)
3. [Security](#security)
4. [Performance](#performance)
5. [Testing](#testing)
6. [Logging](#logging)
7. [API Design](#api-design)
8. [Database](#database)

## Code Organization

### Project Structure

```
src/
├── app.js                 # Express app configuration
├── server.js              # Server entry point
├── config/
│   ├── database.js       # Database configuration
│   ├── environment.js    # Environment variables
│   └── constants.js      # Application constants
├── routes/
│   ├── index.js          # Route aggregator
│   ├── users.js          # User routes
│   ├── posts.js          # Post routes
│   └── auth.js           # Auth routes
├── controllers/
│   ├── userController.js
│   ├── postController.js
│   └── authController.js
├── middleware/
│   ├── auth.js           # Authentication middleware
│   ├── errorHandler.js   # Error handling
│   └── validators.js     # Input validation
├── models/
│   ├── User.js
│   ├── Post.js
│   └── Comment.js
├── services/
│   ├── userService.js    # Business logic
│   └── emailService.js   # Email service
├── utils/
│   ├── helpers.js        # Utility functions
│   ├── validators.js     # Validation functions
│   └── constants.js      # Constants
├── middleware/
│   └── errorHandler.js   # Global error handler
└── tests/
    ├── unit/             # Unit tests
    ├── integration/      # Integration tests
    └── fixtures/         # Test data
```

### Naming Conventions

```javascript
// Files
- userController.js (camelCase)
- authMiddleware.js
- validateEmail.js

// Variables
const userName = 'John';
const isActive = true;
const MAX_RETRIES = 3;

// Functions
function getUserById(id) {}
const fetchPosts = async () => {};

// Classes
class UserService {}
class DatabaseConnection {}
```

## Error Handling

### Try-Catch Pattern

```javascript
// ✅ Good
async function getUser(id) {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        logger.error('Error fetching user:', error);
        throw error;
    }
}

// ❌ Bad - No error handling
async function getUser(id) {
    const user = await User.findById(id);
    return user;
}
```

### Error Handling Middleware

```javascript
// ✅ Good
app.use((err, req, res, next) => {
    logger.error(err);
    
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    
    res.status(status).json({
        success: false,
        error: {
            status,
            message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    });
});
```

## Security

### Environment Variables

```javascript
// ✅ Good
require('dotenv').config();
const dbPassword = process.env.DB_PASSWORD;

// ❌ Bad - Hardcoded secrets
const dbPassword = 'mySecretPassword123';
```

### Input Validation

```javascript
// ✅ Good
const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

app.post('/users', (req, res) => {
    if (!validateEmail(req.body.email)) {
        return res.status(400).json({ error: 'Invalid email' });
    }
    // Process request
});

// ❌ Bad - No validation
app.post('/users', (req, res) => {
    const user = req.body; // Directly use without validation
    // Process request
});
```

### Use Security Packages

```javascript
// ✅ Good
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

app.use(helmet()); // Set security headers
app.use(cors({ origin: process.env.CORS_ORIGIN }));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## Performance

### Caching

```javascript
// ✅ Good - Cache frequently accessed data
const cache = new Map();

app.get('/users/:id', (req, res) => {
    if (cache.has(req.params.id)) {
        return res.json(cache.get(req.params.id));
    }
    
    const user = User.findById(req.params.id);
    cache.set(req.params.id, user);
    res.json(user);
});
```

### Pagination

```javascript
// ✅ Good
app.get('/posts', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const posts = Post.find()
        .skip(skip)
        .limit(limit);
    
    res.json({
        data: posts,
        pagination: { page, limit, total: posts.length }
    });
});
```

### Database Indexing

```javascript
// ✅ Good - Index frequently queried fields
const userSchema = new Schema({
    email: { type: String, index: true, unique: true },
    username: { type: String, index: true },
    createdAt: { type: Date, index: true }
});
```

## Testing

### Unit Tests

```javascript
// ✅ Good
describe('UserService', () => {
    describe('getUserById', () => {
        it('should return a user when found', async () => {
            const user = await UserService.getUserById(1);
            expect(user).toBeDefined();
            expect(user.id).toBe(1);
        });
        
        it('should throw error when user not found', async () => {
            await expect(UserService.getUserById(999))
                .rejects
                .toThrow('User not found');
        });
    });
});
```

### Integration Tests

```javascript
// ✅ Good
describe('GET /api/users/:id', () => {
    it('should return user data', async () => {
        const res = await request(app)
            .get('/api/users/1')
            .expect(200);
        
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('email');
    });
    
    it('should return 404 for non-existent user', async () => {
        await request(app)
            .get('/api/users/999')
            .expect(404);
    });
});
```

## Logging

### Logging Strategy

```javascript
// ✅ Good - Use structured logging
const logger = require('./utils/logger');

app.use((req, res, next) => {
    logger.info('Incoming request', {
        method: req.method,
        url: req.url,
        ip: req.ip,
        timestamp: new Date()
    });
    next();
});

// Log errors with context
try {
    // operation
} catch (error) {
    logger.error('Operation failed', {
        error: error.message,
        stack: error.stack,
        context: { userId: req.user.id }
    });
}
```

## API Design

### RESTful Conventions

```javascript
// ✅ Good
GET    /api/users              // List all users
GET    /api/users/:id          // Get specific user
POST   /api/users              // Create user
PUT    /api/users/:id          // Update user
DELETE /api/users/:id          // Delete user

// ❌ Bad
GET    /api/getUsers
GET    /api/getUserById?id=1
GET    /api/createUser
GET    /api/updateUser
GET    /api/deleteUser
```

### Response Format

```javascript
// ✅ Good - Consistent response format
res.json({
    success: true,
    data: user,
    message: 'User retrieved successfully'
});

res.status(400).json({
    success: false,
    error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid input',
        details: ['Email is required']
    }
});
```

## Database

### Query Optimization

```javascript
// ✅ Good - Use lean() for read-only queries
const users = await User.find().lean();

// ✅ Good - Select only needed fields
const users = await User.find().select('name email');

// ❌ Bad - Fetch all fields
const users = await User.find();
```

### Connection Pooling

```javascript
// ✅ Good
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
```

---

## Summary Checklist

- [ ] Code is organized following project structure
- [ ] Error handling is implemented
- [ ] Security packages are installed (helmet, cors)
- [ ] Input validation is in place
- [ ] Logging is configured
- [ ] Tests are written
- [ ] Environment variables are used for secrets
- [ ] Database queries are optimized
- [ ] Response format is consistent
- [ ] Performance considerations are addressed

---

Happy Coding! 🎉
