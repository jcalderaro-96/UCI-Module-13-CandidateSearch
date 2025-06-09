// src/pages/SavedCandidates.tsx

import React, { useEffect, useState } from 'react';

// Candidate type definition
interface Candidate {
  name: string;
  login: string;
  location: string;
  avatar_url: string;
  email: string;
  html_url: string;
  company: string;
}

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Load saved candidates from localStorage on page load
  useEffect(() => {
    const savedData = localStorage.getItem('savedCandidates');
    if (savedData) {
      setSavedCandidates(JSON.parse(savedData));
    }
  }, []);

  // Handle removing a candidate
  const handleRemove = (index: number) => {
    const updatedList = savedCandidates.filter((_, i) => i !== index);
    setSavedCandidates(updatedList);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedList));
  };

  return (
    <div style={styles.container}>
      <h1>Saved Candidates</h1>

      {savedCandidates.length === 0 ? (
        <p>No candidates saved.</p>
      ) : (
        <ul>
          {savedCandidates.map((candidate, index) => (
            <li key={index} style={styles.candidateItem}>
              <img
                src={candidate.avatar_url}
                alt={`${candidate.name}'s avatar`}
                style={styles.avatar}
              />
              <div>
                <p><strong>{candidate.name}</strong> ({candidate.login})</p>
                <p>{candidate.location || 'N/A'}</p>
                <p>{candidate.email || 'N/A'}</p>
                <p>{candidate.company || 'N/A'}</p>
                <a
                  href={candidate.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                >
                  View GitHub Profile
                </a>
                <br />
                <button onClick={() => handleRemove(index)} style={styles.removeButton}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Basic styles
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  candidateItem: {
    display: 'flex' as 'flex',
    alignItems: 'center' as 'center',
    marginBottom: '15px',
    gap: '10px',
  },
  avatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
  },
  link: {
    color: '#0070f3',
    textDecoration: 'none',
  },
  removeButton: {
    padding: '5px 10px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '5px',
  },
};

export default SavedCandidates;
