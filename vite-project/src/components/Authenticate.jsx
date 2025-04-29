import { useState } from 'react';
import './Auth.css';

export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  async function handleClick() {
    console.log('Authentication button clicked');
    console.log('Current token:', token ? 'Token exists' : 'No token');
    
    if (!token) {
      setError('No token available. Please sign up first.');
      return;
    }

    try {
      console.log('Making authentication request...');
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Response status:', response.status);
      
      const result = await response.json();
      console.log('API Response:', result);
      
      setSuccessMessage(result.message);
      setUserData(result.data);
      setError(null);
    } catch (error) {
      console.error('Authentication error:', error);
      setError(error.message);
      setSuccessMessage(null);
      setUserData(null);
    }
  }

  return (
    <div className="auth-container">
      <h2>Authenticate</h2>
      {successMessage && (
        <div className="success-message">
          <p>{successMessage}</p>
          {userData && (
            <div className="user-info">
              <p>Welcome, {userData.username}!</p>
            </div>
          )}
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
      <button className="auth-button" onClick={handleClick}>
        Authenticate Token!
      </button>
    </div>
  );
}