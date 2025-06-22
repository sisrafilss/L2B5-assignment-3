import { model, Schema } from "mongoose";
import { IBook, IBookStaticMethod } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook, IBookStaticMethod>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
        message: "Genre is invalid. Got {VALUE}",
      },
    },
    isbn: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "ISBN should be unique."],
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies can not be negative"],
      validate: {
        validator: Number.isInteger,
        message: "Copies must be an integer",
      },
    },
    available: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// static instance method
bookSchema.static("updateAvailability", async function (bookId: string) {
  const book = await Book.findById(bookId);
  if (book) {
    book.available = book.copies > 0;
    await book.save();
  }
});

// pre middleware
bookSchema.post("findOneAndUpdate", async function (doc) {
  console.log("from inside pre save middleware:", doc);
});

export const Book = model<IBook, IBookStaticMethod>("Book", bookSchema);
