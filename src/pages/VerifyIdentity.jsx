import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function VerifyIdentity() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { slug } = useParams();
  const { sendVerificationCode } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }
    sendVerificationCode(email);
    navigate(`/verify-code/${slug}`);
  };

  return (
    <section className="max-w-md mx-auto py-20 px-4 text-center">
      <h2 className="text-2xl font-semibold mb-6">Verify Your Identity</h2>
      <p className="text-neutral-600 mb-8">
        We&apos;ll send a verification code to prove you work at {slug.replace('-', ' ')}.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
          className="w-full border border-neutral-300 rounded-md py-3 px-4 focus:outline-none"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-md bg-cta text-white py-3 font-medium"
        >
          Send Verification Code →
        </button>
      </form>
    </section>
  );
} 