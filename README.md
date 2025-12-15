# NutriFit - Nutrition & Fitness Tracking Application

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Installation Instructions](#installation-instructions)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Deployment Information](#deployment-information)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)

---

## Project Overview

NutriFit is a comprehensive nutrition and fitness tracking application designed to help users monitor their daily dietary intake, track fitness goals, and maintain a healthy lifestyle. The application provides real-time nutritional analysis, personalized fitness recommendations, and comprehensive health metrics tracking.

### Vision
To empower individuals with data-driven insights to make informed decisions about their nutrition and fitness habits, ultimately promoting healthier lifestyles through accessible technology.

### Key Objectives
- Enable users to track daily caloric intake and macronutrient distribution
- Monitor fitness activities and exercise performance
- Provide AI-driven nutritional recommendations
- Generate comprehensive health reports and progress analytics
- Foster community engagement through social features

---

## Features

### Core Features
1. **User Authentication & Profile Management**
   - Secure user registration and login
   - Profile customization with dietary preferences
   - Password recovery and account management

2. **Nutrition Tracking**
   - Log meals and food items with real-time caloric calculation
   - Barcode scanning for quick food entry
   - Customizable food database with nutritional information
   - Macro-nutrient tracking (proteins, carbs, fats)
   - Micronutrient monitoring (vitamins, minerals)
   - Daily, weekly, and monthly nutritional reports

3. **Fitness Tracking**
   - Log workouts and exercises
   - Automatic calorie burn calculation based on activity type and duration
   - Personal fitness goals setting and tracking
   - Workout history and progress analytics

4. **Health Analytics & Insights**
   - Personalized dashboards with key health metrics
   - Progress visualization with charts and graphs
   - AI-powered nutritional recommendations
   - Health trend analysis and predictions

5. **Social Features**
   - Share progress with friends
   - Community challenges and leaderboards
   - Social notifications and updates

6. **Integration Capabilities**
   - Integration with popular fitness trackers
   - Export data to PDF and CSV formats
   - Calendar view for daily tracking

---

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer                             │
│         (React.js Frontend / Mobile Application)             │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  API Gateway Layer                           │
│              (Express.js / REST API)                         │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  Auth        │ │  Nutrition   │ │  Fitness     │
│  Service     │ │  Service     │ │  Service     │
└──────┬───────┘ └──────┬───────┘ └──────┬───────┘
       │                │                │
       └────────────────┼────────────────┘
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                  Data Access Layer                           │
│              (ORM / Database Queries)                        │
└────────────────────┬────────────────────────────────────────┘
                     │
       ┌─────────────┼─────────────┐
       ▼             ▼             ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  PostgreSQL  │ │   Redis      │ │   MongoDB    │
│  (Primary DB)│ │  (Cache)     │ │ (Analytics)  │
└──────────────┘ └──────────────┘ └──────────────┘
```

### Microservices Components
- **Authentication Service**: Handles user registration, login, and token management
- **Nutrition Service**: Manages food database and nutritional tracking
- **Fitness Service**: Handles workout logging and fitness analytics
- **Analytics Service**: Processes data for insights and recommendations
- **Notification Service**: Manages alerts and communications

---

## Tech Stack

### Frontend
- **Framework**: React.js 18.x
- **State Management**: Redux / Zustand
- **UI Component Library**: Material-UI / Tailwind CSS
- **HTTP Client**: Axios
- **Charts & Visualization**: Chart.js / Recharts
- **Testing**: Jest, React Testing Library
- **Build Tool**: Vite / Webpack

### Backend
- **Runtime**: Node.js 18.x
- **Framework**: Express.js
- **Language**: JavaScript/TypeScript
- **Authentication**: JWT, OAuth 2.0
- **API Documentation**: Swagger/OpenAPI
- **Testing**: Jest, Supertest

### Database
- **Primary Database**: PostgreSQL 14+
- **Cache Layer**: Redis 6.x+
- **Analytics Database**: MongoDB 5.x+
- **ORM**: TypeORM / Sequelize

### DevOps & Deployment
- **Containerization**: Docker
- **Orchestration**: Kubernetes / Docker Compose
- **CI/CD**: GitHub Actions
- **Hosting**: AWS / Azure / DigitalOcean
- **Version Control**: Git

### Additional Tools
- **Logging**: Winston / Pino
- **API Gateway**: Kong / Express Gateway
- **Message Queue**: RabbitMQ / Kafka
- **Search Engine**: Elasticsearch (optional)

---

## Installation Instructions

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or yarn 3.x
- Docker and Docker Compose (optional)
- PostgreSQL 14.x
- Redis 6.x

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/SakshyamLuitel/Nutrifit.git
   cd Nutrifit
   ```

2. **Navigate to backend directory**
   ```bash
   cd backend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create environment configuration**
   ```bash
   cp .env.example .env
   ```

5. **Configure environment variables**
   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=postgresql://user:password@localhost:5432/nutrifit
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRATION=24h
   CORS_ORIGIN=http://localhost:3000
   ```

6. **Run database migrations**
   ```bash
   npm run db:migrate
   ```

7. **Seed initial data (optional)**
   ```bash
   npm run db:seed
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment configuration**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure environment variables**
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_APP_NAME=NutriFit
   VITE_LOG_LEVEL=debug
   ```

### Docker Setup (Alternative)

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

2. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Documentation: http://localhost:5000/api-docs

---

## Running the Application

### Development Mode

#### Backend
```bash
cd backend
npm run dev
```
The backend server will start on `http://localhost:5000`

#### Frontend
```bash
cd frontend
npm run dev
```
The frontend application will start on `http://localhost:3000`

### Production Mode

#### Backend
```bash
cd backend
npm run build
npm start
```

#### Frontend
```bash
cd frontend
npm run build
npm run preview
```

### Using Docker Compose
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Running Tests

#### Backend Tests
```bash
cd backend
npm test                    # Run all tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Generate coverage report
```

#### Frontend Tests
```bash
cd frontend
npm test                    # Run all tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Generate coverage report
```

---

## API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "id": "user-uuid",
    "email": "user@example.com",
    "token": "jwt-token"
  }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "success": true,
  "data": {
    "id": "user-uuid",
    "email": "user@example.com",
    "token": "jwt-token",
    "expiresIn": "24h"
  }
}
```

### Nutrition Endpoints

#### Log Food Item
```http
POST /nutrition/log-food
Authorization: Bearer {token}
Content-Type: application/json

