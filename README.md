[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/KnqVbps7)
<h1>Adi yakoby</h1>
<p>Email: adija@edu.hac.ac.il</p>
<p>Exercise is being submitted late because of reserve duty.</p>

# Ad Management System

The Ad Management System is a web application designed to manage advertisements. It allows users to create, approve, delete, and search for ads. The system provides features for administrators to manage ads.

## Features

- **Admin authentication:** Only administrators can sign in to the system.
- **Create ads:** Regular users can create new advertisements with details such as title, description, price, contact information, etc.
- **Approval system:** Ads created by users are initially marked as pending and require approval from administrators.
- **Admin dashboard:** Administrators have access to an admin dashboard where they can view pending ads, approve or delete them.
- **Search functionality:** Users can search for ads by title.
- **Error handling:** The system provides informative error messages and a user-friendly error page in case of any issues.

## Installation

To run the Ad Management System locally, follow these steps:

1. Clone the repository to your local machine.
2. Install the necessary dependencies using npm i .
3. Start the application server using npm start.

## Usage

1. Navigate to the homepage of the application.
2. Sign in as an administrator using the provided credentials.
3. Once logged in, you can view pending ads, approve or reject them.
4. Regular users can access the system to create new ads, which will be pending approval by administrators.
5. Users can also search for ads using the search functionality provided.

## API Functionality

The Ad Management System provides a RESTful API for interacting with ads and user data. The API endpoints allow for creating, retrieving, updating, and deleting ads, as well as managing user accounts.

### Endpoints

- **GET /api/ads**: Retrieve a list of all ads.
- **GET /api/ads/:id**: Retrieve details of a specific ad by ID.
- **POST /api/ads**: Create a new ad.
- **PUT /api/ads/:id**: Update (approve)an existing ad.
- **DELETE /api/ads/:id**: Delete an ad.


### Authentication

Authentication is required for certain API endpoints, such as creating, updating, or deleting ads. Administrators have access to all endpoints, while regular users can only access endpoints for creating and retrieving ads.

### Database with Sequelize

The Ad Management System uses Sequelize, an ORM for Node.js, to interact with the database. Sequelize provides an easy-to-use interface for defining models, performing CRUD operations, and managing database migrations.

#### Models

The application defines two main models using Sequelize:

1. **User**: Represents a user account in the system. It stores information such as username, password hash, and access level (admin or regular user).
2. **Ad**: Represents an advertisement created by a user. It stores details such as title, description, price, contact information, and approval status.

#### Database Migration

Sequelize provides support for database migrations, allowing for easy management of database schema changes over time. Migrations are used to create and modify tables, indexes, and constraints in the database.


