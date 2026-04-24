'use client';
import { useState, useEffect } from 'react';
import { ToolWrapper } from '@/components/tools/ToolWrapper';
import { getToolBySlug } from '@/config/tools';

const tool = getToolBySlug('ip-address')!;

interface IPData {
  ip: string;
  city: string;
  region: string;
  country: string;
  country_name: string;
  org: string;
  timezone: string;
  latitude: number;
  longitude: number;
}

function IPTool() {
  const [data, setData] = useState<IPData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/api/ip')
      .then((r) => r.json())
      .then((d) => { if (d.success) setData(d.data); else setError('Could not detect IP address.'); })
      .catch(() => setError('Network error. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  const copy = () => {
    if (data?.ip) {
      navigator.clipboard.writeText(data.ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) return (
    <div className="space-y-4 animate-pulse">
      <div className="h-20 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
      <div className="grid grid-cols-2 gap-3">
        {[...Array(6)].map((_, i) => <div key={i} className="h-16 bg-slate-100 dark:bg-slate-800 rounded-xl" />)}
      </div>
    </div>
  );

  if (error) return <p className="text-red-500">{error}</p>;

  const fields = data ? [
    { label: 'City', value: data.city },
    { label: 'Region', value: data.region },
    { label: 'Country', value: `${data.country_name} (${data.country})` },
    { label: 'ISP / Org', value: data.org },
    { label: 'Timezone', value: data.timezone },
    { label: 'Coordinates', value: `${data.latitude?.toFixed(4)}, ${data.longitude?.toFixed(4)}` },
  ] : [];

  return (
    <div className="space-y-5">
      {data && (
        <>
          <div className="result-box">
            <p className="text-sm text-slate-500 mb-2">Your Public IP Address</p>
            <p className="text-4xl font-bold text-sky-500 font-mono tracking-wide">{data.ip}</p>
            <button
              onClick={copy}
              className="mt-3 text-sm text-slate-500 hover:text-sky-500 transition-colors flex items-center gap-1 mx-auto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={copied ? 'M5 13l4 4L19 7' : 'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'} />
              </svg>
              {copied ? 'Copied!' : 'Copy IP'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {fields.map(({ label, value }) => (
              <div key={label} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">{label}</p>
                <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm truncate">{value || '—'}</p>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <p className="text-xs text-amber-700 dark:text-amber-400">
              🔒 Your IP address is visible to every website you visit. Use a VPN to hide it.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

const faqs = [
  { q: 'What is an IP address?', a: 'An IP (Internet Protocol) address is a unique numerical label assigned to each device connected to the internet. It acts like a home address, allowing data to be sent to and from your device.' },
  { q: 'Can websites see my IP address?', a: 'Yes. Every website you visit can see your public IP address. This is how they deliver content back to you. A VPN can mask your real IP address.' },
  { q: 'What is the difference between IPv4 and IPv6?', a: 'IPv4 addresses look like 192.168.1.1 (four numbers separated by dots). IPv6 addresses are longer and use hexadecimal. IPv6 was created because we ran out of IPv4 addresses.' },
  { q: 'Is my IP address location accurate?', a: 'IP geolocation is approximate. It typically identifies your city or region, but not your exact street address. Accuracy varies by ISP and region.' },
];

export default function IPAddressPage() {
  return (
    <ToolWrapper tool={tool} faqs={faqs} explanation="Your public IP address is what websites and servers see when you connect to the internet. This tool instantly shows your IP address along with your approximate location, ISP, and timezone — all detected automatically.">
      <IPTool />
    </ToolWrapper>
  );
}
