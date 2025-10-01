import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Card,
  CardContent,
  CardActionArea,
  Grid,
} from '@mui/material';

interface PromptSelectionProps {
  onPromptChange: (prompt: string) => void;
}

const PromptSelection: React.FC<PromptSelectionProps> = ({ onPromptChange }) => {
  const [selectedStyle, setSelectedStyle] = useState<string>('professional');
  const [background, setBackground] = useState<string>('clean');
  const [additionalText, setAdditionalText] = useState<string>('');

  const styles = [
    { value: 'professional', label: 'Professional', description: 'Business attire, neutral background' },
    { value: 'casual', label: 'Casual', description: 'Relaxed style, everyday settings' },
    { value: 'creative', label: 'Creative', description: 'Artistic poses, vibrant backgrounds' },
    { value: 'headshot', label: 'Classic Headshot', description: 'Traditional studio portrait' },
  ];

  const backgrounds = [
    { value: 'clean', label: 'Clean White' },
    { value: 'studio', label: 'Studio Light' },
    { value: 'outdoor', label: 'Outdoor' },
  ];

  useEffect(() => {
    const basePrompt = `Generate a ${selectedStyle} headshot with a ${background} background. ${additionalText}`.trim();
    onPromptChange(basePrompt);
  }, [selectedStyle, background, additionalText, onPromptChange]);

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Choose Headshot Style
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {styles.map((style) => (
          <Grid item xs={12} sm={6} key={style.value}>
            <Card
              sx={{
                border: selectedStyle === style.value ? '2px solid #1976d2' : '1px solid #ddd',
                cursor: 'pointer',
              }}
            >
              <CardActionArea onClick={() => setSelectedStyle(style.value)}>
                <CardContent>
                  <Typography variant="h6">{style.label}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {style.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="background-label">Background</InputLabel>
          <Select
            labelId="background-label"
            value={background}
            label="Background"
            onChange={(e) => setBackground(e.target.value)}
          >
            {backgrounds.map((bg) => (
              <MenuItem key={bg.value} value={bg.value}>
                {bg.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          label="Additional Instructions"
          multiline
          rows={3}
          fullWidth
          placeholder="e.g., wearing specific colors, mood, etc."
          value={additionalText}
          onChange={(e) => setAdditionalText(e.target.value)}
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Generated Prompt:
        </Typography>
        <TextField
          value={`Generate a ${selectedStyle} headshot with a ${background} background. ${additionalText}`.trim()}
          multiline
          rows={2}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
          sx={{ backgroundColor: '#f5f5f5' }}
        />
      </Box>
    </Box>
  );
};

export default PromptSelection;
