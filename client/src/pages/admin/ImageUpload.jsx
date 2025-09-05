import { Input } from '@/components/ui/input';
import { SelectGroup, SelectLabel } from '@radix-ui/react-select';
import { UploadCloudIcon } from 'lucide-react';
import React, { useRef } from 'react'

function ProductImageUpload({
    imageFile, 
    setImageFile, 
    uploadedImageUrl, 
    setUploadedImageUrl}) {

        const inputRef = useRef(null);

        function handleImageFileChange(e) {
            console.log(e.target.files);
            const selectedFile = e.target.files?.[0];
            if (selectedFile) setImageFile(selectedFile);
        }

    return (
        <div className='w-full max-w-md mx-auto'>
            <SelectGroup>
                <SelectLabel className="text-lg font-semibold mb-2 block">Upload</SelectLabel>
            </SelectGroup>
            <div>
                <Input 
                    ref={inputRef} 
                    id="image_upload" 
                    type="file" 
                    className="hidden"
                    onChange={handleImageFileChange} 
                />
                {!imageFile && !uploadedImageUrl ? (
                    <SelectGroup>
                        <SelectLabel htmlFor="image_upload" className="flex flex-col items-center">
                            <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2' />
                            <span>Drag & drop or click to upload an image.</span>
                        </SelectLabel>
                    </SelectGroup>
                ) : uploadedImageUrl ? (
                    <div className="flex flex-col items-center">
                        <img src={uploadedImageUrl} alt="Uploaded product" className="w-full max-w-xs mb-2" />
                        <span className="text-sm text-muted-foreground">Uploaded Image</span>
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