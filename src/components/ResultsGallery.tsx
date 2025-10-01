import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';

interface ResultsGalleryProps {
  images: string[];
  onEdit?: (imageUrl: string) => void;
}

const ResultsGallery: React.FC<ResultsGalleryProps> = ({ images, onEdit }) => {
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  const handleEnlarge = (src: string) => {
    setEnlargedImage(src);
  };

  const handleClose = () => {
    setEnlargedImage(null);
  };

  const handleDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'headshot.jpg';
    link.click();
  };

  if (images.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1" color="textSecondary">
          Generated headshots will appear here.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Your Generated Headshots
      </Typography>
      <Grid container spacing={2}>
        {images.map((img, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardActionArea onClick={() => handleEnlarge(img)}>
                <CardMedia
                  component="img"
                  height="300"
                  image={img}
                  alt={`Headshot ${index + 1}`}
                />
              </CardActionArea>
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button
                  startIcon={<DownloadIcon />}
                  onClick={() => handleDownload(img)}
                  variant="outlined"
                  size="small"
                >
                  Download
                </Button>
                {onEdit && (
                  <IconButton onClick={() => onEdit(img)}>
                    <EditIcon />
                  </IconButton>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={!!enlargedImage} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent sx={{ position: 'relative', textAlign: 'center' }}>
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          {enlargedImage && (
            <img src={enlargedImage} alt="Enlarged headshot" style={{ maxWidth: '100%', maxHeight: '80vh' }} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => enlargedImage && handleDownload(enlargedImage)} startIcon={<DownloadIcon />}>
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ResultsGallery;
