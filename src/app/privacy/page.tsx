import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | OneAnswer',
  description: 'Privacy policy for OneAnswer — how we handle data, cookies, and advertising.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Privacy Policy</h1>
      <p className="text-sm text-slate-400 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <div className="space-y-8 text-slate-600 dark:text-slate-400 leading-relaxed">
        {[
          {
            title: 'Information We Collect',
            body: 'OneAnswer does not collect personal information from users. All tool calculations happen in your browser. We do not store any inputs you enter into our tools.',
          },
          {
            title: 'Google AdSense',
            body: 'This website uses Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to this or other websites. You can opt out of personalized advertising by visiting Google\'s Ads Settings.',
          },
          {
            title: 'Cookies',
            body: 'We use minimal cookies necessary for the site to function. Third-party advertisers (Google AdSense) may also set cookies on your device for ad personalization purposes.',
          },
          {
            title: 'Third-Party APIs',
            body: 'Some tools (currency converter, IP address finder) fetch data from third-party APIs. These requests may reveal your IP address to those services but no personal data is stored by us.',
          },
          {
            title: 'Analytics',
            body: 'We may use anonymous, aggregated analytics (such as page view counts) to understand which tools are popular. No personally identifiable information is collected.',
          },
          {
            title: 'Contact',
            body: 'If you have questions about this privacy policy, please use our contact page.',
          },
        ].map(({ title, body }) => (
          <section key={title}>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{title}</h2>
            <p>{body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
