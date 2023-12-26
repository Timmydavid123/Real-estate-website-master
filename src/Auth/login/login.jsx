import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";
import './login.css';

const LoginPage = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    // Validate email and password
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // Reset previous error message
    setError(null);

    try {
      setLoading(true);

      // Send login request to the backend
      const response = await fetch('https://backendweb-0kwi.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Handle unsuccessful login
        const responseData = await response.json();
        setError(responseData.message || 'Login failed');
        setLoading(false);
        return;
      }

      // Login successful, you can redirect or perform other actions here
      console.log('Login successful');
      // Login successful, redirect to the property page
      history.push('/property');
      
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="vh-100 bg-image" style={{ backgroundImage: "url('./images/list/p-4.png')" }}>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                <div className="card-body p-5 text-center">

                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">Please enter your login and password!</p>

                    <div>
                      <div className="form-outline form-white mb-4">
                        <input
                          type="email"
                          id="typeEmailX"
                          placeholder="Email"
                          className="form-control form-control-lg"
                          value={email}
                          onChange={handleEmailChange}
                        />
                        <label className="form-label" htmlFor="typeEmailX"></label>
                      </div>

                      <div className="form-outline bg-dark  form-white mb-4">
                        <input
                          type="password"
                          id="typePasswordX"
                          placeholder="Password"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                        <label className="form-label" htmlFor="typePasswordX"></label>
                      </div>

                      {error && <p className="text-danger">{error}</p>}
                      <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="/forgot-password">Forgot password?</a></p>

                      {loading ? (
                        <div className="spinner-border text-light" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        
                      ) : (
                        <button className="btn btn-success btn-block btn-lg gradient-custom-4 text-body bg-dark" onClick={handleSubmit}>Login</button>
                      )}
                    </div>

                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                      <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                      <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                    </div>
                  </div>

                  <div>
                    <p className="mb-0">Don't have an account? <a href="/signup" className="text-white-50 fw-bold">Sign Up</a></p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
