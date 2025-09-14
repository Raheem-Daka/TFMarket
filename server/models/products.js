import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        image: { type: String },
        title: { type: String, required: true },
        description: { type: String, default: "" },
        category: { type: String, required: true },
        price: { type: Number, required: true },
        salePrice: { type: Number, default: 0 },
        totalStock: { type: Number, default: 0 },
    }, 
    {timestamps: true})

export default mongoose.model("Product", ProductSchema);