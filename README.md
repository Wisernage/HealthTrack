### Part 1: Overview, Features, and Technologies Used

# Healthcare Management System

## Table of Contents

1. Overview
2. Features
3. Technologies Used
4. Project Structure
5. Installation
   - Prerequisites
   - Database Setup
   - Backend Setup
   - Frontend Setup
6. Usage
7. Contributing
8. Contact
9. Quick Reference
10. Notes

## Overview

The Healthcare Management System is a comprehensive web application designed to streamline interactions between patients and healthcare providers. It facilitates user registration, profile management, appointment scheduling, messaging, treatment tracking, and blood test management. The system leverages modern technologies like React for the frontend, Node.js with Express for the backend, and Docker for containerization, ensuring a scalable and maintainable architecture.

## Features

- **User Authentication**: Secure registration and login for users and administrators using JWT.
- **Profile Management**: Users and doctors can create and update their profiles.
- **Appointment Scheduling**: Users can book appointments with doctors, and doctors can manage their schedules.
- **Messaging System**: Real-time messaging between patients and doctors.
- **Treatment Tracking**: Doctors can assign treatments to patients, and users can view their treatment history.
- **Blood Test Management**: Users can submit blood test results, and doctors can view and analyze them.
- **Admin Dashboard**: Administrators can manage users, doctors, and oversee the system's operations.
- **Responsive Design**: Built with React and Bootstrap to ensure compatibility across devices.

## Technologies Used

### Frontend

- **React**: Frontend library for building user interfaces.
- **Bootstrap**: CSS framework for responsive design.
- **Webpack**: Module bundler for managing assets and dependencies.
- **ESLint & Prettier**: Tools for maintaining code quality and consistency.
- **React Router**: For client-side routing.
- **Axios**: For handling HTTP requests.
- **PropTypes**: For type-checking of props.
- **React Bootstrap**: UI components for React.

### Backend

- **Node.js & Express**: Backend runtime and framework.
- **MySQL**: Relational database for data storage.
- **jsonwebtoken (JWT)**: For secure authentication.
- **Docker**: Containerization of the backend services.
- **mysql2**: MySQL client for Node.js.
- **dotenv**: For managing environment variables.
- **CORS**: To enable Cross-Origin Resource Sharing.
- **ESLint**: For maintaining code quality.

### Additional Services

- **RxJS**: For handling asynchronous data streams in frontend API calls.
- **RapidAPI Services**:
  - Geocoding: Forward-Reverse Geocoding API.
  - Fitness Calculator: BMI calculation API.
  - Distance Calculation: Driving distance API.

### Part 2: Project Structure, Installation, and Usage

## Project Structure

```
├── frontend
│   ├── package.json
│   ├── webpack.config.js
│   ├── src
│   │   ├── components
│   │   │   ├── Bloodtests
│   │   │   │   └── Bloodtests.js
│   │   │   ├── ... (other components)
│   │   ├── contexts
│   │   │   └── auth.js
│   │   ├── hooks
│   │   │   └── useApp.js
│   │   ├── utils
│   │   │   └── api.js
│   │   ├── index.js
│   │   ├── App.js
│   │   └── index.css
│   └── public
│       └── index.html
├── backend
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── package.json
│   ├── server.js
│   ├── config
│   │   └── mysql.config.js
│   ├── controller
│   │   ├── bloodtest.js
│   │   ├── doctors.js
│   │   └── ... (other controllers)
│   ├── routes.js
│   └── queries
│       └── queries.js
├── database
│   └── hy359.sql
└── README.md
```

## Installation

### Prerequisites

