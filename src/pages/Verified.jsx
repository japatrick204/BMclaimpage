import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Verified() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // kick off progress bar fill
    requestAnimationFrame(() => setProgress(100));
    const timer = setTimeout(() => {
      navigate(`/onboarding/${slug}`);
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate, slug]);

  return (
    <section className="flex items-center justify-center py-40">
      <div className="bg-white shadow rounded-md p-8 text-center w-72">
        <div className="flex justify-center mb-4 text-cta text-3xl">✔</div>
        <h2 className="text-xl font-semibold mb-2">You're Verified!</h2>
        <p className="text-neutral-600 text-sm">
          Redirecting you to your full brand profile...
        </p>
        <div className="mt-6 h-1 w-full bg-transparent overflow-hidden rounded">
          <div
            className="h-full bg-brand transition-all duration-[2000ms] ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </section>
  );
} 