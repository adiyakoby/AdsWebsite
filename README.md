<h1>Ad Management System</h1>
<p>Email: adija@edu.hac.ac.il</p>
<p>Exercise is being submitted late because of reserve duty.</p>

# Ad Management System

The Ad Management System is a web application designed to manage advertisements. It allows users to create new ads, delete their own ads, and search for ads on the home page. The system also provides features for administrators to manage ads, including approving or rejecting them.
## Features

- **User Authentication:** Users can sign in to the system to access their account and manage ads.

- **Create ads:**  Users can create new advertisements with details such as title, description, price, contact information, etc.
- **Delete Ads:** Users can delete their own ads from the system.
- **Search Functionality:** Any user / not registered user can search for ads on the home page by title using keywords.
- **Approval system:** Ads created by users are initially marked as pending and require approval from administrators.
- **Admin dashboard:** Administrators have access to an admin dashboard where they can view pending ads, approve or delete them.
- **Error handling:** The system provides informative error messages and a user-friendly error page in case of any issues.

## Installation

To run the Ad Management System locally, follow these steps:

1. Clone the repository to your local machine.
2. Install the necessary dependencies using `npm install`.
3. Start the application server using `npm start`.

## Usage

1. Navigate to the homepage of the application.
2. Sign in to your account or create a new one if you don't have an account yet.
3. Once logged in, you can create new ads, delete your own ads.
4. Administrators have additional options to manage ads, such as approving or rejecting them.
5. Users can also search for ads using the search functionality provided.

## API Functionality

The Ad Management System provides a RESTful API for interacting with ads and user data. The API endpoints allow for creating, retrieving, updating, and deleting ads, as well as managing user accounts.

## Endpoints

1. **GET /approvedAds**: Retrieves a list of approved ads.
2. **GET /approvedAds/:string**: Searches for specific ads based on a search string.
3. **POST /postAd**: Allows users to post a new ad. Requires user authentication.
4. **GET /userAds**: Retrieves ads posted by the authenticated user. Requires user authentication.
5. **GET /allAds**: Retrieves all ads. Accessible only by administrators.
6. **GET /pendingAds**: Retrieves pending ads. Accessible only by administrators.
7. **PUT /ads/:id**: Approves an ad. Accessible only by administrators.
8. **DELETE /ads/:id**: Deletes an ad. Accessible only by authenticated users.


### Authentication

Authentication is required for certain API endpoints, such as creating, updating, or deleting ads. Users must sign in to access these endpoints.
### Database with Sequelize

The Ad Management System uses Sequelize, an ORM for Node.js, to interact with the database. Sequelize provides an easy-to-use interface for defining models, performing CRUD operations, and managing database migrations.

#### Models

The application defines two main models using Sequelize:

1. **User**: Represents a user account in the system. It stores information such as username, password hash, and access level (admin or regular user).
2. **Ad**: Represents an advertisement created by a user. It stores details such as title, description, price, contact information, and approval status.

#### Database Migration

Sequelize provides support for database migrations, allowing for easy management of database schema changes over time. Migrations are used to create and modify tables, indexes, and constraints in the database.
