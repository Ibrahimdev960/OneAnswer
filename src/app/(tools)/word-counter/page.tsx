'use client';
import { useState } from 'react';
import { ToolWrapper } from '@/components/tools/ToolWrapper';
import { getToolBySlug } from '@/config/tools';

const tool = getToolBySlug('word-counter')!;

function analyze(text: string) {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  const sentences = text.trim() ? (text.match(/[.!?]+/g) || []).length : 0;
  const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(Boolean).length : 0;
  const readTime = Math.max(1, Math.ceil(words / 200));
  return { words, chars, charsNoSpaces, sentences, paragraphs, readTime };
}

function WordCounterTool() {
  const [text, setText] = useState('');
  const stats = analyze(text);

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Paste or type your text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          rows={8}
          className="input-field resize-y min-h-[160px]"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: 'Words', value: stats.words.toLocaleString() },
          { label: 'Characters', value: stats.chars.toLocaleString() },
          { label: 'Chars (no spaces)', value: stats.charsNoSpaces.toLocaleString() },
          { label: 'Sentences', value: stats.sentences.toLocaleString() },
          { label: 'Paragraphs', value: stats.paragraphs.toLocaleString() },
          { label: 'Read time', value: `${stats.readTime} min` },
        ].map(({ label, value }) => (
          <div key={label} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-sky-500">{value}</p>
            <p className="text-xs text-slate-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {text && (
        <button onClick={() => setText('')} className="text-sm text-slate-400 hover:text-red-500 transition-colors">
          Clear text
        </button>
      )}
    </div>
  );
}

const faqs = [
  { q: 'How is reading time calculated?', a: 'Reading time is estimated based on an average reading speed of 200 words per minute, which is typical for most adults.' },
  { q: 'Does this tool save my text?', a: 'No. All analysis happens entirely in your browser. Your text is never sent to any server.' },
  { q: 'What counts as a word?', a: 'Words are counted by splitting the text on whitespace (spaces, tabs, newlines). Each continuous sequence of non-whitespace characters counts as one word.' },
];

export default function WordCounterPage() {
  return (
    <ToolWrapper tool={tool} faqs={faqs} explanation="Count words, characters, sentences, paragraphs, and estimate reading time instantly as you type. Perfect for essays, articles, tweets, resumes, and any writing project with a word limit.">
      <WordCounterTool />
    </ToolWrapper>
  );
}
