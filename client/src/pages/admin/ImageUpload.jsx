import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import React, { useRef } from 'react';

function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(e) {
    console.log(e.target.files);
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
      // Optionally, you can upload the file and get a URL if needed
      setUploadedImageUrl(URL.createObjectURL(selectedFile));  // For preview
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setImageFile(droppedFile);
      setUploadedImageUrl(URL.createObjectURL(droppedFile));  // For preview
    }
  }

  function handleRemoveImage() {
    setImageFile(null);
    setUploadedImageUrl("");  // Clear the uploaded image URL
    if (inputRef.current) {
      inputRef.current.value = "";  // Clear the input file
    }
  }

  // Trigger file input click when icon is clicked
  function triggerFileInputClick() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

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
          <div className="flex flex-col items-center justify-between">
            <div className="flex justify-between">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <img
              src={uploadedImageUrl}
              alt="Uploaded product"
              className="w-full max-w-xs mb-2"
            />
            <span className="text-sm text-muted-foreground">Uploaded Image</span>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span>Remove File</span>
            </Button>
          </div>
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
      </div>
    </div>
  );
}

export default ProductImageUpload;
