# Jest Bookstore API Automation Framework

## Project Overview

This is a comprehensive API automation testing framework built with **Jest** and **Axios** for testing a FastAPI Bookstore application. The framework provides end-to-end API testing capabilities with robust validations, reporting, and multi-environment support.

## Key Features
- RESTful API testing for Bookstore operations
- JSON Schema validation using AJV
- Multi-environment configuration (Dev/QA)
- HTML and JUnit reporting
- Authentication & Authorization testing
- CRUD operations validation
- Random test data generation
- Comprehensive error handling

## Steps to Execute
- Clone the repository
- Install dependencies: npm install
- Set the environment in .env (e.g.): qa/dev(defaults to qa)
- npm run test in cmd or can directly run through a test(script>>test) in package.json

## Framework Architecture

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Test Layer    │    │  Service Layer  │    │   API Layer     │
│                 │    │                 │    │                 │
│ *.test.js files │───▶│ CrudServices    │───▶│ apiClient.js    │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Schema Layer   │    │  Config Layer   │    │  Utils Layer    │
│                 │    │                 │    │                 │
│ JSON Schemas    │    │ Environment     │    │ Random Data     │
│ Validations     │    │ Endpoints       │    │ Common Utils    │
└─────────────────┘    └─────────────────┘    └─────────────────┘

## Project Structure

Jest_Bookstore_API/
├── __tests__/
│   └── bookManagement.test.js          # Main test file with all API tests
├── config/
│   ├── endPoints.js                    # API endpoint configurations
│   └── envConfig.js                    # Environment configuration loader
├── html-report/                        # Generated HTML test reports
│   └── report.html
├── reports/                            # Test execution reports
│   └── html-report/
├── schemas/                            # JSON schema definitions
│   ├── bookSchema.js                   # Book API response schemas
│   └── userSchema.js                   # User API response schemas
├── utils/                              # Utility modules
│   ├── apiClient.js                    # Axios HTTP client configuration
│   ├── common.js                       # Common utility functions
│   ├── crudServices.js                 # CRUD operation services
│   └── randomDataSeeder.js             # Test data generation
├── book.env.dev                        # Development environment variables
├── book.env.qa                         # QA environment variables
├── jest.config.js                      # Jest configuration
├── junit.xml                           # JUnit XML report
└── package.json                        # Node.js dependencies and scripts

##  Prerequisites

- Node.js 16+
- npm 7+
- Git
- Any IDE (e.g., VS Code, IntelliJ IDEA, WebStorm)
- Book API running locally (follow the FastAPI project’s README first)

##  Installation & Setup

### 1. Clone the Repository
```powershell/cmd 
git clone <repository-url>
cd Jest_Bookstore_API
```

### 2. Install Dependencies
```powershell/cmd
npm install
```

### 3. Verify Installation
```powershell/cmd
npm list
```

## Configuration

### Environment Files
The framework supports multiple environments through environment files:

**Development Environment** (`book.env.dev`):
```env
URL=http://127.0.0.1:8001/
EMAIL=devuser@example.com
PASSWORD=dev123
```
**QA Environment** (`book.env.qa`):
```env
URL=http://127.0.0.1:8000/
EMAIL=qauser@example.com
PASSWORD=qa123
```
### Set Environment
```powershell/cmd

# For QA environment (default)
$env:ENV = "qa"

# For Development environment
$env:ENV = "dev"
```

## Execution Steps

### 1. Start the FastAPI Bookstore Application
Ensure your FastAPI application is running on the configured port (8000 for QA, 8001 for Dev).

### 2. Run All Tests
```powershell
npm test
```
### 3. Run Tests with Coverage
```powershell
npm run coverage
```
### 4. Run Tests for CI/CD
```powershell
npm run test:ci
```
### 5. Environment-Specific Execution
```powershell
# QA Environment
$env:ENV = "qa"; npm test

# Dev Environment  
$env:ENV = "dev"; npm test
```

## Validations & Schema

### Test Coverage
The framework validates the following API operations:

1. **Health Check** - System status verification
2. **User Authentication**:
   - User signup
   - User login
   - Token validation
3. **Book Management**:
   - Create new book
   - Retrieve all books
   - Retrieve book by ID
   - Update book details
   - Delete book

### Schema Validation
JSON Schema validation is implemented using **AJV** library:

**Book Schema Example**:
javascript
const createBookSchema = {
  type: "object",
  properties: {
    id: {type: "number"},
    name: { type: "string" },
    author: { type: "string" },
    published_year: { type: "number" },
    book_summary: { type: "string" }
  },
  required: ["name", "author", "published_year", "book_summary"]
};

### Validation Types
- **Status Code Validation** - HTTP response codes
- **Schema Validation** - JSON structure validation
- **Content-Type Validation** - Response headers
- **Business Logic Validation** - Data integrity checks
- **Authentication Validation** - Token-based security

## Reports

### HTML Report
Generated automatically after test execution:
- **Location**: `html-report/report.html`
- **Features**: 
  - Test execution summary
  - Pass/Fail status
  - Execution time
  - Detailed test results
  - Error stack traces

### JUnit Report
XML format for CI/CD integration:
- **Location**: `junit.xml`
- **Usage**: Jenkins, GitHub Actions

### Sample Report Structure
```
Test Results Summary
├── Total Tests: 10
├── Passed: 7
├── Failed: 3
├── Execution Time: 2.35s
└── Coverage: 85%
```

## Implementation Details

### API Client Configuration
The [`apiClient.js`](utils/apiClient.js) uses Axios with:
- Base URL from environment configuration
- 10-second timeout
- JSON content-type headers
- Authorization token interceptor
- Status validation for all responses

### CRUD Services
The [`crudServices.js`](utils/crudServices.js) provides abstracted methods:
- `create()` - POST operations
- `read()` - GET operations  
- `update()` - PUT operations
- `delete()` - DELETE operations

### Test Data Generation
The [`randomDataSeeder.js`](utils/randomDataSeeder.js) generates:
- Random user credentials
- Dynamic book data
- Unique identifiers
- Test-specific payloads

### Error Handling
- HTTP error status handling
- Schema validation errors
- Authentication failures
- Environment configuration errors

## Test Execution Flow

1. **Setup Phase**: Load environment configuration and generate test data
2. **Health Check**: Verify API availability
3. **Authentication**: Create user and obtain access token
4. **CRUD Operations**: Execute book management operations
5. **Validation**: Verify responses against schemas
6. **Cleanup**: Remove test data (if applicable)
7. **Reporting**: Generate HTML and XML reports

##  Troubleshooting

### Common Issues

**Environment Variables Not Found**:
- Creating a book with an existing ID results in a 500 Internal Server Error.

- API should ideally respond with 409 Conflict to indicate duplication.

- Login with incorrect credentials returns 400 Bad Request instead of 401 Unauthorized.

- Workaround: manually craft invalid JSON strings in tests (bypassing schema/POJOs).

## Future Enhancements
- [ ] Allure reporting integration
- [ ] Parallel test execution
- [ ] API mocking for isolated testing
- [ ] Docker containerization

## Contributing
1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

---
