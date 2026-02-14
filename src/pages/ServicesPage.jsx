
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ChevronDown, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ServicesPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const pricingTiers = [
    {
      name: 'Essentials',
      price: '$397',
      popular: false,
      features: [
        '1 custom workflow automation',
        'Complete documentation',
        '14-day support period',
        'Video training walkthrough',
        'Email support'
      ]
    },
    {
      name: 'Professional',
      price: '$997',
      popular: true,
      features: [
        '3 custom workflow automations',
        '30-day priority support',
        'Complete documentation',
        'Live training session',
        'Email & chat support',
        'Revision rounds included'
      ]
    },
    {
      name: 'Retainer',
      price: '$697/month',
      popular: false,
      features: [
        '2 new workflows per month',
        'Unlimited workflow tweaks',
        'Priority support (24hr response)',
        'Monthly strategy call',
        'Ongoing optimization',
        'Dedicated Slack channel'
      ]
    },
    {
      name: 'Enterprise',
      price: '$2,500+',
      popular: false,
      features: [
        'Complex multi-system integrations',
        'Custom API development',
        'Team training workshops',
        'Dedicated success manager',
        'SLA guarantees',
        'White-glove onboarding'
      ]
    }
  ];

  const faqs = [
    {
      question: 'What tools do you work with?',
      answer: 'We specialize in Make.com and Zapier for workflow automation, and integrate with popular tools like QuickBooks, Xero, Stripe, PayPal, Google Sheets, Airtable, Slack, and many more. If you use it, we can likely automate it.'
    },
    {
      question: 'How long does it take to build an automation?',
      answer: 'Simple automations can be delivered in 3-5 days. More complex workflows typically take 1-2 weeks. Enterprise projects vary based on scope. We provide clear timelines during our discovery call.'
    },
    {
      question: 'Do I need technical knowledge to use the automations?',
      answer: 'Not at all! We build automations that work seamlessly in the background. We provide full documentation and training, so you and your team can use them confidently without technical expertise.'
    },
    {
      question: 'What if something breaks or needs updating?',
      answer: 'All packages include support periods where we handle any issues or tweaks. Retainer clients get unlimited adjustments. For one-time projects, we offer ongoing maintenance packages starting at $197/month.'
    },
    {
      question: 'Can you integrate with our existing accounting software?',
      answer: 'Yes! We have extensive experience integrating with QuickBooks, Xero, FreshBooks, NetSuite, and other major accounting platforms. We can also work with custom or legacy systems via APIs.'
    },
    {
      question: 'What\'s the difference between Make.com and Zapier?',
      answer: 'Make.com is more powerful and cost-effective for complex workflows with branching logic and data transformation. Zapier is simpler and great for straightforward automations. We recommend the best tool for your specific needs.'
    },
    {
      question: 'Do you offer refunds if I\'m not satisfied?',
      answer: 'We offer a satisfaction guarantee. If we don\'t deliver what was agreed upon in our scope, we\'ll make it right or issue a full refund. Your success is our priority.'
    },
    {
      question: 'Can I start with one package and upgrade later?',
      answer: 'Absolutely! Many clients start with Essentials to test one workflow, then upgrade to Professional or Retainer as they see the value. We make transitions seamless.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Services & Pricing - Adwola Financial Automation</title>
        <meta name="description" content="Explore our automation packages from Essentials to Enterprise. Custom workflow automation, financial reporting, and reconciliation solutions with transparent pricing." />
        <meta property="og:title" content="Services & Pricing - Adwola Financial Automation" />
        <meta property="og:description" content="Explore our automation packages from Essentials to Enterprise. Custom workflow automation, financial reporting, and reconciliation solutions with transparent pricing." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://adwola.com/services" />
        <meta property="og:image" content="https://adwola.com/slazzer-preview-p3nef.png" />
      </Helmet>

      <div className="bg-[#FAFAF7] min-h-screen pt-20">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-[#1A1A2E] via-[#2A2A4E] to-[#1A1A2E] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Services & Pricing
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Transparent pricing for automation solutions that save time and eliminate errors. Choose the package that fits your needs.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Tiers Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pricingTiers.map((tier, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden relative ${
                    tier.popular ? 'ring-2 ring-[#C5A23E]' : ''
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute top-0 right-0 bg-[#C5A23E] text-[#1A1A2E] px-4 py-1 rounded-bl-lg font-semibold text-sm flex items-center">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      Most Popular
                    </div>
                  )}
                  
                  <div className="bg-[#1A1A2E] text-white p-6">
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <div className="text-3xl font-bold text-[#C5A23E] mb-1">{tier.price}</div>
                    {tier.name !== 'Retainer' && tier.name !== 'Enterprise' && (
                      <p className="text-sm text-white/60">one-time payment</p>
                    )}
                  </div>

                  <div className="p-6">
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="w-5 h-5 text-[#C5A23E] mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link to="/contact" className="block">
                      <Button className={`w-full ${
                        tier.popular 
                          ? 'bg-[#C5A23E] hover:bg-[#B39235] text-[#1A1A2E]' 
                          : 'bg-[#1A1A2E] hover:bg-[#2A2A4E] text-white'
                      } font-semibold py-3 rounded-lg transition-all duration-300`}>
                        Get Started
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about our automation services
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-[#FAFAF7] rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-semibold text-[#1A1A2E] pr-8">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#C5A23E] transition-transform flex-shrink-0 ${
                        openFaq === index ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-4"
                    >
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[#1A1A2E] via-[#2A2A4E] to-[#1A1A2E] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Not Sure Which Package Is Right for You?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Book a free consultation and we'll help you choose the perfect solution for your business needs.
              </p>
              <Link to="/contact">
                <Button className="bg-[#C5A23E] hover:bg-[#B39235] text-[#1A1A2E] font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Book a Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServicesPage;
