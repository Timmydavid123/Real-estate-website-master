import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css';

const SignupPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleAgreementChange = (e) => {
    setAgreed(e.target.checked);
  };

  const handleSubmit = async () => {
    // Validate form fields
    if (!fullName || !email || !password || !confirmPassword || !agreed) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Password and Confirm Password must match.');
      return;
    }

    // Reset previous error message
    setError(null);

    try {
      setLoading(true);

      // Send signup request to the backend (send OTP)
      const response = await fetch('https://backendweb-0kwi.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, password }),
      });

      if (!response.ok) {
        // Handle unsuccessful signup
        const responseData = await response.json();
        setError(responseData.message || 'Signup failed');
        setLoading(false);
        return;
      }

      // Signup successful, handle OTP logic or redirect
      console.log('Signup successful');
    } catch (error) {
      console.error('Error during signup:', error);
      setError('An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="vh-100 bg-image" style={{ backgroundImage: "url('./images/list/p-4.png')" }}>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                <div className="card-body p-5 ">
                  <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="form3Example1cg"
                      placeholder="Full Name"
                      className="form-control form-control-lg text-white"
                      value={fullName}
                      onChange={handleFullNameChange}
                    />
                    <label className="form-label text-white" htmlFor="form3Example1cg"></label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form3Example3cg"
                      placeholder="Email"
                      className="form-control form-control-lg text-white"
                      value={email}
                      onChange={handleEmailChange}
                    />
                    <label className="form-label text-white" htmlFor="form3Example3cg"></label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example4cg"
                      placeholder="Password"
                      className="form-control form-control-lg "
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <label className="form-label text-white" htmlFor="form3Example4cg"></label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example4cdg"
                      placeholder="Confirm password"
                      className="form-control form-control-lg"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                    <label className="form-label text-white" htmlFor="form3Example4cdg"></label>
                  </div>

                  <div className="form-check d-flex justify-content-center mb-5">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="form2Example3cg"
                      checked={agreed}
                      onChange={handleAgreementChange}
                    />
                    <label className="form-check-label text-white" htmlFor="form2Example3g">
                      I agree all statements in <a href="#!" className="text-white"><u>Terms of service</u></a>
                    </label>
                  </div>

                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-success btn-block btn-lg gradient-custom-4 text-white"
                      onClick={handleSubmit}
                    >
                      {loading ? (
                        <div className="spinner-border text-light" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        'Register'
                      )}
                    </button>
                  </div>

                  <p className="text-center text-white mt-5 mb-0">Have already an account? <a href="/login" className="fw-bold text-white"><u>Login here</u></a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignupPage;
