import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";

export const borrowRouter = express.Router();

borrowRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    // Validate ObjectId
    if (!mongoose.isValidObjectId(bookId)) {
      res
        .status(400)
        .json({ success: false, message: "Invalid book ID", data: null });
      return;
    }

    // querying for book
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

    // check the quantity available or not
    if (book.copies < quantity) {
      res.status(400).json({
        success: false,
        messagre: "Not enough copies available",
        data: null,
      });
      return;
    }

    // adjust quantity
    book.copies -= quantity;
    await book.save();

    // update availability
    await Book.updateAvailability(book._id.toString());

    // save borrow record
    const borrow = await Borrow.create({ book: book._id, quantity, dueDate });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: (err as Error).message });
  }
});

borrowRouter.get("/", async (req: Request, res: Response) => {
  const result = await Borrow.aggregate([
    {
      $group: {
        _id: "$book",
        totalQuantity: { $sum: "$quantity" },
      },
    },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "bookInfo",
      },
    },
    {
      $unwind: "$bookInfo",
    },
    {
      $project: {
        _id: 0,
        book: {
          title: "$bookInfo.title",
          isbn: "$bookInfo.isbn",
        },
        totalQuantity: 1,
      },
    },
  ]);

  res.status(200).json({
    success: true,
    message: "Borrowed books summary retrieved successfully",
    data: result,
  });
});