{
  "foodId": "food-uuid",
  "quantity": 100,
  "unit": "grams",
  "mealType": "breakfast",
  "logDate": "2025-12-15"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "id": "log-uuid",
    "foodName": "Apple",
    "calories": 52,
    "protein": 0.26,
    "carbs": 13.81,
    "fat": 0.17
  }
}
```

#### Get Daily Nutrition Summary
```http
GET /nutrition/daily-summary?date=2025-12-15
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "data": {
    "date": "2025-12-15",
    "totalCalories": 1850,
    "calorieGoal": 2000,
    "macronutrients": {
      "protein": 150,
      "carbs": 225,
      "fat": 65
    },
    "meals": [
      {
        "type": "breakfast",
        "items": [],
        "totalCalories": 450
      }
    ]
  }
}
```

### Fitness Endpoints

#### Log Workout
```http
POST /fitness/log-workout
Authorization: Bearer {token}
Content-Type: application/json

{
  "exerciseId": "exercise-uuid",
  "duration": 30,
  "intensity": "high",
  "notes": "Morning run in the park",
  "logDate": "2025-12-15"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "id": "workout-uuid",
    "exerciseName": "Running",
    "duration": 30,
    "caloriesBurned": 300
  }
}
```

#### Get Weekly Activity Summary
```http
GET /fitness/weekly-summary?startDate=2025-12-08&endDate=2025-12-15
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "data": {
    "totalWorkouts": 5,
    "totalDuration": 300,
    "totalCaloriesBurned": 2500,
    "weeklyGoal": 2000,
    "activities": []
  }
}
```

### User Profile Endpoints

#### Get User Profile
```http
GET /users/profile
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "data": {
    "id": "user-uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "age": 28,
    "weight": 75,
    "height": 180,
    "goals": [],
    "preferences": {}
  }
}
```

#### Update User Profile
```http
PUT /users/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "weight": 74,
  "dailyCalorieGoal": 2000,
  "preferences": {
    "theme": "dark",
    "notifications": true
  }
}

Response: 200 OK
{
  "success": true,
  "data": {
    "id": "user-uuid",
    "message": "Profile updated successfully"
  }
}
```

### Error Responses
```http
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input parameters",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### Rate Limiting
- All API endpoints are rate limited to 100 requests per 15 minutes per user
- Rate limit headers are included in responses:
  - `X-RateLimit-Limit`: 100
  - `X-RateLimit-Remaining`: 99
  - `X-RateLimit-Reset`: 1639596736

