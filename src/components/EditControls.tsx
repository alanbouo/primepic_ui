import React from 'react';

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

  if (!open) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
      <div className="card" style={{ maxWidth: '90vw', maxHeight: '90vh', position: 'relative' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '-40px', right: 0, background: 'transparent', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer' }}
        >
          ×
        </button>
        <h2>Edit Headshot</h2>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
          <img src={imageUrl} alt="Editing" style={{ maxHeight: 300, maxWidth: '100%', borderRadius: '12px' }} />
        </div>
        <p>Choose an edit to apply:</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <button className="btn" onClick={() => applyEdit('remove-bg')}>
            ✨ Remove Background
          </button>
          <button className="btn" onClick={() => applyEdit('adjust-lighting')}>
            💡 Adjust Lighting
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditControls;
