import { Button } from '@/components/ui/button';
import React, { Fragment, useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CommonForm from '@/components/common/CommonForm';
import { addProductFormElements } from '@/config';
import ProductImageUpload from '../../components/admin/ImageUpload';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProduct, fetchAllProducts } from '@/store/admin/productSlice';
import { useToast } from '@/hooks/use-toast';
import AdminProductTile from '@/components/admin/AdminProductTile';

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
}

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const { productList } = useSelector((state) => state.AdminProducts);
  const dispatch = useDispatch();
  const {toast} = useToast()

  // Reset form and image state when dialog is closed
  const closeDialog = () => {
    setOpenCreateProductsDialog(false);
    setFormData(initialFormData);  // Reset form data
    setImageFile(null);            // Reset image
    setUploadedImageUrl("");      // Reset uploaded image URL
    setFormErrors({});            // Reset form errors
  };

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
  
    // --- Validation: move this FIRST ---
    let errors = {};
    if (!formData.title) errors.title = "Title is required.";
    if (!formData.category) errors.category = "Category is required.";
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0)
      errors.price = "Please provide a valid price.";
    if (!formData.totalStock || isNaN(formData.totalStock) || Number(formData.totalStock) <= 0)
      errors.totalStock = "Please provide valid stock count.";
    if (!uploadedImageUrl) errors.image = "Please upload an image.";
  
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
  
    // --- Only dispatch after validation passes ---
    const payload = {
      ...formData,
      image: uploadedImageUrl,
      price: Number(formData.price),
      salePrice: Number(formData.salePrice) || 0,
      totalStock: Number(formData.totalStock),
      averageReview: Number(formData.averageReview) || 0,
      description: formData.description || "", // Fallback to empty string
    };
  
    dispatch(addNewProduct(payload))
    .unwrap()
    .then(() => {
      setImageFile(null);
      setFormData(initialFormData);
      dispatch(fetchAllProducts());
      toast({
        title: "Product added successfully",
        className: "bg-green-500 rounded text-white",
      });
      closeDialog();
    })
    .catch((err) => {
      toast({
        title: err?.message || "Failed to add product",
        className: "bg-red-500 rounded text-white",
      });
    });
    };
  
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log(formData, "ProductList");

  return (
    <Fragment>
      <div className="mb-5 flex justify-end">
        <Button
          onClick={() => setOpenCreateProductsDialog(true)}
          className="bg-blue-400 rounded"
        >
          Add Products
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {
          productList && productList.length > 0 ? (
            productList.map((productItem) => {
              console.log("Rendering product:", productItem);
              return (
                <AdminProductTile 
                key={productItem._id}
                  product={productItem}
                />
              );
            })
          ) : (
            <div className="col-span-full text-center text-gray-500 mt-8">
              No products found.
            </div>
          )
        }
      </div>

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={closeDialog}
        className="h-screen overflow-hidden"
      >
        <SheetContent
          side="right"
          className="bg-white max-h-full overflow-auto"
        >
          <SheetHeader className="border-b">
            <SheetTitle>Add New Products</SheetTitle>
          </SheetHeader>

          {/* Product Image Upload Section */}
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
          />

          {/* Common Form Section */}
          <div className="py-4 max-h-[500px] overflow-y-auto">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText="Add"
              formControls={addProductFormElements}
              errors={formErrors} // Pass formErrors to CommonForm component
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;