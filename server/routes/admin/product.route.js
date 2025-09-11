import express from 'express';
import {
    handleImageUpload,
    addProduct,
    fetchAllProducts,
    editProduct,
    deleteProduct
} from '../../controllers/admin/product.controller.js';
import { upload } from '../../helpers/cloudinary.js';

const router = express.Router();

// Upload image (POST for file upload)
router.post("/upload_image", upload.single("my_file"), handleImageUpload);

// Add product (POST for creating a new product)
router.post("/add", addProduct);

// Fetch all products (GET for retrieving products)
router.get("/get", fetchAllProducts);

// Edit product (PUT for updating a product)
router.put("/edit/:id", editProduct);

// Delete product (DELETE for removing a product)
router.delete("/delete/:id", deleteProduct);

export default router;
