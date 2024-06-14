# Task-Management#

This is a RESTful API for a task management application built with Node.js and MongoDB. The API allows users to register, log in, manage their tasks, and update their profiles. Each task can belong to different projects, and users can perform CRUD operations on tasks and projects.

## Getting Started

Follow these steps to set up and run the project.

### Prerequisites

Ensure you have the following installed on your system:

- Node.js
- MongoDB

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shreyad10/Task-Management.git
   cd Task-Management
   ```


2. **Install dependencies:**
   npm install


3. **Set up environment variables:**
   Create a .env file in the root directory and add the following:
   PORT
   DB_URI
   DB_NAME
   JWT_SECRET


4. **Running the Server**
   Start the server by running:
   command - npm start


5. **API Endpoints**

Authentication:
1.Register a new user:
POST /users/register

2.Log in a user:
POST /users/login

## All User, projects, tasks are protected by authorisation header: 
(Need to pass token in each route)
   x-auth-token 


## User Profile:  
1.Get the authenticated user's profile:
GET /users/me

2.Update the authenticated user's profile
PUT /users/me

## Project Management: 
1.Create a new project:
POST /projects

2.Retrieve all projects for the authenticated user:
GET /projects

3.Retrieve a single project by its ID:
GET /projects/:id

4.Update a project by its ID:
PUT /projects/:id

5.Delete a project by its ID:
DELETE /projects/:id

## Task Management:
1.Create a new task:
POST /tasks

2.Retrieve all tasks for the authenticated user:
GET /tasks

3.Retrieve a single task by its ID:
GET /tasks/:id

4.Update a task by its ID:
PUT /tasks/:id

5.Delete a task by its ID:
DELETE /tasks/:id

6.Retrieve all tasks for a specific project:
GET /projects/:projectId/tasks

## Data Validation ##
All required fields are validated using express-validator.
Error messages are returned with appropriate status codes (e.g., 400 for validation errors, 404 for not found, 500 for server errors).
