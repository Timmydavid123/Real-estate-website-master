import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validatePassword = () => {
    // Validate password length
    if (newPassword.length < 8 || newPassword.length > 20) {
      setError('Password must be between 8 and 20 characters.');
      return false;
    }

    // Validate if password contains spaces
    if (/\s/.test(newPassword)) {
      setError('Password must not contain spaces.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!newPassword || !confirmPassword) {
      setError('Please enter both the new password and confirm password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords must match.');
      return;
    }

    // Validate password
    if (!validatePassword()) {
      return;
    }

    // Reset previous error message
    setError(null);

    try {
      setLoading(true);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Send reset password request to the backend
      const response = await fetch('https://backendweb-0kwi.onrender.com/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });

      if (!response.ok) {
        // Handle unsuccessful request
        const responseData = await response.json();
        setError(responseData.message || 'Request failed');
        setLoading(false);
        return;
      }

      // Request successful
      setSuccess(true);
    } catch (error) {
      console.error('Error during reset password:', error);
      setError('An error occurred during the request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card card-outline-secondary">
      <div className="card-header ">
        <h3 className="mb-0 text-center">Change Password</h3>
      </div>
      <div className="card-body">
        {success ? (
          <p className="text-success text-center">Password changed successfully!</p>
        ) : (
          <form className="form" role="form" autoComplete="off" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="inputPasswordNew"></label>
              <input
                type="password"
                className="form-control"
                placeholder="New Password"
                id="inputPasswordNew"
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
              />
              <span className="form-text small text-muted">
                The password must be 8-20 characters and must not contain spaces.
              </span>
            </div>
            <div className="form-group">
              <label htmlFor="inputPasswordNewVerify"></label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                id="inputPasswordNewVerify"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              <span className="form-text small text-muted">
                To confirm, type the new password again.
              </span>
            </div>
            {error && <p className="text-danger">{error}</p>}
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-success btn-lg float-right"
                disabled={loading}
              >
                {loading && (
                  <div className="spinner-border spinner-border-sm me-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
                {!loading && 'Save'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ChangePassword;
