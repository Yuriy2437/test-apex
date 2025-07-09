'use client';
import { useState } from 'react';
import LoginForm from './LoginForm';

export default function MainScreen() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundImage: 'url(/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        animation: 'zoom 6s infinite alternate',
      }}
    >
      <style jsx global>{`
        @keyframes zoom {
          0% {
            background-size: 100% 100%;
          }
          100% {
            background-size: 110% 110%;
          }
        }
      `}</style>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'brightness(0.8)',
        }}
      >
        <h1
          style={{
            color: '#00CED1',
            fontWeight: 'bold',
            fontSize: '3rem',
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          APEX TEST ADMIN SAAS
        </h1>
        {!showLogin ? (
          <button
            style={{
              background: 'red',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              padding: '1rem 3rem',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
            }}
            onClick={() => setShowLogin(true)}
          >
            ENTER
          </button>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
}
