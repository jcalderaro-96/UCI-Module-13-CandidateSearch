// src/pages/CandidateSearch.tsx

import { useEffect, useState } from "react";
import { searchGithub, searchGithubUser, User } from "../api/API";

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<User[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedCandidates, setSavedCandidates] = useState<User[]>([]);

  useEffect(() => {
    const loadCandidates = async () => {
      const data = await searchGithub();
      const usersWithDetails = await Promise.all(
        data.slice(0, 10).map(async (user) => {
          const details = await searchGithubUser(user.login);
          return details;
        })
      );
      setCandidates(usersWithDetails);
    };

    loadCandidates();

    // Load saved candidates from localStorage
    const saved = localStorage.getItem("savedCandidates");
    if (saved) {
      setSavedCandidates(JSON.parse(saved));
    }
  }, []);

  const handleAccept = () => {
    const candidate = candidates[currentIndex];
    const updatedSaved = [...savedCandidates, candidate];
    setSavedCandidates(updatedSaved);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedSaved));
    handleNext();
  };

  const handleReject = () => {
    handleNext();
  };

  const handleNext = () => {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // No more candidates
      setCurrentIndex(-1);
    }
  };

  const currentCandidate = currentIndex >= 0 ? candidates[currentIndex] : null;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Candidate Search</h1>

      {currentCandidate ? (
        <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <img src={currentCandidate.avatar_url} alt="avatar" width="100" />
          <h2>{currentCandidate.name || "No Name Provided"}</h2>
          <p><strong>Username:</strong> {currentCandidate.login}</p>
          <p><strong>Location:</strong> {currentCandidate.location || "N/A"}</p>
          <p><strong>Email:</strong> {currentCandidate.email || "N/A"}</p>
          <p><strong>Company:</strong> {currentCandidate.company || "N/A"}</p>
          <p><a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a></p>
          <button onClick={handleAccept}>+</button>
          <button onClick={handleReject}>-</button>
        </div>
      ) : (
        <p>No more candidates available.</p>
      )}

      <h2>Saved Candidates:</h2>
      {savedCandidates.length > 0 ? (
        <ul>
          {savedCandidates.map((candidate) => (
            <li key={candidate.id}>
              <img src={candidate.avatar_url} alt="avatar" width="50" />
              <strong>{candidate.name || "No Name"}</strong> ({candidate.login})
            </li>
          ))}
        </ul>
      ) : (
        <p>No candidates saved yet.</p>
      )}
    </div>
  );
};

export default CandidateSearch;
