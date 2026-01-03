import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { User, Building2, Globe } from 'lucide-react';

const TONE_OPTIONS = [
  'Friendly',
  'Playful',
  'Concise',
  'Safety',
  'Formal',
  'Serious',
  'Detailed',
  'Neutral'
];

export const AIAgentTesting = () => {
  const [agentName, setAgentName] = useState('Zara');
  const [brandName, setBrandName] = useState('YourBrand');
  const [website, setWebsite] = useState('https://yourbrand.com');
  const [selectedTone, setSelectedTone] = useState('Friendly');
  const [customTone, setCustomTone] = useState('');

  // Agent Prompt states
  const [globalPrompt, setGlobalPrompt] = useState(
    'You are the AstroEcom assistant for YourBrand. Tone is warm, respectful, and clear. Default language is English with optional Roman Urdu greetings. Avoid hard sell. Suggest products only when asked or when the user signals buying intent. Keep replies under 4 sentences.'
  );
  const [usePlatformPrompts, setUsePlatformPrompts] = useState(true);
  const [activePromptTab, setActivePromptTab] = useState('WhatsApp');
  const [platformPrompts, setPlatformPrompts] = useState({
    WhatsApp: 'Use brief, friendly sentences; allow light emojis. Offer Roman Urdu greeting. Keep < 3 lines.',
    'Instagram DM': '',
    Messenger: '',
    'Web Chat': ''
  });

  // Ongoing Discounts & Sales
  const [newSale, setNewSale] = useState({
    name: 'Blessed Friday',
    start: '11.11',
    end: '12.12',
    value: '15'
  });
  const [autoMentionSales, setAutoMentionSales] = useState(false);
  const [onlyPriceIntent, setOnlyPriceIntent] = useState(true);
  const [activeSales, setActiveSales] = useState([
    { name: 'Blessed Friday', type: 'Percent', value: '15%', dateRange: 'Nov 20-24', status: 'Active' },
    { name: '11.11', type: 'Percent', value: '11%', dateRange: 'Nov 10-10', status: 'Upcoming' }
  ]);

  // Return and Exchange Policy
  const [returnPolicy, setReturnPolicy] = useState(
    'Example: You can return unworn items within 14 days. Refunds go to your bank within 5-7 business days. Final sale & hygiene items aren\'t returnable. Need a label? We\'ll email it when approved.'
  );

  // Brand Information
  const [brandSummary, setBrandSummary] = useState(
    'Example: YourBrand is a modern skincare label focused on sensitive skin. We value fast support on WhatsApp, and transparent shipping & returns. Our voice is warm and...'
  );
  const [brandPDF, setBrandPDF] = useState(null);

  // Escalation Keywords
  const [keywordInput, setKeywordInput] = useState('');
  const [keywords, setKeywords] = useState([
    'refund',
    'cancel order',
    'complaint',
    'agent please',
    'call me',
    'representative',
    'human'
  ]);
  const [matchType, setMatchType] = useState('Contains');
  const [escalationAssignTo, setEscalationAssignTo] = useState('Human Agent — Default Queue');
  const [escalationPriority, setEscalationPriority] = useState('High');

  // Language
  const [englishEnabled, setEnglishEnabled] = useState(true);
  const [urduEnabled, setUrduEnabled] = useState(true);

  // FAQs
  const [newFAQ, setNewFAQ] = useState({
    question: '',
    answer: '',
    tags: ''
  });
  const [faqs, setFaqs] = useState([]);

  // Payment Details
  const [paymentDetails, setPaymentDetails] = useState(
    `Example:
Bank: MCB (Main Boulevard Branch)
Account Name: The Creative Street
IBAN: PK36 MUCB 0000 0000 0000 1234 5678
Mobile Wallets: Easypaisa 03xx- xxxxxx / JazzCash 03xx -xxxxxxx
Note: Share only on customer request.`
  );

  // Products (Shopify)
  const [products, setProducts] = useState([
    {
      img: '/product1.jpg',
      name: 'HydraGlow Serum 30ml',
      price: '$29.90',
      sku: 'HG-001',
      status: 'In Stock',
      realVideos: '',
      realImages: '',
      notes: '• Fragrance-free formula\n• Patch test for sensitive skin\n• Use coupon BLESSED25 during Blessed Friday (Nov 20–24).'
    },
    {
      img: '/product2.jpg',
      name: 'CalmClean Gel 200ml',
      price: '$22.50',
      sku: 'CC-200',
      status: 'Low Stock',
      realVideos: '',
      realImages: '',
      notes: ''
    },
    {
      img: '/product3.jpg',
      name: 'Night Repair Balm',
      price: '$42.00',
      sku: 'NR-050',
      status: 'In Stock',
      realVideos: '',
      realImages: '',
      notes: ''
    },
    {
      img: '/product4.jpg',
      name: 'Daily Shield SPF50',
      price: '$35.00',
      sku: 'DS-500',
      status: 'Out of Stock',
      realVideos: '',
      realImages: '',
      notes: ''
    }
  ]);

  // Testing Environment
  const [testMessage, setTestMessage] = useState('');
  const [testMode, setTestMode] = useState('Sandbox');

  return (
    <DashboardLayout>
      <div className="pr-6 pl-2 space-y-8">

        {/* Agent Identity Section */}
        <section className="bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
            Agent Identity
          </h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm mb-6">
            Configure how your agent appears to customers.
          </p>

          <div className="space-y-6">
            {/* Agent Name */}
            <div>
              <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                Agent name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-surface-dark-alt border border-gray-200 dark:border-white/10 rounded-lg text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
                Shown to customers in chat headers.
              </p>
            </div>

            {/* Brand Name */}
            <div>
              <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                Brand name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-surface-dark-alt border border-gray-200 dark:border-white/10 rounded-lg text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
                Used in messages, signatures, and receipts.
              </p>
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                Website
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-surface-dark-alt border border-gray-200 dark:border-white/10 rounded-lg text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
                Used for link previews and crawling.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8">
            <button className="px-6 py-2.5 bg-primary hover:bg-primary-600 text-white rounded-lg font-medium transition-colors">
              Save & continue
            </button>
            <button className="px-6 py-2.5 bg-gray-100 dark:bg-surface-dark-alt hover:bg-gray-200 dark:hover:bg-white/10 text-text-primary-light dark:text-text-primary-dark rounded-lg font-medium transition-colors">
              Save draft
            </button>
          </div>
        </section>

        {/* Tone & Style Section */}
        <section className="bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
            Tone & Style
          </h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm mb-6">
            Define the personality of your agent across channels.
          </p>

          {/* Overall Tone */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-3">
              Overall tone
            </label>
            <div className="flex flex-wrap gap-2">
              {TONE_OPTIONS.map((tone) => (
                <button
                  key={tone}
                  onClick={() => setSelectedTone(tone)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedTone === tone
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-surface-dark-alt text-text-primary-light dark:text-text-primary-dark hover:bg-gray-200 dark:hover:bg-white/10'
                    }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Tone */}
          <div>
            <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
              Custom tone (optional)
            </label>
            <textarea
              value={customTone}
              onChange={(e) => setCustomTone(e.target.value)}
              placeholder="Examples: Warm, respectful, short sentences. Use Roman Urdu greeting on WhatsApp. Avoid slang in email. Gentle upsell only if user shows buying interest."
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-surface-dark-alt border border-gray-200 dark:border-white/10 rounded-lg text-text-primary-light dark:text-text-primary-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8">
            <button className="px-6 py-2.5 bg-primary hover:bg-primary-600 text-white rounded-lg font-medium transition-colors">
              Save tone
            </button>
            <button className="px-6 py-2.5 bg-gray-100 dark:bg-surface-dark-alt hover:bg-gray-200 dark:hover:bg-white/10 text-primary rounded-lg font-medium transition-colors">
              Preview response
            </button>
          </div>
        </section>

        {/* Agent Prompt Section */}
        <section className="bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
            Agent Prompt
          </h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm mb-6">
            Control how your agent interacts and communicates.
          </p>

          {/* Tone & Language (Global) */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                Tone & Language (Global)
              </label>
              <span className="text-xs text-primary font-medium">
                Bilingual (EN + Urdu)
              </span>
            </div>
            <textarea
              value={globalPrompt}
              onChange={(e) => setGlobalPrompt(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-surface-dark-alt border border-gray-200 dark:border-white/10 rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>

          {/* Use platform-specific prompts */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200 dark:border-white/10">
            <div>
              <h3 className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                Use platform-specific prompts
              </h3>
              <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
                Enable unique instructions for WhatsApp, Instagram, etc.
              </p>
            </div>
            <button
              onClick={() => setUsePlatformPrompts(!usePlatformPrompts)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${usePlatformPrompts ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${usePlatformPrompts ? 'translate-x-6' : 'translate-x-1'
                  }`}
              />
            </button>
          </div>

          {/* Platform Tabs */}
          {usePlatformPrompts && (
            <div>
              <div className="flex gap-2 mb-4">
                {['WhatsApp', 'Instagram DM', 'Messenger', 'Web Chat'].map((platform) => (
                  <button
                    key={platform}
                    onClick={() => setActivePromptTab(platform)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${activePromptTab === platform
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-surface-dark-alt text-text-primary-light dark:text-text-primary-dark hover:bg-gray-200 dark:hover:bg-white/10'
                      }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>

              {/* Platform-specific instructions */}
              <div>
                <label className="block text-xs font-medium text-text-primary-light dark:text-text-primary-dark mb-2 uppercase tracking-wide">
                  {activePromptTab} SPECIFIC INSTRUCTIONS
                </label>
                <textarea
                  value={platformPrompts[activePromptTab]}
                  onChange={(e) => setPlatformPrompts({
                    ...platformPrompts,
                    [activePromptTab]: e.target.value
                  })}
                  placeholder={`Enter specific instructions for ${activePromptTab}...`}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-surface-dark-alt border border-gray-200 dark:border-white/10 rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8">
            <button className="px-6 py-2.5 bg-primary hover:bg-primary-600 text-white rounded-lg font-medium transition-colors">
              Save
            </button>
            <button className="px-6 py-2.5 bg-gray-100 dark:bg-surface-dark-alt hover:bg-gray-200 dark:hover:bg-white/10 text-primary rounded-lg font-medium transition-colors">
              Preview response
            </button>
          </div>
        </section>

        {/* Ongoing Discounts & Sales Section */}
        <section className="bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
            Ongoing Discounts & Sales
          </h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm mb-6">
            Configure recurring sales events the AI can mention to customers.
          </p>

          {/* Add New Sale Form */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-xs font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                Sale Name
              </label>
              <input
                type="text"
                value={newSale.name}
                onChange={(e) => setNewSale({ ...newSale, name: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-surface-dark-alt border border-gray-200 dark:border-white/10 rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                Start
              </label>
              <input
                type="text"
                value={newSale.start}
                onChange={(e) => setNewSale({ ...newSale, start: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-surface-dark-alt border border-gray-200 dark:border-white/10 rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                End
              </label>
              <input
                type="text"
                value={newSale.end}
                onChange={(e) => setNewSale({ ...newSale, end: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-surface-dark-alt border border-gray-200 dark:border-white/10 rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <label className="block text-xs font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                  Value
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={newSale.value}
                    onChange={(e) => setNewSale({ ...newSale, value: e.target.value })}
                    className="w-full px-3 py-2 pr-8 bg-gray-50 dark:bg-surface-dark-alt border border-gray-200 dark:border-white/10 rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">%</span>
                </div>
              </div>
              <button className="px-4 py-2 bg-primary hover:bg-primary-600 text-white rounded-lg font-medium text-sm transition-colors whitespace-nowrap">
                + Add sale
              </button>
            </div>
          </div>

          {/* Auto-mention toggle */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200 dark:border-white/10">
            <div>
              <h3 className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                Auto-mention during greeting?
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                Only mention on price intent
              </span>
              <button
                onClick={() => setOnlyPriceIntent(!onlyPriceIntent)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${onlyPriceIntent ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${onlyPriceIntent ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>
          </div>

          {/* Active & Upcoming Sales Table */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">
              Active & Upcoming
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-white/10">
                    <th className="text-left py-3 px-4 text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark">Name</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark">Type</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark">Value</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark">Date range</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activeSales.map((sale, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-white/5">
                      <td className="py-3 px-4 text-sm text-text-primary-light dark:text-text-primary-dark">{sale.name}</td>
                      <td className="py-3 px-4 text-sm text-text-secondary-light dark:text-text-secondary-dark">{sale.type}</td>
                      <td className="py-3 px-4 text-sm text-text-primary-light dark:text-text-primary-dark font-medium">{sale.value}</td>
                      <td className="py-3 px-4 text-sm text-text-secondary-light dark:text-text-secondary-dark">{sale.dateRange}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${sale.status === 'Active'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                          }`}>
                          {sale.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-primary hover:bg-primary-600 text-white rounded-lg font-medium transition-colors">
              Save sale
            </button>
            <button className="px-6 py-2.5 bg-gray-100 dark:bg-surface-dark-alt hover:bg-gray-200 dark:hover:bg-white/10 text-primary rounded-lg font-medium transition-colors">
              Preview message
            </button>
          </div>
        </section>

        {/* Return and Exchange Policy Section */}
        <section className="bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6">
            Return and Exchange policy
          </h2>

          <textarea
            value={returnPolicy}
            onChange={(e) => setReturnPolicy(e.target.value)}
            placeholder="Example: You can return unworn items within 14 days. Refunds go to your bank within 5-7 business days. Final sale & hygiene items aren't returnable. Need a label? We'll email it when approved."
            rows={4}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-surface-dark-alt border border-gray-200 dark:border-white/10 rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none mb-6"
          />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-primary hover:bg-primary-600 text-white rounded-lg font-medium transition-colors">
              Save policy
            </button>
            <button className="px-6 py-2.5 bg-gray-100 dark:bg-surface-dark-alt hover:bg-gray-200 dark:hover:bg-white/10 text-primary rounded-lg font-medium transition-colors">
              Preview response
            </button>
          </div>
        </section>

        {/* Brand Information Section */}
        <section className="bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6">
            Brand information
          </h2>

          <div className="grid grid-cols-2 gap-6">
            {/* Brand Summary */}
            <div>
              <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                Brand summary
              </label>
              <textarea
                value={brandSummary}
                onChange={(e) => setBrandSummary(e.target.value)}
                placeholder="Example: YourBrand is a modern skincare label focused on sensitive skin. We value fast support on WhatsApp, and transparent shipping & returns. Our voice is warm and..."
                rows={6}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-surface-dark-alt border border-gray-200 dark:border-white/10 rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>

            {/* Upload Brand PDF */}
            <div>
              <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                Upload brand PDF
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-white/10 rounded-lg p-8 text-center">
                <div className="flex flex-col items-center justify-center">
                  <svg className="w-12 h-12 text-primary mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-text-primary-light dark:text-text-primary-dark mb-1">
                    Drag & drop PDF here, or{' '}
                    <button className="text-primary hover:underline font-medium">
                      Choose file
                    </button>
                  </p>
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                    Max 20MB • PDF only • Text extracted for AI training
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6">
            <button className="px-6 py-2.5 bg-primary hover:bg-primary-600 text-white rounded-lg font-medium transition-colors">
              Save
            </button>
          </div>
        </section>

        {/* Escalation Keywords Section */}
        <section className="bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
            Escalation Keywords
          </h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm mb-6">
            Trigger keywords when said will be escalated to a human agent.
          </p>

          {/* Keywords Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
              Keywords & phrases
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && keywordInput.trim()) {
                    setKeywords([...keywords, keywordInput.trim()]);
                    setKeywordInput('');
                  }
                }}
                placeholder="refund, cancel order, complaint, agent please, call me..."
                className="flex-1 px-4 py-2 bg-gray-50 dark:bg-surface-dark-alt border border-gray-200 dark:border-white/10 rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                onClick={() => {
                  if (keywordInput.trim()) {
                    setKeywords([...keywords, keywordInput.trim()]);
                    setKeywordInput('');
                  }
                }}
                className="px-4 py-2 bg-gray-100 dark:bg-surface-dark-alt hover:bg-gray-200 dark:hover:bg-white/10 text-text-primary-light dark:text-text-primary-dark rounded-lg font-medium transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {/* Keywords Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {keywords.map((keyword, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium"
              >
                {keyword}
                <button
                  onClick={() => setKeywords(keywords.filter((_, i) => i !== index))}
                  className="hover:text-primary-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          {/* Warning Box */}
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-orange-900 dark:text-orange-200 mb-3">
                  On trigger, do this
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {/* Assign to dropdown */}
                  <div>
                    <label className="block text-xs text-orange-700 dark:text-orange-300 mb-1">
                      Assign to:
                    </label>
                    <select
                      value={escalationAssignTo}
                      onChange={(e) => setEscalationAssignTo(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-surface-dark border border-orange-300 dark:border-orange-700 rounded-lg text-sm text-orange-900 dark:text-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option>Human Agent — Default Queue</option>
                      <option>Human Agent — Priority Queue</option>
                      <option>Human Agent — Support Team</option>
                      <option>Supervisor</option>
                    </select>
                  </div>

                  {/* Priority dropdown */}
                  <div>
                    <label className="block text-xs text-orange-700 dark:text-orange-300 mb-1">
                      Priority:
                    </label>
                    <select
                      value={escalationPriority}
                      onChange={(e) => setEscalationPriority(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-surface-dark border border-orange-300 dark:border-orange-700 rounded-lg text-sm text-red-600 dark:text-red-400 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Match Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
              Match type:
            </label>
            <div className="flex gap-4">
              {['Contains', 'Exact', 'Regex'].map((type) => (
                <button
                  key={type}
                  onClick={() => setMatchType(type)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${matchType === type
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-surface-dark-alt text-text-primary-light dark:text-text-primary-dark hover:bg-gray-200 dark:hover:bg-white/10'
                    }`}
                >
                  {type}
                </button>
              ))}
              <label className="flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark ml-4">
                <input type="checkbox" className="rounded" />
                <span>Safeguards: Ignore if human agent is already assigned</span>
              </label>
            </div>
          </div>
        </section>

        {/* Language Section */}
        <section className="bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
            Language
          </h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm mb-6">
            Toggle the languages your agent can use. You can enable one or both.
          </p>

          {/* Language Toggles */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-white/10">
              <span className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                English
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                  {englishEnabled ? 'On' : 'Off'}
                </span>
                <button
                  onClick={() => setEnglishEnabled(!englishEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${englishEnabled ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${englishEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-3">
              <span className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                Urdu
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                  {urduEnabled ? 'On' : 'Off'}
                </span>
                <button
                  onClick={() => setUrduEnabled(!urduEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${urduEnabled ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${urduEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Info Text */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              If both are on, the agent replies in English by default and switches to Urdu when the customer writes in it.
            </p>
          </div>

          {/* Save Button */}
          <button className="px-6 py-2.5 bg-primary hover:bg-primary-600 text-white rounded-lg font-medium transition-colors">
            Save
          </button>
        </section>

        {/* FAQs of the brand Section */}
        <section className="bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
            FAQs of the brand
          </h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm mb-6">
            Can be fed to the AI agent for learning.
          </p>

          {/* Add new FAQ */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                Add a new FAQ
              </label>
              <input
                type="text"
                value={newFAQ.question}
                onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
                placeholder="Do you ship internationally?"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-surface-dark-alt border border-gray-200 dark:border-white/10 rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 mb-3"
              />
              <textarea
                value={newFAQ.answer}
                onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
                placeholder="Answer: Yes – we ship worldwide. Orders ship within 24–48 hours..."
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-surface-dark-alt border border-gray-200 dark:border-white/10 rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={newFAQ.tags}
                onChange={(e) => setNewFAQ({ ...newFAQ, tags: e.target.value })}
                placeholder="shipping, international, delivery"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-surface-dark-alt border border-gray-200 dark:border-white/10 rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                <input type="checkbox" className="rounded" />
                <span>Authoritative (use this answer verbatim)</span>
              </label>
              <div className="flex-1"></div>
              <button className="px-4 py-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors">
                Clear
              </button>
              <button className="px-6 py-2.5 bg-primary hover:bg-primary-600 text-white rounded-lg font-medium transition-colors">
                Save FAQ
              </button>
            </div>
          </div>

          {/* Bulk Import */}
          <div className="border-t border-gray-200 dark:border-white/10 pt-6">
            <h3 className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">
              Bulk import
            </h3>
            <div className="border-2 border-dashed border-gray-300 dark:border-white/10 rounded-lg p-8 text-center">
              <div className="flex flex-col items-center justify-center">
                <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm text-text-primary-light dark:text-text-primary-dark mb-2">
                  <span className="font-medium">Drag & drop CSV</span>
                  <br />
                  <span className="text-text-secondary-light dark:text-text-secondary-dark">
                    (columns: question, answer, tags)
                  </span>
                </p>
                <div className="flex gap-2 mt-3">
                  <button className="px-4 py-2 bg-gray-100 dark:bg-surface-dark-alt hover:bg-gray-200 dark:hover:bg-white/10 text-text-primary-light dark:text-text-primary-dark rounded-lg font-medium transition-colors text-sm">
                    Upload CSV
                  </button>
                  <button className="px-4 py-2 bg-gray-100 dark:bg-surface-dark-alt hover:bg-gray-200 dark:hover:bg-white/10 text-text-primary-light dark:text-text-primary-dark rounded-lg font-medium transition-colors text-sm">
                    Connect Google Sheet
                  </button>
                </div>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-3">
                  Tip: Use column order (question, answer, tags)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Online Payment Details Section */}
        <section className="bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6">
            Online Payment Details
          </h2>

          <div>
            <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
              Account details to share in chat
            </label>
            <textarea
              value={paymentDetails}
              onChange={(e) => setPaymentDetails(e.target.value)}
              placeholder="Example:&#10;Bank: MCB (Main Boulevard Branch)&#10;Account Name: The Creative Street&#10;IBAN: PK36 MUCB 0000 0000 0000 1234 5678&#10;Mobile Wallets: Easypaisa 03xx- xxxxxx / JazzCash 03xx -xxxxxxx&#10;Note: Share only on customer request."
              rows={6}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-surface-dark-alt border border-gray-200 dark:border-white/10 rounded-lg text-sm text-text-primary-light dark:text-text-primary-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none font-mono"
            />
          </div>

          {/* Save Button */}
          <div className="mt-6">
            <button className="px-6 py-2.5 bg-primary hover:bg-primary-600 text-white rounded-lg font-medium transition-colors">
              Save
            </button>
          </div>
        </section>

        {/* Products (Shopify) Section */}
        <section className="bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
              Products (Shopify)
            </h2>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-xs text-primary hover:bg-primary/10 rounded-lg font-medium transition-colors flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Synced now
              </button>
              <button className="px-3 py-1.5 text-xs text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg font-medium transition-colors">
                Bulk import media
              </button>
            </div>
          </div>
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm mb-6">
            Auto-populated from your store. Add media and notes for the agent.
          </p>

          {/* Products List */}
          <div className="space-y-4">
            {/* Product 1 - Expanded */}
            <div className="border border-gray-200 dark:border-white/10 rounded-lg">
              {/* Product Header */}
              <div className="p-4">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-1 text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase">
                    IMG
                  </div>
                  <div className="col-span-5 text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase">
                    PRODUCT
                  </div>
                  <div className="col-span-3 text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase">
                    SKU
                  </div>
                  <div className="col-span-2 text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase">
                    STATUS
                  </div>
                  <div className="col-span-1"></div>
                </div>
              </div>

              {/* Product Row */}
              <div className="px-4 pb-4 border-t border-gray-100 dark:border-white/5 pt-4">
                <div className="grid grid-cols-12 gap-4 items-start">
                  <div className="col-span-1">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-surface-dark-alt rounded-lg overflow-hidden">
                      <img src="/product1.jpg" alt="HydraGlow Serum" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="col-span-5">
                    <p className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                      HydraGlow Serum 30ml
                    </p>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">$29.90</p>
                  </div>
                  <div className="col-span-3">
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">HG-001</p>
                  </div>
                  <div className="col-span-2">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      In Stock
                    </span>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <button className="text-gray-400 hover:text-text-primary-light dark:hover:text-text-primary-dark">
                      <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Expanded Content */}
                <div className="mt-4 space-y-4">
                  {/* Real Videos */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs font-medium text-text-primary-light dark:text-text-primary-dark">
                          1. REAL VIDEOS (URLS)
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="https://drive.link/video1, https://cdn.yoursite.com/video2.mp4"
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-surface-dark-alt border border-gray-200 dark:border-white/10 rounded-lg text-xs text-text-primary-light dark:text-text-primary-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
                        Comma separated links to product demo/real videos.
                      </p>
                    </div>

                    {/* Real Images */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs font-medium text-text-primary-light dark:text-text-primary-dark">
                          2. REAL IMAGES (URLS)
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="https://drive.link/img1.jpg, https://cdn.yoursite.com/img2.png"
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-surface-dark-alt border border-gray-200 dark:border-white/10 rounded-lg text-xs text-text-primary-light dark:text-text-primary-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
                        Links to high-res real life photos.
                      </p>
                    </div>
                  </div>

                  {/* Important Notes */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span className="text-xs font-medium text-text-primary-light dark:text-text-primary-dark">
                        3. IMPORTANT NOTES/POINTERS
                      </span>
                    </div>
                    <textarea
                      defaultValue="• Best seller&#10;• Patch test for sensitive skin&#10;• Use coupon BLESSED25 during Blessed Friday (Nov 20–24)."
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-surface-dark-alt border border-gray-200 dark:border-white/10 rounded-lg text-xs text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-2">
                    <button className="px-4 py-2 text-sm text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg font-medium transition-colors">
                      Preview reply
                    </button>
                    <button className="px-4 py-2 text-sm bg-primary hover:bg-primary-600 text-white rounded-lg font-medium transition-colors">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product 2 - Collapsed */}
            <div className="border border-gray-200 dark:border-white/10 rounded-lg p-4">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-1">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-surface-dark-alt rounded-lg"></div>
                </div>
                <div className="col-span-5">
                  <p className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">CalmClean Gel 200ml</p>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">$22.50</p>
                </div>
                <div className="col-span-3">
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">CC-200</p>
                </div>
                <div className="col-span-2">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                    Low Stock
                  </span>
                </div>
                <div className="col-span-1 flex justify-end">
                  <button className="text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Product 3 - Collapsed */}
            <div className="border border-gray-200 dark:border-white/10 rounded-lg p-4">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-1">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-surface-dark-alt rounded-lg"></div>
                </div>
                <div className="col-span-5">
                  <p className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">Night Repair Balm</p>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">$42.00</p>
                </div>
                <div className="col-span-3">
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">NR-050</p>
                </div>
                <div className="col-span-2">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    In Stock
                  </span>
                </div>
                <div className="col-span-1 flex justify-end">
                  <button className="text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Product 4 - Collapsed */}
            <div className="border border-gray-200 dark:border-white/10 rounded-lg p-4">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-1">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-surface-dark-alt rounded-lg"></div>
                </div>
                <div className="col-span-5">
                  <p className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">Daily Shield SPF50</p>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">$35.00</p>
                </div>
                <div className="col-span-3">
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">DS-500</p>
                </div>
                <div className="col-span-2">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                    Out of Stock
                  </span>
                </div>
                <div className="col-span-1 flex justify-end">
                  <button className="text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Agent - Testing Environment Section */}
        <section className="bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
              AI Agent — Testing Environment
            </h2>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-xs rounded-lg font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                Sandbox
              </button>
              <button className="px-3 py-1.5 text-xs rounded-lg font-medium bg-gray-100 dark:bg-surface-dark-alt text-text-secondary-light dark:text-text-secondary-dark">
                Tone-Friendly Pro
              </button>
              <button className="px-3 py-1.5 text-xs rounded-lg font-medium bg-gray-100 dark:bg-surface-dark-alt text-text-secondary-light dark:text-text-secondary-dark">
                Verbosity: Balanced
              </button>
            </div>
          </div>
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm mb-6">
            This sandbox lets you test your agent before publishing. No messages are sent to customers.
          </p>

          {/* Chat Container */}
          <div className="bg-gray-50 dark:bg-surface-dark-alt rounded-2xl p-6 min-h-[450px] flex flex-col">
            {/* Chat Messages Area */}
            <div className="flex-1 space-y-4 mb-6">
              {/* AI Message */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  AI
                </div>
                <div className="flex-1">
                  <div className="bg-white dark:bg-surface-dark rounded-2xl rounded-tl-none px-4 py-3 shadow-sm inline-block">
                    <p className="text-sm text-text-primary-light dark:text-text-primary-dark">
                      Hi! I'm Zara, your AstroEcom assistant. How can I help today?
                    </p>
                  </div>
                </div>
              </div>

              {/* User Avatar (right side, empty for now) */}
              <div className="flex justify-end">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                  U
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="space-y-3">
              <div className="flex gap-2 items-center">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                    placeholder="Type a message to test (e.g., 'price', 'shipping', 'returns')..."
                    className="w-full pl-4 pr-20 py-3 bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-full text-sm text-text-primary-light dark:text-text-primary-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {/* Reset Icon */}
                    <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                    {/* Send Button */}
                    <button className="w-8 h-8 bg-primary hover:bg-primary-600 text-white rounded-full flex items-center justify-center transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer Info */}
              <div className="flex items-center justify-between text-xs">
                <p className="text-text-secondary-light dark:text-text-secondary-dark">
                  We're running a BlessedFriday sale (15% off)
                </p>
                <button className="text-primary hover:underline font-medium">
                  Reset chat
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </DashboardLayout>
  );
};

export default AIAgentTesting;
