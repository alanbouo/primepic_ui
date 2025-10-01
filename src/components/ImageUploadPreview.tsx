import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploadPreviewProps {
  onImageChange: (file: File | null) => void;
  uploadedImage: File | null;
}

const ImageUploadPreview: React.FC<ImageUploadPreviewProps> = ({
  onImageChange,
  uploadedImage
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      onImageChange(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, [onImageChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  const removeImage = () => {
    onImageChange(null);
    setPreviewUrl(null);
  };

  return (
    <div className="card">
      <h2>Upload Your Selfie</h2>
      {!previewUrl ? (
        <div {...getRootProps()} className="upload-area">
          <input {...getInputProps()} />
          <p>
            {isDragActive ? 'Drop the image here...' : 'Drag & drop a selfie here, or click to select'}
          </p>
          <button className="btn">Choose File</button>
        </div>
      ) : (
        <div>
          <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: 300, borderRadius: '12px', boxShadow: 'var(--shadow)' }} />
          <button className="btn" onClick={removeImage} style={{ marginTop: '1rem' }}>
            Remove Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploadPreview;
