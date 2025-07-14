# Team Availability Tracker - CI/CD Pipeline Implementation
## Project Overview
This document details the complete implementation of a CI/CD pipeline for a team availability tracking application using Docker, Node.js, and modern DevOps practices.

## Prerequisites
Docker 

Docker Compose 

Node.js 18+

npm 9+

## Implementation Steps
### 1. Project Setup
```bash
#After Forking The Project
git clone https://github.com/Halimo09/TeamavailTest
cd TeamavailTest
```
### 2. Configuration Files

Dockerfile - For building the application image

docker-compose.yml - For service orchestration

.gitignore - To exclude unnecessary files from version control

.dockerignore - To optimize Docker builds

.eslintrc.cjs - For JavaScript linting configuration

ci.sh - The main CI/CD pipeline script

### 3. Testing Implementation
#### Server-Side Testing Implementation

Created test/server.test.js with endpoint validation

Implemented proper cleanup after tests

Added server shutdown handling

#### Client-Side Testing Implementation
Created client-side tests:

Set up JSDOM environment for browser simulation

Added DOM manipulation tests

Implemented component isolation

### 4. Dependency Installation
```bash
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier supertest jest
```

### 5. Pipeline Execution
```bash
chmod +x ci.sh
./ci.sh
```
## Project Structure
```text
TeamavailTest/
├── input/                   # JSON data files
│   ├── names.json           # Employee names
│   ├── selection.json       # Week selections
│   └── status.json          # Availability statuses
├── public/                  # Frontend files
│   ├── index.html           # Main HTML file
│   ├── script.js            # Client-side JavaScript
│   └── styles.css           # CSS styles
├── test/                    # Test files
│   ├── scripts.test.js      # Client-side tests
│   └── server.test.js       # Server-side tests
├── output/                  # Persisted data (auto-created)
├── docker-compose.yml       # Docker Compose configuration
├── Dockerfile               # Docker build instructions
├── ci.sh                    # CI/CD pipeline script
├── package.json             # Node.js dependencies
├── .eslintrc.cjs            # ESLint configuration
├── .gitignore               # Git ignore rules
├── .dockerignore            # Docker ignore rules
└── server.js                # Backend server
```
## Key Components
### CI/CD Pipeline Stages:
Dependency Installation: Installs required Node.js packages

Code Linting: Checks code quality with ESLint

Testing: Server-side endpoint tests - Client-side functionality tests

Container Management: Stops existing Docker containers

Build & Deployment: Builds Docker image and starts application

Verification: Confirms successful deployment

### Testing Strategy
#### Server Tests:

1- Endpoint validation

2- History saving functionality

3- Proper cleanup

#### Client Tests:

1- DOM manipulation

2- UI component rendering

3- Event handling

#### Docker Implementation:
Lightweight Image: Uses Node.js 18 Alpine base image

Persistent Storage: Maps input/output directories as volumes

Port Management: Exposes application on port 3000

Docker Compose: Simplifies service management



#### Accessing the Application
After running the pipeline, access the application at:
http://localhost:3000

#### For Maintenance
```bash
# Stop containers
docker-compose down

# Remove Docker images
docker rmi availability-tracker

# Full cleanup
docker system prune -f
```