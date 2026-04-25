'use client';
import { useState, useEffect } from 'react';
import { ToolWrapper } from '@/components/tools/ToolWrapper';
import { getToolBySlug } from '@/config/tools';

const tool = getToolBySlug('days-until')!;

const PRESETS = [
  { label: 'New Year', getDate: () => `${new Date().getFullYear() + 1}-01-01` },
  { label: 'Eid al-Fitr 2026', getDate: () => '2026-03-20' },
  { label: 'Christmas', getDate: () => `${new Date().getFullYear()}-12-25` },
  { label: 'Halloween', getDate: () => `${new Date().getFullYear()}-10-31` },
];

interface Countdown { days: number; hours: number; minutes: number; seconds: number; total: number; }

function getCountdown(target: string): Countdown | null {
  if (!target) return null;
  const now = new Date();
  const end = new Date(target);
  const diff = end.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds, total: diff };
}

function DaysUntilTool() {
  const [target, setTarget] = useState('');
  const [countdown, setCountdown] = useState<Countdown | null>(null);

  useEffect(() => {
    if (!target) return;
    const update = () => setCountdown(getCountdown(target));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [target]);

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Target Date</label>
        <input type="date" value={target} onChange={(e) => setTarget(e.target.value)} min={today} className="input-field" />
      </div>

      {/* Quick presets */}
      <div>
        <p className="text-xs text-slate-400 mb-2">Quick select:</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button key={p.label} onClick={() => setTarget(p.getDate())}
              className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-sky-100 dark:bg-slate-800 dark:hover:bg-sky-900/30 text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 rounded-lg transition-colors border border-slate-200 dark:border-slate-700">
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {countdown !== null && (
        countdown.total <= 0 ? (
          <div className="result-box">
            <p className="text-2xl font-bold text-slate-600 dark:text-slate-300">That date has passed!</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'Days', value: countdown.days },
                { label: 'Hours', value: countdown.hours },
                { label: 'Minutes', value: countdown.minutes },
                { label: 'Seconds', value: countdown.seconds },
              ].map(({ label, value }) => (
                <div key={label} className="result-box p-4">
                  <p className="text-3xl sm:text-4xl font-bold text-sky-500 tabular-nums">
                    {String(value).padStart(2, '0')}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{label}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-slate-500">
              That is <strong className="text-slate-700 dark:text-slate-300">{countdown.days.toLocaleString()}</strong> days away
            </p>
          </div>
        )
      )}
    </div>
  );
}

const faqs = [
  { q: 'How many days until Christmas?', a: 'Christmas is on December 25th every year. Enter December 25 of the current year in the date picker to get the exact countdown.' },
  { q: 'How many days until New Year?', a: "New Year's Day is January 1st. Select January 1st of next year for a live countdown to midnight." },
  { q: 'Does the countdown update in real time?', a: 'Yes! The hours, minutes, and seconds update live every second in your browser.' },
];

export default function DaysUntilPage() {
  return (
    <ToolWrapper
      tool={tool}
      faqs={faqs}
      explanation="A “days until” or countdown tool answers one question with precision: how much time is left before a date that matters to you. Pick a target day—holidays, a wedding, a project deadline, exam week, or a product launch—and you will see the gap broken into days, hours, minutes, and seconds so the scale matches how you think about the event. People often search how many days until Christmas, a birthday, or a public holiday; the math is the same: difference between now and the target, shown in friendly units. Presets on this page can speed up common cases, but you can always type any future date. The counter updates in real time in your browser, which makes it satisfying to watch for short-term countdowns, and it is light enough to leave open on a second screen. Use it for planning, motivation, or simply satisfying curiosity about the next long weekend—without installing an app."
    >
      <DaysUntilTool />
    </ToolWrapper>
  );
}
