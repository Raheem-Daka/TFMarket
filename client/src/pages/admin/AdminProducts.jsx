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
import ProductImageUpload from '@/components/admin/ImageUpload';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewProduct,
  editProduct,
  fetchAllProducts,
} from '@/store/admin/productSlice';
import { useToast } from '@/hooks/use-toast';
import AdminProductTile from '@/components/admin/AdminProductTile';
import AdminDeleteModal from '@/components/admin/AdminDeleteModal';

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const { productList } = useSelector((state) => state.AdminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const closeDialog = () => {
    setOpenCreateProductsDialog(false);
    setFormData(initialFormData);
    setImageFile(null);
    setUploadedImageUrl("");
    setFormErrors({});
    setCurrentEditedId(null);
  };

  const buttonText = () => (currentEditedId !== null ? "Save" : "Add");

  const handleDelete = (_id) => {
    setConfirmDeleteId(_id);
  };


  const onSubmit = (e) => {
    e.preventDefault();

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

    const payload = {
      ...formData,
      image: uploadedImageUrl,
      price: Number(formData.price),
      salePrice: formData.salePrice === "" ? 0 : Number(formData.salePrice),
      totalStock: Number(formData.totalStock),
      averageReview: Number(formData.averageReview) || 0,
      description: formData.description || "",
    };
    
    if (currentEditedId !== null) {
      dispatch(editProduct({ 
        id: currentEditedId, 
        formData: payload }))
        .then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
            closeDialog();
          }
        });
    } else {
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
    }
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

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
        {productList && productList.length > 0 ? (
          productList.map((productItem) => (
            <AdminProductTile
              key={productItem._id}
              product={productItem}
              setFormData={setFormData}
              setCurrentEditedId={setCurrentEditedId}
              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
              setUploadedImageUrl={setUploadedImageUrl}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 mt-8">
            No products found.
          </div>
        )}
      </div>

      {/* Deletion Confirmation Modal */}
      <AdminDeleteModal
        confirmDeleteId={confirmDeleteId}
        onCancel={() => setConfirmDeleteId(null)}
        onDeleteSuccess={() => setConfirmDeleteId(null)}
      />

      {/* Add/Edit Product Sheet */}
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
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>

          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            currentEditedId={currentEditedId}
          />

          <div className="py-4 max-h-[500px] overflow-y-auto">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={buttonText()}
              formControls={addProductFormElements}
              errors={formErrors}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
