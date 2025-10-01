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
      // Fake generated images (in real app, from backend) - generate unique placeholders
      setGeneratedImages([
        `https://picsum.photos/300/400?random=${Math.random()}`,
        `https://picsum.photos/300/400?random=${Math.random()}`,
        `https://picsum.photos/300/400?random=${Math.random()}`
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
    <>
      {/* Hero Section */}
      <div className="hero full-width">
        <h1>Generate Pro AI Headshots in Seconds</h1>
        <p>Upload a selfie, choose a style—get LinkedIn-ready portraits instantly.</p>
        <div className="hero-mockup">
          <img src="https://via.placeholder.com/150x200?text=Before" alt="Before" />
          <span className="arrow">→</span>
          <img src="https://via.placeholder.com/150x200?text=After" alt="After" />
        </div>
        <button className="btn-cta" onClick={() => document.getElementById('tool-start')?.scrollIntoView()}>Get Started</button>
      </div>

      {/* How It Works */}
      <div className="container">
        <div className="how-it-works">
          <div className="step">
            <div className="step-icon">📷</div>
            <h3>Upload Selfie</h3>
            <p>Select a clear photo for best results</p>
          </div>
          <div className="step">
            <div className="step-icon">🎨</div>
            <h3>Pick Style</h3>
            <p>Choose from professional, casual, creative options</p>
          </div>
          <div className="step">
            <div className="step-icon">⬇️</div>
            <h3>Download Pros</h3>
            <p>Get 3 AI-generated headshots ready instantly</p>
          </div>
        </div>
      </div>

      {/* Examples Gallery */}
      <div className="examples full-width">
        <div className="container">
          <h2>See What's Possible</h2>
          <div className="examples-grid">
            {[
              { url: 'https://via.placeholder.com/300x400?text=Business+Neutral', style: 'Professional' },
              { url: 'https://via.placeholder.com/300x400?text=Casual+Vibe', style: 'Casual' },
              { url: 'https://via.placeholder.com/300x400?text=Creative+Artsy', style: 'Creative' },
              { url: 'https://via.placeholder.com/300x400?text=Studio+Portrait', style: 'Classic' },
            ].map((ex, i) => (
              <div key={i} className="example-item">
                <img src={ex.url} alt={ex.style} />
                <div className="example-caption">
                  <p>{ex.style}</p>
                </div>
                <div className="hover-overlay">
                  Generated in 5s
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mid-page CTA */}
      <div className="mid-cta full-width">
        <div className="container">
          <h3>Try Free—No Signup Needed</h3>
          <p>Perfect for resumes, social, or branding.</p>
          <button className="btn-cta" onClick={() => document.getElementById('tool-start')?.scrollIntoView()}>Generate Headshots</button>
        </div>
      </div>

      {/* Tool Section */}
      <div id="tool-start" className="container">
        <div className="tool-section">
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
        </div>
      </div>

      {/* FAQ */}
      <div className="faq container">
        <h3>Frequently Asked Questions</h3>
        {[
          { q: 'How accurate are the styles?', a: 'Our AI analyzes your selfie and applies professional styling with high accuracy, but results may vary.' },
          { q: 'Can I edit prompts?', a: 'Yes, customize additional instructions for unique results.' },
          { q: 'What types of photos work best?', a: 'Clear, well-lit selfies with your face centered provide the best results.' },
        ].map((faq, i) => (
          <div key={i} className="faq-item">
            <h4 onClick={(e) => e.currentTarget.parentElement!.classList.toggle('active')}>
              {faq.q}
              <span>▼</span>
            </h4>
            <div className="faq-content">
              <p>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{ background: '#F3F4F6', padding: '2rem', textAlign: 'center' }}>
        <p>&copy; 2025 PrimePic. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
