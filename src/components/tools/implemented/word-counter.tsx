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
    <ToolWrapper
      tool={tool}
      faqs={faqs}
      explanation="Word limits shape essays, ad copy, scholarship forms, and social posts—so a live word count is less about vanity than about fitting the box you are given. This word counter also tallies characters with and without spaces, plus sentences, paragraphs, and a rough reading time, because editors and platforms rarely ask for only one metric. Searches for word count, character counter, and how many words in my text are usually the same check before submit. Paste a draft, tweak a paragraph, and watch the totals change without exporting to another app. Because everything runs in the browser, your text is not uploaded for analysis; clear the box when you are done if you are working on something sensitive. Journalists, students, and support teams all land here for the same reason: quick feedback, plain numbers, and no sign-up between you and a deadline. For very large documents, performance may depend on your device, but for typical article lengths the tool stays responsive as you type."
    >
      <WordCounterTool />
    </ToolWrapper>
  );
}
