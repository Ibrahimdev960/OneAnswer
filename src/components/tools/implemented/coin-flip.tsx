'use client';
import { useState } from 'react';
import { ToolWrapper } from '@/components/tools/ToolWrapper';
import { getToolBySlug } from '@/config/tools';

const tool = getToolBySlug('coin-flip')!;

function CoinFlipTool() {
  const [result, setResult] = useState<'heads' | 'tails' | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [history, setHistory] = useState<('heads' | 'tails')[]>([]);

  const flip = () => {
    setFlipping(true);
    setResult(null);
    setTimeout(() => {
      const r = Math.random() < 0.5 ? 'heads' : 'tails';
      setResult(r);
      setHistory((h) => [r, ...h].slice(0, 10) as ('heads' | 'tails')[]);
      setFlipping(false);
    }, 800);
  };

  const heads = history.filter((h) => h === 'heads').length;
  const tails = history.filter((h) => h === 'tails').length;

  return (
    <div className="space-y-6 text-center">
      {/* Coin */}
      <div
        className={`w-40 h-40 mx-auto rounded-full flex items-center justify-center text-6xl shadow-lg transition-all duration-300 cursor-pointer select-none
          ${flipping ? 'animate-spin scale-110' : 'hover:scale-105'}
          ${result === 'heads' ? 'bg-amber-100 dark:bg-amber-900/40 border-4 border-amber-400' : result === 'tails' ? 'bg-slate-100 dark:bg-slate-800 border-4 border-slate-400' : 'bg-slate-50 dark:bg-slate-800 border-4 border-slate-300 dark:border-slate-700'}
        `}
        onClick={!flipping ? flip : undefined}
      >
        {flipping ? '🪙' : result === 'heads' ? '👑' : result === 'tails' ? '🦅' : '🪙'}
      </div>

      {result && !flipping && (
        <div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white capitalize">{result}!</p>
          <p className="text-sm text-slate-400 mt-1">Click the coin or button to flip again</p>
        </div>
      )}

      {!result && !flipping && (
        <p className="text-slate-400 text-sm">Click the coin or button below to flip</p>
      )}

      <button onClick={flip} disabled={flipping} className="btn-primary">
        {flipping ? 'Flipping...' : 'Flip Coin'}
      </button>

      {history.length > 0 && (
        <div className="text-left space-y-3">
          <div className="flex gap-4 justify-center text-sm">
            <span className="text-amber-600 font-semibold">👑 Heads: {heads}</span>
            <span className="text-slate-600 dark:text-slate-400 font-semibold">🦅 Tails: {tails}</span>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-2">Last 10 flips:</p>
            <div className="flex gap-2 flex-wrap">
              {history.map((h, i) => (
                <span key={i} className={`text-xs px-2 py-1 rounded-full font-medium ${h === 'heads' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                  {h === 'heads' ? 'H' : 'T'}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const faqs = [
  { q: 'Is this coin flip truly random?', a: "Yes! This uses JavaScript's Math.random() function which generates a pseudorandom number. Each flip has an exactly 50% chance of heads or tails." },
  { q: 'Can I use this for making decisions?', a: 'Absolutely! Coin flips are a classic way to make quick decisions. The result is completely fair and unbiased.' },
  { q: 'What do heads and tails represent?', a: "Heads and tails are the two possible outcomes of a fair coin. Many people assign 'yes' to one side and 'no' to the other before flipping—just decide your mapping first so the result is clear." },
];

export default function CoinFlipPage() {
  return (
    <ToolWrapper
      tool={tool}
      faqs={faqs}
      explanation="A virtual coin flip gives you a fair, fast outcome when you need a random choice without carrying change. This online coin flip uses your browser’s random number generation so each spin is independent, with a true fifty-fifty split between heads and tails. Use it to settle who goes first, pick between two options, or add a little chance to board games and parties. The running counts and last-ten flips help you see that results balance out over many tries—helpful if you are demonstrating probability or just like tracking streaks. Nothing is sent to a server: the flip runs entirely on your device, so it is quick even on mobile. Whether you call it a coin toss, a heads-or-tails picker, or a simple random decider, you get an instant answer with one tap, no signup, and no clutter."
    >
      <CoinFlipTool />
    </ToolWrapper>
  );
}
