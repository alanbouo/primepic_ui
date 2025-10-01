import React, { useState } from 'react';

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
    window.open(url, '_blank');
  };

  if (images.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
        <p>Generated headshots will appear here.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Your Generated Headshots</h2>
      <div className="results-grid">
        {images.map((img, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <img
              src={img}
              alt={`Headshot ${index + 1}`}
              onClick={() => handleEnlarge(img)}
              style={{ cursor: 'pointer' }}
            />
            <div style={{ position: 'absolute', bottom: '10px', left: '10px', right: '10px', display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn" onClick={(e) => { e.stopPropagation(); handleDownload(img); }} style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>
                📥 Download
              </button>
              {onEdit && (
                <button className="btn" onClick={(e) => { e.stopPropagation(); onEdit(img); }} style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>
                  ✏️ Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {enlargedImage && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
            <button
              onClick={handleClose}
              style={{ position: 'absolute', top: '-40px', right: 0, background: 'transparent', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer' }}
            >
              ×
            </button>
            <img src={enlargedImage} alt="Enlarged headshot" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button className="btn" onClick={() => handleDownload(enlargedImage!)}>
                📥 Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsGallery;
