import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function VerifyIdentity() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loginMode, setLoginMode] = useState(false);
  const navigate = useNavigate();
  const { slug } = useParams();
  const { sendVerificationCode } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginMode) {
      if (!phone.trim()) {
        setError('Please enter your phone number');
        return;
      }
      navigate(`/verify-code/${slug}`);
    } else {
      if (!email.trim()) {
        setError('Please enter your email');
        return;
      }
      sendVerificationCode(email);
      navigate(`/verify-code/${slug}`);
    }
  };

  return (
    <section className="max-w-md mx-auto py-20 px-4 text-center">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {loginMode ? 'Welcome back' : 'Verify Your Identity'}
      </h2>
      <p className="text-neutral-600 mb-6 text-center">
        {loginMode
          ? 'Enter your phone number below to login to your account'
          : `We'll send a verification code to prove you work at ${slug.replace('-', ' ')}.`}
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!loginMode ? (
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
        ) : (
          <input
            type="tel"
            placeholder="(XXX) - XXX - XXXX"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setError('');
            }}
            className="w-full border border-neutral-300 rounded-md py-3 px-4 focus:outline-none"
          />
        )}
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-md bg-cta text-white py-3 font-medium"
        >
          {loginMode ? 'Next' : 'Send Verification Code →'}
        </button>
      </form>
      <p className="mt-6 text-sm text-center">
        {loginMode ? (
          <>
            Not you?{' '}
            <button className="underline" onClick={()=>setLoginMode(false)}>Go back</button>
          </>
        ) : (
          <>
            Already a member?{' '}
            <button className="underline" onClick={()=>{setLoginMode(true);setError('');}}>
              Log in
            </button>
          </>
        )}
      </p>
    </section>
  );
} 