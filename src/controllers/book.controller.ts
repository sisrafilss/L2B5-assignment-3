import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Book } from "../models/book.model";

export const bookRouter = express.Router();

bookRouter.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const book = await Book.create(body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: (error as Error).message,
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

    const query: Record<string, string> = {};
    if (typeof filter === "string") {
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
  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: (error as Error).message,
      success: false,
      error,
    });
  }
});

bookRouter.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;

    // Validate ObjectId
    if (!mongoose.isValidObjectId(bookId)) {
      res
        .status(400)
        .json({ success: false, message: "Invalid book ID", data: null });
      return;
    }

    const book = await Book.findById(bookId);

    // check book availability
    if (!book) {
      res.status(400).json({
        success: false,
        messagre: "Book not found",
        data: null,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    console.log("ERROR", error);

    res.status(400).json({
      message: (error as Error).message,
      success: false,
      error,
    });
  }
});

bookRouter.put("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId: string = req.params.bookId;
    const updatedBody = req.body;

    // Validate ObjectId
    if (!mongoose.isValidObjectId(bookId)) {
      res
        .status(400)
        .json({ success: false, message: "Invalid book ID", data: null });
      return;
    }

    const book = await Book.findOneAndUpdate({ _id: bookId }, updatedBody, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    console.log("ERROR", error);

    res.status(400).json({
      message: (error as Error).message,
      success: false,
      error,
    });
  }
});

bookRouter.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId: string = req.params.bookId;

    // Validate ObjectId
    if (!mongoose.isValidObjectId(bookId)) {
      res
        .status(400)
        .json({ success: false, message: "Invalid book ID", data: null });
      return;
    }

    await Book.findOneAndDelete({ _id: bookId });
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    console.log("ERROR", error);

    res.status(400).json({
      message: (error as Error).message,
      success: false,
      error,
    });
  }
});
