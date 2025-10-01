import React from 'react';

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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2rem 0' }}>
      <button
        className="btn"
        onClick={handleClick}
        disabled={disabled || loading}
        style={{ minWidth: '200px', minHeight: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {loading ? (
          <>
            <div className="loading-spinner" style={{ marginRight: '0.5rem' }}></div>
            Generating...
          </>
        ) : (
          'Generate Headshots'
        )}
      </button>
      {loading && (
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
          Please wait, processing your image...
        </p>
      )}
    </div>
  );
};

export default GenerateButton;
