import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './otp.css';

const OTPVerification = () => {
  const [isButtonActive, setButtonActive] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);

  const inputs = useRef([]);

  useEffect(() => {
    // Set focus to the first input on component mount
    inputs.current[0].focus();
  }, []);

  const handleInputChange = (index, e) => {
    const newOtpValues = [...otpValues];
    const currentInput = e.target;
    const nextInput = inputs.current[index + 1];
    const prevInput = inputs.current[index - 1];

    // Allow only numbers in the input
    const inputValue = e.target.value.replace(/\D/g, "");
    currentInput.value = inputValue;
    newOtpValues[index] = inputValue;

    // If the current input is not the last one, enable the next input
    if (index < otpValues.length - 1 && inputValue !== "") {
      nextInput.removeAttribute("disabled");
      nextInput.focus();
    }

    // If Backspace is pressed, disable the current input and focus on the previous one
    if (e.key === "Backspace" && prevInput) {
      currentInput.setAttribute("disabled", true);
      prevInput.focus();
    }

    setOtpValues(newOtpValues);
    setButtonActive(newOtpValues.every((value) => value !== ""));
  };

  const handleVerifyClick = () => {
    // Handle verification logic here
    console.log("Verifying...", otpValues);
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
                {otpValues.map((value, index) => (
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

              <button className={`btn btn-primary mb-3 ${isButtonActive ? "active" : ""}`} onClick={handleVerifyClick}>
                Verify
              </button>

              <p className="resend text-muted mb-0">
                Didn't receive code? <a href="#">Request again</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OTPVerification;