For complete API documentation, visit: `http://localhost:5000/api-docs`

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  age INT,
  weight DECIMAL(5, 2),
  height INT,
  gender VARCHAR(10),
  daily_calorie_goal INT DEFAULT 2000,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP
);
```

### Food Items Table
```sql
CREATE TABLE food_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  serving_size INT,
  serving_unit VARCHAR(50),
  calories INT NOT NULL,
  protein DECIMAL(5, 2),
  carbs DECIMAL(5, 2),
  fat DECIMAL(5, 2),
  fiber DECIMAL(5, 2),
  sodium INT,
  potassium INT,
  category VARCHAR(100),
  barcode VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Food Logs Table
```sql
CREATE TABLE food_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  food_item_id UUID NOT NULL REFERENCES food_items(id),
  quantity INT NOT NULL,
  unit VARCHAR(50),
  meal_type VARCHAR(20),
  total_calories INT,
  log_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, food_item_id, log_date, meal_type)
);
```

### Exercises Table
```sql
CREATE TABLE exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  met_value DECIMAL(5, 2),
  calories_per_minute_per_kg DECIMAL(5, 3),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Workout Logs Table
```sql
CREATE TABLE workout_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  exercise_id UUID NOT NULL REFERENCES exercises(id),
  duration INT NOT NULL,
  intensity VARCHAR(20),
  calories_burned INT,
  notes TEXT,
  log_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### User Goals Table
```sql
CREATE TABLE user_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  goal_type VARCHAR(50),
  target_value DECIMAL(10, 2),
  current_value DECIMAL(10, 2),
  start_date DATE NOT NULL,
  end_date DATE,
  status VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Daily Summaries Table
```sql
CREATE TABLE daily_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  summary_date DATE NOT NULL,
  total_calories INT,
  total_protein DECIMAL(5, 2),
  total_carbs DECIMAL(5, 2),
  total_fat DECIMAL(5, 2),
  calories_burned INT,
  workouts_completed INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, summary_date)
);
```

### Relationships Diagram
```
Users
  ├── Food Logs (one-to-many)
  ├── Workout Logs (one-to-many)
  ├── User Goals (one-to-many)
  └── Daily Summaries (one-to-many)

Food Items
  └── Food Logs (one-to-many)

Exercises
  └── Workout Logs (one-to-many)
```

---

## Deployment Information

### AWS Deployment

#### Prerequisites
- AWS Account with appropriate permissions
- AWS CLI configured
- Docker image pushed to ECR

#### Deployment Steps

1. **Create RDS PostgreSQL Instance**
   ```bash
   aws rds create-db-instance \
     --db-instance-identifier nutrifit-db \
     --db-instance-class db.t3.micro \
     --engine postgres \
     --master-username admin \
     --master-user-password YourSecurePassword \
     --allocated-storage 20
   ```

2. **Create ElastiCache Redis Instance**
   ```bash
   aws elasticache create-cache-cluster \
     --cache-cluster-id nutrifit-cache \
     --cache-node-type cache.t3.micro \
     --engine redis
   ```

3. **Deploy to ECS Fargate**
   ```bash
   # Create ECS cluster
   aws ecs create-cluster --cluster-name nutrifit-cluster

   # Register task definition
   aws ecs register-task-definition --cli-input-json file://task-definition.json

   # Create service
   aws ecs create-service \
     --cluster nutrifit-cluster \
     --service-name nutrifit-service \
     --task-definition nutrifit-task
   ```

4. **Deploy Frontend to S3 + CloudFront**
   ```bash
   aws s3 sync ./frontend/build s3://nutrifit-frontend-bucket/
   aws cloudfront create-invalidation --distribution-id DISTRIBUTION_ID --paths "/*"
   ```

### Docker Deployment

#### Production Docker Compose
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: nutrifit
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:6-alpine
    ports:
      - "6379:6379"

  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgresql://postgres:${DB_PASSWORD}@postgres:5432/nutrifit
      REDIS_URL: redis://redis:6379
      NODE_ENV: production
    ports:
      - "5000:5000"
    depends_on:
      - postgres
      - redis

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

#### Build and Deploy
```bash
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d
```

### Kubernetes Deployment

#### Create Namespace
```bash
kubectl create namespace nutrifit
```

#### Deploy Backend
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nutrifit-backend
  namespace: nutrifit
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nutrifit-backend
  template:
    metadata:
      labels:
        app: nutrifit-backend
    spec:
      containers:
      - name: backend
        image: your-registry/nutrifit-backend:latest
        ports:
        - containerPort: 5000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: nutrifit-secrets
              key: database-url
        - name: REDIS_URL
          valueFrom:
            secretKeyRef:
              name: nutrifit-secrets
              key: redis-url
```

#### Deploy Database
```bash
kubectl apply -f postgres-deployment.yaml
kubectl apply -f redis-deployment.yaml
```

#### Expose Service
```bash
kubectl expose deployment nutrifit-backend --type=LoadBalancer --port=80 --target-port=5000
```

