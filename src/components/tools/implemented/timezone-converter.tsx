'use client';
import { useState, useEffect } from 'react';
import { ToolWrapper } from '@/components/tools/ToolWrapper';
import { getToolBySlug } from '@/config/tools';

const tool = getToolBySlug('timezone-converter')!;

const TIMEZONES = [
  { label: 'UTC', tz: 'UTC' },
  { label: 'New York (EST/EDT)', tz: 'America/New_York' },
  { label: 'Los Angeles (PST/PDT)', tz: 'America/Los_Angeles' },
  { label: 'Chicago (CST/CDT)', tz: 'America/Chicago' },
  { label: 'London (GMT/BST)', tz: 'Europe/London' },
  { label: 'Paris (CET/CEST)', tz: 'Europe/Paris' },
  { label: 'Dubai (GST)', tz: 'Asia/Dubai' },
  { label: 'Karachi (PKT)', tz: 'Asia/Karachi' },
  { label: 'Mumbai (IST)', tz: 'Asia/Kolkata' },
  { label: 'Singapore (SGT)', tz: 'Asia/Singapore' },
  { label: 'Tokyo (JST)', tz: 'Asia/Tokyo' },
  { label: 'Sydney (AEST/AEDT)', tz: 'Australia/Sydney' },
  { label: 'Beijing (CST)', tz: 'Asia/Shanghai' },
  { label: 'Riyadh (AST)', tz: 'Asia/Riyadh' },
  { label: 'Cairo (EET)', tz: 'Africa/Cairo' },
  { label: 'São Paulo (BRT)', tz: 'America/Sao_Paulo' },
  { label: 'Toronto (EST/EDT)', tz: 'America/Toronto' },
  { label: 'Berlin (CET/CEST)', tz: 'Europe/Berlin' },
  { label: 'Moscow (MSK)', tz: 'Europe/Moscow' },
  { label: 'Bangkok (ICT)', tz: 'Asia/Bangkok' },
];

function formatInTZ(date: Date, tz: string) {
  return date.toLocaleString('en-US', {
    timeZone: tz,
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

function TimezoneTool() {
  const [fromTZ, setFromTZ] = useState('Asia/Karachi');
  const [toTZ, setToTZ] = useState('America/New_York');
  const [inputTime, setInputTime] = useState('');
  const [now, setNow] = useState(new Date());

  // Live clock
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const baseDate = inputTime ? new Date(inputTime) : now;
  const isValidDate = !isNaN(baseDate.getTime());

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Date & Time (leave empty for current time)
        </label>
        <input
          type="datetime-local"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
          className="input-field"
        />
        {inputTime && (
          <button onClick={() => setInputTime('')} className="text-xs text-slate-400 hover:text-sky-500 mt-1 transition-colors">
            ✕ Use current time
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">From Timezone</label>
          <select value={fromTZ} onChange={(e) => setFromTZ(e.target.value)} className="input-field">
            {TIMEZONES.map((t) => <option key={t.tz} value={t.tz}>{t.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">To Timezone</label>
          <select value={toTZ} onChange={(e) => setToTZ(e.target.value)} className="input-field">
            {TIMEZONES.map((t) => <option key={t.tz} value={t.tz}>{t.label}</option>)}
          </select>
        </div>
      </div>

      {isValidDate && (
        <div className="space-y-3">
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400 mb-1">{TIMEZONES.find((t) => t.tz === fromTZ)?.label}</p>
            <p className="text-lg font-semibold text-slate-800 dark:text-slate-200 font-mono">
              {formatInTZ(baseDate, fromTZ)}
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
            <span className="mx-3 text-sky-500 font-bold text-lg">↓</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
          </div>

          <div className="result-box">
            <p className="text-xs text-slate-400 mb-1">{TIMEZONES.find((t) => t.tz === toTZ)?.label}</p>
            <p className="text-xl font-bold text-sky-500 font-mono">
              {formatInTZ(baseDate, toTZ)}
            </p>
          </div>
        </div>
      )}

      {/* World clock strip */}
      <div>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">World Clock (Live)</p>
        <div className="grid grid-cols-2 gap-2">
          {['America/New_York', 'Europe/London', 'Asia/Dubai', 'Asia/Karachi', 'Asia/Tokyo', 'Australia/Sydney'].map((tz) => {
            const label = TIMEZONES.find((t) => t.tz === tz)?.label.split(' ')[0];
            return (
              <div key={tz} className="bg-slate-50 dark:bg-slate-800 rounded-lg px-3 py-2 flex items-center justify-between">
                <span className="text-xs text-slate-500">{label}</span>
                <span className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                  {now.toLocaleTimeString('en-US', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: true })}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const faqs = [
  { q: 'How do I convert Pakistani time (PKT) to US time?', a: 'Pakistan Standard Time (PKT) is UTC+5. Eastern US time (EST) is UTC-5, so Pakistan is 10 hours ahead. Use the converter above to get an exact conversion for any date and time.' },
  { q: 'What is UTC?', a: 'UTC (Coordinated Universal Time) is the primary time standard by which the world regulates clocks. It has no daylight saving time and all other timezones are defined as offsets from UTC.' },
  { q: 'Does this account for Daylight Saving Time?', a: 'Yes! The converter uses your browser\'s native timezone database which automatically accounts for DST transitions in regions that observe it.' },
];

export default function TimezoneConverterPage() {
  return (
    <ToolWrapper
      tool={tool}
      faqs={faqs}
      explanation="Scheduling across time zones is the small headache behind every global call: someone says “nine AM Eastern,” someone else thinks in Pacific, and daylight saving flips a few weeks apart between regions. This timezone converter focuses on a pair of locations or offsets so you can line up a meeting or a deadline without a spreadsheet. Built-in world-clock snippets for major cities help you sanity-check the “what time is it in London or Tokyo right now” questions that show up in travel, customer support, and family chats. Searches for timezone converter, convert time zones, and time zone meeting planner come down to the same need—an honest offset that respects IANA rules where data allows. The interface stays compact so you are not wading through ads before you get a time pair. If you are booking life events, add calendar invites with both zones; this page gives you the numbers, your calendar app carries the follow-up. Remember that some regions skip DST entirely, so treat edge dates as a reason to re-check, not a corner to ignore."
    >
      <TimezoneTool />
    </ToolWrapper>
  );
}
