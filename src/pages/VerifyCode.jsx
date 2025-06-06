import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function VerifyCode() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { verifyCode } = useAuth();
  const navigate = useNavigate();
  const { slug } = useParams();

  const isReady = code.length === 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isReady) return;
    if (verifyCode(code)) {
      navigate(`/verified/${slug}`);
    } else {
      setError('Invalid code, please try again');
    }
  };

  return (
    <section className="max-w-md mx-auto py-20 px-4 text-center">
      <h2 className="text-2xl font-semibold mb-6">Enter Verification Code</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="123456"
          maxLength={6}
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError('');
          }}
          className="w-full text-center tracking-widest text-lg border border-neutral-300 rounded-md py-3 px-4 focus:outline-none"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={!isReady}
          className={`w-full rounded-md py-3 font-medium transition-colors ${
            isReady ? 'bg-cta text-white' : 'bg-cta/40 text-white/60 cursor-not-allowed'
          }`}
        >
          Verify Code →
        </button>
      </form>
      <button
        className="mt-4 text-sm text-brand underline"
        onClick={() => navigate(-1)}
      >
        Use a different email
      </button>
    </section>
  );
} 