### Environment Variables for Production
```env
# Backend
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:password@prod-db.aws.com:5432/nutrifit
REDIS_URL=redis://prod-redis.aws.com:6379
JWT_SECRET=your-production-jwt-secret
LOG_LEVEL=info
CORS_ORIGIN=https://nutrifit.com

# Frontend
VITE_API_BASE_URL=https://api.nutrifit.com
VITE_APP_NAME=NutriFit
```

### Monitoring & Logging
- **CloudWatch** for AWS logging and monitoring
- **ELK Stack** (Elasticsearch, Logstash, Kibana) for centralized logging
- **Datadog** or **New Relic** for APM
- **Prometheus** and **Grafana** for metrics

---

## Contribution Guidelines

### Code of Conduct
We are committed to providing a welcoming and inclusive environment. All contributors are expected to:
- Be respectful and inclusive
- Welcome constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

### Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/Nutrifit.git
   cd Nutrifit
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Set up development environment**
   ```bash
   npm install
   npm run dev
   ```

### Development Workflow

1. **Create a feature branch** from `develop` branch
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/feature-description
   ```

2. **Make your changes**
   - Follow the existing code style and conventions
   - Add tests for new functionality
   - Update documentation as needed

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add feature description"
   ```

   **Commit Message Format:**
   ```
   type(scope): subject

   body

   footer
   ```

   **Types:** feat, fix, docs, style, refactor, test, chore
   **Example:** `feat(nutrition): add food search functionality`

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Provide a clear description of changes
   - Link related issues
   - Include screenshots for UI changes
   - Ensure all tests pass

### Code Style Guidelines

#### JavaScript/TypeScript
- Use 2-space indentation
- Use semicolons
- Use single quotes for strings
- Use `const` by default, `let` when needed
- Avoid `var`

#### ESLint Configuration
```bash
npm run lint
npm run lint:fix
```

#### Prettier Configuration
```bash
npm run format
```

### Testing Requirements
- Write unit tests for all new features
- Maintain test coverage above 80%
- Run tests before submitting PR
```bash
npm test
npm run test:coverage
```

### Pull Request Process

1. **Update the README.md** with details of any new features or changes
2. **Update CHANGELOG.md** with notes on your changes
3. **Ensure all CI/CD checks pass**
4. **Request review from maintainers**
5. **Address review comments**
6. **Wait for approval before merging**

### PR Template
```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #(issue number)

## Testing Done
Describe the testing performed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests passing
```

### Reporting Issues

1. **Check existing issues** to avoid duplicates
2. **Use issue templates** for bug reports and feature requests
3. **Provide detailed information:**
   - Environment (OS, Node version, etc.)
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots/logs if applicable

### Issue Template - Bug Report
```markdown
## Description
A clear description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., Ubuntu 20.04]
- Node version: [e.g., 18.x]
- Browser: [if applicable]

## Additional Context
Any other relevant information
```

### Release Process

1. **Version Numbering:** Follow Semantic Versioning (MAJOR.MINOR.PATCH)
2. **Create release branch:**
   ```bash
   git checkout -b release/v1.2.0
   ```
3. **Update version numbers** in package.json
4. **Update CHANGELOG.md**
5. **Create Pull Request** to main branch
6. **Merge to main** and create GitHub release
7. **Tag the release:**
   ```bash
   git tag -a v1.2.0 -m "Release version 1.2.0"
   git push origin v1.2.0
   ```

### Getting Help

- **Documentation:** Check README.md and wiki
- **Issues:** Search existing issues or create new one
- **Discussions:** Use GitHub Discussions for questions
- **Email:** Contact maintainers at support@nutrifit.com

### Recognition

Contributors are recognized in:
- CONTRIBUTORS.md file
- GitHub contributors page
- Release notes

---

## Additional Resources

- [API Documentation Swagger](http://localhost:5000/api-docs)
- [Project Roadmap](./ROADMAP.md)
- [Architecture Documentation](./docs/ARCHITECTURE.md)
- [Security Policy](./SECURITY.md)
- [Change Log](./CHANGELOG.md)

---

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## Support

For support, email support@nutrifit.com or join our community forum.

### Contact
- **Email:** support@nutrifit.com
- **Website:** https://nutrifit.com
- **GitHub Issues:** https://github.com/SakshyamLuitel/Nutrifit/issues
- **Twitter:** @NutriFitApp

---

## Acknowledgments

- Thanks to all contributors who have helped with pull requests
- Community members for feature suggestions and bug reports
- Open source libraries and frameworks that made this project possible

---

**Last Updated:** 2025-12-15
**Version:** 1.0.0
