# Installation Guide

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher) - comes with Node.js
- **Git** (for version control)
- **Code Editor** (VS Code recommended)

## Step-by-Step Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Faizan6100-amu/backend-nodejs-express-lecture.git
cd backend-nodejs-express-lecture
```

### 2. Install Dependencies

```bash
npm install
```

This will install all the required packages listed in `package.json`:
- express: Web framework
- dotenv: Environment variable management
- cors: Cross-Origin Resource Sharing
- helmet: Security headers
- morgan: HTTP request logger
- nodemon: Auto-reload during development
- jest: Testing framework

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and configure values according to your setup:

```env
PORT=3000
NODE_ENV=development
```

### 4. Verify Installation

Test if everything is working:

```bash
npm start
```

You should see:
```
Server running on port 3000
```

### 5. Open the Web Course

Open `index.html` in your web browser or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js
npx http-server
```

Then visit: `http://localhost:8000`

## Running Examples

### Start Development Server

```bash
npm run dev
```

This uses nodemon to auto-reload when files change.

### Run Specific Examples

```bash
# To-Do API
npm run example:todo

# Blog API
npm run example:blog

# User Management
npm run example:user

# Task Scheduler
npm run example:task
```

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:

```bash
# Change the port in .env
PORT=3001

# Or run with a different port
PORT=3001 npm start
```

### Permission Denied

If you get permission errors:

```bash
# On Linux/Mac
sudo npm install -g npm@latest

# Clear npm cache
npm cache clean --force
```

### Node Modules Issues

If you have dependency issues:

```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

## System Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| RAM | 512 MB | 2 GB |
| Storage | 500 MB | 2 GB |
| Node.js | 14.0.0 | 16.0.0+ |
| npm | 6.0.0 | 8.0.0+ |

## Next Steps

1. Read the [README.md](README.md) for course overview
2. Open `index.html` to start the interactive course
3. Run example projects to practice
4. Follow the course modules in order

## Getting Help

- Check [GitHub Issues](https://github.com/Faizan6100-amu/backend-nodejs-express-lecture/issues)
- Review the course materials in `MODULE_2_BACKEND_DEVELOPMENT.md`
- Refer to official documentation links in README

---

Happy Learning! 🚀
