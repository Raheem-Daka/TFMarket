import { imageUploadUtil } from "../../helpers/cloudinary.js";
import Product from "../../models/products.js";

export const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Convert buffer to base64 and build a proper data URI
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;

    // Upload to Cloudinary (pass dataURI, not just b64)
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while uploading",
    });
  }
};

//add new product
export const addProduct =  async (req,res) => {
  try{
    const {
      image,
      title,
      description,
      category,
      price,
      salePrice ,
      totalStock
     } = req.body

     const newCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      price,
      salePrice ,
      totalStock
     });

     await newCreatedProduct.save();
     res.status(201).json({
      success: true,
      data: newCreatedProduct,
     });
  }catch(error){
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Error occured"
    })
  }
}
// fetch product
export const fetchAllProducts =  async (req,res) => {
  try{
    const productList = await Product.find({});
    res.status(201).json({
      success: true,
      data: productList,
    })
  }catch(error){
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Error occured"
    })
  }
}

// edit product
export const editProduct =  async (req,res) => {
  try{
    const {id} = req.params;
    const {
      image,
      title,
      description,
      category,
      price,
      salePrice ,
      totalStock
    } = req.body;

    let findProduct = await Product.findById(id);
    if(!findProduct)
      return res.status(404).json({
    success: false,
  message: "Product not found"});

  findProduct.image = image || findProduct.image
  findProduct.title = title || findProduct.title
  findProduct.description =description || findProduct.description
  findProduct.category = category || findProduct.category
  if (price !== undefined) {
    findProduct.price = price === "" ? 0 : price;
  }
  
  if (salePrice !== undefined) {
    findProduct.salePrice = salePrice === "" ? 0 : salePrice;
  }
  
  if (totalStock !== undefined) {
    findProduct.totalStock = totalStock === "" ? 0 : totalStock;
  }
  await findProduct.save();
  res.status(200).json({
    success: true,
    data: findProduct
  });

}catch(error){
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Error occured"
    })
  }
}

// delete product
export const deleteProduct = async (req, res) => {
  try {
    const id  = req.params.id; // Usually, IDs are passed via params or URL, but body is fine too

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Delete the product
    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

