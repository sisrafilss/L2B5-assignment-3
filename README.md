# Library Management System | L2B5 Assignemnt 3

Live link of this Library Management System is [https://library-management-lilac-five.vercel.app/](https://library-management-lilac-five.vercel.app/). A user can add some book, update, delete, query a book using various fields. This app also track the borrow statistic, for example, how many copy of the book is given borrw to someone.

Some API endpoint of this application is explain below -

## api/books

1. Create book: Hit a POST request by adding the book data into the body as JSON data, the application will store the book data into a collection named books. .

2. GET All books: Hit a GET request to this endpoint and it return the whold book collection. It send 10 data by default. But we can also filter the result using filter, limit, sort. Example Query: `/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`

3. GET a Single Book Info: Hit a GET request to `/api/books/bookId`, and it will return that book detail.

4. Update a book: Hit a PUT request `/api/books/:bookId` and updated data in the body. It will update the specific field of the data.

5. Delete a book: Hit a DELETE request to `/api/books/:bookId`, and the book belongs to that id will be deleted.

## api/borrow

1. Borrow a Book: Hit a post request to `api/borrow` including the borrow data in the body, it will add a borrow record in the borrow collection.

2. Get a borrow report: Hit a GET request to `api/borrow`, it will return a report of total borrowed books.
