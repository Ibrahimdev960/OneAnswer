'use client';
import { useState } from 'react';
import { ToolWrapper } from '@/components/tools/ToolWrapper';
import { getToolBySlug } from '@/config/tools';

const tool = getToolBySlug('age-calculator')!;

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  nextBirthday: number;
  dayOfWeek: string;
}

function calculateAge(dob: string): AgeResult | null {
  if (!dob) return null;
  const birth = new Date(dob);
  const now = new Date();
  if (birth > now) return null;

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) { years--; months += 12; }

  const totalDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;

  const nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBday <= now) nextBday.setFullYear(now.getFullYear() + 1);
  const nextBirthday = Math.ceil((nextBday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  const dayOfWeek = birth.toLocaleDateString('en-US', { weekday: 'long' });

  return { years, months, days, totalDays, totalHours, totalMinutes, nextBirthday, dayOfWeek };
}

function AgeCalculatorTool() {
  const [dob, setDob] = useState('');
  const [result, setResult] = useState<AgeResult | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    if (!dob) { setError('Please enter your date of birth.'); return; }
    const res = calculateAge(dob);
    if (!res) { setError('Date of birth cannot be in the future.'); return; }
    setResult(res);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Date of Birth
        </label>
        <input
          type="date"
          value={dob}
          onChange={(e) => { setDob(e.target.value); setResult(null); }}
          max={today}
          className="input-field"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button onClick={handleCalculate} className="btn-primary">
        Calculate My Age
      </button>

      {result && (
        <div className="space-y-4">
          <div className="result-box">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">You are</p>
            <p className="text-5xl font-bold text-sky-500">{result.years}</p>
            <p className="text-xl font-semibold text-slate-700 dark:text-slate-300">years old</p>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              {result.months} months and {result.days} days
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Total Days', value: result.totalDays.toLocaleString() },
              { label: 'Total Hours', value: result.totalHours.toLocaleString() },
              { label: 'Total Minutes', value: result.totalMinutes.toLocaleString() },
              { label: 'Days to Birthday', value: result.nextBirthday.toString() },
            ].map(({ label, value }) => (
              <div key={label} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 text-center">
                <p className="text-xl font-bold text-slate-900 dark:text-white">{value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{label}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
            You were born on a <span className="font-semibold text-slate-700 dark:text-slate-300">{result.dayOfWeek}</span>
          </p>
        </div>
      )}
    </div>
  );
}

const faqs = [
  { q: 'How is my exact age calculated?', a: 'Your age is calculated by subtracting your date of birth from today\'s date, accounting for leap years and varying month lengths to give you the exact years, months, and days.' },
  { q: 'How many days old am I?', a: 'The total number of days is calculated by finding the difference in milliseconds between your birth date and today, then dividing by the number of milliseconds in a day.' },
  { q: 'When is my next birthday?', a: 'The days until your next birthday are counted from today to your upcoming birthday date in the current or next year.' },
  { q: 'What day of the week was I born?', a: 'This is determined using JavaScript\'s Date API which can accurately calculate the day of the week for any historical date.' },
];

const explanation =
  'Use this age calculator when you need your exact age from date of birth—not just years, but months, days, hours, and minutes where it matters. Enter your birthday once and you get a clear breakdown that respects leap years and month lengths, which is why “how old am I” searches deserve more than a rough guess. The tool also shows how many days remain until your next birthday and which day of the week you were born, common questions people pair with age in days or “date of birth calculator” lookups. Parents checking kids’ ages, forms that ask for age in years and months, and curiosity about milestones all fit here. Everything runs in your browser: your birth date is not stored on our servers, so you can use it as a private date of birth calculator. Whether you say age calculator, how old am I, or count my age in days, the goal is the same—one place, instant results, and wording you can read at a glance.';

export default function AgeCalculatorPage() {
  return (
    <ToolWrapper tool={tool} faqs={faqs} explanation={explanation}>
      <AgeCalculatorTool />
    </ToolWrapper>
  );
}
