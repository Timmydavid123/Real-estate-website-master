import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './ThankYou.css'; // Import your CSS file for this component

const ThankYouPage = () => {
  const history = useHistory();

  useEffect(() => {
    // Redirect to the property page after 5 seconds (adjust as needed)
    const redirectTimeout = setTimeout(() => {
      history.push('/property'); // Replace '/property' with the actual path to your property page
    }, 15000);

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(redirectTimeout);
  }, [history]);

  return (
    <div className="thank-you-container">
      <h1 className="thank-you-heading">Thank You for Submitting Your Property!</h1>
      <p className="thank-you-text">
        We appreciate your submission. Please check your email for a confirmation page and further instructions.
      </p>
      {/* Add any additional content or links as needed */}
    </div>
  );
};

export default ThankYouPage;