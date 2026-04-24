'use client';
import { useState, useCallback } from 'react';
import { ToolWrapper } from '@/components/tools/ToolWrapper';
import { getToolBySlug } from '@/config/tools';

const tool = getToolBySlug('password-generator')!;

const CHARS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{}|;:,.<>?',
};

function getStrength(password: string): { label: string; color: string; width: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  if (score <= 2) return { label: 'Weak', color: 'bg-red-500', width: 'w-1/4' };
  if (score <= 4) return { label: 'Fair', color: 'bg-yellow-500', width: 'w-2/4' };
  if (score <= 5) return { label: 'Strong', color: 'bg-green-500', width: 'w-3/4' };
  return { label: 'Very Strong', color: 'bg-emerald-500', width: 'w-full' };
}

function PasswordTool() {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ upper: true, lower: true, numbers: true, symbols: true });
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    let charset = '';
    if (opts.upper) charset += CHARS.upper;
    if (opts.lower) charset += CHARS.lower;
    if (opts.numbers) charset += CHARS.numbers;
    if (opts.symbols) charset += CHARS.symbols;
    if (!charset) return;
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    setPassword(Array.from(arr).map((n) => charset[n % charset.length]).join(''));
    setCopied(false);
  }, [length, opts]);

  const copy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = password ? getStrength(password) : null;
  const activeOpts = Object.values(opts).filter(Boolean).length;

  return (
    <div className="space-y-5">
      {/* Length */}
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Length</label>
          <span className="text-sm font-bold text-sky-500">{length}</span>
        </div>
        <input type="range" min="6" max="64" value={length} onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-sky-500 cursor-pointer" />
        <div className="flex justify-between text-xs text-slate-400 mt-1"><span>6</span><span>64</span></div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-2">
        {(Object.keys(opts) as Array<keyof typeof opts>).map((key) => (
          <label key={key} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${opts[key] ? 'border-sky-400 bg-sky-50 dark:bg-sky-900/20' : 'border-slate-200 dark:border-slate-700'}`}>
            <input type="checkbox" checked={opts[key]} onChange={(e) => {
              if (!e.target.checked && activeOpts === 1) return; // keep at least one
              setOpts((o) => ({ ...o, [key]: e.target.checked }));
            }} className="accent-sky-500 w-4 h-4" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 capitalize">{key}</span>
          </label>
        ))}
      </div>

      <button onClick={generate} className="btn-primary">Generate Password</button>

      {password && (
        <div className="space-y-3">
          <div className="result-box relative">
            <p className="font-mono text-lg break-all text-slate-800 dark:text-slate-200 pr-8">{password}</p>
            <button onClick={copy}
              className="absolute top-3 right-3 text-slate-400 hover:text-sky-500 transition-colors"
              aria-label="Copy password">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={copied ? 'M5 13l4 4L19 7' : 'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'} />
              </svg>
            </button>
            {copied && <p className="text-xs text-green-500 mt-2">Copied to clipboard!</p>}
          </div>

          {strength && (
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-500">Strength</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">{strength.label}</span>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${strength.color} ${strength.width}`} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const faqs = [
  { q: 'How are passwords generated?', a: "Passwords are generated using the browser's built-in crypto.getRandomValues() — a cryptographically secure random number generator. This means truly random, unpredictable passwords." },
  { q: 'Are my generated passwords stored?', a: 'No. Passwords are generated entirely in your browser and are never sent to any server. We have zero access to what you generate.' },
  { q: 'How long should my password be?', a: 'Security experts recommend at least 12-16 characters. Longer is always better. For critical accounts, use 20+ characters.' },
  { q: 'Should I use a password manager?', a: 'Yes! A password manager like Bitwarden (free) or 1Password can store your generated passwords securely so you never have to remember them.' },
];

export default function PasswordGeneratorPage() {
  return (
    <ToolWrapper tool={tool} faqs={faqs} explanation="Generate strong, cryptographically random passwords using your browser's secure random API. Customize length and character types, then copy with one click. Your passwords are never stored or transmitted.">
      <PasswordTool />
    </ToolWrapper>
  );
}
