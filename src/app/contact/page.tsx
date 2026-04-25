import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact | OneAnswer',
  description: 'Get in touch with OneAnswer for feedback, tool suggestions, or questions.',
  alternates: { canonical: '/contact' },
  openGraph: { url: '/contact' },
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Contact</h1>
      <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
        <p>
          Have a tool suggestion, found a bug, or want to say hello? We read every message. OneAnswer is a small
          project built to make everyday lookups faster and simpler.
        </p>
        <p>
          <a
            href="mailto:contact@oneanswer.app?subject=OneAnswer%20feedback"
            className="text-sky-500 hover:underline font-medium"
          >
            contact@oneanswer.app
          </a>
        </p>
        <p className="text-sm text-slate-500">
          We do not offer phone support. For legal or privacy questions, you can also refer to our{' '}
          <Link href="/privacy" className="text-sky-500 hover:underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
