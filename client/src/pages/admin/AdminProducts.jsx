import { Button } from '@/components/ui/button';
import React, { Fragment, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CommonForm from '@/components/common/CommonForm';
import { addProductFormElements } from '@/config';
import ProductImageUpload from './ImageUpload';

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

  // Reset form and image state when dialog is closed
  const closeDialog = () => {
    setOpenCreateProductsDialog(false);
    setFormData(initialFormData);  // Reset form data
    setImageFile(null);            // Reset image
    setUploadedImageUrl("");      // Reset uploaded image URL
  };

  // Handle form submission
  const onsubmit = (e) => {
    e.preventDefault();

    // Validation: check if the required fields are filled in
    if (!formData.title || !formData.category || !formData.price || !uploadedImageUrl) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    // Process form data and image here (e.g., send to API or save locally)
    console.log("Form submitted:", formData);

    // Reset the form after submission
    closeDialog();
  };

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

      <Sheet 
        open={openCreateProductsDialog}
        onChange={closeDialog}
      >
        <SheetContent side="right" className="bg-white ">
          <SheetHeader className="border-b">
            <SheetTitle>Add New Products</SheetTitle>
          </SheetHeader>

          {/* Product Image Upload Section */}
          <ProductImageUpload 
            imageFile={imageFile} 
            setImageFile={setImageFile} 
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
          />

          {/* Common Form Section */}
          <div className="py-4">
            <CommonForm 
              onSubmit={onsubmit} 
              formData={formData} 
              setFormData={setFormData}
              buttonText="Add"
              formControls={addProductFormElements} 
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
