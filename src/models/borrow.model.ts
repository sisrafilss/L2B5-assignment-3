import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [
        1,
        "Number of borrowing can't be zero or negative, Your value {VALUE}",
      ],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is mandatory!"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// an example pre middleware
borrowSchema.pre("save", function (next) {
  console.log(`Borrowing book: ${this.book}, Quantity: ${this.quantity}`);
  next();
});

export const Borrow = model("Borrow", borrowSchema);