- **Node.js & npm**: Ensure you have Node.js and npm installed. [Download Node.js](https://nodejs.org/)
- **Docker**: Required for backend containerization. [Download Docker](https://www.docker.com/)
- **Git**: Version control system. [Download Git](https://git-scm.com/)
- **MySQL**: For local database setup (if not using Docker-managed MySQL).

### Database Setup

#### Using Docker-Managed MySQL

The backend is configured to use a MySQL database via Docker. Ensure Docker is installed and running.

#### Manual MySQL Setup (Optional)

If you prefer to set up MySQL manually:

1. **Install MySQL**: [Download MySQL](https://dev.mysql.com/downloads/)
2. **Create Database and Tables**:
   - Import the provided `hy359.sql` file located in the `database` directory.
   ```sh
   mysql -u your_username -p your_database_name < database/hy359.sql
   ```
3. **Configure Environment Variables**:
   - Update the `.env` file with your MySQL credentials.

### Backend Setup

1. **Navigate to the Backend Directory**:
   ```sh
   cd backend
   ```
2. **Create Environment Variables**:
   - Create a `.env` file in the backend directory with the following variables:
   ```
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=hy359
   DB_CONNECTION_LIMIT=10
   SERVER_PORT=3000
   JWT_SECRET=your_jwt_secret
   ```
   - Note: Replace the placeholder values with your actual database credentials and desired configurations.
3. **Build and Run the Backend Containers**:
   ```sh
   docker-compose up --build
   ```
   - This command builds the Docker images and starts the backend services.
   - The backend runs on `http://localhost:3000` by default.

### Docker Compose Configuration

Ensure your `docker-compose.yml` includes the MySQL service and links it appropriately. An example configuration:

```yaml
version: '3.8'
services:
  backend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=mysql
      - DB_USER=your_db_user
      - DB_PASSWORD=your_db_password
      - DB_NAME=hy359
      - DB_CONNECTION_LIMIT=10
      - SERVER_PORT=3000
      - JWT_SECRET=your_jwt_secret
    depends_on:
      - mysql
  mysql:
    image: mysql:8.0
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: your_root_password
      MYSQL_DATABASE: hy359
      MYSQL_USER: your_db_user
      MYSQL_PASSWORD: your_db_password
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql
volumes:
  db_data:
```

### Frontend Setup

1. **Navigate to the Frontend Directory**:
   ```sh
   cd frontend
   ```
2. **Install Dependencies**:
   ```sh
   npm install
   ```
3. **Configure Environment Variables (If Applicable)**:
   - If your frontend requires environment variables (e.g., API endpoints), create a `.env` file in the frontend directory.
   ```
   REACT_APP_API_BASE_URL=http://localhost:3000
   ```
4. **Run the Frontend Application**:
   ```sh
   npm run start
   ```
   - Note: Ensure that `node_modules` are installed before running the application.
   - The frontend runs on `http://localhost:8080` by default.

## Usage

- **Access the Application**:
  - Open your browser and navigate to `http://localhost:8080` to access the frontend.

- **Register as a User or Doctor**:
  - Navigate to the registration page to create a new account.
  - Fill in the required details and submit the form.

- **Login**:
  - Use your credentials to log in.
  - Admins can log in through the admin login page.

- **Manage Appointments**:
  - Users can book appointments with available doctors.
  - Doctors can view and manage their appointment schedules.

- **Messaging**:
  - Engage in real-time messaging with doctors or patients.

- **Track Treatments and Blood Tests**:
  - Doctors can assign treatments and view patient blood test results.
  - Users can view their treatment history and submit blood test results.

- **Admin Dashboard**:
  - Administrators can manage users, doctors, and oversee system operations.

### Part 3: Contributing, Contact, Quick Reference, and Notes

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**

2. **Create a Feature Branch**:
   ```sh
   git checkout -b feature/YourFeature
   ```

3. **Commit Your Changes**:
   ```sh
   git commit -m "Add YourFeature"
   ```

4. **Push to the Branch**:
   ```sh
   git push origin feature/YourFeature
   ```

5. **Open a Pull Request**

Please ensure that your code adheres to the project's coding standards and passes all linting checks.

## Contact

For any questions, issues, or contributions, please reach out:

- **Email**: csd3933@csd.uoc.gr

## Quick Reference

- **Start Frontend**:
  ```sh
  cd frontend
  npm install
  npm run start
  ```

- **Start Backend**:
  ```sh
  cd backend
  docker-compose up --build
  ```

- **Frontend Build Commands**:
  - **Development**: `webpack serve --open`
  - **Production**: `npm run build` (to be defined)

- **Backend Dependencies**:
  - Express, MySQL, JWT, CORS, dotenv, etc.

- **Frontend Dependencies**:
  - React, Bootstrap, Webpack, Babel, ESLint, Prettier, etc.

## Notes

- **Environment Variables**:
  - Ensure that environment variables for the backend (like database credentials and JWT secrets) are properly configured using `.env` files or Docker secrets.

- **Custom Webpack Setup**:
  - The project avoids using `npx create-react-app` to minimize dependencies, offering a custom Webpack setup.

- **Code Quality**:
  - ESLint and Prettier are configured for code quality and consistency.

- **Dockerization**:
  - The backend is fully containerized using Docker, facilitating easy deployment and scalability.

- **Feature Implementation**:
  - Most admin functionalities are operational.
  - User and doctor profiles, appointment management, messaging, and blood test submissions are fully implemented.
  - Some features like treatment visualization and appointment reminders are pending due to time constraints.

- **Bug Handling**:
  - Certain components, such as the new treatment feature, are present but may have unresolved bugs and are not fully functional.

- **Localization**:
  - Parts of the project documentation and comments are in Greek, reflecting the development context.

- **Database Configuration**:
  - The backend uses a MySQL database with connection pooling for efficient resource management. Queries are organized in a separate module for maintainability.

- **Authentication**:
  - JWT is used for securing API endpoints. Middleware is implemented to verify tokens and manage user roles (e.g., admin, doctor, user).

- **API Endpoints**:
  - The backend exposes various endpoints for managing users, doctors, appointments, blood tests, treatments, and messaging. Protected routes ensure that only authorized users can access sensitive operations.

- **Frontend Components**:
  - The React frontend is structured with reusable components, context for authentication state management, and hooks for handling application logic. Forms are validated, and user feedback is provided through alerts and messages.

- **API Keys**:
  - API keys used for third-party services (e.g., RapidAPI) should be secured and managed via environment variables. Do not expose actual API keys in the codebase.

- **Security Considerations**:
  - Passwords should be hashed before storage (e.g., using bcrypt).
  - Implement proper validation and sanitization to prevent SQL injection and other vulnerabilities.
  - Use HTTPS in production environments to secure data transmission.

Developed with ❤️ by Dimitris
