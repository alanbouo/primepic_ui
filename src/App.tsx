import React, { useState } from 'react';
import ImageUploadPreview from './components/ImageUploadPreview';
import PromptSelection from './components/PromptSelection';
import GenerateButton from './components/GenerateButton';
import ResultsGallery from './components/ResultsGallery';
import EditControls from './components/EditControls';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [editingImage, setEditingImage] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!uploadedImage || loading) return;

    setLoading(true);
    setGeneratedImages([]);

    // Simulate backend processing
    setTimeout(() => {
      // Fake generated images (in real app, from backend)
      setGeneratedImages([
        'https://via.placeholder.com/300x400?text=Generated+Headshot+1',
        'https://via.placeholder.com/300x400?text=Generated+Headshot+2',
        'https://via.placeholder.com/300x400?text=Generated+Headshot+3',
      ]);
      setLoading(false);
    }, 3000);
  };

  const handleEditImage = (imageUrl: string) => {
    setEditingImage(imageUrl);
  };

  const handleApplyEdit = (newImageUrl: string) => {
    const index = generatedImages.indexOf(editingImage!);
    if (index !== -1) {
      const newImages = [...generatedImages];
      newImages[index] = newImageUrl;
      setGeneratedImages(newImages);
    }
  };

  const isDisabled = !uploadedImage || loading;

  return (
    <div className="App">
      <header>
        <h1>PrimePic - AI Headshot Generator</h1>
      </header>
      <main>
        <ImageUploadPreview onImageChange={setUploadedImage} uploadedImage={uploadedImage} />
        <PromptSelection onPromptChange={setCurrentPrompt} />
        <GenerateButton loading={loading} onGenerate={handleGenerate} disabled={isDisabled} />
        <ResultsGallery images={generatedImages} onEdit={handleEditImage} />
        <EditControls
          imageUrl={editingImage!}
          open={!!editingImage}
          onApplyEdit={handleApplyEdit}
          onClose={() => setEditingImage(null)}
        />
      </main>
      <footer>
        <p>Upload your selfie and generate professional headshots in various styles.</p>
      </footer>
    </div>
  );
}

export default App;
