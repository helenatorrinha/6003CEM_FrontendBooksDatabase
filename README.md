# 6003CEM Frontend
# Frontend SPA for Managing Books Database

This frontend application provides a user-friendly interface for interacting with the backend API, allowing users to perform CRUD operations for books, authors, genres, reviews, and users.

## Features
Books: Get, add, update, and delete book entries (which contain information such as title, author, genre, publication date, description, ISBN, and image).
Authors: Manage authors by adding, updating, and deleting their details (which includes the id, first name, last name, description and avatar image).
Genres: Categorize books by defining, updating, and deleting genres (which contains information about the id, name and description).
Reviews: Provide and manage reviews for books, with options for creation, retrieval, updating, and deletion (which contains information about the book ID, user ID, message, creation, and modification timestamps).
Users: Manage user profiles and permissions. Regular users can perform basic CRUD operations on their profiles and access book information, while administrators have additional authorization to manage users, books, genres, authors, and reviews.

## Running the Application
To run the frontend SPA, follow these steps:

### Install Dependencies: 
Run npm install to install all necessary dependencies.

### Start the Application: 
Run nodemon . on the back end api project.
Run npm start to start the server. The application will be accessible in the web browser at https://squaremember-decimalvalid-3000.codio-box.uk

## Users and passwords
All the users passwords in the database are: hashed_password
Admin account: alice123
Example user account: bob456
