import mongoose,{Schema} from "mongoose";

const ProductSchema = new Schema(
  {
    id:{
        type:Number,
        required:true,
    },
    documentId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    description: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    color: { type: String, enum: ["red", "blue"], default: "red" },
    size: {
      type: String,
      enum: ["extraSmall", "small", "medium", "large", "extarLarge"],
      default: "medium",
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    brand: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    productUrl: [{ type: String, required: true }], // Array of images
    new: {
      type: Boolean,
      default: false,
    },
    review: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product',ProductSchema)
