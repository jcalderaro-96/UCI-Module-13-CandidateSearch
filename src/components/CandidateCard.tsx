// src/components/CandidateCard.tsx

import React from 'react';

interface Candidate {
  name?: string;
  login: string;
  location?: string;
  avatar_url: string;
  email?: string;
  html_url: string;
  company?: string;
}

interface CandidateCardProps {
  candidate: Candidate;
  onSave: () => void;
  onReject: () => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, onSave, onReject }) => {
  return (
    <div className="candidate-card" style={styles.cardContainer}>
      <img
        src={candidate.avatar_url}
        alt={`Avatar of ${candidate.name || candidate.login}`}
        className="candidate-avatar"
        style={styles.avatar}
      />
      <div className="candidate-info" style={styles.infoContainer}>
        <h2 style={styles.name}>{candidate.name || "No Name Provided"}</h2>
        <p><strong>Username:</strong> {candidate.login}</p>
        <p><strong>Location:</strong> {candidate.location || "N/A"}</p>
        <p><strong>Email:</strong> {candidate.email || "N/A"}</p>
        <p><strong>Company:</strong> {candidate.company || "N/A"}</p>
        <p><strong>Profile:</strong> 
          <a href={candidate.html_url} target="_blank" rel="noopener noreferrer" style={styles.link}>
            GitHub Profile
          </a>
        </p>
      </div>
      <div className="candidate-actions" style={styles.actionContainer}>
        <button
          onClick={onSave}
          style={styles.saveButton}
          aria-label={`Save ${candidate.name || candidate.login}`}
        >
          Save
        </button>
        <button
          onClick={onReject}
          style={styles.rejectButton}
          aria-label={`Reject ${candidate.name || candidate.login}`}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

// Add styles
const styles = {
  cardContainer: {
    display: 'flex' as 'flex',
    flexDirection: 'row' as 'row',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    alignItems: 'center' as 'center',
  },
  avatar: {
    borderRadius: '50%',
    width: '80px',
    height: '80px',
    marginRight: '20px',
  },
  infoContainer: {
    flex: 1,
    paddingRight: '15px',
  },
  name: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  link: {
    color: '#0070f3',
    textDecoration: 'none',
  },
  actionContainer: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'flex-end' as 'flex-end',
    gap: '10px',
  },
  saveButton: {
    padding: '8px 16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  rejectButton: {
    padding: '8px 16px',
    backgroundColor: '#F44336',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default CandidateCard;
