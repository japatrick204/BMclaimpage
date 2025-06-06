import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { brands } from '../data/brands';
import genericBanner from '../assets/generic banner.png';

export default function BrandAdmin() {
  const { slug } = useParams();
  const brand = brands.find((b) => b.slug === slug);
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <section className="max-w-4xl mx-auto py-20 px-4 relative">
      {/* hero */}
      <div className="mb-10">
        <img
          src={genericBanner}
          alt="brand banner"
          className="w-full object-cover rounded-xl h-[160px] sm:h-[191px]"
        />
        <h1 className="text-3xl font-semibold mt-6 mb-12">{brand?.name}</h1>
      </div>
      {showWelcome && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-canvas rounded-lg shadow-xl p-10 max-w-md w-full text-center relative">
            <button
              className="absolute top-3 right-4 text-2xl"
              onClick={() => setShowWelcome(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-semibold mb-4">Welcome!</h2>
            <p className="text-neutral-700 mb-6">
              You now have full control of your Brandmarch profile.
            </p>
            <button
              className="btn-black w-full py-3 rounded-md text-white font-medium"
              onClick={() => setShowWelcome(false)}
            >
              Get started
            </button>
          </div>
        </div>
      )}
    </section>
  );
} 