
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, CheckCircle, BarChart, CreditCard, Award, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';

const HomePage = () => {
  const [counts, setCounts] = useState({ workflows: 0, hours: 0, errors: 0 });

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const targets = { workflows: 50, hours: 1000, errors: 90 };
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts({
        workflows: Math.floor(targets.workflows * progress),
        hours: Math.floor(targets.hours * progress),
        errors: Math.floor(targets.errors * progress)
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Invoice Processing Automation',
      metric: 'From 4 hours to 4 minutes',
      description: 'Eliminate manual data entry and approval workflows. Our automation extracts invoice data, validates against purchase orders, and routes for approval automatically.'
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: 'Financial Reporting Dashboard',
      metric: 'Real-time insights, zero manual entry',
      description: 'Connect all your financial data sources into one unified dashboard. Get instant visibility into cash flow, expenses, and key metrics without spreadsheet gymnastics.'
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: 'Payment Reconciliation',
      metric: 'Match 10,000 transactions automatically',
      description: 'Stop manually matching payments and invoices. Our system reconciles bank statements, payment processors, and accounting records in seconds, not hours.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'We analyze your current workflows and identify automation opportunities that will save you the most time and reduce errors.'
    },
    {
      number: '02',
      title: 'Design',
      description: 'We map out the perfect automation solution tailored to your tools, processes, and team structure.'
    },
    {
      number: '03',
      title: 'Build',
      description: 'Our certified experts build, test, and deploy your custom automation workflows with full documentation.'
    },
    {
      number: '04',
      title: 'Support',
      description: 'We provide training, ongoing support, and continuous optimization to ensure your automation delivers maximum value.'
    }
  ];

  const trustBadges = [
    { icon: <Award className="w-6 h-6" />, text: 'Certified Make.com Expert' },
    { icon: <CheckCircle className="w-6 h-6" />, text: 'Zapier Verified Partner' },
    { icon: <Shield className="w-6 h-6" />, text: 'Ex-Audit Professional' }
  ];

  return (
    <>
      <Helmet>
        <title>Adwola - Financial Operations on Autopilot | Automation Studio</title>
        <meta name="description" content="Eliminate manual workflows and put your financial operations on autopilot. Expert automation solutions for invoice processing, reporting, and reconciliation." />
        <meta property="og:title" content="Adwola - Financial Operations on Autopilot" />
        <meta property="og:description" content="Eliminate manual workflows and put your financial operations on autopilot. Expert automation solutions for invoice processing, reporting, and reconciliation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://adwola.com/" />
        <meta property="og:image" content="https://adwola.com/slazzer-preview-p3nef.png" />
      </Helmet>

      <div className="bg-[#FAFAF7] min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#1A1A2E] via-[#2A2A4E] to-[#1A1A2E] text-white py-24 sm:py-32">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Financial Operations on <span className="text-[#C5A23E]">Autopilot</span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/80 mb-8 leading-relaxed">
                Eliminate manual workflows, reduce errors by 90%, and free your team to focus on what matters. 
                We build custom automation that transforms your financial operations.
              </p>
              <Link to="/contact">
                <Button className="bg-[#C5A23E] hover:bg-[#B39235] text-[#1A1A2E] font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Book a Strategy Call
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-[#C5A23E] mb-2">{counts.workflows}+</div>
                <p className="text-lg text-gray-600">Workflows Built</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-[#C5A23E] mb-2">{counts.hours.toLocaleString()}+</div>
                <p className="text-lg text-gray-600">Hours Saved</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-[#C5A23E] mb-2">{counts.errors}%</div>
                <p className="text-lg text-gray-600">Error Reduction</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-[#FAFAF7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mb-4">
                Automation That Delivers Real Results
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We specialize in financial automation that saves time, eliminates errors, and scales with your business.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className="bg-[#1A1A2E] text-white p-6">
                    <div className="text-[#C5A23E] mb-3">{service.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-[#C5A23E] font-semibold text-lg">{service.metric}</p>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our proven 4-step process ensures your automation delivers maximum value from day one.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="text-6xl font-bold text-[#C5A23E]/20 mb-4">{step.number}</div>
                  <h3 className="text-2xl font-bold text-[#1A1A2E] mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-[#FAFAF7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mb-4">
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hear from businesses that have transformed their operations with Adwola.
              </p>
            </motion.div>
            
            <TestimonialsCarousel />
          </div>
        </section>

        {/* Trust Signals Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#FAFAF7] rounded-xl shadow-md p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="text-[#C5A23E]">{badge.icon}</div>
                  <span className="font-semibold text-[#1A1A2E]">{badge.text}</span>
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
                Ready to Transform Your Financial Operations?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Book a free 30-minute strategy call and discover how automation can save your team hundreds of hours every month.
              </p>
              <Link to="/contact">
                <Button className="bg-[#C5A23E] hover:bg-[#B39235] text-[#1A1A2E] font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Book a Free 30-Minute Strategy Call
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

export default HomePage;
