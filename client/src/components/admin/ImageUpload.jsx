import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Skeleton } from '../ui/skeleton';

function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  imageLoadingState,
  setUploadedImageUrl,
  setImageLoadingState,
}) {
  const [error, setError] = useState(null); // State to hold error messages
  const inputRef = useRef(null);

  // Handle file change from input
  function handleImageFileChange(e) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setImageFile(selectedFile);
      setUploadedImageUrl(URL.createObjectURL(selectedFile)); // Preview image
      setError(null); // Clear any previous error
    } else {
      setError('Please select a valid image file.');
    }
  }

  // Handle file drop
  function handleDragOver(e) {
    e.preventDefault();
  }

  // Handle image drop
  function handleDrop(e) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setImageFile(droppedFile);
      setUploadedImageUrl(URL.createObjectURL(droppedFile));
      setError(null); // Clear any previous error
    } else {
      setError('Please drop a valid image file.');
    }
  }

  // Handle removing uploaded image
  function handleRemoveImage() {
    setImageFile(null);
    setUploadedImageUrl('');
    setError(null); // Clear any error
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  // Trigger file input click to allow file selection
  function triggerFileInputClick() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  // Upload the image to Cloudinary
  async function uploadedImageToCloudinary() {
    if (!imageFile) return;
  
    try {
      setImageLoadingState(true); // Set loading state before uploading
      const formData = new FormData();
      formData.append('my_file', imageFile);
  
      const response = await axios.post(
        'http://localhost:8000/api/admin/adminproducts/upload_image',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
  
      if (response.data?.result?.secure_url) {
        setUploadedImageUrl(response.data.result.secure_url);
      } else {
        setError('Upload failed: No URL returned.');
      }
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || 'An unknown error occurred.';
      setError(`Upload failed: ${message}`);
      console.error('Upload failed:', err);
    } finally {
      setImageLoadingState(false);
    }
  }
  
  // Call upload function when imageFile changes
  useEffect(() => {
    if (imageFile !== null) {
      uploadedImageToCloudinary();
    }
  }, [imageFile]);

  return (
    <div className="w-full mt-4 max-w-md mx-auto">
      <div className="text-lg font-semibold mb-2">Upload Image</div>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 rounded p-6"
      >
        <Input
          ref={inputRef}
          id="image_upload"
          type="file"
          onChange={handleImageFileChange}
          className="hidden"
        />
        {!imageFile && !uploadedImageUrl ? (
          <div className="flex flex-col items-center" onClick={triggerFileInputClick}>
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2 cursor-pointer" />
            <span>Drag & drop or click to upload an image.</span>
          </div>
        ) : uploadedImageUrl ? (
          imageLoadingState ? (
            <div className="text-center gap-3">
              <Skeleton className="h-2 bg-blue-500 text-center" />
              <span>Loading image...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-between">
              <div className="flex justify-between">
                <FileIcon className="w-8 text-primary mr-2 h-8" />
              </div>
              <p className="text-sm font-medium">{imageFile?.name}</p>
              <img
                src={uploadedImageUrl}
                alt="Uploaded product"
                className="w-full max-w-xs mb-2"
              />
              <span className="text-sm text-muted-foreground mb-1">Uploaded Image</span>
              <Button
                variant="unstyled"
                size="icon"
                className="rounded w-full bg-red-500 text-muted-foreground hover:text-foreground hover:opacity-80"
                onClick={handleRemoveImage}
              >
                <XIcon className="w-4 h-4 text-white" />
                <span className="text-white">Remove File</span>
              </Button>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center">
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              className="w-full max-w-xs mb-2"
            />
            <span className="text-sm text-muted-foreground">Image Preview</span>
          </div>
        )}

        {/* Show error message if any */}
        {error && <p className="text-center text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default ProductImageUpload;
