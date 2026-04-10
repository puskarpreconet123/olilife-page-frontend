import React from "react";
import { useAuth } from "../../context/AuthContext";
import ProductCarousel from "../shared/ProductCarousel";

export default function WelcomeScreen({ onNext, onShowSignup, onShowLogin }) {
  const { isLoggedIn, user } = useAuth();

  return (
    <article className="screen active" aria-labelledby="welcomeTitle">
      <div className="wellness-visual" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ProductCarousel variant="hero" />
      </div>
      
      <div className="hero-card">
        <span className="hero-badge">Your wellness reset</span>
        <h1 className="hero-title" id="welcomeTitle">Build your Olilife plan.</h1>
        <p className="hero-copy">
          Answer a few quick questions and we will shape a premium wellness path around your body profile and daily rhythm.
        </p>
      </div>

      {isLoggedIn ? (
        <div className="footer-actions single">
          <button className="btn btn-primary" type="button" onClick={onNext}>
            {user?.onboardingComplete ? "View My Dashboard" : "Continue My Plan"}
          </button>
        </div>
      ) : (
        <>
          <div className="welcome-auth">
            <button className="btn btn-primary" type="button" onClick={onShowSignup}>Sign Up Free</button>
            <button className="btn btn-secondary" type="button" onClick={onShowLogin}>Log In</button>
          </div>
          <div className="footer-actions single">
            <button className="btn btn-subtle" type="button" onClick={onNext}>Continue as Guest</button>
          </div>
        </>
      )}
      <p className="micro-note">A short guided flow designed for a mobile-first experience.</p>
    </article>
  );
}
