import { useParams, useNavigate } from 'react-router-dom';
import { brands } from '../data/brands';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import genericBanner from '../assets/generic-banner.png';

export default function BrandDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const brand = brands.find((b) => b.slug === slug);
  const { sendVerificationCode } = useAuth();
  const [showVerify, setShowVerify] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  if (!brand) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-semibold">Brand not found</h2>
      </div>
    );
  }

  const bannerSrc =
    !brand.images || !brand.images[0] || brand.images[0].startsWith('http')
      ? genericBanner
      : brand.images[0];

  return (
    <section className="max-w-4xl mx-auto pt-10 sm:pt-12 px-4 pb-12">
      <h1 className="text-3xl font-semibold mb-6 text-left">{brand.name}</h1>
      {/* Hero card */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <img
          src={bannerSrc}
          alt={brand.name}
          className="w-full h-[160px] sm:h-[191px] object-cover"
        />
        {/* stats */}
        <div className="grid grid-cols-3 divide-x divide-neutral-200 text-center">
          <div className="py-4">
            <p className="text-sm font-medium text-neutral-500">Visits: 24hrs</p>
            <p className="font-semibold text-lg mt-1">{brand.visits}</p>
          </div>
          <div className="py-4">
            <p className="text-sm font-medium text-neutral-500">No. of stores</p>
            <p className="font-semibold text-lg mt-1">{brand.stores}</p>
          </div>
          <div className="py-4">
            <p className="text-sm font-medium text-neutral-500">Avg. store size</p>
            <p className="font-semibold text-lg mt-1">{brand.avgStoreSize}</p>
          </div>
        </div>
      </div>

      {/* Feature highlights */}
      <div className="mt-12 space-y-6 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-8 sm:text-center text-left">
        {[
          {
            title: 'Update your store openings',
            desc: 'Control your site criteria and expansion timeline',
          },
          {
            title: 'Control your visibility',
            desc: 'Manage how your brand appears to the industry',
          },
          {
            title: 'Track Interest',
            desc: 'See which brokers and landlords are interested',
          },
        ].map((f) => (
          <div key={f.title} className="flex gap-3 sm:block sm:mx-auto">
            <span className="text-brand text-lg mt-1 sm:hidden">✔</span>
            <div className="space-y-1 sm:space-y-2">
              <h3 className="font-semibold sm:text-center">{f.title}</h3>
              <p className="text-sm text-neutral-600 max-w-xs sm:mx-auto">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button
          className="px-8 py-3 rounded-md bg-cta text-white font-medium"
          onClick={() => setShowVerify(true)}
        >
          Take control of this page
        </button>
      </div>

      {showVerify && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-canvas rounded-lg shadow-lg w-full max-w-md p-8 relative">
            <button
              className="absolute top-2 right-3 text-xl text-brand"
              onClick={() => setShowVerify(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Verify Your Identity
            </h2>
            <p className="text-neutral-600 mb-6 text-center">
              We'll send a verification code to prove you work at {brand.name}.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!email) {
                  setError('Please enter your email');
                  return;
                }
                sendVerificationCode(email);
                navigate(`/verify-code/${slug}`);
              }}
              className="space-y-4"
            >
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
                disabled={email.trim()===''}
                className={`w-full rounded-md py-3 font-medium transition-colors ${
                  email.trim() !== ''
                    ? 'bg-cta text-white'
                    : 'bg-cta/40 text-white/60 cursor-not-allowed'
                }`}
              >
                Send Verification Code →
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
} 