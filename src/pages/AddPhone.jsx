import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddPhone() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [stage, setStage] = useState(1);
  const [code, setCode] = useState('');

  const phoneValid = phone.trim().length >= 10;
  const codeValid = code.trim().length >= 5;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (stage === 1) {
      if (!phoneValid) return;
      setStage(2);
    } else {
      if (!codeValid) return;
      navigate(`/brand/${slug}`);
    }
  };

  return (
    <section className="max-w-lg mx-auto py-24 px-4">
      <h1 className="text-3xl font-semibold mb-8">Add a mobile phone for easy login</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="phone">
            Mobile phone
          </label>
          <input
            id="phone"
            name="phone"
            placeholder="(123) - 456 - 7890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-neutral-300 rounded-md py-3 px-4 focus:outline-none"
          />
        </div>
        {stage === 1 && (
          <button
            type="submit"
            disabled={!phoneValid}
            className={`w-full rounded-md py-3 font-medium transition-colors ${
              phoneValid
                ? 'bg-brand text-white'
                : 'bg-brand/20 text-white/60 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        )}

        {stage === 2 && (
          <>
            <p className="mt-8 text-sm text-neutral-700">
              We sent a code to your phone number, enter it below to confirm.
            </p>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="code">
                Enter code
              </label>
              <input
                id="code"
                name="code"
                placeholder="XXXXX"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full border border-neutral-300 rounded-md py-3 px-4 focus:outline-none"
              />
              <button type="button" className="mt-2 text-sm underline">
                Didn't receive a code?
              </button>
            </div>
            <button
              type="submit"
              disabled={!codeValid}
              className={`mt-6 w-full rounded-md py-3 font-medium transition-colors ${
                codeValid
                  ? 'bg-brand text-white'
                  : 'bg-brand/20 text-white/60 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </>
        )}
      </form>
    </section>
  );
} 