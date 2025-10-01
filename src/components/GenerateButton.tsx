import React from 'react';
import { Button, CircularProgress, Box, Typography } from '@mui/material';

interface GenerateButtonProps {
  loading: boolean;
  onGenerate: () => void;
  disabled: boolean;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ loading, onGenerate, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      onGenerate();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4 }}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleClick}
        disabled={disabled || loading}
        sx={{ minWidth: 200, minHeight: 48 }}
      >
        {loading ? (
          <>
            <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
            Generating...
          </>
        ) : (
          'Generate Headshots'
        )}
      </Button>
      {loading && (
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          Please wait, processing your image...
        </Typography>
      )}
    </Box>
  );
};

export default GenerateButton;
