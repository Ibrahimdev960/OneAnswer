'use client';
import { useState } from 'react';
import { ToolWrapper } from '@/components/tools/ToolWrapper';
import { getToolBySlug } from '@/config/tools';

const tool = getToolBySlug('bmi-calculator')!;

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  advice: string;
}

function getBMI(weight: number, height: number, unit: 'metric' | 'imperial'): BMIResult {
  let bmi: number;
  if (unit === 'metric') {
    const hm = height / 100;
    bmi = weight / (hm * hm);
  } else {
    bmi = (703 * weight) / (height * height);
  }
  bmi = Math.round(bmi * 10) / 10;

  let category = '', color = '', advice = '';
  if (bmi < 18.5) {
    category = 'Underweight'; color = 'text-blue-500';
    advice = 'You are below the healthy weight range. Consider consulting a healthcare provider.';
  } else if (bmi < 25) {
    category = 'Normal weight'; color = 'text-green-500';
    advice = 'You are within the healthy weight range. Keep up the great work!';
  } else if (bmi < 30) {
    category = 'Overweight'; color = 'text-yellow-500';
    advice = 'You are slightly above the healthy weight range. A balanced diet and exercise can help.';
  } else {
    category = 'Obese'; color = 'text-red-500';
    advice = 'You are in the obese range. Consult a healthcare provider for guidance.';
  }
  return { bmi, category, color, advice };
}

function BMITool() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<BMIResult | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    setError('');
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!w || !h || w <= 0 || h <= 0) { setError('Please enter valid weight and height.'); return; }
    if (unit === 'metric' && (h < 50 || h > 300)) { setError('Please enter height in cm (e.g. 175).'); return; }
    setResult(getBMI(w, h, unit));
  };

  const bmiPercent = result ? Math.min(Math.max(((result.bmi - 10) / 30) * 100, 0), 100) : 0;

  return (
    <div className="space-y-5">
      {/* Unit Toggle */}
      <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 w-fit">
        {(['metric', 'imperial'] as const).map((u) => (
          <button
            key={u}
            onClick={() => { setUnit(u); setResult(null); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${unit === u ? 'bg-white dark:bg-slate-700 text-sky-500 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            {u === 'metric' ? 'Metric (kg/cm)' : 'Imperial (lb/in)'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Weight ({unit === 'metric' ? 'kg' : 'lbs'})
          </label>
          <input type="number" value={weight} onChange={(e) => { setWeight(e.target.value); setResult(null); }}
            placeholder={unit === 'metric' ? '70' : '154'} className="input-field" min="1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Height ({unit === 'metric' ? 'cm' : 'inches'})
          </label>
          <input type="number" value={height} onChange={(e) => { setHeight(e.target.value); setResult(null); }}
            placeholder={unit === 'metric' ? '175' : '69'} className="input-field" min="1" />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button onClick={calculate} className="btn-primary">Calculate BMI</button>

      {result && (
        <div className="space-y-4">
          <div className="result-box">
            <p className="text-sm text-slate-500 mb-1">Your BMI</p>
            <p className={`text-5xl font-bold ${result.color}`}>{result.bmi}</p>
            <p className={`text-xl font-semibold mt-1 ${result.color}`}>{result.category}</p>
          </div>

          {/* BMI Scale */}
          <div className="space-y-2">
            <div className="h-3 rounded-full bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-500 relative">
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-slate-700 rounded-full shadow-md transition-all"
                style={{ left: `calc(${bmiPercent}% - 8px)` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Underweight<br />&lt;18.5</span>
              <span className="text-center">Normal<br />18.5–24.9</span>
              <span className="text-center">Overweight<br />25–29.9</span>
              <span className="text-right">Obese<br />&gt;30</span>
            </div>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400 text-center italic">{result.advice}</p>
        </div>
      )}
    </div>
  );
}

const faqs = [
  { q: 'What is a healthy BMI?', a: 'A BMI between 18.5 and 24.9 is considered healthy for most adults. Below 18.5 is underweight, 25–29.9 is overweight, and 30+ is considered obese.' },
  { q: 'Is BMI accurate for everyone?', a: 'BMI is a general screening tool and may not accurately reflect body composition for athletes, elderly people, or those with high muscle mass. Always consult a doctor for a full health assessment.' },
  { q: 'How do I calculate BMI manually?', a: 'BMI = weight (kg) ÷ height (m)². For example, if you weigh 70 kg and are 1.75 m tall: BMI = 70 ÷ (1.75 × 1.75) = 22.9.' },
];

export default function BMIPage() {
  return (
    <ToolWrapper tool={tool} faqs={faqs} explanation="BMI (Body Mass Index) is a measure of body fat based on height and weight. This calculator works for both metric (kg/cm) and imperial (lbs/inches) units and shows you which BMI category you fall into.">
      <BMITool />
    </ToolWrapper>
  );
}
