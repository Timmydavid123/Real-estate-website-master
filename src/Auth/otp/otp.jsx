import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './otp.css';

const OTPVerification = () => {
  const history = useHistory();
  const [isButtonActive, setButtonActive] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(60);
  const [isResendDisabled, setResendDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputs = useRef([]);

  useEffect(() => {
    inputs.current[0].focus();
  }, []);

  useEffect(() => {
    setResendDisabled(resendTimer > 0);

    const interval = setInterval(() => {
      setResendTimer((prevTimer) => Math.max(prevTimer - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleInputChange = (index, e) => {
    const newOtpValues = [...otpValues];
    const currentInput = e.target;
    const nextInput = inputs.current[index + 1];
    const prevInput = inputs.current[index - 1];
  
    const inputValue = e.target.value.replace(/\D/g, "");
    currentInput.value = inputValue;
    newOtpValues[index] = inputValue;
  
    if (index < otpValues.length - 1 && inputValue !== "") {
      nextInput && nextInput.removeAttribute("disabled");
      nextInput && nextInput.focus();
    }
  
    if (e.key === "Backspace" && prevInput) {
      prevInput.removeAttribute("disabled");
      prevInput.focus();
    }
  
    setOtpValues(newOtpValues);
    setButtonActive(newOtpValues.every((value) => value !== ""));
  };  

  const showToast = (message, type = 'error') => {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const verifyOTP = async () => {
    try {
      setLoading(true);

      // Make an API call to verify the OTP on the backend
      const response = await fetch('https://backendweb-0kwi.onrender.com/api/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: otpValues.join('') }),
      });

      if (response.ok) {
        history.push("/login");
      } else {
        const responseData = await response.json();
        showToast(responseData.message, 'error');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      showToast('An error occurred during OTP verification.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    try {
      setLoading(true);

      // Make an API call to your backend to resend the OTP
      const response = await fetch('https://backendweb-0kwi.onrender.com/api/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'user@example.com' }),
      });

      if (response.ok) {
        setResendTimer(60);
        showToast('OTP resent successfully', 'success');
      } else {
        const responseData = await response.json();
        showToast(responseData.message, 'error');
      }
    } catch (error) {
      console.error('Error during OTP resend:', error);
      showToast('An error occurred during OTP resend.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container-fluid bg-body-tertiary d-block">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4" style={{ minWidth: "500px" }}>
          <div className="card bg-white mb-5 mt-5 border-0" style={{ boxShadow: "0 12px 15px rgba(0, 0, 0, 0.02)" }}>
            <div className="card-body p-5 text-center">
              <h4>Verify</h4>
              <p>Your code was sent to you via email</p>

              <div className="otp-field mb-4">
              {otpValues.slice(0, 4).map((value, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputs.current[index] = el)}
                    type="number"
                    value={value}
                    onChange={(e) => handleInputChange(index, e)}
                    disabled={index !== 0 && value === ""}
                  />
                ))}
              </div>

              <button className={`btn btn-primary mb-3 ${isButtonActive ? "active" : ""}`} onClick={verifyOTP}>
                {loading ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Verify"
                )}
              </button>

              <button
                className="btn btn-secondary mb-3 ms-2"
                onClick={resendOTP}
                disabled={isResendDisabled || loading}
              >
                {loading ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  `Resend OTP ${isResendDisabled ? `(${resendTimer}s)` : ""}`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default OTPVerification;
