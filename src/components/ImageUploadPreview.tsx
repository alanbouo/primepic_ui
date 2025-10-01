import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Button } from '@mui/material';

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
    <Box sx={{ maxWidth: 400, mx: 'auto', textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Upload Your Selfie
      </Typography>
      {!previewUrl ? (
        <Box
          {...getRootProps()}
          sx={{
            border: '2px dashed',
            borderColor: isDragActive ? 'primary.main' : 'grey.400',
            borderRadius: 2,
            p: 4,
            cursor: 'pointer',
            backgroundColor: isDragActive ? 'primary.light' : 'grey.100',
            transition: 'border-color 0.2s',
          }}
        >
          <input {...getInputProps()} />
          <Typography variant="body1" sx={{ mb: 2 }}>
            {isDragActive ? 'Drop the image here...' : 'Drag & drop a selfie here, or click to select'}
          </Typography>
          <Button variant="contained">Choose File</Button>
        </Box>
      ) : (
        <Box>
          <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 8 }} />
          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={removeImage}>
              Remove Image
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ImageUploadPreview;
