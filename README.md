# CRUD API using Express and Mongoose

This project implements a CRUD (Create, Read, Update, Delete) API using Express.js for the server-side framework and Mongoose for interacting with MongoDB. The API provides endpoints to perform CRUD operations on a collection of items related to a restaurant's products.

## Requirements

- Node.js
- MongoDB Atlas account (or local MongoDB installation)

## Installation

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Set up a MongoDB Atlas cluster or ensure you have MongoDB installed locally.
4. Add the MongoDB URL that you get after creation of Database in Atlas(MongoDB) //mongodb+srv://Username:<password>@apicrud.iac5dvj.mongodb.net/{change this to your collection name}?retryWrites=true&w=majority
5. Run the application using `npm start`.

## Usage

### Endpoints

#### View All Items

- **URL:** `/api/items/`
- **Method:** `GET`
- **Description:** Retrieves all items from the database.
- **Response:** JSON array of items.

#### View Item by ID

- **URL:** `/api/items/:id`
- **Method:** `GET`
- **Description:** Retrieves a specific item by its ID.
- **Response:** JSON object of the item.

#### Search Item by Name

- **URL:** `/api/items/searchName/:name`
- **Method:** `GET`
- **Description:** Retrieves an item by searching its name (case-insensitive).
- **Response:** JSON object of the item.

#### Create Item

- **URL:** `/api/items/`
- **Method:** `POST`
- **Description:** Creates a new item.
- **Request Body:** JSON object representing the item to be created.
- **Response:** Success message with the created item.

#### Update Item

- **URL:** `/api/items/:id`
- **Method:** `PUT`
- **Description:** Updates an existing item by its ID.
- **Request Body:** JSON object with fields to be updated.
- **Response:** Success message.

#### Delete Item

- **URL:** `/api/items/:id`
- **Method:** `DELETE`
- **Description:** Deletes an item by its ID.
- **Response:** Success message.

## Configuration

- The application listens on port `3000` by default. You can configure the port using the `PORT` environment variable.

## Notes

- Ensure that the MongoDB connection URL (`URL` variable) is correctly configured in `index.js`.
- This project assumes a MongoDB database named `Restaurant-Products`.
- Data is initially loaded from a JSON file located at `./src/data.json`.
- Error handling is implemented for various scenarios such as database connection failures, missing items, etc.

