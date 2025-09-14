import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

function AdminProductTile({
  product,
  setFormData,
  setCurrentEditedId,
  setOpenCreateProductsDialog,
  setUploadedImageUrl, // ✅ this was incorrectly spelled as `setUploadImageUrl`
  imageLoadingState,
  handleDelete,
}) {
  if (!product || !product.image || !product.title) {
    return null;
  }

  const handleEdit = () => {
    setFormData({
      image: product.image || "",
      title: product.title || "",
      description: product.description || "",
      category: product.category || "",
      price: product.price?.toString() || "",
      salePrice: product.salePrice?.toString() || "",
      totalStock: product.totalStock?.toString() || "",
      averageReview: product.averageReview?.toString() || "0",
    });
  
    setUploadedImageUrl(product.image || "");
    setCurrentEditedId(product._id);
    setOpenCreateProductsDialog(true);
  };
  
  return (
    <Card className="flex flex-col justify-between h-full w-full max-w-sm mx-auto shadow-lg">
      <CardHeader className="relative p-0">
        {imageLoadingState ? (
          <div className="text-center gap-3">
            <Skeleton className="h-48 w-full bg-blue-200" />
          </div>
        ) : (
          <img
            src={product.image}
            alt={`${product.title} image`}
            className="w-full h-48 object-contain rounded-t"
          />
        )}
      </CardHeader>

      <CardTitle className="px-2 flex items-center justify-between border-b">
        <h2 className="text-xl font-bold truncate">{product.title}</h2>
        <div className="text-sm font-semibold text-gray-600">
          {product.category}
        </div>
      </CardTitle>

      <CardContent className="px-2 flex-1">
        <div className="flex justify-between items-center my-1">
          <span
            className={`text-lg font-semibold ${
              product.salePrice > 0 ? "line-through text-red-500" : ""
            }`}
          >
            ${product.price}
          </span>
          {product.salePrice > 0 && (
            <span className="text-lg font-bold">${product.salePrice}</span>
          )}
        </div>
        <p className="text-gray-600 text-sm line-clamp-3">
          {product.description}
        </p>
      </CardContent>

      <CardFooter className="flex justify-between items-center p-4 mt-auto">
        <Button
          className="rounded shadow-lg"
          onClick={handleEdit}
        >
          Edit
        </Button>

        <Button
          variant="destructive"
          className="bg-red-500 rounded shadow-lg"
          onClick={() => handleDelete?.(product._id)} // optional chaining
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;
