import React, { useState, useEffect } from 'react';

interface PromptSelectionProps {
  onPromptChange: (prompt: string) => void;
}

const PromptSelection: React.FC<PromptSelectionProps> = ({ onPromptChange }) => {
  const [selectedStyle, setSelectedStyle] = useState<string>('professional');
  const [background, setBackground] = useState<string>('clean');
  const [additionalText, setAdditionalText] = useState<string>('');

  const styles = [
    { value: 'professional', label: 'Professional', description: 'Business attire, neutral background', icon: '👔' },
    { value: 'casual', label: 'Casual', description: 'Relaxed style, everyday settings', icon: '👕' },
    { value: 'creative', label: 'Creative', description: 'Artistic poses, vibrant backgrounds', icon: '🎨' },
    { value: 'headshot', label: 'Classic Headshot', description: 'Traditional studio portrait', icon: '📷' },
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
    <div className="card">
      <h2>Choose Headshot Style</h2>
      <div className="style-cards">
        {styles.map((style) => (
          <div
            key={style.value}
            className={`style-card ${selectedStyle === style.value ? 'selected' : ''}`}
            onClick={() => setSelectedStyle(style.value)}
          >
            <div className="icon">{style.icon}</div>
            <h3>{style.label}</h3>
            <p>{style.description}</p>
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="background">Background</label>
        <select
          id="background"
          value={background}
          onChange={(e) => setBackground(e.target.value)}
        >
          {backgrounds.map((bg) => (
            <option key={bg.value} value={bg.value}>
              {bg.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="additional">Additional Instructions</label>
        <textarea
          id="additional"
          rows={3}
          placeholder="e.g., wearing specific colors, mood, etc."
          value={additionalText}
          onChange={(e) => setAdditionalText(e.target.value)}
        />
      </div>

      <div>
        <h3>Generated Prompt:</h3>
        <div className="prompt-preview">
          {`Generate a ${selectedStyle} headshot with a ${background} background. ${additionalText}`.trim()}
        </div>
      </div>
    </div>
  );
};

export default PromptSelection;
