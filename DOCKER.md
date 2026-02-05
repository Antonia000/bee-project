# Docker Setup for Beemore Project

This project uses Docker to containerize both the Angular frontend and NestJS backend.

## Prerequisites

- Docker Desktop installed and running
- Docker Compose (included with Docker Desktop)

## Quick Start

### Build and run all services

```bash
docker-compose up --build
```

This will:
- Build both frontend and backend Docker images
- Start both containers
- Frontend will be available at: http://localhost
- Backend will be available at: http://localhost:3000

### Run in detached mode (background)

```bash
docker-compose up -d --build
```

### Stop all services

```bash
docker-compose down
```

### View logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f frontend
docker-compose logs -f backend
```

## Individual Service Commands

### Build individual services

```bash
# Frontend only
docker-compose build frontend

# Backend only
docker-compose build backend
```

### Run individual services

```bash
# Frontend only
docker-compose up frontend

# Backend only
docker-compose up backend
```

## Development Mode

For development, you may want to run services locally instead of in Docker:

### Frontend (local)
```bash
cd frontend
npm install
npm start
```

### Backend (local)
```bash
cd backend
npm install
npm run start:dev
```

## Production Build

The Dockerfiles are optimized for production:

- **Frontend**: Multi-stage build that compiles Angular and serves with nginx
- **Backend**: Multi-stage build that compiles NestJS and runs with Node.js

## Environment Variables

You can customize the setup by creating a `.env` file in the root directory:

```env
FRONTEND_URL=http://localhost
PORT=3000
NODE_ENV=production
```

## Troubleshooting

### Port already in use
If port 80 or 3000 is already in use, modify the ports in `docker-compose.yml`:
```yaml
ports:
  - "8080:80"  # Change 80 to 8080
```

### Rebuild after code changes
```bash
docker-compose up --build
```

### Clean up Docker resources
```bash
# Remove containers and networks
docker-compose down

# Remove containers, networks, and volumes
docker-compose down -v

# Remove images
docker-compose down --rmi all
```
