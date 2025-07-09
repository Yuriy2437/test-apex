'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await signIn('credentials', {
      redirect: false,
      login,
      password,
    });
    if (res?.ok) {
      // Получаем компанию из токена через session (или из URL, если нужно)
      router.refresh();
      router.push('/' + login); // или используйте session.user.company
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <input
        type='text'
        placeholder='Login'
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        style={{
          background: '#1a237e',
          color: '#FFD700',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '8px',
          padding: '1rem',
          fontSize: '1.2rem',
          width: '250px',
          outline: 'none',
        }}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          background: '#1a237e',
          color: '#FFD700',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '8px',
          padding: '1rem',
          fontSize: '1.2rem',
          width: '250px',
          outline: 'none',
        }}
      />
      <button
        type='submit'
        style={{
          background: 'red',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          padding: '0.8rem 2rem',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
        }}
      >
        ENTER
      </button>
      {error && <div style={{ color: 'red', fontWeight: 'bold' }}>{error}</div>}
    </form>
  );
}
