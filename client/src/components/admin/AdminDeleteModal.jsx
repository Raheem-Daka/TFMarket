import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct, fetchAllProducts } from '@/store/admin/productSlice';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

function AdminDeleteModal({ confirmDeleteId, onCancel, onDeleteSuccess }) {
  const dispatch = useDispatch();
  const { toast } = useToast();

  if (!confirmDeleteId) return null;

  const handleDelete = () => {
    dispatch(deleteProduct(confirmDeleteId))
      .unwrap()
      .then(() => {
        dispatch(fetchAllProducts());
        toast({
          title: "Product deleted successfully",
          className: "bg-green-500 rounded text-white",
        });
        onDeleteSuccess?.(); // Notify parent
      })
      .catch((err) => {
        toast({
          title: err?.message || "Failed to delete product",
          className: "bg-red-500 rounded text-white",
        });
      });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-xl max-w-sm w-full text-center">
        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-6">Are you sure you want to delete this product?</p>
        <div className="flex justify-center gap-4">
          <Button
            variant="destructive"
            className="bg-red-500 rounded"
            onClick={handleDelete}
          >
            Yes, Delete
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}

export default AdminDeleteModal;
