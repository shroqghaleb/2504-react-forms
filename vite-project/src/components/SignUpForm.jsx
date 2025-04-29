import { useState } from 'react';
import './Auth.css';

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    if (username.length < 8) {
      errors.username = 'Username must be at least 8 characters long';
    }
    
    if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  async function handleSubmit(event) {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      
      const result = await response.json();
      
      if (result.token) {
        setToken(result.token);
        setError(null);
      } else {
        setError(result.message || 'Signup failed');
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="signup-container">
      <h2>Sign Up!</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label>
            Username: 
            <input 
              type="text"
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className={validationErrors.username ? 'error' : ''}
            />
          </label>
          {validationErrors.username && (
            <p className="validation-error">{validationErrors.username}</p>
          )}
        </div>
        
        <div className="form-group">
          <label>
            Password: 
            <input 
              type="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className={validationErrors.password ? 'error' : ''}
            />
          </label>
          {validationErrors.password && (
            <p className="validation-error">{validationErrors.password}</p>
          )}
        </div>
        
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}