import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';

interface EditControlsProps {
  imageUrl: string;
  open: boolean;
  onApplyEdit: (newImageUrl: string) => void;
  onClose: () => void;
}

const EditControls: React.FC<EditControlsProps> = ({ imageUrl, open, onApplyEdit, onClose }) => {
  const applyEdit = (editType: string) => {
    // In real app, send to backend, get new url
    const newUrl = `${imageUrl}?edit=${editType}`; // Simulate by adding query param
    onApplyEdit(newUrl);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Headshot</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <img src={imageUrl} alt="Editing" style={{ maxHeight: 300, maxWidth: '100%' }} />
        </Box>
        <Typography variant="body1" gutterBottom>
          Choose an edit to apply:
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <Button
            variant="outlined"
            onClick={() => applyEdit('remove-bg')}
          >
            Remove Background
          </Button>
          <Button
            variant="outlined"
            onClick={() => applyEdit('adjust-lighting')}
          >
            Adjust Lighting
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditControls;
