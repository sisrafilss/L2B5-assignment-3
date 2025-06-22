# Library Management System | L2B5 Assignemnt 3

Live link of this Library Management System is [https://library-management-lilac-five.vercel.app/](https://library-management-lilac-five.vercel.app/). A user can add some book, update, delete, query a book using various fields. This app also track the borrow statistic, for example, how many copy of the book is given borrw to someone.

Some API endpoint of this application is explain below -

## api/books

### 1. Create book | api/books:

Hit a POST request to `api/books` by adding the book data into the body as JSON data, the application will store the book data into a collection named books.

#### Example Request

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

### Example Response

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

## 2. GET All books | api/books

Hit a GET request to this endpoint and it return the whold book collection. It send 10 data by default. But we can also filter the result using filter, limit, sort. Example Query: `/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`

### Example Response

```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "_id": "64f123abc4567890def12345",
      "title": "The Theory of Everything",
      "author": "Stephen Hawking",
      "genre": "SCIENCE",
      "isbn": "9780553380163",
      "description": "An overview of cosmology and black holes.",
      "copies": 5,
      "available": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    }
  ]
}
```

## 3. GET a Single Book Info | api/books/bookId:

Hit a GET request to `/api/books/bookId`, and it will return that book detail.

### Example Response

```json
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

## 4. Update a book api/books/bookId:

Hit a PUT request `/api/books/:bookId` and updated data in the body. It will update the specific field of the data.
Example Request:

```json
{
  "copies": 50
}
```

### Example Response

```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 50,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-20T08:30:00.000Z"
  }
}
```

## 5. Delete a book | api/books/bookId:

Hit a DELETE request to `/api/books/:bookId`, and the book belongs to that id will be deleted.

### Response Example

```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```

## api/borrow

## 1. Borrow a Book | api/borrow:

Hit a post request to `api/borrow` including the borrow data in the body, it will add a borrow record in the borrow collection.

### Request

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

### Response

```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "_id": "64bc4a0f9e1c2d3f4b5a6789",
    "book": "64ab3f9e2a4b5c6d7e8f9012",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z",
    "createdAt": "2025-06-18T07:12:15.123Z",
    "updatedAt": "2025-06-18T07:12:15.123Z"
  }
}
```

## 2. Get a borrow report:

Hit a GET request to `api/borrow`, it will return a report of total borrowed books.

### Example Response

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
```
