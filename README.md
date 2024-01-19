# Project: User Profile Management

## Overview
This project focuses on implementing a user profile management system with features like user login, profile updates, and admin functionalities. The application is built using a combination of frontend technologies (HTML, CSS, JavaScript) and a backend server (Node.js and Express). It utilizes Cloudinary for image storage and retrieval.

## Prerequisites
- Node.js and npm installed on your machine.

## Getting Started

## Installation

1. Clone the repository:

```bash
git clone https://github.com/sainRaghuveer/web-yapper-admin-user.git
```
2. Install all dependencies in both directories client and server

```bash
cd backend 
npm install

cd frontend 
npm install
```

3. Set up the backend:

 - Rename the .env.example file to .env.
 - Configure the environment variables in the .env file, including the database connection details and any other necessary configurations.

4. Set up the frontend:


 - Update the base_url with the appropriate URL for your backend server.
 - Start the application:

- Start the backend server:

```bash
npm run server

```
- Start the frontend development server:

```bash
use live server

```

# Default Admin Credentials:
```bash
UserID: 1234
Password: 12345
```

# Default User Credentials:
```bash
UserID: 3456
Password: 12345
```

Note:
- Before doing anything first create `.env` file and put `port` , `mongoURl`.> 
- `port` is for listening the server.>
- `mongoURl` is for running database and store your data in database so put your mongo link.>

The application will be accessible at local server.

## Folder Structure
 - /backend: Contains the server-side code.

## Endpoints

<table>
    <thead>
        <tr>
            <th>METHOD</th>
            <th>ENDPOINT</th>
            <th>DESCRIPTION</th>
            <th>STATUS CODE</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>POST</td>
            <td>/login</td>
            <td>This endpoint should allow users to login.</td>
            <td>200</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>/signup</td>
            <td>This endpoint should allow admin to register.</td>
            <td>200</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>/api/admin/createUser</td>
            <td>This endpoint should allow Admin to create new user.</td>
            <td>200</td>
        </tr>
        <tr>
            <td>PATCH</td>
            <td>/api/admin/manage</td>
            <td>This endpoint should allow Admin to post new updates.</td>
            <td>200</td>
        </tr>
        <>
            <td>POST</td>
            <td>/user/update</td>
            <td>This endpoint should allow users to update photo and name.</td>
            <td>200</td>
        <tr>
            <td>POST</td>
            <td>/api/admin/getUsers</td>
            <td>This endpoint should allow admin to fetch users data.</td>
            <td>200</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/singleUser/:id</td>
            <td>This endpoint should allow get single user data.</td>
            <td>200</td>
        </tr>
    </tbody>
</table>

<br>

<a href="https://we-yapper-backend.onrender.com/">Backend deployed link</a>

<br>

 - frontend: Contains the client-side code.

<br>

<a href="https://65aab5784806470e2e97c2ab--aesthetic-cobbler-5973f3.netlify.app/">Frontend deployed link</a>

## Technologies Used
 - Frontend: HTML, CSS, JavaScript, bootstrap
 - Backend: Node.js, Express
 - Database: MongoDB



