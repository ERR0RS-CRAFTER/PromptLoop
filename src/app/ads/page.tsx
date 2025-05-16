import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Ad } from '@/lib/supabase';

export const metadata = {
  title: 'Sponsor PromptLoop - Reach AI Enthusiasts',
  description: 'Promote your AI tool or service to thousands of prompt engineers and AI enthusiasts on PromptLoop.',
};

// This would come from the database in a real app
const SPONSORS: Partial<Ad>[] = [
  {
    id: '1',
    company_name: 'PromptBase',
    description: 'Marketplace for buying and selling quality prompts for various AI platforms',
    logo_url: 'https://placehold.co/200x100/4338ca/FFFFFF?text=PromptBase',
    link: 'https://promptbase.com',
    active: true,
  },
  {
    id: '2',
    company_name: 'PromptPerfect',
    description: 'AI prompt optimizer that helps you get the best results from your favorite AI tools',
    logo_url: 'https://placehold.co/200x100/0284c7/FFFFFF?text=PromptPerfect',
    link: 'https://promptperfect.jina.ai',
    active: true,
  },
  {
    id: '3',
    company_name: 'FlowGPT',
    description: 'Community-driven platform for sharing and discovering AI prompts',
    logo_url: 'https://placehold.co/200x100/10b981/FFFFFF?text=FlowGPT',
    link: 'https://flowgpt.com',
    active: true,
  },
];

const PRICING_TIERS = [
  {
    name: 'Basic',
    price: '$299',
    period: 'per month',
    description: 'Perfect for startups and smaller AI tools',
    features: [
      'Logo and link in sponsors section',
      'Featured on relevant category pages',
      '10,000 estimated monthly impressions',
      'Basic analytics dashboard',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Premium',
    price: '$799',
    period: 'per month',
    description: 'Ideal for established AI services and products',
    features: [
      'Everything in Basic',
      'Featured placement on homepage',
      'Inclusion in monthly newsletter',
      '30,000 estimated monthly impressions',
      'Advanced analytics and performance reports',
    ],
    cta: 'Choose Premium',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'tailored to your needs',
    description: 'For AI companies seeking maximum exposure',
    features: [
      'Everything in Premium',
      'Custom integration options',
      'Dedicated promotional content',
      'Co-marketing opportunities',
      'Priority placement across all sections',
    ],
    cta: 'Contact Us',
    highlighted: false,
  },
];

export default function SponsorsPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Reach Thousands of AI Enthusiasts</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Promote your AI tool, product, or service to a targeted audience of prompt engineers, 
          AI enthusiasts, and creators on PromptLoop.
        </p>
      </section>
      
      {/* Current Sponsors */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Our Current Sponsors</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPONSORS.map((sponsor) => (
            <Link 
              key={sponsor.id}
              href={sponsor.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg group"
            >
              <div className="p-6">
                <div className="w-full h-24 relative mb-4 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
                  <Image
                    src={sponsor.logo_url || ''}
                    alt={sponsor.company_name || ''}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-500 dark:group-hover:text-dark-primary transition-colors">
                  {sponsor.company_name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {sponsor.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Pricing Plans */}
      <section className="bg-gray-50 dark:bg-gray-900 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 rounded-lg">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Sponsorship Plans</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose the plan that fits your goals and budget. All plans include placement on PromptLoop
            for a minimum of 30 days.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING_TIERS.map((tier) => (
            <div 
              key={tier.name}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg relative ${
                tier.highlighted ? 'ring-2 ring-primary-500 dark:ring-dark-primary' : ''
              }`}
            >
              {tier.highlighted && (
                <div className="bg-primary-500 dark:bg-dark-primary text-white text-xs font-semibold py-1 text-center">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">{tier.period}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {tier.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckCircle size={18} className="text-primary-500 dark:text-dark-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="/ads/contact"
                  className={`btn block text-center ${
                    tier.highlighted
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Contact Form */}
      <section className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Interested in becoming a sponsor? Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </div>
        
        <form className="space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="input w-full"
                placeholder="John Doe"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Work Email
              </label>
              <input
                type="email"
                id="email"
                className="input w-full"
                placeholder="you@company.com"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-1">
              Company Name
            </label>
            <input
              type="text"
              id="company"
              className="input w-full"
              placeholder="Your AI Company"
              required
            />
          </div>
          
          <div>
            <label htmlFor="website" className="block text-sm font-medium mb-1">
              Website
            </label>
            <input
              type="url"
              id="website"
              className="input w-full"
              placeholder="https://your-company.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="plan" className="block text-sm font-medium mb-1">
              Sponsorship Plan
            </label>
            <select id="plan" className="input w-full" required>
              <option value="">Select a plan</option>
              {PRICING_TIERS.map((tier) => (
                <option key={tier.name} value={tier.name}>{tier.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Additional Information
            </label>
            <textarea
              id="message"
              className="input w-full min-h-24"
              placeholder="Tell us about your product and goals..."
            />
          </div>
          
          <div>
            <button type="submit" className="btn btn-primary w-full md:w-auto">
              Submit Inquiry <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </form>
      </section>
      
      {/* FAQ Section */}
      <section className="bg-gray-50 dark:bg-gray-900 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 rounded-lg">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">How long does sponsorship last?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                All sponsorship plans run for a minimum of 30 days. You can choose to extend for longer periods at a discounted rate.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">What metrics will I receive?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We provide detailed analytics including impressions, clicks, CTR, and engagement metrics for your sponsored content.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Who is the PromptLoop audience?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                PromptLoop visitors are primarily prompt engineers, AI enthusiasts, marketers, developers, and designers who use AI tools daily.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Can I specify where my sponsorship appears?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Premium and Enterprise plans allow for placement preferences. We'll work with you to ensure your sponsorship appears in relevant sections.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">What assets do you need from me?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We'll need your company logo (SVG preferred), a brief description, and the destination URL. Additional assets may be required for Premium and Enterprise plans.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 