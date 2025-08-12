import React from 'react';

const ThankYouPage = () => {
  return (
    <div>
      <style>{`
       

        .thank-you-container {
          background-color: var(--dark-bg);
          color: var(--light-text);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2rem;
          text-align: center;
        }

        .thank-you-box {
          background-color: var(--section-bg);
          padding: 3rem 2rem;
          border-radius: 12px;
          box-shadow: var(--shadow-light);
          max-width: 500px;
          width: 100%;
          transition: all 0.3s ease;
        }

        .thank-you-box:hover {
          transform: translateY(-5px);
        }

        .thank-you-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: var(--primary);
        }

        .thank-you-message {
          font-size: 1.1rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
        }

        .home-btn {
          background-color: var(--primary);
          color: var(--dark-text);
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .home-btn:hover {
          background-color: var(--primary-hover);
        }
      `}</style>

      <div className="thank-you-container">
        <div className="thank-you-box">
          <h1 className="thank-you-title">Thank You!</h1>
          <p className="thank-you-message">
            We appreciate your action. You’re all set!
          </p>
          <a href="/" className="home-btn">Return to Home</a>
        </div>
      </div>
    </div>
  );
};



export default ThankYouPage;
