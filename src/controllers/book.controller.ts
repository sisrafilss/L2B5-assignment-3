import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

export const bookRouter = express.Router();

bookRouter.post("/create-book", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const book = await Book.create(body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({
      message: error.message,
      success: false,
      error,
    });
  }
});

bookRouter.get("/", async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = 10,
    } = req.query;

    const query: Record<string, any> = {};
    if (filter) {
      query.genre = filter;
    }

    const sortOrder = sort === "asc" ? 1 : -1;

    const books = await Book.find(query)
      .sort({ [String(sortBy)]: sortOrder })
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({
      message: error.message,
      success: false,
      error,
    });
  }
});

bookRouter.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    console.log("ERROR", error);

    res.status(400).json({
      message: error.message,
      success: false,
      error,
    });
  }
});

bookRouter.patch("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId: string = req.params.bookId;
    const updatedBody = req.body;

    const book = await Book.findOneAndUpdate({ _id: bookId }, updatedBody, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error: any) {
    console.log("ERROR", error);

    res.status(400).json({
      message: error.message,
      success: false,
      error,
    });
  }
});

bookRouter.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId: string = req.params.bookId;

    await Book.findOneAndDelete({ _id: bookId });
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error: any) {
    console.log("ERROR", error);

    res.status(400).json({
      message: error.message,
      success: false,
      error,
    });
  }
});
