import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Forgot-pass.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    // Validate email
    if (!email) {
      setError('Please enter your email.');
      return;
    }

    // Reset previous error message
    setError(null);

    try {
      setLoading(true);

      // Send reset password request to the backend
      const response = await fetch('https://backendweb-0kwi.onrender.com/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
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
    }finally {
      setLoading(false);
    }
  };

  return (
    <section className="vh-100 bg-image" style={{ backgroundImage: "url('./images/list/p-4.png')" }}>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="card text-center" style={{ width: "500px" }}>
              <div className="card-header h5 bg-dark text-white bg-primary">Password Reset</div>
              <div className="card-body px-8">
                {success ? (
                  <p className="card-text py-1 text-success">
                    An email with instructions to reset your password has been sent.
                  </p>
                ) : (
                  <>
                    <p className="card-text py-1">
                      Enter your email address, and we'll send you an email with instructions to reset your password.
                    </p>
                    <div className="form-outline">
                      <input
                        type="email"
                        id="typeEmail"
                        className="form-control my-3"
                        value={email}
                        onChange={handleEmailChange}
                      />
                      <label className="form-label" htmlFor="typeEmail">Email input</label>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button
                      className="btn btn-primary btn-lg gradient-custom-4 w-100"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading && (
                        <div className="spinner-border text-light" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      )}
                      {!loading && 'Reset password'}
                    </button>
                  </>
                )}
                <div className="d-flex text-body-dark justify-content-between mt-4">
                  <a className="text-dark" href="/login">Login</a>
                  <a className="text-dark" href="/signup">Register</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
