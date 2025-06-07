import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { brands } from '../data/brands';

function RoleSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);

  const options = [
    { v: 'broker', label: "I'm a broker" },
    { v: 'owner', label: 'I work for an owner or developer' },
    { v: 'brand', label: 'I work for a brand' },
    { v: 'other', label: "I'm in Retail Real Estate but do something else" },
  ];

  const current = options.find((o) => o.v === value);

  return (
    <div className="relative">
      <button
        type="button"
        ref={btnRef}
        onClick={() => setOpen(!open)}
        className="w-full border border-neutral-300 rounded-md py-3 px-4 text-left bg-white focus:outline-none"
      >
        {current ? current.label : 'Select here'}
        <span className="float-right">▾</span>
      </button>
      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-neutral-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((o) => (
            <li
              key={o.v}
              onClick={() => {
                onChange(o.v);
                setOpen(false);
              }}
              className={`px-4 py-3 cursor-pointer hover:bg-cta hover:text-white ${
                o.v === value ? 'bg-cta text-white' : ''
              }`}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Onboarding() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const brand = brands.find((b) => b.slug === slug);
  const defaultCompany = brand
    ? brand.name
    : slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

  const [form, setForm] = useState({ first: '', last: '', company: defaultCompany, role: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const isComplete =
    form.first.trim() && form.last.trim() && form.company.trim() && form.role;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isComplete) return;
    navigate(`/onboarding-phone/${slug}`);
  };

  return (
    <section className="max-w-2xl mx-auto py-24 px-4">
      <h1 className="text-3xl font-semibold mb-3">Tell us about you</h1>
      <p className="text-neutral-700 mb-10">
        We need a few more details from you to complete sign&nbsp;up.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="first">
              First name
            </label>
            <input
              id="first"
              name="first"
              placeholder="Enter first name"
              value={form.first}
              onChange={handleChange}
              className="w-full border border-neutral-300 rounded-md py-3 px-4 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="last">
              Last name
            </label>
            <input
              id="last"
              name="last"
              placeholder="Enter last name"
              value={form.last}
              onChange={handleChange}
              className="w-full border border-neutral-300 rounded-md py-3 px-4 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="company">
            Company
          </label>
          <input
            id="company"
            name="company"
            placeholder="Enter company name"
            value={form.company}
            onChange={handleChange}
            className="w-full border border-neutral-300 rounded-md py-3 px-4 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="role">
            What do you do?
          </label>
          <RoleSelect
            value={form.role}
            onChange={(v) => setForm({ ...form, role: v })}
          />
        </div>

        <button
          type="submit"
          disabled={!isComplete}
          className={`w-full rounded-md py-3 font-medium transition-colors ${
            isComplete
              ? 'bg-brand text-white'
              : 'bg-brand/20 text-white/60 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </form>
    </section>
  );
} 