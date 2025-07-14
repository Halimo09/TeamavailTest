#!/bin/bash
set -e

echo "Installing dependencies..."
npm install

echo "Running JavaScript linting..."
if ! npx eslint . --ext .js --fix; then
  echo "ESLint found errors that need manual fixing"
  exit 1
fi
echo "Finished Linting no errors found"

echo "Running tests..."
if ! npm test; then
  echo "Tests failed! Fix issues before proceeding"
  exit 1
fi

echo "Taking down Docker containers..."
docker-compose down

echo "Building and Starting services with Docker Compose..."
docker-compose up --build -d

echo "CI/CD pipeline completed successfully!"
echo "Application running at http://localhost:3000"