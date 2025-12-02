#!/bin/bash

echo "Testing Fitvora Backend API..."

# Wait a moment for server to fully start
sleep 3

echo "1. Testing server health..."
curl -s http://localhost:3001/ || echo "Server not responding on port 3001"

echo ""
echo "2. Testing registration endpoint..."
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "testuser@example.com", "password": "TestPassword123"}' \
  -s || echo "Registration endpoint failed"

echo ""
echo "3. Testing login endpoint..."
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "testuser@example.com", "password": "TestPassword123"}' \
  -s || echo "Login endpoint failed"

echo ""
echo "Backend API test completed."