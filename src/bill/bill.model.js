import { Schema, model } from "mongoose";

const billingSchema = new Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    taxId: {
      type: String,
      required: true,
    },
    invoiceDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    shoppingCart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    items: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
          },
          quantity: {
            type: Number,
            required: true
          },
          price: { 
            type: Number,
            required: true
          }
        }
      ],
    totalAmount: {
      type: String,
      required: true,
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

export default model("Bill", billingSchema);  
