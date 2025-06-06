import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { brands } from '../data/brands';
import logo1 from '../assets/logo1.svg';
import logo2 from '../assets/logo2.svg';
import logo3 from '../assets/logo3.svg';
import logo4 from '../assets/logo4.svg';
import logo5 from '../assets/logo5.svg';
import logo6 from '../assets/logo6.svg';
import logo7 from '../assets/logo7.svg';
import logo8 from '../assets/logo8.svg';
import logo9 from '../assets/logo9.svg';
import logo10 from '../assets/logo10.svg';

export default function Landing() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const [showAdd, setShowAdd] = useState(false);
  const [newBrand, setNewBrand] = useState({ name: '', website: '', city: '', state: '' });

  const filtered =
    query.length === 0
      ? []
      : brands.filter((b) =>
          b.name.toLowerCase().includes(query.toLowerCase())
        );

  const handleSelect = (brand) => {
    navigate(`/claim/${brand.slug}`);
  };

  const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10].filter((_, idx) => idx !== 0 && idx !== 8);

  return (
    <>
    <section className="max-w-xl mx-auto pt-24 sm:pt-40 pb-9 px-4 text-center">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-4">
        Put your best store forward
      </h1>
      <p className="text-brand font-light mb-8">
        When landlords and brokers search for your brand, make sure they see the
        right expansion plans, site criteria, and key contacts.
      </p>
      <div className="relative">
        <input
          type="search"
          placeholder="Find your brand or store"
          className="w-full bg-[#FBFBF9] border-2 border-white rounded-full py-3 pl-5 pr-14 focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-brand flex items-center justify-center"
          aria-label="search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="w-6 h-6 fill-white"
          >
            <path d="M40.9 39.485 33.087 31.673a14.878 14.878 0 0 0 3.72-9.865c0-4.007-1.56-7.774-4.393-10.607s-6.6-4.393-10.606-4.393S14.034 8.368 11.2 11.2s-4.393 6.6-4.393 10.607 1.56 7.773 4.393 10.606 6.6 4.394 10.607 4.394c3.67 0 7.13-1.323 9.865-3.721l7.812 7.812a.997.997 0 0 0 1.414 0 1 1 0 0 0 0-1.414ZM12.614 31c-2.455-2.456-3.807-5.72-3.807-9.192s1.352-6.737 3.807-9.193c2.456-2.455 5.72-3.807 9.193-3.807S28.544 10.16 31 12.615c2.455 2.456 3.808 5.72 3.808 9.193S33.455 28.544 31 31c-2.456 2.455-5.72 3.808-9.192 3.808S15.07 33.455 12.615 31Z" />
          </svg>
        </button>
        {query && filtered.length === 0 && (
          <div className="absolute left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-md shadow-lg text-left z-10">
            <button
              className="w-full text-left px-4 py-3 hover:bg-neutral-100 flex gap-1"
              onClick={() => setShowAdd(true)}
            >
              Brand not here? <span className="underline">Add it to get started</span>.
            </button>
          </div>
        )}
        {filtered.length > 0 && (
          <ul className="absolute left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-md shadow-lg text-left z-10 max-h-60 overflow-auto">
            {filtered.map((b) => (
              <li
                key={b.slug}
                className="px-4 py-2 hover:bg-neutral-100 cursor-pointer"
                onClick={() => handleSelect(b)}
              >
                {b.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="mt-16 text-brand font-light text-center">
        <span className="inline-flex items-center gap-2 whitespace-nowrap">
          <span className="inline-block bg-cta text-white font-semibold px-2 py-0.5 rounded">1,200+</span>
          brands
        </span>
        &nbsp;are now on Brandmarch. Join them!
      </p>
    </section>

    <div className="mb-9 flex flex-wrap items-center justify-center gap-8 grayscale opacity-40 filter brightness-125 px-4">
      {logos.map((src) => (
        <img key={src} src={src} alt="brand logo" className="h-8 w-auto" />
      ))}
    </div>

    {showAdd && (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-canvas rounded-lg shadow-xl p-6 sm:p-8 w-[90%] max-w-md relative">
          <button className="absolute top-2 right-3 text-xl" onClick={()=>setShowAdd(false)}>×</button>
          <h2 className="text-2xl font-semibold mb-2 text-center">Add your brand</h2>
          <p className="text-neutral-600 mb-6 text-center">Add a few details about your brand to get started.</p>
          <form className="space-y-4" onSubmit={(e)=>{e.preventDefault();navigate(`/verify/`+newBrand.name.toLowerCase().replace(/\s+/g,'-'));}}>
            <input
              placeholder="Name"
              className="w-full border border-neutral-300 rounded-md py-3 px-4 focus:outline-none"
              value={newBrand.name}
              onChange={e=>setNewBrand({...newBrand,name:e.target.value})}
            />
            <input
              placeholder="Website"
              className="w-full border border-neutral-300 rounded-md py-3 px-4 focus:outline-none"
              value={newBrand.website}
              onChange={e=>setNewBrand({...newBrand,website:e.target.value})}
            />
            <div className="flex gap-4">
              <input
                placeholder="City"
                className="flex-1 border border-neutral-300 rounded-md py-3 px-4 focus:outline-none"
                value={newBrand.city}
                onChange={e=>setNewBrand({...newBrand,city:e.target.value})}
              />
              <input
                placeholder="State"
                className="w-24 border border-neutral-300 rounded-md py-3 px-4 focus:outline-none"
                value={newBrand.state}
                onChange={e=>setNewBrand({...newBrand,state:e.target.value})}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-cta text-white py-3 font-medium disabled:bg-cta/40"
              disabled={newBrand.name.trim()===''}
            >
              Next
            </button>
          </form>
        </div>
      </div>
    )}
    </>
  );
} 